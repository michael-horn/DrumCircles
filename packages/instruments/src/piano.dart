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
 * Piano keyboard instrument
 * TODO: Pitch bend (keyboard and midi)
 */
class Piano extends Instrument {

  List<PianoKey> keys = new List<PianoKey>();

  /// how far did we slide the keyboard over?  each octave slides over 12 keys
  int offset = 0;

  /// mini piano that shows where we are left-to-right
  MiniPiano mini;

  /// mapping from computer keys to piano keys
  String key_map = "awsedftgyhujkolp;']";

  /// group that contains all the keys
  svg.GElement allKeys = new svg.GElement();


  Piano() : super("piano") {  }


/**
 * Save instrument state
 */
  Map saveState() { return { "offset" : offset }; }


/**
 * Load instrument state
 */
  void loadState(Map saved) {
    if (saved['offset'] is int) {
      this.offset = saved['offset'];
      _slideKeyboard(0);
    }
  }


/**
 * Show note being played
 */
  void noteOn(num note, [ int velocity = 90 ]) {
    PianoKey key = _noteToKey(note.round());
    if (key != null) key.press();
  }


/**
 * Hide note being played
 */
  void noteOff(num note) {
    PianoKey key = _noteToKey(note.round());
    if (key != null) key.release();
  }
  void allNotesOff() {
    for (PianoKey key in keys) key.release();
  }


/**
 * Is note currently pressed?
 */
  bool isNoteOn(num note) {
    PianoKey key = _noteToKey(note.round());
    return (key != null && key.isPressed());
  }


/**
 * Process a computer key down event ... possibly play a note
 */
  void _onKeyDown(KeyboardEvent e) {
    if (!e.repeat && isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index + offset < keys.length) {
        PianoKey key = keys[index + offset];
        _addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_KEYBD, key.midi, 90));
        key.press();
      }
      else if (e.keyCode == 37) {
        _slideKeyboard(-12);
      }
      else if (e.keyCode == 39) {
        _slideKeyboard(12);
      }
      else if (e.keyCode == 187) {
        print('pitch up');
      }
      else if (e.keyCode == 189) {
        print('pitch down');
      }
    }
  }


/**
 * Process a computer key up event ... possibly release a note
 */
  void _onKeyUp(KeyboardEvent e) {
    if (isKeyboardArmed) {
      int index = key_map.indexOf(e.key.toLowerCase());
      if (index >= 0 && index + offset < keys.length) {
        PianoKey key = keys[index + offset];
        _addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_KEYBD, key.midi));
        key.release();
      }
    }
  }


/**
 * Convert a midi note to piano key number
 */
  PianoKey _noteToKey(int midi) {
    int index = (midi - 12);
    return (index < 0 || index >= keys.length) ? null : keys[index];
  }


  void _render() {
    svg.RectElement backdrop = new svg.RectElement()
      .. attributes = {
        "class" : "backdrop",
        "width" : "100%",
        "height" : "100%"
      };
    parent.append(backdrop);

    allKeys.classes.add("animated-slide");
    svg.GElement whiteKeys = new svg.GElement();
    svg.GElement blackKeys = new svg.GElement();

    // generate piano keys
    for (int i=0; i<96; i++) {
      PianoKey key = new PianoKey(i, this);
      keys.add(key);
      if (key.black) {
        blackKeys.append(key.el);
      } else {
        whiteKeys.append(key.el);
      }
    }
    allKeys.append(whiteKeys);
    allKeys.append(blackKeys);
    parent.append(allKeys);
    svg.RectElement felt = new svg.RectElement()
      .. attributes = {
        "class" : "felt",
        "width" : "100%",
        "height" : "2",
        "x" : "0", "y" : "0"
      };
    parent.append(felt);

    svg.RectElement shelf = new svg.RectElement()
      .. attributes = {
        "width" : "100%", "height" : "8", "x" : "0", "y" : "0",
        "fill" : "black", "fill-opacity" : "0.05", "filter" : "url(#drop-shadow)"
      };
    parent.append(shelf);

    // set up minified piano
    mini = new MiniPiano(this);
    mini.render();

    _slideKeyboard(36);

    // up octave
    root.querySelectorAll("#up-octave").onClick.listen((e) {
      _slideKeyboard(12);
    });

    // down octave
    root.querySelectorAll("#down-octave").onClick.listen((e) {
      _slideKeyboard(-12);
    });

    mini.hide();
    parent.append(mini.el);
  }


  void _slideKeyboard(int delta) {
    keys.forEach((PianoKey key) => key.autoRelease());
    offset += delta;
    offset = offset.clamp(0, keys.length - 24);
    num dx = keys[offset].x;
    _updateKeymap();
    allKeys.style.transform = "translateX(${-dx}px)";
    mini.show();
    mini.slide(dx);
  }


  void _updateKeymap() {
    for (int i=0; i<keys.length; i++) {
      keys[i].clearKeymap();
      int midi = keys[i].midi - (offset + 12);
      if (midi >= 0 && midi < key_map.length) {
        keys[i].setKeymap(key_map[midi]);
      }
    }
  }
}


/**
 * Non-interactive minified keyboard icon that shows where you are left-to-right
 */
class MiniPiano {

  /// link up to the main Piano instrument that we're mirroring in miniature
  Piano piano;

  /// size of the mini piano
  num get width => (piano.keys.last.x + PianoKey.width);
  num get height => piano.height;

  /// <svg> group element that contains the mini piano
  svg.GElement el = new svg.GElement();
  svg.GElement bkeys = new svg.GElement();
  svg.GElement wkeys = new svg.GElement();

  /// highlight rectangle
  svg.RectElement highlight = new svg.RectElement();

  MiniPiano(this.piano);


  void show() {
    highlight.attributes['width'] = "${piano.width}";
    el.classes.add("show");
  }


  void hide() {
    el.classes.remove("show");
  }


  void slide(num dx) {
    dx = max(0, dx);
    highlight.style.transform = "translateX(${dx}px)";
    if (_timer != null) _timer.cancel();
    _timer = new Timer(const Duration(seconds : 2), () {
      hide();
      _timer = null;
    });
  }
  Timer _timer = null;


  void render() {
    el.classes.add("mini-piano");
    el.attributes['transform'] = "translate(0, 8) scale(0.2)";
    svg.RectElement backdrop = new svg.RectElement() .. attributes = {
      "x" : "${PianoKey.width * 5}", "fill" : "black", "width" : "${width - 200}", "height" : "$height"
    };
    el.append(backdrop);
    for (PianoKey key in piano.keys) {
      num pad = key.black ? 6 : 1;
      String fill = key.black ? "black" : "white";
      if (key.key > 8) {
        svg.RectElement r = new svg.RectElement() .. attributes = {
          "fill" : "$fill",
          "x" : "${key.x + pad}", "y" : "2",
          "width" : "${PianoKey.width - pad * 2}",
          "height" : "${key.height}"
        };
        key.black ? bkeys.append(r) : wkeys.append(r);
      }
    }
    el.append(wkeys);
    el.append(bkeys);
    highlight.attributes = {
      "fill" : "#900", "fill-opacity" : "0.35",
      "stroke" : "#900",
      "width" : "${piano.width}", "height" : "$height",
      "x" : "0", "y" : "0"
    };
    highlight.classes.add("animated-slide");
    el.append(highlight);
  }
}


/**
 * Represents a black or white key on the piano keyboard
 */
class PianoKey {

  /// musical notes (in half steps) in the 12-note chromatic scale
  static final NOTES = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];

  /// piano key number (0 is the first key, 1 is the second key, etc.)
  int key = 48;

  /// link back to the piano to generate events
  Piano piano;

  /// midi note number
  int get midi => key + 12;

  /// half step value (0 - 12)
  int get step => midi % 12;

  /// note octave
  int get octave => (key ~/ 12);

  /// note name
  String get name => "${NOTES[ step ]}";

  /// index x-coordinate on the keyboard
  num get offset => octave * 7 + _key_offsets[step];

  /// pixel width of key
  static num get width => 35;

  /// pixel x-coordinate on the keyboard
  num get x => offset * width;

  /// is this a black key or white key?
  bool get black => [ 1, 3, 6, 8, 10 ].contains(step);

  /// is this a white key
  bool get white => !black;

  /// height of key
  num get height => black ? 92 : 148;

  /// key map hint
  svg.TextElement keyHint = new svg.TextElement();

  /// key offset arrangement starting with C
  /// this helps us render black keys at off-center positions
  final _key_offsets = [ 0, 0.45, 1, 1.55, 2, 3, 3.4, 4, 4.5, 5, 5.6, 6 ];

  /// visual element for SVG
  svg.GElement el = new svg.GElement();

  /// main key rectangle
  svg.RectElement rect = new svg.RectElement();

  /// is the key currently pressed?
  bool _down = false;


  PianoKey(this.key, this.piano) {
    this.el = new svg.GElement() .. attributes = { "transform" : "translate($x, 0)" };

    num pad = black ? 6 : 1.5;
    num x0 = pad;
    num w = width - (pad * 2);
    num h = height;

    rect. attributes = {
        "class" : black? "piano-key black" : "piano-key white",
        "x" : "$x0", "y" : "-3", "width" : "$w", "height" : "$h"
      };
    el.append(rect);
    if (black) {
      x0 += 2;
      w -= 4;
      svg.RectElement r = new svg.RectElement()
        .. attributes = {
          "x" : "$x0", "y" : "2", "width" : "$w", "height" : "${h - 15}",
          "fill" : "#334", "pointer-events" : "none"
        };
      el.append(r);
    }
    else {
      svg.TextElement noteHint = new svg.TextElement()
        .. attributes = {
          "class" : "note-hint", "x" : "${x0 + w/2}", "y" : "${h - 8}"
        };
      noteHint.innerHtml = "${name}${octave}";
      if (step == 0) { noteHint.classes.add('always-show'); }
      el.append(noteHint);

      svg.TextElement midiHint = new svg.TextElement()
        .. attributes = {
          "class" : "midi-hint show", "x" : "${x0 + w/2}", "y" : "${h - 24}"
        };
      midiHint.innerHtml = "$midi";
      el.append(midiHint);
    }
    keyHint.attributes = { "class" : "key-hint", "x" : "${x0 + w/2}", "y" : "${h - 42}" };
    if (black) keyHint.classes.add('black');
    el.append(keyHint);


    // set up mouse events
    el.onMouseDown.listen((e) {
      piano._addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
      press();
    });
    el.onMouseUp.listen((e) {
      piano._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
      release();
    });
    el.onMouseLeave.listen((e) {
      if (_down) {
        piano._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_MOUSE, midi));
        release();
      }
    });
    el.onMouseEnter.listen((e) {
      if (e.buttons > 0) {
        piano._addNoteEvent(new NoteEvent.on(NoteEvent.INPUT_MOUSE, midi, 90));
        press();
      }
    });
  }


  void press() {
    _down = true;
    rect.classes.add("pressed");
  }


  void release() {
    if (_down) {
      _down = false;
      rect.classes.remove("pressed");
    }
  }


  bool isPressed() {
    return rect.classes.contains("pressed");
  }


  void autoRelease() {
    if (_down) {
      piano._addNoteEvent(new NoteEvent.off(NoteEvent.INPUT_SYSTEM, midi));
      _down = false;
      rect.classes.remove("pressed");
    }
  }


  void setKeymap(String k) {
    keyHint.innerHtml = k;
  }


  void clearKeymap() {
    keyHint.innerHtml = "";
  }
}
