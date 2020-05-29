/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2020, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import 'dart:async';
import 'dart:math';
import 'dart:web_audio';
import 'key.dart';
import 'utils.dart';


/**
 * Clock subscribers receive events when clock properties change.
 */
abstract class ClockSubscriber {

  void onClockReset();

  void onClockTimeChange();

  void onTempoChange();

  void onTimeSignatureChange();
}

/**
 * Metronomes can request beat pulses from the clock
 */
abstract class Metronome {

  void pulse(int beats); /// beat is the current beat in a measure
}


/**
 * Thin wrapper around the audio context timer that lets you set time
 * and synchronize multiple subscribers playing at the same time.
 */
class PlayClock {

  /// time at which clock was last started or paused
  num _start = 0;

  /// subscribers can set the time to an arbitrary beat
  num _elapsedBeats = 0;

  /// common beats per minute for all subscribers to the clock
  int _bpm = 120;
  int get bpm => _bpm;
  set bpm(int tempo) => setTempo(tempo);

  /// time signature
  String _meter = "4/4";
  String get meter => _meter;
  set meter(String m) => setTimeSignature(m);

  /// beats per measure
  int _beatsPerMeasure = 4;
  int get beatsPerMeasure => _beatsPerMeasure;

  /// denominator of the time signature (e.g. 4, 2, 8...)
  int _beatValue = 4; // quarter note is the default
  int get beatValue => _beatValue;

  /// musical key
  Key _key = new Key.Cmaj();
  String get key => _key.name;
  String set key(String keyName) { _key = new Key(keyName); }

  /// elapsed time in seconds since we last called play
  num get time => (isPaused || context == null) ? _start : context.currentTime - _start;

  /// elapsed time as hh:mm:ss string
  String get timeString {
    String m = "${(time ~/ 60) % 60}";
    String s = "${time.round() % 60}";
    String c = "${(time * 100).floor() % 100}";
    if (m.length == 1) m = "0$m";
    if (s.length == 1) s = "0$s";
    if (c.length == 1) c = "0$c";
    return "$m:$s.$c";
  }

  /// elapsed time in beats
  num get beats => (time * bpm / 60) + _elapsedBeats;

  /// list of current subscribers to the clock that are currently playing
  Set<ClockSubscriber> subscribers = new Set<ClockSubscriber>();

  /// list of all subscribers for global events such as time signature changes
  Set<ClockSubscriber> listeners = new Set<ClockSubscriber>();

  /// underlying implementation uses the audio context timer
  AudioContext context = null;

  /// is the clock paused?
  bool get isPaused => subscribers.isEmpty;

  /// list of subscribed metronomes
  Set<Metronome> metronomes = new Set<Metronome>();


  PlayClock();


  void addSubscriber(ClockSubscriber subscriber) {
    listeners.add(subscriber);
  }


  bool isPlaying(ClockSubscriber subscriber) {
    return (subscribers.contains(subscriber));
  }


/**
 * Start playing for this subscriber
 */
  void play(ClockSubscriber subscriber) {
    if (context != null && isPaused) {
      _start = context.currentTime - _start;
    }
    subscribers.add(subscriber);
    listeners.add(subscriber);
  }


/**
 * Pause this subscriber only ...
 */
  void pause(ClockSubscriber subscriber) {
    listeners.add(subscriber);
    print("added listener");
    if (isPlaying(subscriber)) {
      subscribers.remove(subscriber);
      if (isPaused && context != null) {
        _start = (context.currentTime - _start);
      }
    }
  }


/**
 * Reset the clock back to zero beats and stop all subscribers
 */
  void stopAll() {
    _elapsedBeats = 0;
    _start = 0;
    subscribers.clear();
    listeners.forEach((s) => s.onClockReset());
  }


/**
 * Automatically stops all subscribers
 */
  void setTime(num elapsedBeats) {
    _elapsedBeats = elapsedBeats;
    _start = 0;
    listeners.forEach((s) => s.onClockTimeChange());
    subscribers.clear();
  }


  void setTempo(int tempo) {
    num lastBeats = beats;
    _bpm = max(1, tempo);
    if (context != null) {
      _elapsedBeats = (lastBeats * 60 / _bpm) - context.currentTime;
    }
    listeners.forEach((s) => s.onTempoChange());
  }


  void setTimeSignature(String s) {
    // sanity check the time signature string
    if (s == null || s.split('/').length != 2) s = "4/4";
    _beatsPerMeasure = toInt(s.split('/')[0], -1);
    _beatValue = toInt(s.split('/')[1], -1);

    if (_beatsPerMeasure < 0 || _beatValue < 0) {
      _beatsPerMeasure = 4;
      _beatValue = 4;
    }

    _meter = "${_beatsPerMeasure}/${_beatValue}";
    listeners.forEach((s) => s.onTimeSignatureChange());
  }


  void startMetronome(Metronome metronome) {
    if (metronome != null && context != null) {
      metronomes.add(metronome);
      if (_timer == null) {

        num start_time = context.currentTime;
        int beat = 0;
        metronomes.forEach((m) => m.pulse(0));

        _timer = new Timer.periodic(const Duration(milliseconds: 30), (t) {
          if (metronomes.isEmpty) {
            _timer.cancel();
            _timer = null;
          }
          else {
            num beat_len = 60 / bpm;
            num elapsed = (context.currentTime - start_time);
            int b = (elapsed ~/ beat_len) % beatsPerMeasure;
            if (b != beat) {
              beat = b;
              metronomes.forEach((m) => m.pulse(beat));
            }
          }
        });
      }
    }
  }
  Timer _timer;


  void stopMetronome(Metronome metronome) {
    metronomes.remove(metronome);
  }


  bool isMetronomePlaying(Metronome metronome) {
    return metronomes.contains(metronome);
  }
}
