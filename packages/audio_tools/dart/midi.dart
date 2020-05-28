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
import 'dart:html';
import 'dart:js' as js;
import 'dart:convert';
import 'dart:typed_data';


/**
 * MIDI device interface
 */
class MIDIManager {

  /// MIDI input devices
  Map<int, Map> inputs = new Map<int, Map>();

  /// MIDI output devices
  Map<int, Map> outputs = new Map<int, Map>();

  /// subscribe to state change events
  StreamController<MIDIEvent> _stateStream;
  Stream<MIDIEvent> get onStateChange => _stateStream.stream;

  /// subscribe to MIDI messages (commands)
  StreamController<MIDIEvent> _messageStream;
  Stream<MIDIEvent> get onMessage => _messageStream.stream;

  /// Use singleton pattern
  static final MIDIManager _singleton = new MIDIManager._internal();


  factory MIDIManager() {
    return _singleton;
  }


  void sendNoteOn(int note, int velocity, [ int port = null ]) {
    int command = 144;
    js.context.callMethod('midiSendMessage', [ port, command, note, velocity ]);
  }


  void sendNoteOff(int note, [ int port = null ]) {
    int command = 128;
    js.context.callMethod('midiSendMessage', [ port, command, note, 0 ]);
  }


/**
 * MIDI file export.
 * bpm: beats per minute from project (int)
 * trace: json-ified TunePad trace object
 */
  Blob exportMidi(int bpm, List trace) {
    String bytes = js.context.callMethod('exportMidi', [ bpm, jsonEncode(trace) ]);
    if (bytes != null) {
      Uint8List buffer = new Uint8List.fromList(bytes.codeUnits);
      return new Blob([ buffer ], "audio/midi");
    } else {
      return null;
    }
  }


/**
 * Start listening for midi events
 */
  MIDIManager._internal() {
    _stateStream = new StreamController<MIDIEvent>.broadcast();
    _messageStream = new StreamController<MIDIEvent>.broadcast();
    js.context['midiEvent'] = _midiEvent;
    js.context['midiConnection'] = _midiConnection;
    js.context.callMethod('midiInit', [ ]);
  }


/**
 * Dart must define this function to listen for midi device
 * connection and disconnection events.
 */
  void _midiConnection(String jsonString) {
    Map midi = jsonDecode(jsonString);
    int port = _toInt(midi['port'], 0);
    if (midi['type'] == "input" && midi['state'] == "connected" && port != 0) {
      inputs[port] = midi;
    }
    else if (midi['type'] == "input" && midi['state'] == "disconnected" && port != 0) {
      inputs.remove(port);
    }
    else if (midi['type'] == "output" && midi['state'] == "connected" && port != 0) {
      outputs[port] = midi;
    }
    else if (midi['type'] == "output" && midi['state'] == "disconnected" && port != 0) {
      outputs.remove(port);
    }
    _stateStream.add(new MIDIEvent(midi));
  }


/**
 * dart must define this function for the midi-helper.js script.
 * take a midi input command and generate the proper response.
 */
  void _midiEvent(String jsonString) {
    Map midi = jsonDecode(jsonString);
    _messageStream.add(new MIDIEvent(midi));
  }
}


class MIDIEvent {

  int get port => _toInt(data['port']);

  /// midi device name
  String get name => data['name'];

  /// connection events only
  String get state => data['state'];
  String get connection => data['connection'];
  String get manufacturer => data['manufacturer'];

  /// message events only
  int get command => _toInt(data['command']);
  int get channel => _toInt(data['channel']);
  int get note => _toInt(data['note']);
  int get velocity => _toInt(data['velocity']);
  num get timestamp => data['timestamp'];

  Map data;


  MIDIEvent(this.data);

  String toString() => data.toString();
}


/// Parses an int from an object (usually a string)
int _toInt(var d, [ int defaultValue = 0 ]) {
  if (d == null) {
    return defaultValue;
  }
  else if (d is int) {
    return d;
  }
  else if (d is num) {
    return d.round();
  }
  else {
    try {
      return int.parse(d.toString());
    } on Exception {
      return defaultValue;
    }
  }
}
