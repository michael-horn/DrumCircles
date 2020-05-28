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
import 'dart:math';
import 'dart:web_audio';

import 'node.dart';
import 'note.dart';
import 'synth.dart';


/// A synth chain is a collection of connected nodes that forms
/// the audio processing chain defined by the synth patch config file.
/// chains can be cached and reused
class SynthChain {

  /// audio context to play note through
  BaseAudioContext context;

  /// is this chain currently in use or not?
  bool free = true;

  /// list of nodes connected to generate sounds
  Map<int, SynthNode> nodes = new Map<int, SynthNode>();

  /// final output gain node that will get connected to the audio destination
  SynthNode out;

  /// longest release time for all of the ADSR nodes
  num release = 0.0;

  /// longest sample length of all Sample nodes
  num maxD = 0.0;

  /// create a synth chain from a configuration patch
  SynthChain(Synthesizer synth, this.context, Map config) {
    this.out = null;

    if (config['nodes'] is List) {
      for (var node in config['nodes']) {
        if (node is Map) {
          switch (node['type']) {
            case 'sample':
              _addNode(new SynthSampleNode(synth, context, node));
              break;

            case 'fm':
              _addNode(new FMNode(context, node));
              break;

            case 'delay':
              _addNode(new SynthDelayNode(context, node));
              break;

            case 'adsr':
              ADSRNode adsr = new ADSRNode(context, node);
              release = max(adsr.R, release);
              _addNode(adsr);
              break;

            case 'compressor':
              _addNode(new SynthCompressorNode(context, node));
              break;

            case 'filter':
              _addNode(new FilterNode(context, node));
              break;

            case 'out':
              this.out = new SynthNode(context, node);
              _addNode(out);
              break;

            default:
              _addNode(new SynthNode(context, node));
              break;
          }
        }
      }
    }

    for (var r in config['routing']) {
      SynthNode source = nodes[r['source']];
      SynthNode dest = nodes[r['dest']];
      if (source != null && dest != null) {
        source.enabled = true;
        dest.connectFromSource(source, r['type']);
      }
    }
  }


  void _addNode(SynthNode node) {
    node.enabled = false;
    nodes[node.id] = node;
  }


  /// schedule a note to be played in the future
  ///   when: when (seconds) to start playback
  ///   offset: used to skip the beginning part of a note (in seconds) or 0 to play the entire note
  ///   duration: how long to hold the note in seconds
  ///   sustain: hold note until release is called?
  num playNote(Note note, AudioNode dest, num when, num offset, num duration, bool sustain) {
    if (out == null) return 0.0;
    out.level.connectNode(dest);
    this.maxD = duration;
    nodes.values.forEach((node) {
      node.start(note, when, offset, duration, sustain);
      if (node is SynthSampleNode) {
        maxD = max(maxD, node.sampleDuration);
      }
    });
    return release + maxD;
  }


  void pitchBend(num cents) {
    nodes.values.forEach((node) => node.pitchBend(cents));
  }


  /// bend the pitch of a note by the given number of cents (hundredths of a half step)
  /// The main parameter is an array of floating-point numbers representing the curve the
  /// note will change along its duration. The specified values are spaced equally along this duration.
  ///    start - start time of the bend in seconds
  ///    duration - the length of the pitch bend in seconds
  ///    cents - array representing the value curve over time
  void schedulePitchBend(num start, num duration, List<num> cents) {
    nodes.values.forEach((node) => node.schedulePitchBend(start, duration, cents));
  }


  /// release a sustained note
  void releaseNote() {
    nodes.values.forEach((node) { node.release(); });
  }


  void cancel() {
    nodes.values.forEach((node) { node.cancel(); });
  }


  void destroy() {
    nodes.values.forEach((node) => node.destroy());
  }
}
