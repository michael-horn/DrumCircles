define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const svg = dart_sdk.svg;
  const _interceptors = dart_sdk._interceptors;
  const html = dart_sdk.html;
  const _js_helper = dart_sdk._js_helper;
  const math = dart_sdk.math;
  const js = dart_sdk.js;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var instruments = Object.create(dart.library);
  var $isEmpty = dartx.isEmpty;
  var $contains = dartx.contains;
  var $querySelectorAll = dartx.querySelectorAll;
  var $shadowRoot = dartx.shadowRoot;
  var $attachShadow = dartx.attachShadow;
  var $clone = dartx.clone;
  var $append = dartx.append;
  var $onResize = dartx.onResize;
  var $onKeyDown = dartx.onKeyDown;
  var $onKeyUp = dartx.onKeyUp;
  var $children = dartx.children;
  var $remove = dartx.remove;
  var $forEach = dartx.forEach;
  var $width = dartx.width;
  var $height = dartx.height;
  var $setAttribute = dartx.setAttribute;
  var $round = dartx.round;
  var $_get = dartx._get;
  var $truncate = dartx.truncate;
  var $modulo = dartx['%'];
  var $add = dartx.add;
  var $toLowerCase = dartx.toLowerCase;
  var $indexOf = dartx.indexOf;
  var $length = dartx.length;
  var $attributes = dartx.attributes;
  var $innerHtml = dartx.innerHtml;
  var $toUpperCase = dartx.toUpperCase;
  var $onMouseDown = dartx.onMouseDown;
  var $onMouseUp = dartx.onMouseUp;
  var $onMouseLeave = dartx.onMouseLeave;
  var $onMouseEnter = dartx.onMouseEnter;
  var $_set = dartx._set;
  var $classes = dartx.classes;
  var $clamp = dartx.clamp;
  var $transform = dartx.transform;
  var $last = dartx.last;
  var StreamControllerOfNoteEventL = () => (StreamControllerOfNoteEventL = dart.constFn(async.StreamController$(instruments.NoteEvent)))();
  var JSArrayOfintL = () => (JSArrayOfintL = dart.constFn(_interceptors.JSArray$(core.int)))();
  var EventLTovoid = () => (EventLTovoid = dart.constFn(dart.fnType(dart.void, [html.Event])))();
  var ElementLTovoid = () => (ElementLTovoid = dart.constFn(dart.fnType(dart.void, [html.Element])))();
  var JSArrayOfDrumPadL = () => (JSArrayOfDrumPadL = dart.constFn(_interceptors.JSArray$(instruments.DrumPad)))();
  var IdentityMapOfStringL$StringL = () => (IdentityMapOfStringL$StringL = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  var MouseEventLToNullN = () => (MouseEventLToNullN = dart.constFn(dart.fnType(core.Null, [html.MouseEvent])))();
  var JSArrayOfPianoKeyL = () => (JSArrayOfPianoKeyL = dart.constFn(_interceptors.JSArray$(instruments.PianoKey)))();
  var PianoKeyLTovoid = () => (PianoKeyLTovoid = dart.constFn(dart.fnType(dart.void, [instruments.PianoKey])))();
  var VoidToNullN = () => (VoidToNullN = dart.constFn(dart.fnType(core.Null, [])))();
  var JSArrayOfnumL = () => (JSArrayOfnumL = dart.constFn(_interceptors.JSArray$(core.num)))();
  var JSArrayOfStringL = () => (JSArrayOfStringL = dart.constFn(_interceptors.JSArray$(core.String)))();
  var JSArrayOfDrumL = () => (JSArrayOfDrumL = dart.constFn(_interceptors.JSArray$(instruments.Drum)))();
  const CT = Object.create(null);
  var L0 = "package:instruments/instruments.dart";
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: core.Duration.prototype,
        [Duration__duration]: 2000000
      });
    }
  }, false);
  var _stream = dart.privateName(instruments, "_stream");
  var _armed = dart.privateName(instruments, "_armed");
  var _ports = dart.privateName(instruments, "_ports");
  var _resize = dart.privateName(instruments, "_resize");
  var _render = dart.privateName(instruments, "_render");
  var _onKeyDown = dart.privateName(instruments, "_onKeyDown");
  var _onKeyUp = dart.privateName(instruments, "_onKeyUp");
  var _addNoteEvent = dart.privateName(instruments, "_addNoteEvent");
  var name$ = dart.privateName(instruments, "Instrument.name");
  var root = dart.privateName(instruments, "Instrument.root");
  var container = dart.privateName(instruments, "Instrument.container");
  var parent = dart.privateName(instruments, "Instrument.parent");
  var width = dart.privateName(instruments, "Instrument.width");
  var height = dart.privateName(instruments, "Instrument.height");
  instruments.Instrument = class Instrument extends core.Object {
    get name() {
      return this[name$];
    }
    set name(value) {
      this[name$] = value;
    }
    get root() {
      return this[root];
    }
    set root(value) {
      this[root] = value;
    }
    get container() {
      return this[container];
    }
    set container(value) {
      this[container] = value;
    }
    get parent() {
      return this[parent];
    }
    set parent(value) {
      this[parent] = value;
    }
    get width() {
      return this[width];
    }
    set width(value) {
      this[width] = value;
    }
    get height() {
      return this[height];
    }
    set height(value) {
      this[height] = value;
    }
    get onNoteEvent() {
      return this[_stream].stream;
    }
    get isKeyboardArmed() {
      return this[_armed];
    }
    animate(beats) {
    }
    armKeyboard() {
      this[_armed] = true;
    }
    disarmKeyboard() {
      this[_armed] = false;
    }
    armMidi(ports = null) {
      this[_ports] = ports == null ? JSArrayOfintL().of([]) : ports;
    }
    disarmMidi() {
      this[_ports] = null;
    }
    isMidiArmed(port = 0) {
      return this[_ports] != null && (dart.test(this[_ports][$isEmpty]) || dart.test(this[_ports][$contains](port)));
    }
    showNoteHints() {
      this.root[$querySelectorAll](html.Element, ".note-hint").classes.add("show");
    }
    hideNoteHints() {
      this.root[$querySelectorAll](html.Element, ".note-hint").classes.remove("show");
    }
    toggleNoteHints() {
      this.root[$querySelectorAll](html.Element, ".note-hint").classes.toggle("show");
    }
    showMidiHints() {
      this.root[$querySelectorAll](html.Element, ".midi-hint").classes.add("show");
    }
    hideMidiHints() {
      this.root[$querySelectorAll](html.Element, ".midi-hint").classes.remove("show");
    }
    toggleMidiHints() {
      this.root[$querySelectorAll](html.Element, ".midi-hint").classes.toggle("show");
    }
    showKeyboardHints() {
      this.root[$querySelectorAll](html.Element, ".key-hint").classes.add("show");
    }
    hideKeyboardHints() {
      this.root[$querySelectorAll](html.Element, ".key-hint").classes.remove("show");
    }
    toggleKeyboardHints() {
      this.root[$querySelectorAll](html.Element, ".key-hint").classes.toggle("show");
    }
    get isInitialized() {
      return this.root != null;
    }
    insert(element) {
      let template = html.TemplateElement.as(html.querySelector("#" + dart.str(this.name) + "-template"));
      if (template == null || element == null) return;
      if (element[$shadowRoot] == null) {
        this.root = element[$attachShadow](new _js_helper.LinkedMap.from(["mode", "open"]));
      } else {
        this.root = element[$shadowRoot];
      }
      this.root[$append](template.content[$clone](true));
      this.container = svg.SvgSvgElement.as(this.root.querySelector("svg.container"));
      this.container[$append](this.parent);
      html.window[$onResize].listen(dart.fn(e => this[_resize](), EventLTovoid()));
      this[_resize]();
      this[_render]();
      element[$onKeyDown].listen(dart.bind(this, _onKeyDown));
      element[$onKeyUp].listen(dart.bind(this, _onKeyUp));
    }
    unload() {
      if (this.root != null) {
        this.root[$children][$forEach](dart.fn(child => child[$remove](), ElementLTovoid()));
      }
    }
    [_addNoteEvent](e) {
      this[_stream].add(e);
    }
    [_resize]() {
      if (this.container != null) {
        let rect = this.container.getBoundingClientRect();
        if (this.width != rect[$width] || this.height != rect[$height]) {
          this.width = rect[$width];
          this.height = rect[$height];
          this.container[$setAttribute]("viewBox", "0 0 " + dart.str(this.width) + " " + dart.str(this.height));
        }
      }
    }
  };
  (instruments.Instrument.new = function(name) {
    this[name$] = "piano";
    this[_stream] = StreamControllerOfNoteEventL().new();
    this[root] = null;
    this[container] = null;
    this[parent] = svg.GElement.new();
    this[width] = 700;
    this[height] = 300;
    this[_armed] = false;
    this[_ports] = null;
    this[name$] = name;
    ;
  }).prototype = instruments.Instrument.prototype;
  dart.addTypeTests(instruments.Instrument);
  dart.addTypeCaches(instruments.Instrument);
  dart.setMethodSignature(instruments.Instrument, () => ({
    __proto__: dart.getMethods(instruments.Instrument.__proto__),
    animate: dart.fnType(dart.void, [core.num]),
    armKeyboard: dart.fnType(dart.void, []),
    disarmKeyboard: dart.fnType(dart.void, []),
    armMidi: dart.fnType(dart.void, [], [core.List$(core.int)]),
    disarmMidi: dart.fnType(dart.void, []),
    isMidiArmed: dart.fnType(core.bool, [], [core.int]),
    showNoteHints: dart.fnType(dart.void, []),
    hideNoteHints: dart.fnType(dart.void, []),
    toggleNoteHints: dart.fnType(dart.void, []),
    showMidiHints: dart.fnType(dart.void, []),
    hideMidiHints: dart.fnType(dart.void, []),
    toggleMidiHints: dart.fnType(dart.void, []),
    showKeyboardHints: dart.fnType(dart.void, []),
    hideKeyboardHints: dart.fnType(dart.void, []),
    toggleKeyboardHints: dart.fnType(dart.void, []),
    insert: dart.fnType(dart.void, [html.HtmlElement]),
    unload: dart.fnType(dart.void, []),
    [_addNoteEvent]: dart.fnType(dart.void, [instruments.NoteEvent]),
    [_resize]: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(instruments.Instrument, () => ({
    __proto__: dart.getGetters(instruments.Instrument.__proto__),
    onNoteEvent: async.Stream$(instruments.NoteEvent),
    isKeyboardArmed: core.bool,
    isInitialized: core.bool
  }));
  dart.setLibraryUri(instruments.Instrument, L0);
  dart.setFieldSignature(instruments.Instrument, () => ({
    __proto__: dart.getFields(instruments.Instrument.__proto__),
    name: dart.fieldType(core.String),
    [_stream]: dart.fieldType(async.StreamController$(instruments.NoteEvent)),
    root: dart.fieldType(html.ShadowRoot),
    container: dart.fieldType(svg.SvgSvgElement),
    parent: dart.fieldType(svg.GElement),
    width: dart.fieldType(core.num),
    height: dart.fieldType(core.num),
    [_armed]: dart.fieldType(core.bool),
    [_ports]: dart.fieldType(core.List$(core.int))
  }));
  var message$ = dart.privateName(instruments, "NoteEvent.message");
  var source$ = dart.privateName(instruments, "NoteEvent.source");
  var time = dart.privateName(instruments, "NoteEvent.time");
  var note$ = dart.privateName(instruments, "NoteEvent.note");
  var velocity$ = dart.privateName(instruments, "NoteEvent.velocity");
  var value$ = dart.privateName(instruments, "NoteEvent.value");
  instruments.NoteEvent = class NoteEvent extends core.Object {
    get message() {
      return this[message$];
    }
    set message(value) {
      this[message$] = value;
    }
    get source() {
      return this[source$];
    }
    set source(value) {
      this[source$] = value;
    }
    get time() {
      return this[time];
    }
    set time(value) {
      this[time] = value;
    }
    get note() {
      return this[note$];
    }
    set note(value) {
      this[note$] = value;
    }
    get velocity() {
      return this[velocity$];
    }
    set velocity(value) {
      this[velocity$] = value;
    }
    get value() {
      return this[value$];
    }
    set value(value) {
      this[value$] = value;
    }
    get midi() {
      return this.note[$round]();
    }
    toString() {
      return dart.str(this.message) + " (" + dart.str(this.source) + ") [" + dart.str(this.midi) + ", " + dart.str(this.velocity) + ", " + dart.str(this.value) + "]";
    }
  };
  (instruments.NoteEvent.new = function(message, source) {
    this[message$] = instruments.NoteEvent.NOTE_ON;
    this[source$] = instruments.NoteEvent.INPUT_MOUSE;
    this[time] = -1;
    this[note$] = -1;
    this[velocity$] = 0;
    this[value$] = 0.0;
    this[message$] = message;
    this[source$] = source;
    ;
  }).prototype = instruments.NoteEvent.prototype;
  (instruments.NoteEvent.on = function(source, note, velocity) {
    this[message$] = instruments.NoteEvent.NOTE_ON;
    this[source$] = instruments.NoteEvent.INPUT_MOUSE;
    this[time] = -1;
    this[note$] = -1;
    this[velocity$] = 0;
    this[value$] = 0.0;
    this[source$] = source;
    this[note$] = note;
    this[velocity$] = velocity;
    this.message = instruments.NoteEvent.NOTE_ON;
  }).prototype = instruments.NoteEvent.prototype;
  (instruments.NoteEvent.off = function(source, note) {
    this[message$] = instruments.NoteEvent.NOTE_ON;
    this[source$] = instruments.NoteEvent.INPUT_MOUSE;
    this[time] = -1;
    this[note$] = -1;
    this[velocity$] = 0;
    this[value$] = 0.0;
    this[source$] = source;
    this[note$] = note;
    this.message = instruments.NoteEvent.NOTE_OFF;
  }).prototype = instruments.NoteEvent.prototype;
  (instruments.NoteEvent.pitch = function(source, value) {
    this[message$] = instruments.NoteEvent.NOTE_ON;
    this[source$] = instruments.NoteEvent.INPUT_MOUSE;
    this[time] = -1;
    this[note$] = -1;
    this[velocity$] = 0;
    this[value$] = 0.0;
    this[source$] = source;
    this[value$] = value;
    this.message = instruments.NoteEvent.PITCH_BEND;
  }).prototype = instruments.NoteEvent.prototype;
  dart.addTypeTests(instruments.NoteEvent);
  dart.addTypeCaches(instruments.NoteEvent);
  dart.setGetterSignature(instruments.NoteEvent, () => ({
    __proto__: dart.getGetters(instruments.NoteEvent.__proto__),
    midi: core.int
  }));
  dart.setLibraryUri(instruments.NoteEvent, L0);
  dart.setFieldSignature(instruments.NoteEvent, () => ({
    __proto__: dart.getFields(instruments.NoteEvent.__proto__),
    message: dart.fieldType(core.String),
    source: dart.fieldType(core.String),
    time: dart.fieldType(core.num),
    note: dart.fieldType(core.num),
    velocity: dart.fieldType(core.int),
    value: dart.fieldType(core.num)
  }));
  dart.defineExtensionMethods(instruments.NoteEvent, ['toString']);
  dart.defineLazy(instruments.NoteEvent, {
    /*instruments.NoteEvent.NOTE_ON*/get NOTE_ON() {
      return "on";
    },
    /*instruments.NoteEvent.NOTE_OFF*/get NOTE_OFF() {
      return "off";
    },
    /*instruments.NoteEvent.PITCH_BEND*/get PITCH_BEND() {
      return "pitch";
    },
    /*instruments.NoteEvent.INPUT_MOUSE*/get INPUT_MOUSE() {
      return "mouse";
    },
    /*instruments.NoteEvent.INPUT_TOUCH*/get INPUT_TOUCH() {
      return "touch";
    },
    /*instruments.NoteEvent.INPUT_KEYBD*/get INPUT_KEYBD() {
      return "keyboard";
    },
    /*instruments.NoteEvent.INPUT_MIDI*/get INPUT_MIDI() {
      return "midi";
    },
    /*instruments.NoteEvent.INPUT_SYSTEM*/get INPUT_SYSTEM() {
      return "system";
    }
  }, true);
  var _group = dart.privateName(instruments, "_group");
  var _noteToPad = dart.privateName(instruments, "_noteToPad");
  var pads = dart.privateName(instruments, "Drums.pads");
  var key_map = dart.privateName(instruments, "Drums.key_map");
  instruments.Drums = class Drums extends instruments.Instrument {
    get pads() {
      return this[pads];
    }
    set pads(value) {
      this[pads] = value;
    }
    get key_map() {
      return this[key_map];
    }
    set key_map(value) {
      this[key_map] = value;
    }
    saveState() {
      return new _js_helper.LinkedMap.new();
    }
    loadState(saved) {
    }
    noteOn(note, velocity = 90) {
      let pad = this[_noteToPad](note[$round]());
      if (pad != null) pad.press();
    }
    noteOff(note) {
      let pad = this[_noteToPad](note[$round]());
      if (pad != null) pad.release();
    }
    allNotesOff() {
      for (let pad of this.pads)
        pad.release();
    }
    isNoteOn(note) {
      let pad = this[_noteToPad](note[$round]());
      return pad != null && dart.test(pad.isPressed());
    }
    [_onKeyDown](e) {
      if (!dart.test(e.repeat) && dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index < dart.notNull(this.pads[$length])) {
          let pad = this.pads[$_get](index);
          this[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_KEYBD, pad.midi, 90));
          pad.press();
        }
      }
    }
    [_onKeyUp](e) {
      if (dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index < dart.notNull(this.pads[$length])) {
          let pad = this.pads[$_get](index);
          this[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_KEYBD, pad.midi));
          pad.release();
        }
      }
    }
    [_noteToPad](midi) {
      for (let pad of this.pads) {
        if (pad.midi == midi) return pad;
      }
      return null;
    }
    [_render]() {
    }
    [_resize]() {
      super[_resize]();
      for (let pad of this.pads) {
        pad.resize();
      }
    }
  };
  (instruments.Drums.new = function(patch) {
    this[pads] = JSArrayOfDrumPadL().of([]);
    this[key_map] = "qwertyasdfgh";
    instruments.Drums.__proto__.new.call(this, "drums");
    let index = 0;
    if (core.List.is(patch[$_get]("nodes"))) {
      for (let t0 of core.Iterable.as(patch[$_get]("nodes"))) {
        let node = core.Map.as(t0);
        if (dart.equals(node[$_get]("type"), "sample") && core.List.is(node[$_get]("samples"))) {
          for (let t1 of core.Iterable.as(node[$_get]("samples"))) {
            let sample = core.Map.as(t1);
            if (core.int.is(sample[$_get]("step"))) {
              let row = (index / 6)[$truncate]();
              let col = index[$modulo](6);
              let midi = core.int.as(sample[$_get]("step"));
              let name = dart.str(sample[$_get]("name"));
              let pad = new instruments.DrumPad.new(this, row, col, midi, name);
              this.pads[$add](pad);
              this.parent[$append](pad[_group]);
              index = index + 1;
            }
          }
        }
      }
    }
  }).prototype = instruments.Drums.prototype;
  dart.addTypeTests(instruments.Drums);
  dart.addTypeCaches(instruments.Drums);
  dart.setMethodSignature(instruments.Drums, () => ({
    __proto__: dart.getMethods(instruments.Drums.__proto__),
    saveState: dart.fnType(core.Map, []),
    loadState: dart.fnType(dart.void, [core.Map]),
    noteOn: dart.fnType(dart.void, [core.num], [core.int]),
    noteOff: dart.fnType(dart.void, [core.num]),
    allNotesOff: dart.fnType(dart.void, []),
    isNoteOn: dart.fnType(core.bool, [core.num]),
    [_onKeyDown]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_onKeyUp]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_noteToPad]: dart.fnType(instruments.DrumPad, [core.int]),
    [_render]: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(instruments.Drums, L0);
  dart.setFieldSignature(instruments.Drums, () => ({
    __proto__: dart.getFields(instruments.Drums.__proto__),
    pads: dart.fieldType(core.List$(instruments.DrumPad)),
    key_map: dart.fieldType(core.String)
  }));
  var _keyHint = dart.privateName(instruments, "_keyHint");
  var _midiHint = dart.privateName(instruments, "_midiHint");
  var _text = dart.privateName(instruments, "_text");
  var _rect = dart.privateName(instruments, "_rect");
  var _down = dart.privateName(instruments, "_down");
  var drums$ = dart.privateName(instruments, "DrumPad.drums");
  var row$ = dart.privateName(instruments, "DrumPad.row");
  var col$ = dart.privateName(instruments, "DrumPad.col");
  var midi$ = dart.privateName(instruments, "DrumPad.midi");
  var name$0 = dart.privateName(instruments, "DrumPad.name");
  instruments.DrumPad = class DrumPad extends core.Object {
    get drums() {
      return this[drums$];
    }
    set drums(value) {
      this[drums$] = value;
    }
    get row() {
      return this[row$];
    }
    set row(value) {
      this[row$] = value;
    }
    get col() {
      return this[col$];
    }
    set col(value) {
      this[col$] = value;
    }
    get midi() {
      return this[midi$];
    }
    set midi(value) {
      this[midi$] = value;
    }
    get name() {
      return this[name$0];
    }
    set name(value) {
      this[name$0] = value;
    }
    static get padding() {
      return 5;
    }
    resize() {
      let width = math.max(core.num, dart.notNull(instruments.DrumPad.padding) * 4, dart.notNull(this.drums.width) / 6 + dart.notNull(instruments.DrumPad.padding) / 6);
      let height = math.max(core.num, dart.notNull(instruments.DrumPad.padding) * 4, dart.notNull(this.drums.height) / 2 + dart.notNull(instruments.DrumPad.padding) / 6);
      let x = width * dart.notNull(this.col) - dart.notNull(instruments.DrumPad.padding);
      let y = height * dart.notNull(this.row);
      let w = width - dart.notNull(instruments.DrumPad.padding) * 2;
      let h = height - dart.notNull(instruments.DrumPad.padding) * 2;
      this[_group][$attributes][$_set]("transform", "translate(" + dart.str(x) + ", " + dart.str(y) + ")");
      this[_rect][$attributes][$_set]("width", dart.str(w));
      this[_rect][$attributes][$_set]("height", dart.str(h));
      this[_text][$attributes][$_set]("x", dart.str(width / 2));
      this[_text][$attributes][$_set]("y", dart.str(height / 2));
      this[_keyHint][$attributes][$_set]("x", dart.str(width - dart.notNull(instruments.DrumPad.padding) - 11));
      this[_keyHint][$attributes][$_set]("y", dart.str(height - 18));
      this[_midiHint][$attributes][$_set]("x", dart.str(dart.notNull(instruments.DrumPad.padding) + 11));
      this[_midiHint][$attributes][$_set]("y", dart.str(height - 18));
    }
    press() {
      this[_down] = true;
      this[_rect][$classes].add("pressed");
    }
    release() {
      if (dart.test(this[_down])) {
        this[_down] = false;
        this[_rect][$classes].remove("pressed");
      }
    }
    isPressed() {
      return this[_rect][$classes].contains("pressed");
    }
    autoRelease() {
      if (dart.test(this[_down])) {
        this.drums[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_SYSTEM, this.midi));
        this[_down] = false;
        this[_rect][$classes].remove("pressed");
      }
    }
  };
  (instruments.DrumPad.new = function(drums, row, col, midi, name) {
    this[row$] = 0;
    this[col$] = 0;
    this[midi$] = 0;
    this[name$0] = "KICK";
    this[_keyHint] = svg.TextElement.new();
    this[_midiHint] = svg.TextElement.new();
    this[_text] = svg.TextElement.new();
    this[_group] = svg.GElement.new();
    this[_rect] = svg.RectElement.new();
    this[_down] = false;
    this[drums$] = drums;
    this[row$] = row;
    this[col$] = col;
    this[midi$] = midi;
    this[name$0] = name;
    this[_rect][$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "drum-pad", "x", dart.str(instruments.DrumPad.padding), "y", dart.str(instruments.DrumPad.padding)]);
    this[_group][$append](this[_rect]);
    this[_text][$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "drum-name"]);
    this[_text][$innerHtml] = this.name[$toUpperCase]();
    this[_group][$append](this[_text]);
    this[_keyHint][$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "key-hint"]);
    this[_keyHint][$innerHtml] = this.drums.key_map[$_get](dart.notNull(this.row) * 6 + dart.notNull(this.col));
    this[_group][$append](this[_keyHint]);
    this[_midiHint][$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "midi-hint show"]);
    this[_midiHint][$innerHtml] = dart.str(this.midi);
    this[_group][$append](this[_midiHint]);
    this.resize();
    this[_group][$onMouseDown].listen(dart.fn(e => {
      this.drums[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, this.midi, 90));
      this.press();
    }, MouseEventLToNullN()));
    this[_group][$onMouseUp].listen(dart.fn(e => {
      this.drums[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, this.midi));
      this.release();
    }, MouseEventLToNullN()));
    this[_group][$onMouseLeave].listen(dart.fn(e => {
      if (dart.test(this[_down])) {
        this.drums[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, this.midi));
        this.release();
      }
    }, MouseEventLToNullN()));
    this[_group][$onMouseEnter].listen(dart.fn(e => {
      if (dart.notNull(e.buttons) > 0) {
        this.drums[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, this.midi, 90));
        this.press();
      }
    }, MouseEventLToNullN()));
  }).prototype = instruments.DrumPad.prototype;
  dart.addTypeTests(instruments.DrumPad);
  dart.addTypeCaches(instruments.DrumPad);
  dart.setMethodSignature(instruments.DrumPad, () => ({
    __proto__: dart.getMethods(instruments.DrumPad.__proto__),
    resize: dart.fnType(dart.void, []),
    press: dart.fnType(dart.void, []),
    release: dart.fnType(dart.void, []),
    isPressed: dart.fnType(core.bool, []),
    autoRelease: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(instruments.DrumPad, L0);
  dart.setFieldSignature(instruments.DrumPad, () => ({
    __proto__: dart.getFields(instruments.DrumPad.__proto__),
    drums: dart.fieldType(instruments.Drums),
    row: dart.fieldType(core.int),
    col: dart.fieldType(core.int),
    midi: dart.fieldType(core.int),
    name: dart.fieldType(core.String),
    [_keyHint]: dart.fieldType(svg.TextElement),
    [_midiHint]: dart.fieldType(svg.TextElement),
    [_text]: dart.fieldType(svg.TextElement),
    [_group]: dart.fieldType(svg.GElement),
    [_rect]: dart.fieldType(svg.RectElement),
    [_down]: dart.fieldType(core.bool)
  }));
  var _slideKeyboard = dart.privateName(instruments, "_slideKeyboard");
  var _noteToKey = dart.privateName(instruments, "_noteToKey");
  var _updateKeymap = dart.privateName(instruments, "_updateKeymap");
  var keys = dart.privateName(instruments, "Piano.keys");
  var offset = dart.privateName(instruments, "Piano.offset");
  var mini = dart.privateName(instruments, "Piano.mini");
  var key_map$ = dart.privateName(instruments, "Piano.key_map");
  var allKeys = dart.privateName(instruments, "Piano.allKeys");
  instruments.Piano = class Piano extends instruments.Instrument {
    get keys() {
      return this[keys];
    }
    set keys(value) {
      this[keys] = value;
    }
    get offset() {
      return this[offset];
    }
    set offset(value) {
      this[offset] = value;
    }
    get mini() {
      return this[mini];
    }
    set mini(value) {
      this[mini] = value;
    }
    get key_map() {
      return this[key_map$];
    }
    set key_map(value) {
      this[key_map$] = value;
    }
    get allKeys() {
      return this[allKeys];
    }
    set allKeys(value) {
      this[allKeys] = value;
    }
    saveState() {
      return new _js_helper.LinkedMap.from(["offset", this.offset]);
    }
    loadState(saved) {
      if (core.int.is(saved[$_get]("offset"))) {
        this.offset = core.int.as(saved[$_get]("offset"));
        this[_slideKeyboard](0);
      }
    }
    noteOn(note, velocity = 90) {
      let key = this[_noteToKey](note[$round]());
      if (key != null) key.press();
    }
    noteOff(note) {
      let key = this[_noteToKey](note[$round]());
      if (key != null) key.release();
    }
    allNotesOff() {
      for (let key of this.keys)
        key.release();
    }
    isNoteOn(note) {
      let key = this[_noteToKey](note[$round]());
      return key != null && dart.test(key.isPressed());
    }
    [_onKeyDown](e) {
      if (!dart.test(e.repeat) && dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index + dart.notNull(this.offset) < dart.notNull(this.keys[$length])) {
          let key = this.keys[$_get](index + dart.notNull(this.offset));
          this[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_KEYBD, key.midi, 90));
          key.press();
        } else if (e.keyCode === 37) {
          this[_slideKeyboard](-12);
        } else if (e.keyCode === 39) {
          this[_slideKeyboard](12);
        } else if (e.keyCode === 187) {
          core.print("pitch up");
        } else if (e.keyCode === 189) {
          core.print("pitch down");
        }
      }
    }
    [_onKeyUp](e) {
      if (dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index + dart.notNull(this.offset) < dart.notNull(this.keys[$length])) {
          let key = this.keys[$_get](index + dart.notNull(this.offset));
          this[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_KEYBD, key.midi));
          key.release();
        }
      }
    }
    [_noteToKey](midi) {
      let index = dart.notNull(midi) - 12;
      return index < 0 || index >= dart.notNull(this.keys[$length]) ? null : this.keys[$_get](index);
    }
    [_render]() {
      let t2, t2$, t2$0;
      let backdrop = (t2 = svg.RectElement.new(), t2[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "backdrop", "width", "100%", "height", "100%"]), t2);
      this.parent[$append](backdrop);
      this.allKeys[$classes].add("animated-slide");
      let whiteKeys = svg.GElement.new();
      let blackKeys = svg.GElement.new();
      for (let i = 0; i < 96; i = i + 1) {
        let key = new instruments.PianoKey.new(i, this);
        this.keys[$add](key);
        if (dart.test(key.black)) {
          blackKeys[$append](key.el);
        } else {
          whiteKeys[$append](key.el);
        }
      }
      this.allKeys[$append](whiteKeys);
      this.allKeys[$append](blackKeys);
      this.parent[$append](this.allKeys);
      let felt = (t2$ = svg.RectElement.new(), t2$[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "felt", "width", "100%", "height", "2", "x", "0", "y", "0"]), t2$);
      this.parent[$append](felt);
      let shelf = (t2$0 = svg.RectElement.new(), t2$0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["width", "100%", "height", "8", "x", "0", "y", "0", "fill", "black", "fill-opacity", "0.05", "filter", "url(#drop-shadow)"]), t2$0);
      this.parent[$append](shelf);
      this.mini = new instruments.MiniPiano.new(this);
      this.mini.render();
      this[_slideKeyboard](36);
      this.root[$querySelectorAll](html.Element, "#up-octave").onClick.listen(dart.fn(e => {
        this[_slideKeyboard](12);
      }, MouseEventLToNullN()));
      this.root[$querySelectorAll](html.Element, "#down-octave").onClick.listen(dart.fn(e => {
        this[_slideKeyboard](-12);
      }, MouseEventLToNullN()));
      this.mini.hide();
      this.parent[$append](this.mini.el);
    }
    [_slideKeyboard](delta) {
      this.keys[$forEach](dart.fn(key => key.autoRelease(), PianoKeyLTovoid()));
      this.offset = dart.notNull(this.offset) + dart.notNull(delta);
      this.offset = dart.asNullableInt(this.offset[$clamp](0, dart.notNull(this.keys[$length]) - 24));
      let dx = this.keys[$_get](this.offset).x;
      this[_updateKeymap]();
      this.allKeys.style[$transform] = "translateX(" + dart.str(-dart.notNull(dx)) + "px)";
      this.mini.show();
      this.mini.slide(dx);
    }
    [_updateKeymap]() {
      for (let i = 0; i < dart.notNull(this.keys[$length]); i = i + 1) {
        this.keys[$_get](i).clearKeymap();
        let midi = dart.notNull(this.keys[$_get](i).midi) - (dart.notNull(this.offset) + 12);
        if (midi >= 0 && midi < this.key_map.length) {
          this.keys[$_get](i).setKeymap(this.key_map[$_get](midi));
        }
      }
    }
  };
  (instruments.Piano.new = function() {
    this[keys] = JSArrayOfPianoKeyL().of([]);
    this[offset] = 0;
    this[mini] = null;
    this[key_map$] = "awsedftgyhujkolp;']";
    this[allKeys] = svg.GElement.new();
    instruments.Piano.__proto__.new.call(this, "piano");
  }).prototype = instruments.Piano.prototype;
  dart.addTypeTests(instruments.Piano);
  dart.addTypeCaches(instruments.Piano);
  dart.setMethodSignature(instruments.Piano, () => ({
    __proto__: dart.getMethods(instruments.Piano.__proto__),
    saveState: dart.fnType(core.Map, []),
    loadState: dart.fnType(dart.void, [core.Map]),
    noteOn: dart.fnType(dart.void, [core.num], [core.int]),
    noteOff: dart.fnType(dart.void, [core.num]),
    allNotesOff: dart.fnType(dart.void, []),
    isNoteOn: dart.fnType(core.bool, [core.num]),
    [_onKeyDown]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_onKeyUp]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_noteToKey]: dart.fnType(instruments.PianoKey, [core.int]),
    [_render]: dart.fnType(dart.void, []),
    [_slideKeyboard]: dart.fnType(dart.void, [core.int]),
    [_updateKeymap]: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(instruments.Piano, L0);
  dart.setFieldSignature(instruments.Piano, () => ({
    __proto__: dart.getFields(instruments.Piano.__proto__),
    keys: dart.fieldType(core.List$(instruments.PianoKey)),
    offset: dart.fieldType(core.int),
    mini: dart.fieldType(instruments.MiniPiano),
    key_map: dart.fieldType(core.String),
    allKeys: dart.fieldType(svg.GElement)
  }));
  var _timer = dart.privateName(instruments, "_timer");
  var Duration__duration = dart.privateName(core, "Duration._duration");
  var C0;
  var piano$ = dart.privateName(instruments, "MiniPiano.piano");
  var el = dart.privateName(instruments, "MiniPiano.el");
  var bkeys = dart.privateName(instruments, "MiniPiano.bkeys");
  var wkeys = dart.privateName(instruments, "MiniPiano.wkeys");
  var highlight = dart.privateName(instruments, "MiniPiano.highlight");
  instruments.MiniPiano = class MiniPiano extends core.Object {
    get piano() {
      return this[piano$];
    }
    set piano(value) {
      this[piano$] = value;
    }
    get el() {
      return this[el];
    }
    set el(value) {
      this[el] = value;
    }
    get bkeys() {
      return this[bkeys];
    }
    set bkeys(value) {
      this[bkeys] = value;
    }
    get wkeys() {
      return this[wkeys];
    }
    set wkeys(value) {
      this[wkeys] = value;
    }
    get highlight() {
      return this[highlight];
    }
    set highlight(value) {
      this[highlight] = value;
    }
    get width() {
      return dart.notNull(this.piano.keys[$last].x) + dart.notNull(instruments.PianoKey.width);
    }
    get height() {
      return this.piano.height;
    }
    show() {
      this.highlight[$attributes][$_set]("width", dart.str(this.piano.width));
      this.el[$classes].add("show");
    }
    hide() {
      this.el[$classes].remove("show");
    }
    slide(dx) {
      dx = math.max(core.num, 0, dx);
      this.highlight.style[$transform] = "translateX(" + dart.str(dx) + "px)";
      if (this[_timer] != null) this[_timer].cancel();
      this[_timer] = async.Timer.new(C0 || CT.C0, dart.fn(() => {
        this.hide();
        this[_timer] = null;
      }, VoidToNullN()));
    }
    render() {
      let t2, t2$;
      this.el[$classes].add("mini-piano");
      this.el[$attributes][$_set]("transform", "translate(0, 8) scale(0.2)");
      let backdrop = (t2 = svg.RectElement.new(), t2[$attributes] = new (IdentityMapOfStringL$StringL()).from(["x", dart.str(dart.notNull(instruments.PianoKey.width) * 5), "fill", "black", "width", dart.str(dart.notNull(this.width) - 200), "height", dart.str(this.height)]), t2);
      this.el[$append](backdrop);
      for (let key of this.piano.keys) {
        let pad = dart.test(key.black) ? 6 : 1;
        let fill = dart.test(key.black) ? "black" : "white";
        if (dart.notNull(key.key) > 8) {
          let r = (t2$ = svg.RectElement.new(), t2$[$attributes] = new (IdentityMapOfStringL$StringL()).from(["fill", fill, "x", dart.str(dart.notNull(key.x) + pad), "y", "2", "width", dart.str(dart.notNull(instruments.PianoKey.width) - pad * 2), "height", dart.str(key.height)]), t2$);
          dart.test(key.black) ? this.bkeys[$append](r) : this.wkeys[$append](r);
        }
      }
      this.el[$append](this.wkeys);
      this.el[$append](this.bkeys);
      this.highlight[$attributes] = new (IdentityMapOfStringL$StringL()).from(["fill", "#900", "fill-opacity", "0.35", "stroke", "#900", "width", dart.str(this.piano.width), "height", dart.str(this.height), "x", "0", "y", "0"]);
      this.highlight[$classes].add("animated-slide");
      this.el[$append](this.highlight);
    }
  };
  (instruments.MiniPiano.new = function(piano) {
    this[el] = svg.GElement.new();
    this[bkeys] = svg.GElement.new();
    this[wkeys] = svg.GElement.new();
    this[highlight] = svg.RectElement.new();
    this[_timer] = null;
    this[piano$] = piano;
    ;
  }).prototype = instruments.MiniPiano.prototype;
  dart.addTypeTests(instruments.MiniPiano);
  dart.addTypeCaches(instruments.MiniPiano);
  dart.setMethodSignature(instruments.MiniPiano, () => ({
    __proto__: dart.getMethods(instruments.MiniPiano.__proto__),
    show: dart.fnType(dart.void, []),
    hide: dart.fnType(dart.void, []),
    slide: dart.fnType(dart.void, [core.num]),
    render: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(instruments.MiniPiano, () => ({
    __proto__: dart.getGetters(instruments.MiniPiano.__proto__),
    width: core.num,
    height: core.num
  }));
  dart.setLibraryUri(instruments.MiniPiano, L0);
  dart.setFieldSignature(instruments.MiniPiano, () => ({
    __proto__: dart.getFields(instruments.MiniPiano.__proto__),
    piano: dart.fieldType(instruments.Piano),
    el: dart.fieldType(svg.GElement),
    bkeys: dart.fieldType(svg.GElement),
    wkeys: dart.fieldType(svg.GElement),
    highlight: dart.fieldType(svg.RectElement),
    [_timer]: dart.fieldType(async.Timer)
  }));
  var _key_offsets = dart.privateName(instruments, "_key_offsets");
  var key$ = dart.privateName(instruments, "PianoKey.key");
  var piano$0 = dart.privateName(instruments, "PianoKey.piano");
  var keyHint = dart.privateName(instruments, "PianoKey.keyHint");
  var el$ = dart.privateName(instruments, "PianoKey.el");
  var rect = dart.privateName(instruments, "PianoKey.rect");
  instruments.PianoKey = class PianoKey extends core.Object {
    get key() {
      return this[key$];
    }
    set key(value) {
      this[key$] = value;
    }
    get piano() {
      return this[piano$0];
    }
    set piano(value) {
      this[piano$0] = value;
    }
    get keyHint() {
      return this[keyHint];
    }
    set keyHint(value) {
      this[keyHint] = value;
    }
    get el() {
      return this[el$];
    }
    set el(value) {
      this[el$] = value;
    }
    get rect() {
      return this[rect];
    }
    set rect(value) {
      this[rect] = value;
    }
    get midi() {
      return dart.notNull(this.key) + 12;
    }
    get step() {
      return this.midi[$modulo](12);
    }
    get octave() {
      return (dart.notNull(this.key) / 12)[$truncate]();
    }
    get name() {
      return dart.str(instruments.PianoKey.NOTES[$_get](this.step));
    }
    get offset() {
      return dart.notNull(this.octave) * 7 + dart.notNull(this[_key_offsets][$_get](this.step));
    }
    static get width() {
      return 35;
    }
    get x() {
      return dart.notNull(this.offset) * dart.notNull(instruments.PianoKey.width);
    }
    get black() {
      return JSArrayOfintL().of([1, 3, 6, 8, 10])[$contains](this.step);
    }
    get white() {
      return !dart.test(this.black);
    }
    get height() {
      return dart.test(this.black) ? 92 : 148;
    }
    press() {
      this[_down] = true;
      this.rect[$classes].add("pressed");
    }
    release() {
      if (dart.test(this[_down])) {
        this[_down] = false;
        this.rect[$classes].remove("pressed");
      }
    }
    isPressed() {
      return this.rect[$classes].contains("pressed");
    }
    autoRelease() {
      if (dart.test(this[_down])) {
        this.piano[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_SYSTEM, this.midi));
        this[_down] = false;
        this.rect[$classes].remove("pressed");
      }
    }
    setKeymap(k) {
      this.keyHint[$innerHtml] = k;
    }
    clearKeymap() {
      this.keyHint[$innerHtml] = "";
    }
  };
  (instruments.PianoKey.new = function(key, piano) {
    let t2, t2$, t2$0, t2$1;
    this[key$] = 48;
    this[keyHint] = svg.TextElement.new();
    this[_key_offsets] = JSArrayOfnumL().of([0, 0.45, 1, 1.55, 2, 3, 3.4, 4, 4.5, 5, 5.6, 6]);
    this[el$] = svg.GElement.new();
    this[rect] = svg.RectElement.new();
    this[_down] = false;
    this[key$] = key;
    this[piano$0] = piano;
    this.el = (t2 = svg.GElement.new(), t2[$attributes] = new (IdentityMapOfStringL$StringL()).from(["transform", "translate(" + dart.str(this.x) + ", 0)"]), t2);
    let pad = dart.test(this.black) ? 6 : 1.5;
    let x0 = pad;
    let w = dart.notNull(instruments.PianoKey.width) - pad * 2;
    let h = this.height;
    this.rect[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", dart.test(this.black) ? "piano-key black" : "piano-key white", "x", dart.str(x0), "y", "-3", "width", dart.str(w), "height", dart.str(h)]);
    this.el[$append](this.rect);
    if (dart.test(this.black)) {
      x0 = x0 + 2;
      w = w - 4;
      let r = (t2$ = svg.RectElement.new(), t2$[$attributes] = new (IdentityMapOfStringL$StringL()).from(["x", dart.str(x0), "y", "2", "width", dart.str(w), "height", dart.str(dart.notNull(h) - 15), "fill", "#334", "pointer-events", "none"]), t2$);
      this.el[$append](r);
    } else {
      let noteHint = (t2$0 = svg.TextElement.new(), t2$0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "note-hint", "x", dart.str(x0 + w / 2), "y", dart.str(dart.notNull(h) - 8)]), t2$0);
      noteHint[$innerHtml] = dart.str(this.name) + dart.str(this.octave);
      if (this.step === 0) {
        noteHint[$classes].add("always-show");
      }
      this.el[$append](noteHint);
      let midiHint = (t2$1 = svg.TextElement.new(), t2$1[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "midi-hint show", "x", dart.str(x0 + w / 2), "y", dart.str(dart.notNull(h) - 24)]), t2$1);
      midiHint[$innerHtml] = dart.str(this.midi);
      this.el[$append](midiHint);
    }
    this.keyHint[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "key-hint", "x", dart.str(x0 + w / 2), "y", dart.str(dart.notNull(h) - 42)]);
    if (dart.test(this.black)) this.keyHint[$classes].add("black");
    this.el[$append](this.keyHint);
    this.el[$onMouseDown].listen(dart.fn(e => {
      this.piano[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, this.midi, 90));
      this.press();
    }, MouseEventLToNullN()));
    this.el[$onMouseUp].listen(dart.fn(e => {
      this.piano[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, this.midi));
      this.release();
    }, MouseEventLToNullN()));
    this.el[$onMouseLeave].listen(dart.fn(e => {
      if (dart.test(this[_down])) {
        this.piano[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, this.midi));
        this.release();
      }
    }, MouseEventLToNullN()));
    this.el[$onMouseEnter].listen(dart.fn(e => {
      if (dart.notNull(e.buttons) > 0) {
        this.piano[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, this.midi, 90));
        this.press();
      }
    }, MouseEventLToNullN()));
  }).prototype = instruments.PianoKey.prototype;
  dart.addTypeTests(instruments.PianoKey);
  dart.addTypeCaches(instruments.PianoKey);
  dart.setMethodSignature(instruments.PianoKey, () => ({
    __proto__: dart.getMethods(instruments.PianoKey.__proto__),
    press: dart.fnType(dart.void, []),
    release: dart.fnType(dart.void, []),
    isPressed: dart.fnType(core.bool, []),
    autoRelease: dart.fnType(dart.void, []),
    setKeymap: dart.fnType(dart.void, [core.String]),
    clearKeymap: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(instruments.PianoKey, () => ({
    __proto__: dart.getGetters(instruments.PianoKey.__proto__),
    midi: core.int,
    step: core.int,
    octave: core.int,
    name: core.String,
    offset: core.num,
    x: core.num,
    black: core.bool,
    white: core.bool,
    height: core.num
  }));
  dart.setLibraryUri(instruments.PianoKey, L0);
  dart.setFieldSignature(instruments.PianoKey, () => ({
    __proto__: dart.getFields(instruments.PianoKey.__proto__),
    key: dart.fieldType(core.int),
    piano: dart.fieldType(instruments.Piano),
    keyHint: dart.fieldType(svg.TextElement),
    [_key_offsets]: dart.finalFieldType(core.List$(core.num)),
    el: dart.fieldType(svg.GElement),
    rect: dart.fieldType(svg.RectElement),
    [_down]: dart.fieldType(core.bool)
  }));
  dart.defineLazy(instruments.PianoKey, {
    /*instruments.PianoKey.NOTES*/get NOTES() {
      return JSArrayOfStringL().of(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
    }
  }, true);
  var _noteToDrum = dart.privateName(instruments, "_noteToDrum");
  var _showHint = dart.privateName(instruments, "_showHint");
  var _hideHint = dart.privateName(instruments, "_hideHint");
  var key_map$0 = dart.privateName(instruments, "DrumKit.key_map");
  var drums = dart.privateName(instruments, "DrumKit.drums");
  var selector$ = dart.privateName(instruments, "DrumKit.selector");
  instruments.DrumKit = class DrumKit extends instruments.Instrument {
    get key_map() {
      return this[key_map$0];
    }
    set key_map(value) {
      this[key_map$0] = value;
    }
    get drums() {
      return this[drums];
    }
    set drums(value) {
      this[drums] = value;
    }
    get selector() {
      return this[selector$];
    }
    set selector(value) {
      this[selector$] = value;
    }
    saveState() {
      return new _js_helper.LinkedMap.new();
    }
    loadState(saved) {
    }
    noteOn(note, velocity = 90) {
      let drum = this[_noteToDrum](note[$round]());
      if (drum != null && !dart.test(drum.isPressed())) drum.press();
    }
    noteOff(note) {
      let drum = this[_noteToDrum](note[$round]());
      if (drum != null) drum.release();
    }
    allNotesOff() {
      for (let drum of this.drums)
        drum.release();
    }
    isNoteOn(note) {
      let drum = this[_noteToDrum](note[$round]());
      return drum != null && dart.test(drum.isPressed());
    }
    [_onKeyDown](e) {
      if (!dart.test(e.repeat) && dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index < dart.notNull(this.drums[$length])) {
          let drum = this.drums[$_get](index);
          this[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_KEYBD, drum.midi, 90));
          drum.press();
        }
      }
    }
    [_onKeyUp](e) {
      if (dart.test(this.isKeyboardArmed)) {
        let index = this.key_map[$indexOf](e.key[$toLowerCase]());
        if (index >= 0 && index < dart.notNull(this.drums[$length])) {
          let drum = this.drums[$_get](index);
          this[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_KEYBD, drum.midi));
          drum.release();
        }
      }
    }
    [_noteToDrum](midi) {
      for (let drum of this.drums) {
        if (drum.midi == midi) return drum;
      }
      return null;
    }
    [_render]() {
      let _down = false;
      for (let drum of this.drums) {
        let midi = drum.midi;
        let selector = "#" + dart.str(drum.name);
        this.root[$querySelectorAll](html.Element, selector).onMouseDown.listen(dart.fn(e => {
          this[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, midi, 90));
          _down = true;
          drum.press();
        }, MouseEventLToNullN()));
        this.root[$querySelectorAll](html.Element, selector).onMouseUp.listen(dart.fn(e => {
          this[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, midi));
          _down = false;
          drum.release();
        }, MouseEventLToNullN()));
        this.root[$querySelectorAll](html.Element, selector).onMouseEnter.listen(dart.fn(e => {
          if (dart.notNull(e.buttons) > 0 && !dart.test(drum.isPressed())) {
            this[_addNoteEvent](new instruments.NoteEvent.on(instruments.NoteEvent.INPUT_MOUSE, midi, 90));
            drum.press();
          }
          this[_showHint](drum);
        }, MouseEventLToNullN()));
        this.root[$querySelectorAll](html.Element, selector).onMouseLeave.listen(dart.fn(e => {
          if (_down) {
            this[_addNoteEvent](new instruments.NoteEvent.off(instruments.NoteEvent.INPUT_MOUSE, midi));
            drum.release();
          }
          this[_hideHint]();
        }, MouseEventLToNullN()));
      }
    }
    [_resize]() {
    }
    [_showHint](drum) {
      let div = html.DivElement.as(this.root.querySelector(".drum-hint"));
      if (div != null) {
        div[$innerHtml] = drum.name[$toUpperCase]() + " (note " + dart.str(drum.midi) + ")";
        div[$classes].add("show");
      }
    }
    [_hideHint]() {
      this.root[$querySelectorAll](html.Element, ".drum-hint").classes.remove("show");
    }
  };
  (instruments.DrumKit.new = function(selector, patch) {
    this[key_map$0] = "brsqhoytgfcz";
    this[drums] = JSArrayOfDrumL().of([]);
    this[selector$] = selector;
    instruments.DrumKit.__proto__.new.call(this, "drumkit");
    if (core.List.is(patch[$_get]("nodes"))) {
      for (let t2 of core.Iterable.as(patch[$_get]("nodes"))) {
        let node = core.Map.as(t2);
        if (dart.equals(node[$_get]("type"), "sample") && core.List.is(node[$_get]("samples"))) {
          for (let t3 of core.Iterable.as(node[$_get]("samples"))) {
            let sample = core.Map.as(t3);
            if (core.int.is(sample[$_get]("step"))) {
              let midi = core.int.as(sample[$_get]("step"));
              let name = dart.str(sample[$_get]("name"));
              let pad = new instruments.Drum.new(name, midi, this.selector);
              this.drums[$add](pad);
            }
          }
        }
      }
    }
  }).prototype = instruments.DrumKit.prototype;
  dart.addTypeTests(instruments.DrumKit);
  dart.addTypeCaches(instruments.DrumKit);
  dart.setMethodSignature(instruments.DrumKit, () => ({
    __proto__: dart.getMethods(instruments.DrumKit.__proto__),
    saveState: dart.fnType(core.Map, []),
    loadState: dart.fnType(dart.void, [core.Map]),
    noteOn: dart.fnType(dart.void, [core.num], [core.int]),
    noteOff: dart.fnType(dart.void, [core.num]),
    allNotesOff: dart.fnType(dart.void, []),
    isNoteOn: dart.fnType(core.bool, [core.num]),
    [_onKeyDown]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_onKeyUp]: dart.fnType(dart.void, [html.KeyboardEvent]),
    [_noteToDrum]: dart.fnType(instruments.Drum, [core.int]),
    [_render]: dart.fnType(dart.void, []),
    [_showHint]: dart.fnType(dart.void, [instruments.Drum]),
    [_hideHint]: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(instruments.DrumKit, L0);
  dart.setFieldSignature(instruments.DrumKit, () => ({
    __proto__: dart.getFields(instruments.DrumKit.__proto__),
    key_map: dart.fieldType(core.String),
    drums: dart.fieldType(core.List$(instruments.Drum)),
    selector: dart.fieldType(core.String)
  }));
  var selector$0 = dart.privateName(instruments, "Drum.selector");
  var name$1 = dart.privateName(instruments, "Drum.name");
  var midi$0 = dart.privateName(instruments, "Drum.midi");
  var pressed = dart.privateName(instruments, "Drum.pressed");
  instruments.Drum = class Drum extends core.Object {
    get selector() {
      return this[selector$0];
    }
    set selector(value) {
      this[selector$0] = value;
    }
    get name() {
      return this[name$1];
    }
    set name(value) {
      this[name$1] = value;
    }
    get midi() {
      return this[midi$0];
    }
    set midi(value) {
      this[midi$0] = value;
    }
    get pressed() {
      return this[pressed];
    }
    set pressed(value) {
      this[pressed] = value;
    }
    press() {
      js.context.callMethod("animateDrum", [this.selector, this.name]);
      this.pressed = true;
    }
    release() {
      this.pressed = false;
    }
    isPressed() {
      return this.pressed;
    }
  };
  (instruments.Drum.new = function(name, midi, selector) {
    this[pressed] = false;
    this[name$1] = name;
    this[midi$0] = midi;
    this[selector$0] = selector;
    ;
  }).prototype = instruments.Drum.prototype;
  dart.addTypeTests(instruments.Drum);
  dart.addTypeCaches(instruments.Drum);
  dart.setMethodSignature(instruments.Drum, () => ({
    __proto__: dart.getMethods(instruments.Drum.__proto__),
    press: dart.fnType(dart.void, []),
    release: dart.fnType(dart.void, []),
    isPressed: dart.fnType(core.bool, [])
  }));
  dart.setLibraryUri(instruments.Drum, L0);
  dart.setFieldSignature(instruments.Drum, () => ({
    __proto__: dart.getFields(instruments.Drum.__proto__),
    selector: dart.fieldType(core.String),
    name: dart.fieldType(core.String),
    midi: dart.fieldType(core.int),
    pressed: dart.fieldType(core.bool)
  }));
  dart.trackLibraries("packages/instruments/instruments", {
    "package:instruments/instruments.dart": instruments
  }, {
    "package:instruments/instruments.dart": ["src/instrument.dart", "src/drums.dart", "src/piano.dart", "src/drumkit.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/instrument.dart","src/drums.dart","src/piano.dart","src/drumkit.dart"],"names":[],"mappings":"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","file":"instruments.ddc.js"}');
  // Exports:
  return {
    instruments: instruments
  };
});

//# sourceMappingURL=instruments.ddc.js.map
