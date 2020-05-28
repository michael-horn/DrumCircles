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
class DrumKit extends Instrument {


  /// mapping from computer keys to drum pads
  String key_map = "brsqhoytgfcz";

  /// list of drums in the drumkit
  List<Drum> drums = new List<Drum>();

  String selector;


  DrumKit(this.selector, Map patch) : super("drumkit") {
    if (patch['nodes'] is List) {
      for (Map node in patch['nodes']) {
        if (node['type'] == 'sample' && node['samples'] is List) {
          for (Map sample in node['samples']) {
            if (sample['step'] is int) {
              int midi = sample['step'];
              String name = "${sample['name']}";
              Drum pad = new Drum(name, midi, selector);
              drums.add(pad);
            }
          }
        }
      }
    }
  }


/**
 * Save / load instrument state
 */
  Map saveState() { return new Map(); }
  void loadState(Map saved) { }


/**
 * Show note being played
 */
  void noteOn(num note, [ int velocity = 90 ]) {
    Drum drum = _noteToDrum(note.round());
    if (drum != null && !drum.isPressed()) drum.press();
  }

  void noteOff(num note) {
    Drum drum = _noteToDrum(note.round());
    if (drum != null) drum.release();
  }

  void allNotesOff() {
    for (Drum drum in drums) drum.release();
  }

  bool isNoteOn(num note) {
    Drum drum = _noteToDrum(note.round());
    return (drum != null && drum.isPressed());
  }


/**
 * Process a computer key down event ... possibly play a note
 */
  void _onKeyDown(KeyboardEvent e) {
    if (!e.repeat && isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index < drums.length) {
        Drum drum = drums[index];
        _addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_KEYBD, drum.midi, 90));
        drum.press();
      }
    }
  }


/**
 * Process a computer key up event ... possibly release a note
 */
  void _onKeyUp(KeyboardEvent e) {
    if (isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index < drums.length) {
        Drum drum = drums[index];
        _addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_KEYBD, drum.midi));
        drum.release();
      }
    }
  }


  Drum _noteToDrum(int midi) {
    for (Drum drum in drums) {
      if (drum.midi == midi) return drum;
    }
    return null;
  }


  void _render() {

    bool _down = false;
    for (Drum drum in drums) {
      int midi = drum.midi;
      String selector = "#${drum.name}";

      root.querySelectorAll(selector).onMouseDown.listen((MouseEvent e) {
        _addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
        _down = true;
        drum.press();
      });
      root.querySelectorAll(selector).onMouseUp.listen((MouseEvent e) {
        _addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
        _down = false;
        drum.release();
      });
      root.querySelectorAll(selector).onMouseEnter.listen((MouseEvent e) {
        if (e.buttons > 0 && !drum.isPressed()) {
          _addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
          drum.press();
        }
        _showHint(drum);
      });
      root.querySelectorAll(selector).onMouseLeave.listen((MouseEvent e) {
        if (_down) {
          _addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
          drum.release();
        }
        _hideHint();
      });
    }
  }

  void _resize() { }


  void _showHint(Drum drum) {
    DivElement div = root.querySelector(".drum-hint");
    if (div != null) {
      div.innerHtml = "${drum.name.toUpperCase()} (note ${drum.midi})";
      div.classes.add('show');
    }
  }

  void _hideHint() {
    root.querySelectorAll(".drum-hint").classes.remove('show');
  }
}


class Drum {

  String selector;
  String name;
  int midi;
  bool pressed = false;

  Drum(this.name, this.midi, this.selector);

  void press() {
    js.context.callMethod("animateDrum", [ selector, name ]);
    pressed = true;
  }

  void release() {
    pressed = false;
  }

  bool isPressed() {
    return pressed;
  }
}
