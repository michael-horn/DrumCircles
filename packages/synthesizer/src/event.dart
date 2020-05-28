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
import 'dart:async';
import 'dart:web_audio';

import 'chain.dart';
import 'note.dart';


/// When you play or schedule a note on a synthesizer, it generates a SynthEvent
/// that can be used to stop or release the note later on.
class SynthEvent {

  /// note that this event represents
  Note note;

  /// audio context to play note
  BaseAudioContext context = null;

  /// tone generator
  SynthChain chain = null;

  /// time (seconds) this note is scheduled to start playing (0 means immediately)
  num start = 0;

  /// time (seconds) this note is scheduled to end playing (0 means sustain indefinitely)
  num end = 0;

  /// callback function for when the note stops playing
  Function onEnded;

  /// was this scheduled event canceled before playback
  bool canceled = false;

  /// create a synth event for the given note and with a given node configuration
  SynthEvent(this.note, this.context);


  /// start playing a sustained note immediately
  void playNote(AudioNode dest) {
    if (chain != null) {
      this.start = chain.context.currentTime;
      chain.playNote(note, dest, 0, 0, 0, true);
    }
  }


  /// release a sustained note
  void releaseNote() {
    if (chain != null) {
      chain.releaseNote();
      int timeout = (chain.release * 1000).round() + 200;
      new Timer(new Duration(milliseconds : timeout), () {
        if (onEnded != null) Function.apply(onEnded, [ ]);
      });
    }
  }


  /// schedule a note to be played in the future
  ///   when: when (seconds) to start playback
  ///   offset: used to skip the beginning part of a note (in seconds) or 0 to play the entire note
  ///   duration: how long to hold the note in seconds
  void scheduleNote(AudioNode dest, num when, num offset, num duration) {
    if (chain != null) {
      //duration = chain.playNote(note, dest, when, offset, duration, false);
      chain.playNote(note, dest, when, offset, duration, false);
      this.start = when;
      this.end = start + duration;
      num now = context.currentTime;
      int timeout = (((when - now) + duration + chain.release) * 1000).round() + 200;
      new Timer(new Duration(milliseconds : timeout), () {
        if (onEnded != null) Function.apply(onEnded, [ ]);
      });
    }
  }


  /// immediately cancel a scheduled note
  void cancelNote() {
    this.canceled = true;
    if (onEnded != null) Function.apply(onEnded, [ ]);
    onEnded = null;
  }


  void pitchBend(num cents) {
    if (chain != null) chain.pitchBend(cents);
  }


  /// bend the pitch of a note by the given number of cents (hundredths of a half step)
  /// The main parameter is an array of floating-point numbers representing the curve the
  /// note will change along its duration. The specified values are spaced equally along this duration.
  ///    start - start time of the bend in seconds
  ///    duration - the length of the pitch bend in seconds
  ///    cents - array representing the value curve over time
  void schedulePitchBend(num start, num duration, List<num> cents) {
    if (chain != null) chain.schedulePitchBend(start, duration, cents);
  }
}
