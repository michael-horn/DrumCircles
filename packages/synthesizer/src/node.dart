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
import 'dart:html';
import 'dart:math';
import 'dart:web_audio';

import 'note.dart';
import 'synth.dart';
import 'utils.dart';


class SynthNode {

  BaseAudioContext context;

  /// the node's final output level is set through this gain node
  GainNode level;
  num _level = 1.0;

  /// use to disable (turn off a node)
  bool enabled = true;

  /// unique id number for this node in this patch
  int id = 0;


  SynthNode(this.context, Map config) {
    this.id = toInt(config['id']);
    this.level = context.createGain();
    this.enabled = toBool(config['enabled'], true);
    this._level = toNum(config['level'], 1.0);
    this.level.gain.value = _level;
  }


  void connectFromSource(SynthNode source, String type) {
    source.level.connectNode(this.level);
  }

  void start(Note note, num when, num offset, num duration, bool sustain) { }


  void release() { }

  void cancel() {
    this.level.gain.cancelScheduledValues(0);
  }

  void destroy() {
    if (level != null) level.disconnect();
    level = null;
  }

  void pitchBend(num cents) { }

  void schedulePitchBend(num start, num duration, List<num> cents) { }
}


class ADSRNode extends SynthNode {

  /// 'attack' value of the ADSR envelope for this note (seconds)
  num A = 0.1;

  /// 'decay' value of the ADSR envelope for this note (seconds)
  num D = 0.2;

  /// 'sustain' value of the ADSR envelope for this note (seconds)
  num S = 1.0;

  /// 'release' value of the ADSR envelope for this note (seconds)
  num R = 0.2;

  /// the ADSR envelope is applied to the ADSR gain node
  GainNode adsr;


  ADSRNode(BaseAudioContext context, Map config) : super (context, config) {
    this.adsr = context.createGain();
    this.A = toNum(config['A'], A);
    this.D = toNum(config['D'], D);
    this.S = toNum(config['S'], S);
    this.R = toNum(config['R'], R);
    adsr.connectNode(level);
    adsr.gain.value = 0.0;
  }


  void connectFromSource(SynthNode source, String type) {
    source.level.connectNode(adsr);
  }


  void start(Note note, num when, num offset, num duration, bool sustain) {
    AudioParam param = adsr.gain;

    num d = duration - offset;
    param.cancelScheduledValues(0);
    param.setValueAtTime(0.0, when);

    // note is sustained
    if (sustain) {
      param.setTargetAtTime(1.0, when, A/2);
      if (D > 0) param.setTargetAtTime(S, A + when, D/2);
    }
    else if (d <= 0) {
      return;
    }
    else if (d < A) {
      param.setTargetAtTime(d / A, when, d/2);
      param.setTargetAtTime(0.0, when + d, R/2);
    }
    else if (d < A + D) {
      param.setTargetAtTime(1.0, when, A/2);
      param.setTargetAtTime(0.0, when + A, R/2);
    }
    else if (D <= 0) {
      param.setTargetAtTime(1.0, when, A/2);
      param.setTargetAtTime(0.0, when + d, R/2);
    }
    else {
      param.setTargetAtTime(1.0, when, A/2);
      param.setTargetAtTime(S, when + A, D/2);
      param.setTargetAtTime(0.0, when + d, R/2);
    }
  }


  void release() {
    super.release();
    if (adsr != null) {
      AudioParam param = adsr.gain;
      num now = adsr.context.currentTime;
      param.setTargetAtTime(0.0, now, R / 3);
    }
  }


  void cancel() {
    super.cancel();
    this.adsr.gain.cancelScheduledValues(0);
  }


  void destroy() {
    super.destroy();
    if (adsr != null) adsr.disconnect();
    adsr = null;
  }
}


/// each node consists of an oscillator and a gain node
class FMNode extends SynthNode {

  /// generates the carrier or modulator wave
  OscillatorNode osc;

  /// connected to the detune parameter of the oscillator
  GainNode dIn;

  /// connected to the frequency parameter of the oscillator
  GainNode fIn;

  /// frequency of the oscillator (can be relative to the note or fixed)
  num frequency = 1.0;

  /// if true, the frequency is relative to the note being played
  bool relative = true;



  FMNode(BaseAudioContext context, Map config) : super (context, config) {
    this.frequency = toNum(config['frequency'], 220.0);
    this.relative = toBool(config['relative'], true);
    this.osc = context.createOscillator();
    this.osc.frequency.value = 1800.0;
    this.osc.detune.value = toNum(config['detune'], 0.0);
    this.osc.type = toStr(config['waveform'], 'sine');
    this.osc.start2();

    this.dIn = context.createGain();
    this.dIn.gain.value = toNum(config['dIn'], 400.0);
    this.fIn = context.createGain();
    this.fIn.gain.value = toNum(config['fIn'], 100.0);

    dIn.connectParam(osc.detune);
    fIn.connectParam(osc.frequency);
    osc.connectNode(level);
  }


  void start(Note note, num when, num offset, num duration, bool sustain) {
    if (osc == null || !enabled) return;
    num f = relative ? note.frequency * frequency : frequency;
    osc.frequency.cancelScheduledValues(0);
    osc.frequency.setValueAtTime(f, osc.context.currentTime);
    osc.detune.cancelScheduledValues(0);
    osc.detune.setValueAtTime(0, osc.context.currentTime);
  }


  void pitchBend(num cents) {
    num when = osc.context.currentTime;
    osc.detune.linearRampToValueAtTime(cents, when + 0.01);
  }


  void schedulePitchBend(num start, num duration, List<num> cents) {
    num when = osc.context.currentTime;
    osc.detune.cancelScheduledValues(when);
    osc.detune.setValueCurveAtTime(cents, when + start, duration);
  }


  void cancel() {
    super.cancel();
    osc.frequency.cancelScheduledValues(0);
    osc.detune.cancelScheduledValues(0);
  }


  void destroy() {
    super.destroy();
    if (osc == null || !enabled) return;
    osc.stop();
    dIn.disconnect();
    fIn.disconnect();
    osc.disconnect();
    dIn = null;
    fIn = null;
    osc = null;
  }


  void connectFromSource(SynthNode source, String type) {
    if (type == "detune") {
      source.level.connectNode(dIn);
    }
    else if (type == "frequency") {
      source.level.connectNode(fIn);
    }
    else if (type == "amplitude") {
      source.level.connectParam(level.gain);
    }
  }
}


/// each sample node uses a buffer source to generate audio
class SynthSampleNode extends SynthNode {

  Synthesizer synth;

  AudioBufferSourceNode source;

  List samples;

  num sampleDuration = 0;


  SynthSampleNode(Synthesizer synth, BaseAudioContext context, Map config) : super(context, config) {
    this.synth = synth;
    this.samples = config['samples'];
  }


  void start(Note note, num when, num offset, num duration, bool sustain) {
    if (!enabled) return;
    if (source != null) source.disconnect();

    this.source = context.createBufferSource();
    this.source.connectNode(level);

    //-------------------------------------------------
    // find the closest sample to the target note
    //-------------------------------------------------
    num step = -1;
    num score = 100000;
    num delta = 0;
    String sample = null;

    for (var s in samples) {
      num d = (note.note - s['step']);
      if (d < 0) d = d * -1 + 12; // incur a 12 step penalty for going below the sample frequency
      if (d < score) {
        step = s['step'];
        delta = (note.note - step);
        score = d;
        sample = s['sample'];
      }
    }

    AudioBuffer buffer = null;

    if (synth.customRecordings.containsKey(step)) {
      buffer = synth.customRecordings[step];
    }
    else if (sample != null) {
      buffer = Synthesizer.getAudioBuffer(sample);
    }

    if (buffer != null) {
      num playback = pow(2, delta / 12);
      source.buffer = buffer;
      source.playbackRate.value = playback;
      source.start(when, offset);
      //source.onEnded.listen((e) { _cleanup(); });
      sampleDuration = buffer.duration / playback;
    }
  }


  void pitchBend(num cents) {
    if (source != null && enabled) {
      num when = source.context.currentTime;
      try {
        source.detune.linearRampToValueAtTime(cents, when + 0.01);
      }
      catch(err){
        window.console.info("The browser does not support detune; "
            "Using playbackrate");
        num semitoneRatio = pow(2, 1/1200);
        source.playbackRate
            .linearRampToValueAtTime(pow(semitoneRatio, cents), when + 0.01);
      }
    }
  }


  void schedulePitchBend(num start, num duration, List<num> cents) {
    if (source != null && enabled) {
      num when = source.context.currentTime;
      try {
        source.detune.cancelScheduledValues(when);
        source.detune.setValueCurveAtTime(cents, when + start, duration);
      }
      catch(err){
        window.console.info("The browser does not support detune; "
            "Using playbackrate");
        num semitoneRatio = pow(2, 1/1200);
        cents = cents.map((cent) => pow(semitoneRatio, cent)).toList();
        source.playbackRate
            .setValueCurveAtTime(cents, when + start, duration);
      }
    }
  }


  void cancel() {
    super.cancel();
    if (source != null) {
      source.stop();
      source = null;
    }
  }


  void destroy() {
    super.destroy();
    if (source != null) source.disconnect();
    source = null;
  }
}


/// just exposes the existing gain level node
class SynthDelayNode extends SynthNode {

  DelayNode delay;

  num delayTime = 0.1;

  SynthDelayNode(BaseAudioContext context, Map config) : super(context, config) {
    this.delay = context.createDelay();
    this.delayTime = toNum(config['delay'], 0.1);
    delay.connectNode(level);
    delay.delayTime.value = delayTime;
  }


  void connectFromSource(SynthNode source, String type) {
    source.level.connectNode(this.delay);
  }


  void destroy() {
    super.destroy();
    if (delay != null) delay.disconnect();
    delay = null;
  }
}


class SynthCompressorNode extends SynthNode {

  DynamicsCompressorNode compressor;

  SynthCompressorNode(BaseAudioContext context, Map config) : super(context, config) {
    this.compressor = context.createDynamicsCompressor();
    compressor.connectNode(level);
    compressor.threshold.value = toNum(config['threshold'], -24);
    compressor.knee.value = toNum(config['knee'], 30);
    compressor.ratio.value = toNum(config['ratio'], 12);
    compressor.release.value = toNum(config['release'], .25);
  }


  void connectFromSource(SynthNode source, String type) {
    source.level.connectNode(this.compressor);
  }


  void destroy() {
    super.destroy();
    if (compressor != null) compressor.disconnect();
    compressor = null;
  }
}


class FilterNode extends SynthNode {
  BiquadFilterNode filter;

  FilterNode(BaseAudioContext context, Map config) : super(context, config) {
    this.filter = context.createBiquadFilter();
    filter.connectNode(level);
    filter.frequency.value = toNum(config['frequency'], 350.0);
    filter.detune.value = toNum(config['detune'], 0.0);
    filter.Q.value = toNum(config['Q'], 1.0);
    filter.gain.value = toNum(config['gain'], 0.0);
    filter.type = toStr(config['filter type'], "lowpass");
  }


  void connectFromSource(SynthNode source, String type) {
    source.level.connectNode(this.filter);
  }


  void destroy() {
    super.destroy();
    if (filter != null) filter.disconnect();
    filter = null;
  }
}
