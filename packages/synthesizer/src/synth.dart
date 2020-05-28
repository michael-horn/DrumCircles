/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2019, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import 'dart:html';
import 'dart:math';
import 'dart:web_audio';

import 'chain.dart';
import 'effect.dart';
import 'event.dart';
import 'note.dart';


/// Generic note/audio synthesizer. The various instruments (bass, marimba,
/// drums, guitar) use samples, additive synthesis, and FM synthesis to
// generate sounds in different voices.
class Synthesizer {

  /// maximum allowed number of tone generators
  int MAX_GENERATORS = 16;

  /// global map of loaded audio buffers
  static Map sounds = new Map();

  /// tempo (beats per minute)
  int _bpm = 120;
  int get bpm => _bpm;

  /// effects stack applied to this synth
  List<Effect> effects = new List<Effect>();

  /// list of currently scheduled or playing notes
  List<SynthEvent> notes = new List<SynthEvent>();

  /// configuration settings for this synth instance
  Map config;

  /// is the synth currently playing a sound
  bool get isPlaying => notes.isNotEmpty;

  /// list of user-defined custom audio buffers
  Map<int, AudioBuffer> customRecordings = new Map<int, AudioBuffer>();

  /// bank of tone generators that we can checkout to play notes
  List<SynthChain> _bank = new List<SynthChain>();

  /// name of the current patch
  String voice = "";


  /// creates a synthesizer. the synth won't play anything until a patch is set
  Synthesizer();


  /// change the tempo
  void setTempo(int tempo) {
    _bpm = tempo;
  }


  /// set the audio patch for the synthesizer and loads all audio resources
  void loadPatch(String name, Map patch, AudioContext context) async {
    this.voice = name;
    cancelAllNotes();
    this.config = patch;

    int load_count = 0;

    if (config["nodes"] is List) {
      for (Map node in config["nodes"]) {
        if (node["type"] == "sample") {
          if (node["samples"] is List) {
            for (Map sample in node["samples"]) {
              if (sample["sample"] != null) {
                load_count++;
                String name = sample['sample'];
                loadAudioBuffer(name, context, (n) {
                  //print("Loaded $name");
                  // we could insert a callback function here to indicate loading progress
                  load_count--;
                  if (load_count == 0) {
                    //print("Done.");
                    // and here
                  }
                });
              }
            }
          }
        }
      }
    }
  }


  /// add a user custom sample for a given MIDI note step
  void addCustomRecording(int midi, AudioBuffer buffer) {
    customRecordings[midi] = buffer;
  }


  /// schedule a note to be played immediately and held until release or releaseNote is called
  ///   note: note to be played (pitch and duration)
  ///   dest: ultimate audio destination
  SynthEvent playNote(Note note, AudioNode dest) {

    if (config == null) return null;

    // configure and start source event
    SynthEvent event = new SynthEvent(note, dest.context);

    // allocate a tone generator that we'll release when the note is done
    event.chain = allocateGenerator(dest.context);
    if (event.chain == null) return null;

    // source node --> gain --> destination
    GainNode gain = dest.context.createGain() ..
      gain.value = note.gain;
    gain.connectNode(dest);
    dest = gain;

    // immediately play the note
    event.playNote(dest);
    notes.add(event);

    event.onEnded = () {
      notes.remove(event);
      if (event.chain != null) {
        releaseGenerator(event.chain);
        event.chain = null;
      }
      if (gain != null) {
        gain.disconnect();
        gain = null;
      }
    };
    return event;
  }


  /// release a sustained note. allows envelopes to release
  void release(SynthEvent event) {
    if (event != null) event.releaseNote();
  }


  /// release all sustained notes matching the given note value
  void releaseNote(Note note) {
    for (int i=notes.length-1; i >= 0; i--) {
      if (notes[i].note.note == note.note) {
        release(notes[i]);
      }
    }
  }


  /// immediately release all notes that are currently being sustained
  void releaseAllNotes() {
    for (int i=notes.length-1; i >= 0; i--) {
      release(notes[i]);
    }
  }


  /// schedule a note to be played in the future
  ///   note: note to be played (pitch and duration)
  ///   dest: ultimate audio destination
  ///   start: the start time for the note in beats
  ///   delta: time before the start of the next measure (in beats)
  ///    when this note is to be scheduled. if negative, it means
  ///    to skip the beginning of a loop
  void scheduleNote(Note note, AudioNode dest, [num start = 0, num delta = 0]) async {

    if (config == null) return;

    //-------------------------------------------------
    // convert from beats to seconds
    //-------------------------------------------------
    num now = dest.context.currentTime;
    num duration = note.duration * (60 / bpm);
    num offset = max(0, -delta);
    num off = max(0, offset - start) * (60 / bpm);
    num delay = max(0, delta) * (60 / bpm);
    start = (start + delta) * (60 / bpm);
    offset = offset * (60 / bpm);

    //-------------------------------------------------
    // create the event now in case we need to cancel it while sleeping
    //-------------------------------------------------
    SynthEvent event = new SynthEvent(note, dest.context);
    notes.add(event);

    //-------------------------------------------------
    // before we sleep create a closure copy of the effects stack
    //-------------------------------------------------
    List<Effect> fx = new List<Effect>();
    for (Effect e in effects) {
      fx.add(e.clone());
    }


    //-------------------------------------------------
    // sleep until we're close to the time to schedule the note
    //-------------------------------------------------
    bool slept = false;
    if (start > 0.3 && off <= 0) {
      int pause = ((start - 0.25) * 1000).floor();
      await new Future.delayed(new Duration(milliseconds : pause));
      slept = true;
      delta = dest.context.currentTime - now;
      delay = max(0, delay - delta);
      offset = offset + delta;
      start = start - delta;
      now += delta;
    }

    //-------------------------------------------------
    // was the note was canceled while we were sleeping?
    // is the audio system getting behind?
    //-------------------------------------------------
    if ((slept && start < -0.05) || event.canceled) {
      notes.remove(event);
      return;
    }

    //-------------------------------------------------
    // checkout a tone generator
    //-------------------------------------------------
    event.chain = allocateGenerator(dest.context);
    if (event.chain == null) {
      notes.remove(event);
      return;
    }

    //-------------------------------------------------
    // layer in effects
    //-------------------------------------------------
    List<AudioNode> nodes = new List<AudioNode>();
    for (int i=fx.length - 1; i >= 0; i--) {
      dest = fx[i].connect(dest, bpm, delay, offset);
      nodes.add(dest);
    }

    //-------------------------------------------------
    // source node --> gain --> effects --> destination
    //-------------------------------------------------
    GainNode gain = dest.context.createGain() .. gain.value = note.gain;
    gain.connectNode(dest);
    nodes.add(gain);
    dest = gain;

    //-------------------------------------------------
    // play source event
    //-------------------------------------------------
    event.scheduleNote(dest, now + start, off, duration);

    //-----------------------------------------------
    // apply after effects to notes (e.g. bend)
    //-----------------------------------------------
    for (Effect effect in fx) {
      effect.afterEffect(event, bpm, delay, offset);
    }

    //-------------------------------------------------
    // cleanup after note completes playing
    //-------------------------------------------------
    event.onEnded = () {
      for (AudioNode node in nodes) node.disconnect();
      notes.remove(event);
      if (event.chain != null) {
        releaseGenerator(event.chain);
        event.chain = null;
      }
    };
  }


  /// cancel playback of all scheduled notes
  void cancelAllNotes() {
    for (int i=notes.length-1; i >= 0; i--) {
      notes[i].cancelNote();
    }
    destroyAllGenerators();
  }


  /// cancels all notes scheduled to be played after a given point in the future
  void cancelAfter(num beatsInFuture) {
    num t = beatsInFuture * (60 / bpm);
    for (int i=notes.length-1; i >= 0; i--) {
      SynthEvent e = notes[i];
      num delta = e.start - e.context.currentTime;
      if (e.start == 0 || delta >= t) e.cancelNote();
    }
  }


  /// set the pitch bend "wheel" to the given number of cents.
  /// this only applies to currently scheduled or playing notes.
  void pitchBend(num cents) {
    notes.forEach((event) => event.pitchBend(cents));
  }


  /// push an effect (e.g. distortion, feedback, filter, gain, pitch bend)
  void pushEffect(Effect effect) {
    if (effect != null) {
      effects.add( effect );
    }
  }


  /// pop the effect stack
  Effect popEffect() {
    return effects.isNotEmpty ? effects.removeLast() : null;
  }


  /// remove all effects
  void clearEffects() {
    effects.clear();
  }


  /// checkout a tone generator to play a sound
  SynthChain allocateGenerator(BaseAudioContext context) {
    if (_bank.isNotEmpty && _bank[0].context != context) {
      destroyAllGenerators();
    }

    for (SynthChain chain in _bank) {
      if (chain.free && chain.context == context) {
        chain.free = false;
        return chain;
      }
    }

    if (_bank.length < MAX_GENERATORS) {
      SynthChain chain = new SynthChain(this, context, config);
      chain.free = false;
      _bank.add(chain);
      return chain;
    }
    return null;
  }


  void releaseGenerator(SynthChain generator) {
    generator.free = true;
  }


  void destroyAllGenerators() {
    for (SynthChain chain in _bank) {
      chain.destroy();
    }
    _bank.clear();
  }


  /// returns true if the audio buffer has already been loaded
  static bool hasSound(String name) {
    return (sounds[name] != null);
  }


  /// returns a preloaded audio buffer or null if it doesn't exist
  static AudioBuffer getAudioBuffer(String name) {
    return sounds[name];
  }


  /// asynchronously loads a sound from the given URL and uses name as the hash key
  void loadAudioBuffer(String name, AudioContext context, Function onLoaded) async {
    if (hasSound(name)) return;

    String url = supportsAudioType('ogg') ? "$name.ogg" : "$name.wav";

    HttpRequest request = new HttpRequest();
    request.open("GET", url, async: true);
    request.responseType = "arraybuffer";
    request.onLoad.listen((e) async {
      AudioBuffer buffer = await context.decodeAudioData(request.response);
      if (buffer != null) {
        Synthesizer.sounds[name] = buffer;
        Function.apply(onLoaded, [ name ]);
      }
    });
    request.onError.listen((e) => print("BufferLoader: XHR error"));
    request.send();
  }


  /// checks to see if a particular audio format is supported by the browser
  static bool supportsAudioType(String filetype) {

    bool supportsFormat = false;

    AudioElement audio = new AudioElement();
    audio.id = "test-audio-node";

    // Allow user to create shortcuts, i.e. just "mp3"
    Map<String, String> formats = {
      "mp3": "audio/mpeg",
      "mp4": "audio/mp4",
      "ogg": "audio/ogg",
      "aif": "audio/x-aiff",
      "wav": "audio/wav"
    };

    document.body.append(audio);

    if (audio.canPlayType(formats[filetype]) == "probably" ||
        audio.canPlayType(formats[filetype]) == "maybe") {
      supportsFormat = true;
      querySelector("#test-audio-node").remove();
    }

    return supportsFormat;
  }
}
