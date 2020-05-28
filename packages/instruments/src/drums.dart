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
part of Instruments;


/**
 * Drumpad instrument
 */
class Drums extends Instrument {

  List<DrumPad> pads = new List<DrumPad>();

  /// mapping from computer keys to drum pads
  String key_map = "qwertyasdfgh";


  Drums(Map patch) : super("drums") {
    int index = 0;
    if (patch['nodes'] is List) {
      for (Map node in patch['nodes']) {
        if (node['type'] == 'sample' && node['samples'] is List) {
          for (Map sample in node['samples']) {
            if (sample['step'] is int) {
              int row = index ~/ 6;
              int col = index % 6;
              int midi = sample['step'];
              String name = "${sample['name']}";
              DrumPad pad = new DrumPad(this, row, col, midi, name);
              pads.add(pad);
              parent.append(pad._group);
              index++;
            }
          }
        }
      }
    }
  }


/**
 * Save instrument state
 */
  Map saveState() { return new Map(); }


/**
 * Load instrument state
 */
  void loadState(Map saved) { }


/**
 * Show note being played
 */
  void noteOn(num note, [ int velocity = 90 ]) {
    DrumPad pad = _noteToPad(note.round());
    if (pad != null) pad.press();
  }


/**
 * Hide note being played
 */
  void noteOff(num note) {
    DrumPad pad = _noteToPad(note.round());
    if (pad != null) pad.release();
  }
  void allNotesOff() {
    for (DrumPad pad in pads) pad.release();
  }


/**
 * Is the note currently pressed?
 */
  bool isNoteOn(num note) {
    DrumPad pad = _noteToPad(note.round());
    return (pad != null && pad.isPressed());
  }


/**
 * Process a computer key down event ... possibly play a note
 */
  void _onKeyDown(KeyboardEvent e) {
    if (!e.repeat && isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index < pads.length) {
        DrumPad pad = pads[index];
        _addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_KEYBD, pad.midi, 90));
        pad.press();
      }
    }
  }


/**
 * Process a computer key up event ... possibly release a note
 */
  void _onKeyUp(KeyboardEvent e) {
    if (isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index < pads.length) {
        DrumPad pad = pads[index];
        _addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_KEYBD, pad.midi));
        pad.release();
      }
    }
  }


/**
 * Convert a midi note to drum pad
 */
  DrumPad _noteToPad(int midi) {
    for (DrumPad pad in pads) {
      if (pad.midi == midi) return pad;
    }
    return null;
  }


  void _render() { }


  void _resize() {
    super._resize();
    for (DrumPad pad in pads) { pad.resize(); }
  }
}



/**
 * Represents a drumpad that you can tap or click
 */
class DrumPad {

  /// link back to the drums to generate events
  Drums drums;

  /// position of the drum pad
  int row = 0, col = 0;

  /// midi note number
  int midi = 0;

  /// drum name
  String name = "KICK";

  /// space between pads
  static num get padding => 5;

  /// key hint
  svg.TextElement _keyHint = new svg.TextElement();

  /// midi hint
  svg.TextElement _midiHint = new svg.TextElement();

  /// drum name + midi note
  svg.TextElement _text = new svg.TextElement();

  /// visual element for SVG
  svg.GElement _group = new svg.GElement();

  /// main rectangle
  svg.RectElement _rect = new svg.RectElement();

  /// is the pad currently pressed?
  bool _down = false;


  DrumPad(this.drums, this.row, this.col, this.midi, this.name) {
    _rect.attributes = { "class" : "drum-pad", "x" : "$padding", "y" : "$padding" };
    _group.append(_rect);

    _text.attributes = { "class" : "drum-name" };
    _text.innerHtml = "${name.toUpperCase()}";
    _group.append(_text);

    _keyHint.attributes = { "class" : "key-hint" };
    _keyHint.innerHtml = drums.key_map[row * 6 + col];
    _group.append(_keyHint);

    _midiHint.attributes = { "class" : "midi-hint show" };
    _midiHint.innerHtml = "$midi";
    _group.append(_midiHint);

    resize();

    // set up mouse events
    _group.onMouseDown.listen((e) {
      drums._addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
      press();
    });
    _group.onMouseUp.listen((e) {
      drums._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
      release();
    });
    _group.onMouseLeave.listen((e) {
      if (_down) {
        drums._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
        release();
      }
    });
    _group.onMouseEnter.listen((e) {
      if (e.buttons > 0) {
        drums._addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
        press();
      }
    });
  }


  void resize() {
    num width = max(padding * 4, drums.width/6 + padding/6);
    num height = max(padding * 4, drums.height/2 + padding/6);
    num x = width * col - padding;
    num y = height * row;
    num w = width - padding * 2;
    num h = height - padding * 2;
    _group.attributes["transform"] = "translate($x, $y)";

    _rect.attributes['width'] = "$w";
    _rect.attributes['height'] = "$h";

    _text.attributes['x'] = "${width/2}";
    _text.attributes['y'] = "${height/2}";

    _keyHint.attributes['x'] = "${width - padding - 11}";
    _keyHint.attributes['y'] = "${height - 18}";

    _midiHint.attributes['x'] = "${padding + 11}";
    _midiHint.attributes['y'] = "${height - 18}";
  }


  void press() {
    _down = true;
    _rect.classes.add("pressed");
  }


  void release() {
    if (_down) {
      _down = false;
      _rect.classes.remove("pressed");
    }
  }


  bool isPressed() {
    return _rect.classes.contains("pressed");
  }


  void autoRelease() {
    if (_down) {
      drums._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_SYSTEM, midi));
      _down = false;
      _rect.classes.remove("pressed");
    }
  }
}
