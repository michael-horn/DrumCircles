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
import 'dart:web_audio';

import 'effect.dart';
import 'synth.dart';
import 'trace.dart';


/**
 * Subclass of synthesizer that adds the ability to schedule sets of notes
 */
class SchedulerSynth extends Synthesizer {


  SchedulerSynth() : super();


  void scheduleNotes(Trace trace, AudioNode dest, {
    num delay = 0,     // beats before starting playback
    num offset = 0,     // beats to skip into the trace
    bool withOffsets = true
  })
  {
    for (TraceEvent t in trace.trace) {

      if (t.command == TraceEvent.START) {
        clearEffects();
      }

      else if (t.command == TraceEvent.PLAY) {
        if ((withOffsets && t.end >= offset) || (!withOffsets && t.time >= offset)) {
          num delta = (delay > 0) ? delay : (offset > 0) ? -offset : 0;
          scheduleNote( t.note, dest, t.time, delta);
        }
      }

      else if (t.command == TraceEvent.PATCH) {
        loadPatch('custom', t['patch'], dest.context);
      }

      else if (t.command == TraceEvent.PUSH_FX) {
        pushEffect(new Effect(t['effect'], t.params));
      }

      else if (t.command == TraceEvent.POP_FX) {
        popEffect();
      }

      else if (t.command == TraceEvent.STOP) {
        clearEffects();
      }
    }
  }

  //void cancelAllNotes() {
  //void cancelAfter(num beatsInFuture) {
}
