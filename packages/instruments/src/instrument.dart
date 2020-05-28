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
 * An instrument is a virtual musical instrument that can be played with keyboard, mouse,
 * touchscreen, or attached midi device. Instruments use shadow dom to encapsulate
 * stylesheets and element names. Interaction with an instrument generates custom events
 * that can be subscribed to.
 */
abstract class Instrument {

  /// name of the instrument
  String name = "piano";

  /// listeners can subscribe to this stream to receive notes from the instrument
  StreamController<NoteEvent> _stream = new StreamController<NoteEvent>();
  Stream<NoteEvent> get onNoteEvent => _stream.stream;

  /// all of the HTML elements for the instrument are contained within a shadow DOM
  ShadowRoot root;

  /// <svg> tag that contains the instrument
  svg.SvgSvgElement container;

  /// group that contains all of the visual elements
  svg.GElement parent = new svg.GElement();

  /// size of the containing element
  num width = 700, height = 300;

  /// respond to keyboard events?
  bool _armed = false;
  bool get isKeyboardArmed => _armed;

  /// which midi ports should this instrument listen to?
  /// null list means disarmed. empty list means respond to all midi ports
  List<int> _ports = null;


  Instrument(this.name);


/**
 * Save instrument state
 */
  Map saveState();


/**
 * Load instrument state
 */
  void loadState(Map saved);


/**
 * Show note being played
 */
  void noteOn(num note, [ int velocity = 90 ]);


/**
 * Hide note being played
 */
  void noteOff(num note);


/**
 * Release all notes
 */
  void allNotesOff();


/**
 * Is the note currently pressed?
 */
  bool isNoteOn(num note);


/**
 * Some instruments like the step sequencer are animatable
 */
  void animate(num beats) { }


/**
 * Says that this instrument should respond to keyboard events
 */
  void armKeyboard() {
    _armed = true;
  }


/**
 * Stop responding to keyboard events
 */
  void disarmKeyboard() {
    _armed = false;
  }


/**
 * Says that this instrument should respond to midi events from the given ports.
 * If no ports parameter is provided, listen to all ports.
 */
  void armMidi([ List<int> ports = null ]) {
    _ports = (ports == null) ? [ ] : ports;
  }


/**
 * Stop responding to midi events
 */
  void disarmMidi() {
    _ports = null;
  }


/**
 * Responding to the given midi port?
 */
  bool isMidiArmed([int port = 0]) {
    return (_ports != null && (_ports.isEmpty || _ports.contains(port)));
  }


/**
 * Show note name hints
 */
  void showNoteHints() { root.querySelectorAll(".note-hint").classes.add("show"); }
  void hideNoteHints() { root.querySelectorAll(".note-hint").classes.remove("show"); }
  void toggleNoteHints() { root.querySelectorAll(".note-hint").classes.toggle("show"); }


/**
 * Show midi number hints
 */
  void showMidiHints() { root.querySelectorAll(".midi-hint").classes.add("show"); }
  void hideMidiHints() { root.querySelectorAll(".midi-hint").classes.remove("show"); }
  void toggleMidiHints() { root.querySelectorAll(".midi-hint").classes.toggle("show"); }


/**
 * Show keyboard shortcut hints
 */
  void showKeyboardHints() { root.querySelectorAll(".key-hint").classes.add("show"); }
  void hideKeyboardHints() { root.querySelectorAll(".key-hint").classes.remove("show"); }
  void toggleKeyboardHints() { root.querySelectorAll(".key-hint").classes.toggle("show"); }


/**
 * Instrument has been inserted into the DOM
 */
  bool get isInitialized => root != null;


/**
 * Inject the instrument inside of a containing element
 */
  void insert(HtmlElement element) {

    // load the instrument template
    TemplateElement template = querySelector("#$name-template");
    if (template == null || element == null) return;

    // create shadow DOM and append HTML template
    if (element.shadowRoot == null) {
      root = element.attachShadow({ "mode" : "open" });
    } else {
      root = element.shadowRoot;
    }
    root.append(template.content.clone(true));

    // load the container <svg> element from the shadow dom
    this.container = root.querySelector("svg.container");
    this.container.append(parent);

    // listen for resize events
    window.onResize.listen((e) => _resize());
    _resize();

    // render SVG content
    _render();

    // listen to keyboard events
    element.onKeyDown.listen(_onKeyDown);
    element.onKeyUp.listen(_onKeyUp);

  }

/**
 * Removes this instrument from the DOM leaving the shadow root in place
 */
  void unload() {
    if (root != null) {
      root.children.forEach((child) => child.remove());
    }
  }


/**
 * Render the instrument as svg elements
 */
  void _render();

/**
 * Process a computer key down event ... possibly play a note
 */
  void _onKeyDown(KeyboardEvent e);

/**
 * Process a computer key up event ... possibly release a note
 */
  void _onKeyUp(KeyboardEvent e);

/**
 * Adds a note event to the event stream
 */
  void _addNoteEvent(NoteEvent e) {
    _stream.add(e);
  }

/**
 * Called when the window and possibly containing element are resized.
 */
  void _resize() {
    if (container != null) {
      Rectangle<num> rect = container.getBoundingClientRect();
      if (this.width != rect.width || this.height != rect.height) {
        this.width = rect.width;
        this.height = rect.height;
        container.setAttribute("viewBox", "0 0 $width $height");
      }
    }
  }
}


/**
 * Note event class
 */
class NoteEvent {

  static final String NOTE_ON = "on";
  static final String NOTE_OFF = "off";
  static final String PITCH_BEND = "pitch";

  static final String INPUT_MOUSE = "mouse";
  static final String INPUT_TOUCH = "touch";
  static final String INPUT_KEYBD = "keyboard";
  static final String INPUT_MIDI = "midi";
  static final String INPUT_SYSTEM = "system";


  /// event type (on | off | pitch)
  String message = NOTE_ON;

  /// what input device generated this event? (mouse | keyboard | touch | midi)
  String source = INPUT_MOUSE;

  /// start time of the event (unused in this package)
  num time = -1;

  /// MIDI note value (can be floating point for detuned values)
  num note = -1;

  /// MIDI note value as an integer
  int get midi => note.round();

  /// MIDI note velocity for note on events
  int velocity = 0;

  /// value for pitch bend, channel pressure, etc.
  num value = 0.0;


  NoteEvent(this.message, this.source);

  NoteEvent.on(this.source, this.note, this.velocity) {
    this.message = NOTE_ON;
  }

  NoteEvent.off(this.source, this.note) {
    this.message = NOTE_OFF;
  }

  NoteEvent.pitch(this.source, this.value) {
    this.message = PITCH_BEND;
  }

  String toString() {
    return "$message ($source) [$midi, $velocity, $value]";
  }
}
