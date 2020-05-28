define(['dart_sdk', 'packages/ui/src/dial', 'packages/synthesizer/src/chain', 'packages/instruments/instruments', 'packages/audio_tools/dart/midi', 'packages/editor/codemirror', 'packages/compiler/dart/compiler', 'packages/audio_tools/dart/buffer', 'packages/uuid/uuid'], function(dart_sdk, packages__ui__src__dial, packages__synthesizer__src__chain, packages__instruments__instruments, packages__audio_tools__dart__midi, packages__editor__codemirror, packages__compiler__dart__compiler, packages__audio_tools__dart__buffer, packages__uuid__uuid) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const async = dart_sdk.async;
  const _js_helper = dart_sdk._js_helper;
  const collection = dart_sdk.collection;
  const math = dart_sdk.math;
  const _interceptors = dart_sdk._interceptors;
  const web_audio = dart_sdk.web_audio;
  const js = dart_sdk.js;
  const convert = dart_sdk.convert;
  const svg = dart_sdk.svg;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const dialog$ = packages__ui__src__dial.src__dialog;
  const scheduler = packages__synthesizer__src__chain.src__scheduler;
  const synth = packages__synthesizer__src__chain.src__synth;
  const trace = packages__synthesizer__src__chain.src__trace;
  const note = packages__synthesizer__src__chain.src__note;
  const utils = packages__synthesizer__src__chain.src__utils;
  const clock = packages__synthesizer__src__chain.src__clock;
  const instruments = packages__instruments__instruments.instruments;
  const midi = packages__audio_tools__dart__midi.dart__midi;
  const codemirror = packages__editor__codemirror.codemirror;
  const compiler = packages__compiler__dart__compiler.dart__compiler;
  const buffer = packages__audio_tools__dart__buffer.dart__buffer;
  const uuid = packages__uuid__uuid.uuid;
  const tunepad = Object.create(dart.library);
  const $querySelectorAll = dartx.querySelectorAll;
  const $open = dartx.open;
  const $classes = dartx.classes;
  const $innerHtml = dartx.innerHtml;
  const $trim = dartx.trim;
  const $clone = dartx.clone;
  const $append = dartx.append;
  const $dataset = dartx.dataset;
  const $currentTarget = dartx.currentTarget;
  const $_get = dartx._get;
  const $_set = dartx._set;
  const $length = dartx.length;
  const $split = dartx.split;
  const $startsWith = dartx.startsWith;
  const $substring = dartx.substring;
  const $ceil = dartx.ceil;
  const $createGain = dartx.createGain;
  const $connectNode = dartx.connectNode;
  const $modulo = dartx['%'];
  const $animationFrame = dartx.animationFrame;
  const $writeText = dartx.writeText;
  const $scrollTop = dartx.scrollTop;
  const $scrollHeight = dartx.scrollHeight;
  const $add = dartx.add;
  const $toUpperCase = dartx.toUpperCase;
  const $createScriptProcessor = dartx.createScriptProcessor;
  const $onAudioProcess = dartx.onAudioProcess;
  const $round = dartx.round;
  const $toStringAsFixed = dartx.toStringAsFixed;
  const $remove = dartx.remove;
  const $indexOf = dartx.indexOf;
  const $endsWith = dartx.endsWith;
  const $_equals = dartx._equals;
  const $containsKey = dartx.containsKey;
  const $putIfAbsent = dartx.putIfAbsent;
  const $clear = dartx.clear;
  const $leftShift = dartx['<<'];
  const $join = dartx.join;
  const $target = dartx.target;
  const $onMouseDown = dartx.onMouseDown;
  const $forEach = dartx.forEach;
  const $isEmpty = dartx.isEmpty;
  const $last = dartx.last;
  const $createSvgPoint = dartx.createSvgPoint;
  const $getScreenCtm = dartx.getScreenCtm;
  const $keys = dartx.keys;
  const $scrollTo = dartx.scrollTo;
  const $attachShadow = dartx.attachShadow;
  const $onResize = dartx.onResize;
  const $attributes = dartx.attributes;
  const $client = dartx.client;
  const $values = dartx.values;
  const $onMouseMove = dartx.onMouseMove;
  const $onMouseUp = dartx.onMouseUp;
  const $parent = dartx.parent;
  const $width = dartx.width;
  const $height = dartx.height;
  const $setAttribute = dartx.setAttribute;
  const $onMouseEnter = dartx.onMouseEnter;
  const $onMouseLeave = dartx.onMouseLeave;
  const $toString = dartx.toString;
  const $toRadixString = dartx.toRadixString;
  let MouseEventToNull = () => (MouseEventToNull = dart.constFn(dart.fnType(core.Null, [html.MouseEvent])))();
  let EventToNull = () => (EventToNull = dart.constFn(dart.fnType(core.Null, [html.Event])))();
  let FutureOfbool = () => (FutureOfbool = dart.constFn(async.Future$(core.bool)))();
  let EventToFutureOfbool = () => (EventToFutureOfbool = dart.constFn(dart.fnType(FutureOfbool(), [html.Event])))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let MIDIEventToNull = () => (MIDIEventToNull = dart.constFn(dart.fnType(core.Null, [midi.MIDIEvent])))();
  let KeyboardEventToNull = () => (KeyboardEventToNull = dart.constFn(dart.fnType(core.Null, [html.KeyboardEvent])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let MouseEventToFutureOfNull = () => (MouseEventToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [html.MouseEvent])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let StringTobool = () => (StringTobool = dart.constFn(dart.fnType(core.bool, [core.String])))();
  let NoteEventToNull = () => (NoteEventToNull = dart.constFn(dart.fnType(core.Null, [instruments.NoteEvent])))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let ListOfFunction = () => (ListOfFunction = dart.constFn(core.List$(core.Function)))();
  let LinkedMapOfString$ListOfFunction = () => (LinkedMapOfString$ListOfFunction = dart.constFn(_js_helper.LinkedMap$(core.String, ListOfFunction())))();
  let JSArrayOfFunction = () => (JSArrayOfFunction = dart.constFn(_interceptors.JSArray$(core.Function)))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let dynamicToFutureOfNull = () => (dynamicToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [dart.dynamic])))();
  let VoidToListOfFunction = () => (VoidToListOfFunction = dart.constFn(dart.fnType(ListOfFunction(), [])))();
  let FutureOrOfMap = () => (FutureOrOfMap = dart.constFn(async.FutureOr$(core.Map)))();
  let FutureOrOfList = () => (FutureOrOfList = dart.constFn(async.FutureOr$(core.List)))();
  let JSArrayOfPythonCell = () => (JSArrayOfPythonCell = dart.constFn(_interceptors.JSArray$(tunepad.PythonCell)))();
  let PythonCellToNull = () => (PythonCellToNull = dart.constFn(dart.fnType(core.Null, [tunepad.PythonCell])))();
  let JSArrayOfNoteSpacer = () => (JSArrayOfNoteSpacer = dart.constFn(_interceptors.JSArray$(tunepad.NoteSpacer)))();
  let LinkedMapOfTraceEvent$SvgElement = () => (LinkedMapOfTraceEvent$SvgElement = dart.constFn(_js_helper.LinkedMap$(trace.TraceEvent, svg.SvgElement)))();
  let EventTovoid = () => (EventTovoid = dart.constFn(dart.fnType(dart.void, [html.Event])))();
  let SvgElementToNode = () => (SvgElementToNode = dart.constFn(dart.fnType(html.Node, [svg.SvgElement])))();
  let ElementToNull = () => (ElementToNull = dart.constFn(dart.fnType(core.Null, [html.Element])))();
  let IdentityMapOfString$Object = () => (IdentityMapOfString$Object = dart.constFn(_js_helper.IdentityMap$(core.String, core.Object)))();
  let MapOfString$Object = () => (MapOfString$Object = dart.constFn(core.Map$(core.String, core.Object)))();
  let JSArrayOfMapOfString$Object = () => (JSArrayOfMapOfString$Object = dart.constFn(_interceptors.JSArray$(MapOfString$Object())))();
  let ListOfMapOfString$Object = () => (ListOfMapOfString$Object = dart.constFn(core.List$(MapOfString$Object())))();
  let IdentityMapOfString$ListOfMapOfString$Object = () => (IdentityMapOfString$ListOfMapOfString$Object = dart.constFn(_js_helper.IdentityMap$(core.String, ListOfMapOfString$Object())))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: core.Duration.prototype,
        [Duration__duration]: 3000000
      });
    },
    get C1() {
      return C1 = dart.const({
        __proto__: core.Duration.prototype,
        [Duration__duration]: 200000
      });
    }
  });
  tunepad.UserAccounts = class UserAccounts extends core.Object {
    static login(datastore) {
      let dialog = dialog$.Dialog.openModal("#login-template");
      let forgot = html.AnchorElement._check(dialog.querySelector("#forgot-link"));
      if (forgot != null) forgot.href = dart.str(datastore.host) + "/account/reset";
      dialog[$querySelectorAll](html.Element, "#google-button").onClick.listen(dart.fn(e => {
        dialog$.Dialog.closeModal();
        datastore.loginWithGoogle();
      }, MouseEventToNull()));
      dialog[$querySelectorAll](html.Element, "#join-button").onClick.listen(dart.fn(e => {
        dialog$.Dialog.closeModal();
        html.window[$open](dart.str(datastore.host) + "/join", "_blank");
      }, MouseEventToNull()));
      dialog[$querySelectorAll](html.Element, "input").onInput.listen(dart.fn(e => {
        dialog[$querySelectorAll](html.Element, ".message").classes.add("hidden");
      }, EventToNull()));
      dialog[$querySelectorAll](html.Element, "#login-form").onSubmit.listen(dart.fn(e => async.async(core.bool, function*() {
        core.print("got 1");
        e.preventDefault();
        let errors = false;
        let email = false;
        dialog[$querySelectorAll](html.Element, ".message").classes.add("hidden");
        core.print("got 2");
        let username = tunepad.UserAccounts._getInputValue(dialog, "#username");
        if (username == null || username === "") {
          tunepad.UserAccounts._showError(dialog, "#username-message", "Please enter your username or email.");
          errors = true;
        }
        core.print("got 3");
        let password = tunepad.UserAccounts._getInputValue(dialog, "#password");
        if (password == null || password === "") {
          tunepad.UserAccounts._showError(dialog, "#password-message", "Please enter your password.");
          errors = true;
        }
        core.print("got 4");
        if (errors) return false;
        email = datastore.isValidEmail(username);
        core.print("got 5");
        dialog[$querySelectorAll](html.Element, ".btn").classes.add("loading");
        try {
          if (dart.test(email)) {
            yield datastore.login(null, username, password);
          } else {
            yield datastore.login(username, null, password);
          }
          dialog$.Dialog.closeModal();
          dialog$.Dialog.message("Sign in successful.");
          return false;
        } catch (e$) {
          let ex = dart.getThrown(e$);
          if (tunepad.DatastoreException.is(ex)) {
            let e = ex;
            if (dart.test(email)) {
              tunepad.UserAccounts._showError(dialog, "#general-message", "Invalid email or password.");
            } else {
              tunepad.UserAccounts._showError(dialog, "#general-message", "Invalid username or password.");
            }
          } else {
            let e = ex;
            tunepad.UserAccounts._showError(dialog, "#general-message", "There was a problem signing in.");
          }
        } finally {
          dialog[$querySelectorAll](html.Element, ".btn").classes.remove("loading");
          return false;
        }
        core.print("got 6");
        return false;
      }), EventToFutureOfbool()));
    }
    static _showError(dialog, selector, message) {
      let el = dialog.querySelector(selector);
      if (el != null) {
        el[$classes].remove("hidden");
        el[$innerHtml] = message;
      }
    }
    static _getInputValue(dialog, selector) {
      let el = html.InputElement._check(dialog.querySelector(selector));
      return el != null ? el.value[$trim]() : "";
    }
  };
  (tunepad.UserAccounts.new = function() {
    ;
  }).prototype = tunepad.UserAccounts.prototype;
  dart.addTypeTests(tunepad.UserAccounts);
  dart.setLibraryUri(tunepad.UserAccounts, "package:tunepad/tunepad.dart");
  const _gain = dart.privateName(tunepad, "_gain");
  const _gainNode = dart.privateName(tunepad, "_gainNode");
  const _pan = dart.privateName(tunepad, "_pan");
  const _panNode = dart.privateName(tunepad, "_panNode");
  const _lastline = dart.privateName(tunepad, "_lastline");
  const _lastTrace = dart.privateName(tunepad, "_lastTrace");
  const _lastTime = dart.privateName(tunepad, "_lastTime");
  const _looped = dart.privateName(tunepad, "_looped");
  const _showElement = dart.privateName(tunepad, "_showElement");
  const _hideElement = dart.privateName(tunepad, "_hideElement");
  const _doContextMenu = dart.privateName(tunepad, "_doContextMenu");
  const _setName = dart.privateName(tunepad, "_setName");
  const _setElementState = dart.privateName(tunepad, "_setElementState");
  const _setMidiInput = dart.privateName(tunepad, "_setMidiInput");
  const _setMidiOutput = dart.privateName(tunepad, "_setMidiOutput");
  const _updateGadgetInfo = dart.privateName(tunepad, "_updateGadgetInfo");
  const Duration__duration = dart.privateName(core, "Duration._duration");
  let C0;
  const _pauseHelper = dart.privateName(tunepad, "_pauseHelper");
  const _setInstrument = dart.privateName(tunepad, "_setInstrument");
  const _exportMidi = dart.privateName(tunepad, "_exportMidi");
  const _exportAudio = dart.privateName(tunepad, "_exportAudio");
  const _downloadAudio = dart.privateName(tunepad, "_downloadAudio");
  const _showProgressDialog = dart.privateName(tunepad, "_showProgressDialog");
  const _setProgressStatus = dart.privateName(tunepad, "_setProgressStatus");
  const _hideProgressDialog = dart.privateName(tunepad, "_hideProgressDialog");
  const _isElementHidden = dart.privateName(tunepad, "_isElementHidden");
  const _toggleElement = dart.privateName(tunepad, "_toggleElement");
  const _toggleMidiInput = dart.privateName(tunepad, "_toggleMidiInput");
  const _toggleMidiOutput = dart.privateName(tunepad, "_toggleMidiOutput");
  const _shareTrack = dart.privateName(tunepad, "_shareTrack");
  let C1;
  const id$ = dart.privateName(tunepad, "DataModel.id");
  const name = dart.privateName(tunepad, "DataModel.name");
  const created = dart.privateName(tunepad, "DataModel.created");
  const modified = dart.privateName(tunepad, "DataModel.modified");
  tunepad.DataModel = class DataModel extends core.Object {
    get id() {
      return this[id$];
    }
    set id(value) {
      this[id$] = value;
    }
    get name() {
      return this[name];
    }
    set name(value) {
      this[name] = value;
    }
    get created() {
      return this[created];
    }
    set created(value) {
      this[created] = value;
    }
    get modified() {
      return this[modified];
    }
    set modified(value) {
      this[modified] = value;
    }
    get createdString() {
      return this.formatDateTime(this.created);
    }
    get modifiedString() {
      return this.formatDateTime(this.modified);
    }
    _equals(other) {
      if (other == null) return false;
      return dart.equals(this.id, other.id);
    }
    formatDateTime(d) {
      let m = JSArrayOfString().of(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
      return dart.str(m[$_get](dart.notNull(d.month) - 1)) + " " + dart.str(d.day) + ", " + dart.str(d.year);
    }
    createCloneName() {
      if (this.name == null) {
        return "New Item";
      } else if (this.name[$indexOf](" Copy") < 0) {
        return dart.notNull(this.name) + " Copy";
      } else if (this.name[$endsWith](" Copy")) {
        return dart.notNull(this.name) + " 2";
      } else {
        for (let i = 2; i < 50; i = i + 1) {
          if (this.name[$endsWith](" " + dart.str(i))) {
            let result = this.name[$substring](0, this.name.length - 2);
            return result + (" " + dart.str(i + 1));
          }
        }
      }
      return dart.str(this.name) + " Copy";
    }
  };
  (tunepad.DataModel.new = function(id) {
    this[id$] = null;
    this[name] = "";
    this[created] = new core.DateTime.now();
    this[modified] = new core.DateTime.now();
    this[id$] = id;
    ;
  }).prototype = tunepad.DataModel.prototype;
  dart.addTypeTests(tunepad.DataModel);
  dart.setMethodSignature(tunepad.DataModel, () => ({
    __proto__: dart.getMethods(tunepad.DataModel.__proto__),
    _equals: dart.fnType(core.bool, [tunepad.User]),
    [$_equals]: dart.fnType(core.bool, [tunepad.User]),
    formatDateTime: dart.fnType(core.String, [core.DateTime]),
    createCloneName: dart.fnType(core.String, [])
  }));
  dart.setGetterSignature(tunepad.DataModel, () => ({
    __proto__: dart.getGetters(tunepad.DataModel.__proto__),
    createdString: core.String,
    modifiedString: core.String
  }));
  dart.setLibraryUri(tunepad.DataModel, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.DataModel, () => ({
    __proto__: dart.getFields(tunepad.DataModel.__proto__),
    id: dart.fieldType(dart.dynamic),
    name: dart.fieldType(core.String),
    created: dart.fieldType(core.DateTime),
    modified: dart.fieldType(core.DateTime)
  }));
  dart.defineExtensionMethods(tunepad.DataModel, ['_equals']);
  tunepad.TimelineListener = class TimelineListener extends core.Object {};
  (tunepad.TimelineListener.new = function() {
    ;
  }).prototype = tunepad.TimelineListener.prototype;
  dart.addTypeTests(tunepad.TimelineListener);
  dart.setLibraryUri(tunepad.TimelineListener, "package:tunepad/tunepad.dart");
  const datastore$ = dart.privateName(tunepad, "PythonCell.datastore");
  const settings = dart.privateName(tunepad, "PythonCell.settings");
  const timeline = dart.privateName(tunepad, "PythonCell.timeline");
  const editor = dart.privateName(tunepad, "PythonCell.editor");
  const compiler$ = dart.privateName(tunepad, "PythonCell.compiler");
  const synth$ = dart.privateName(tunepad, "PythonCell.synth");
  const metronome = dart.privateName(tunepad, "PythonCell.metronome");
  const instrument = dart.privateName(tunepad, "PythonCell.instrument");
  const recorder = dart.privateName(tunepad, "PythonCell.recorder");
  const root = dart.privateName(tunepad, "PythonCell.root");
  const clock$ = dart.privateName(tunepad, "PythonCell.clock");
  const beats = dart.privateName(tunepad, "PythonCell.beats");
  const trace$ = dart.privateName(tunepad, "PythonCell.trace");
  const midi$ = dart.privateName(tunepad, "PythonCell.midi");
  const DataModel_PythonListener$36 = class DataModel_PythonListener extends tunepad.DataModel {};
  (DataModel_PythonListener$36.new = function(id) {
    DataModel_PythonListener$36.__proto__.new.call(this, id);
  }).prototype = DataModel_PythonListener$36.prototype;
  dart.applyMixin(DataModel_PythonListener$36, compiler.PythonListener);
  const DataModel_CodeMirrorListener$36 = class DataModel_CodeMirrorListener extends DataModel_PythonListener$36 {};
  (DataModel_CodeMirrorListener$36.new = function(id) {
    DataModel_CodeMirrorListener$36.__proto__.new.call(this, id);
  }).prototype = DataModel_CodeMirrorListener$36.prototype;
  dart.applyMixin(DataModel_CodeMirrorListener$36, codemirror.CodeMirrorListener);
  const DataModel_TimelineListener$36 = class DataModel_TimelineListener extends DataModel_CodeMirrorListener$36 {};
  (DataModel_TimelineListener$36.new = function(id) {
    DataModel_TimelineListener$36.__proto__.new.call(this, id);
  }).prototype = DataModel_TimelineListener$36.prototype;
  dart.applyMixin(DataModel_TimelineListener$36, tunepad.TimelineListener);
  const DataModel_ClockSubscriber$36 = class DataModel_ClockSubscriber extends DataModel_TimelineListener$36 {};
  (DataModel_ClockSubscriber$36.new = function(id) {
    DataModel_ClockSubscriber$36.__proto__.new.call(this, id);
  }).prototype = DataModel_ClockSubscriber$36.prototype;
  dart.applyMixin(DataModel_ClockSubscriber$36, clock.ClockSubscriber);
  const DataModel_Metronome$36 = class DataModel_Metronome extends DataModel_ClockSubscriber$36 {};
  (DataModel_Metronome$36.new = function(id) {
    DataModel_Metronome$36.__proto__.new.call(this, id);
  }).prototype = DataModel_Metronome$36.prototype;
  dart.applyMixin(DataModel_Metronome$36, clock.Metronome);
  tunepad.PythonCell = class PythonCell extends DataModel_Metronome$36 {
    get datastore() {
      return this[datastore$];
    }
    set datastore(value) {
      this[datastore$] = value;
    }
    get settings() {
      return this[settings];
    }
    set settings(value) {
      this[settings] = value;
    }
    get timeline() {
      return this[timeline];
    }
    set timeline(value) {
      this[timeline] = value;
    }
    get editor() {
      return this[editor];
    }
    set editor(value) {
      this[editor] = value;
    }
    get compiler() {
      return this[compiler$];
    }
    set compiler(value) {
      this[compiler$] = value;
    }
    get synth() {
      return this[synth$];
    }
    set synth(value) {
      this[synth$] = value;
    }
    get metronome() {
      return this[metronome];
    }
    set metronome(value) {
      this[metronome] = value;
    }
    get instrument() {
      return this[instrument];
    }
    set instrument(value) {
      this[instrument] = value;
    }
    get recorder() {
      return this[recorder];
    }
    set recorder(value) {
      this[recorder] = value;
    }
    get root() {
      return this[root];
    }
    set root(value) {
      this[root] = value;
    }
    get clock() {
      return this[clock$];
    }
    set clock(value) {
      this[clock$] = value;
    }
    get beats() {
      return this[beats];
    }
    set beats(value) {
      this[beats] = value;
    }
    get trace() {
      return this[trace$];
    }
    set trace(value) {
      this[trace$] = value;
    }
    get midi() {
      return this[midi$];
    }
    set midi(value) {
      this[midi$] = value;
    }
    get duration() {
      return dart.notNull(this.beats) * 60 / dart.notNull(this.clock.bpm);
    }
    get lineCount() {
      return this.editor.getCode()[$split]("\n")[$length];
    }
    get author() {
      return this.datastore.user != null ? this.datastore.user.name : "Anonymous";
    }
    get uid() {
      return this.datastore.user != null ? this.datastore.user.uid : "";
    }
    get description() {
      return utils.toStr(this.settings[$_get]("description"), "");
    }
    get gain() {
      return this[_gain];
    }
    set gain(g) {
      this[_gain] = core.num._check(dart.dsend(g, 'clamp', [0.0, 3.5]));
      if (this[_gainNode] != null) {
        this[_gainNode].gain.value = this[_gain];
      }
      return this[_gain];
    }
    get pan() {
      return this[_pan];
    }
    set pan(p) {
      this[_pan] = core.num._check(dart.dsend(p, 'clamp', [-1.0, 1.0]));
      if (this[_panNode] != null) {
        this[_panNode].pan.value = this[_pan];
      }
      return this[_pan];
    }
    get isPublic() {
      return utils.toBool(this.settings[$_get]("public"), false);
    }
    get hasError() {
      return this.root != null && dart.test(this.root[$classes].contains("error"));
    }
    initAudio() {
      this.clock.addSubscriber(this);
      this.setVoice(core.String._check(this.settings[$_get]("voice")), core.String._check(this.settings[$_get]("instrument")));
      this.metronome.loadPatch("metronome", core.Map._check(tunepad.patches[$_get]("metronome")), this.clock.context);
    }
    load(data) {
      this.name = core.String._check(data[$_get]("name"));
      this.created = utils.toDateTime(data[$_get]("created"));
      this.modified = utils.toDateTime(data[$_get]("modified"));
      this.pan = utils.toNum(data[$_get]("pan"), 0.0);
      this.gain = utils.toNum(data[$_get]("gain"), 1.0);
      this[_setName](this.name);
      this[_setElementState]("timeline", utils.toBool(data[$_get]("show-timeline")));
      this[_setElementState]("editor", utils.toBool(data[$_get]("show-editor")));
      this[_setElementState]("instrument", utils.toBool(data[$_get]("show-instrument")));
      this[_setElementState]("output", utils.toBool(data[$_get]("show-output")));
      this[_setMidiInput](utils.toBool(data[$_get]("midi-input")));
      this[_setMidiOutput](utils.toBool(data[$_get]("midi-output")));
      this.setVoice(core.String._check(data[$_get]("voice")), core.String._check(data[$_get]("instrument")));
      this.settings = data;
      if (dart.test(utils.toBool(this.settings[$_get]("cloned"), false))) {
        this.editor.setCode(core.String._check(this.settings[$_get]("code")));
        this.settings[$_set]("cloned", false);
      }
    }
    save() {
      this.settings[$_set]("id", this.id);
      this.settings[$_set]("name", this.name);
      this.settings[$_set]("author", this.author);
      this.settings[$_set]("code", this.editor.getCode());
      this.settings[$_set]("uid", this.uid);
      this.settings[$_set]("description", this.description);
      this.settings[$_set]("beats", this.beats);
      this.settings[$_set]("tempo", this.clock.bpm);
      this.settings[$_set]("meter", this.clock.meter);
      this.settings[$_set]("key", this.clock.key);
      this.settings[$_set]("lines", this.lineCount);
      this.settings[$_set]("pan", this.pan);
      this.settings[$_set]("gain", this.gain);
      this.settings[$_set]("created", dart.toString(this.created));
      this.settings[$_set]("modified", dart.toString(this.modified));
      return collection.LinkedHashMap.from(this.settings);
    }
    onProgramUpdate(change) {
    }
    onCursorActivity(position) {
      let line = core.int._check(position[$_get]("line"));
      if (dart.test(this.editor.isDirty) && line != this[_lastline]) {
        this.compile();
      }
      this[_lastline] = line;
    }
    onLineAdded(change) {
      this.compile();
    }
    onLineRemoved(change) {
      this.compile();
    }
    onEditorBlur() {
    }
    compile(runWhenDone) {
      if (runWhenDone === void 0) runWhenDone = false;
      return async.async(dart.void, (function* compile() {
        if (tunepad.PythonCell.boilerplate == null) {
          tunepad.PythonCell.boilerplate = (yield html.HttpRequest.getString("packages/compiler/python/boilerplate.py"));
        }
        if (!dart.test(this.compiler.isCompiling)) {
          this.editor.clearErrorMarkers();
          this.editor.clearTraceMarkers();
          this.editor.clean();
          this.root[$querySelectorAll](html.Element, ".error-container").classes.add("hidden");
          html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-error").classes.add("hidden");
          this.root[$classes].remove("error");
          let code = this.editor.getCode();
          if (code == null) return;
          let success = (yield this.compiler.compile(code));
          this[_updateGadgetInfo](this.editor.getCode()[$split]("\n")[$length]);
          if (dart.test(runWhenDone) && dart.test(success)) {
            this.play();
          }
        }
      }).bind(this));
    }
    onPythonDone(outputs) {
      let t2;
      let out_count = 0;
      this.root[$querySelectorAll](html.Element, ".output-hint").classes.remove("visible");
      let out = html.PreElement._check(this.root.querySelector(".output"));
      if (out != null) out[$innerHtml] = "--- PYTHON OUTPUT ---\n";
      this.trace.clear();
      for (let output of outputs) {
        if (output != null && typeof output == 'string') {
          if (output[$startsWith]("**TRACE**")) {
            this.trace.addEvent(output[$substring](9));
          } else if (output[$trim]() !== "") {
            this.trace.addPrint(output);
            t2 = out;
            t2[$innerHtml] = dart.notNull(t2[$innerHtml]) + (dart.notNull(output) + "\n");
            out_count = out_count + 1;
          }
        }
      }
      this.beats = dart.notNull(this.clock.beatsPerMeasure) * (dart.notNull(this.trace.beats) / dart.notNull(this.clock.beatsPerMeasure))[$ceil]();
      if (dart.notNull(this.beats) <= 0) this.beats = this.clock.beatsPerMeasure;
      this.timeline.setTrace(this.trace, this.beats);
      if (out_count > 0) {
        this.root[$querySelectorAll](html.Element, ".output-hint").classes.add("visible");
        this.root.querySelector(".output-count")[$innerHtml] = dart.str(out_count);
        async.Timer.new(C0 || CT.C0, dart.fn(() => {
          this.root[$querySelectorAll](html.Element, ".output-hint").classes.remove("visible");
        }, VoidToNull()));
      }
      this.datastore.save(this);
    }
    onPythonError(name, message, details, line) {
      let t2, t2$;
      let name_el = this.root.querySelector(".error-name");
      let desc_el = this.root.querySelector(".error-description");
      if (name_el != null && desc_el != null) {
        name_el[$innerHtml] = name;
        desc_el[$innerHtml] = message;
        if (dart.notNull(line) > 0) {
          t2 = desc_el;
          t2[$innerHtml] = dart.notNull(t2[$innerHtml]) + (" on line " + dart.str(line) + ".");
        }
        if (details != null && details !== "") {
          t2$ = desc_el;
          t2$[$innerHtml] = dart.notNull(t2$[$innerHtml]) + ("<br>" + dart.str(details));
        }
        this.root[$querySelectorAll](html.Element, ".error-container").classes.remove("hidden");
        this.root[$classes].add("error");
        html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-error").classes.remove("hidden");
      }
      if (dart.notNull(line) > 0) {
        this.editor.setErrorMarker(line);
      }
    }
    get isPlaying() {
      return this.clock.isPlaying(this);
    }
    playPause() {
      dart.test(this.isPlaying) ? this.pause() : this.play();
    }
    play() {
      if (dart.test(this.editor.isDirty)) {
        this.compile(true);
      } else if (this.clock.context != null) {
        this.root[$querySelectorAll](html.Element, ".play-button").classes.add("hidden");
        this.root[$querySelectorAll](html.Element, ".pause-button").classes.remove("hidden");
        html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-play-button").classes.add("hidden");
        html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-pause-button").classes.remove("hidden");
        html.querySelectorAll(html.Element, "#mixer-" + dart.str(this.id) + " .mixer-play-button").classes.add("hidden");
        html.querySelectorAll(html.Element, "#mixer-" + dart.str(this.id) + " .mixer-pause-button").classes.remove("hidden");
        if (!dart.test(this.isPlaying)) {
          this[_gainNode] = this.clock.context[$createGain]();
          this[_gainNode].gain.value = this.gain;
          this[_panNode] = this.clock.context.createStereoPanner();
          this[_panNode].pan.value = this.pan;
          this[_panNode][$connectNode](this[_gainNode]);
          this[_gainNode][$connectNode](this.clock.context.destination);
          this.synth.setTempo(this.clock.bpm);
          this.clock.play(this);
          let b = this.clock.beats[$modulo](this.beats);
          this.synth.scheduleNotes(this.trace, this[_panNode], {offset: b});
          this[_looped] = false;
          this[_lastTime] = -1;
          html.window[$animationFrame].then(dart.void, dart.bind(this, 'animate'));
        }
      }
      this.trace.restart();
    }
    pause() {
      this[_pauseHelper]();
      this.clock.pause(this);
    }
    stop() {
      this[_pauseHelper]();
      this[_lastTrace] = null;
      this.trace.restart();
      if (this.timeline != null) this.timeline.playhead = 0;
    }
    [_pauseHelper]() {
      this.root[$querySelectorAll](html.Element, ".play-button").classes.remove("hidden");
      this.root[$querySelectorAll](html.Element, ".pause-button").classes.add("hidden");
      html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-play-button").classes.remove("hidden");
      html.querySelectorAll(html.Element, "#cell-nav-" + dart.str(this.id) + " .shortcut-pause-button").classes.add("hidden");
      html.querySelectorAll(html.Element, "#mixer-" + dart.str(this.id) + " .mixer-play-button").classes.remove("hidden");
      html.querySelectorAll(html.Element, "#mixer-" + dart.str(this.id) + " .mixer-pause-button").classes.add("hidden");
      if (this[_gainNode] != null) {
        this[_gainNode].disconnect();
        this[_gainNode] = null;
      }
      if (this[_panNode] != null) {
        this[_panNode].disconnect();
        this[_panNode] = null;
      }
      this.synth.cancelAllNotes();
      this.instrument.allNotesOff();
    }
    startRecording() {
      this.root[$querySelectorAll](html.Element, ".recording-container").classes.remove("hidden");
      this.root[$classes].add("recording");
      if (!dart.test(this.recorder.isRecording)) {
        this.recorder.record();
      }
    }
    stopRecording() {
      this.root[$classes].remove("recording");
      this.stopMetronome();
      if (dart.test(this.recorder.isRecording)) {
        this.recorder.stop();
      }
    }
    clearRecording() {
      let output = html.PreElement._check(this.root.querySelector(".recording-pad"));
      if (output != null) output[$innerHtml] = "# RECORDING PAD\n";
    }
    copyRecording() {
      let output = html.PreElement._check(this.root.querySelector(".recording-pad"));
      if (output != null) {
        html.window.navigator.clipboard[$writeText](output[$innerHtml]);
      }
    }
    updateRecording() {
      if (dart.test(this.recorder.isRecording)) {
        let output = html.PreElement._check(this.root.querySelector(".recording-pad"));
        if (output != null) {
          output[$innerHtml] = dart.toString(this.recorder);
          output[$scrollTop] = output[$scrollHeight];
        }
      }
    }
    toggleQuantize() {
      if (dart.test(this.recorder.quantize)) {
        this.root[$querySelectorAll](html.Element, ".quant-button i.fas").classes.remove("fa-check");
      } else {
        this.root[$querySelectorAll](html.Element, ".quant-button i.fas").classes.add("fa-check");
      }
      this.recorder.quantize = !dart.test(this.recorder.quantize);
    }
    step() {
      let t = this[_lastTrace];
      this.clock.stopAll();
      this[_lastTrace] = t;
      if (this[_lastTrace] != null) {
        this.editor.setTraceMarker(core.int._check(this[_lastTrace]._get("line")));
        this.timeline.playhead = this[_lastTrace].time;
        this.trace.advanceToEvent(this[_lastTrace]);
      }
      let subtrace = new trace.Trace.new();
      let e = this.trace.advance();
      let advance = 0.0;
      while (e != null && e.command != trace.TraceEvent.TRACE) {
        subtrace.trace[$add](e);
        advance = math.max(core.num, advance, e.duration);
        e = this.trace.advance();
      }
      if (e != null && e.command == trace.TraceEvent.TRACE) {
        if (this.clock.context != null) {
          this.synth.scheduleNotes(subtrace, this.clock.context.destination, {offset: e.time});
        }
        this.timeline.playhead = dart.notNull(e.time) + advance - 0.01;
        this.editor.setTraceMarker(core.int._check(e._get("line")));
        this[_lastTrace] = e;
      } else {
        this.trace.restart();
        this.timeline.playhead = 0;
        this[_lastTrace] = null;
      }
    }
    animate(t) {
      if (dart.test(this.isPlaying) && this.clock.context != null) {
        let current = this.clock.beats[$modulo](this.beats);
        let remaining = dart.notNull(this.beats) - current;
        if (current < dart.notNull(this[_lastTime])) {
          if (!dart.test(this[_looped])) {
            this.synth.scheduleNotes(this.trace, this[_panNode], {offset: current});
          }
          this[_lastTime] = -1;
          this[_looped] = false;
          this.instrument.allNotesOff();
        } else if (remaining > 0 && remaining < 0.5 && !dart.test(this[_looped])) {
          this.synth.scheduleNotes(this.trace, this[_panNode], {delay: remaining});
          this[_looped] = true;
        }
        for (let e of this.trace.trace) {
          if (dart.notNull(e.time) > dart.notNull(this[_lastTime]) && dart.notNull(e.time) <= current) {
            if (e.command == trace.TraceEvent.TRACE) {
              this[_lastTrace] = e;
            }
          }
          if (e.command == trace.TraceEvent.PLAY) {
            if (dart.notNull(e.time) <= current && dart.notNull(e.end) > current) {
              if (!dart.test(this.instrument.isNoteOn(e.note.note))) this.instrument.noteOn(e.note.note);
            } else if (dart.notNull(e.time) <= dart.notNull(this[_lastTime]) && dart.notNull(e.end) > dart.notNull(this[_lastTime])) {
              this.instrument.noteOff(e.note.note);
            } else if (dart.test(this[_looped])) {
              this.instrument.noteOff(e.note.note);
            }
          }
        }
        this.timeline.playhead = current;
        this[_lastTime] = current;
        html.window[$animationFrame].then(dart.void, dart.bind(this, 'animate'));
      }
    }
    setVoice(voice, instr) {
      return async.async(dart.void, (function* setVoice() {
        if (instr == null) instr = "piano";
        this.root[$querySelectorAll](html.Element, ".voice-menu i.fas").classes.remove("fa-check");
        this.root[$querySelectorAll](html.Element, ".voice-menu .menu-item[data-voice='" + dart.str(voice) + "'] .fas").classes.add("fa-check");
        if (this.clock.context != null && this.synth.voice != voice) {
          this.root.querySelector(".voice-name")[$innerHtml] = "Loading...";
          this.pause();
          if (core.Map.is(tunepad.patches[$_get](voice))) {
            yield this.synth.loadPatch(voice, core.Map._check(tunepad.patches[$_get](voice)), this.clock.context);
            this.root.querySelector(".voice-name")[$innerHtml] = voice[$toUpperCase]();
          }
        } else {
          this.root.querySelector(".voice-name")[$innerHtml] = voice[$toUpperCase]();
        }
        this[_setInstrument](voice, instr);
      }).bind(this));
    }
    [_setInstrument](voice, instr) {
      let container = html.DivElement._check(this.root.querySelector(".instrument-container"));
      if (container == null) return;
      let old = null;
      if (instr === "drums") {
        if (!instruments.Drums.is(this.instrument)) {
          old = this.instrument;
          this.instrument = new instruments.Drums.new(core.Map._check(tunepad.patches[$_get](voice)));
        }
      } else if (instr === "drumkit") {
        if (!instruments.DrumKit.is(this.instrument)) {
          old = this.instrument;
          this.instrument = new instruments.DrumKit.new("#gadget-" + dart.str(this.id), core.Map._check(tunepad.patches[$_get](voice)));
        }
      } else if (!instruments.Piano.is(this.instrument) || !dart.test(this.instrument.isInitialized)) {
        old = this.instrument;
        this.instrument = new instruments.Piano.new();
      }
      this.root[$querySelectorAll](html.Element, ".gadget-icon").classes.removeWhere(dart.fn(item => item !== "gadget-icon", StringTobool()));
      this.root[$querySelectorAll](html.Element, ".gadget-icon").classes.add(instr);
      if (this.timeline != null) this.timeline.setInstrument(instr);
      if (old != null) {
        old.unload();
        this.instrument.insert(container);
        this[_setMidiInput](utils.toBool(this.settings[$_get]("midi-input")));
        this.instrument.onNoteEvent.listen(dart.fn(e => {
          let t2;
          let out = core.bool._check(this.settings[$_get]("midi-output"));
          if (e.message == instruments.NoteEvent.NOTE_ON && this.clock.context != null) {
            if (dart.test(out)) this.midi.sendNoteOn(e.midi, e.velocity);
            this.recorder.noteOn(e.midi, e.velocity);
            this.synth.playNote((t2 = new note.Note.new(e.midi), t2.velocity = e.velocity, t2), this.clock.context.destination);
          } else if (e.message == instruments.NoteEvent.NOTE_OFF && this.clock.context != null) {
            if (dart.test(out)) this.midi.sendNoteOff(e.midi);
            this.recorder.noteOff(e.midi);
            this.synth.releaseNote(new note.Note.new(e.midi));
          }
          if (dart.test(this.recorder.isRecording)) {
            this.updateRecording();
          }
        }, NoteEventToNull()));
      }
    }
    onTempoChange() {
      if (dart.test(this.isPlaying)) {
        let b = this.clock.beats[$modulo](this.beats);
        this.synth.setTempo(this.clock.bpm);
      }
      this.metronome.cancelAllNotes();
    }
    onTimeSignatureChange() {
      this.stop();
      this.compile();
      this.metronome.cancelAllNotes();
    }
    onClockReset() {
      this.stop();
    }
    onClockTimeChange() {
      this.stop();
      this.pause();
      if (this.timeline != null) this.timeline.playhead = this.clock.beats[$modulo](this.beats);
    }
    pulse(beat) {
      if (this.clock.context != null) {
        this.root[$querySelectorAll](html.Element, ".metronome-button").classes.toggle("tock");
        this.metronome.setTempo(this.clock.bpm);
        if (beat === 0) {
          for (let i = 0; i < dart.notNull(this.clock.beatsPerMeasure); i = i + 1) {
            let n = i === 0 ? new note.Note.new(24) : new note.Note.new(20);
            this.metronome.scheduleNote(n, this.clock.context.destination, i);
          }
        }
      }
    }
    startMetronome() {
      if (!dart.test(this.clock.isMetronomePlaying(this))) {
        this.root[$querySelectorAll](html.Element, ".metronome-button").classes.add("playing");
        this.clock.startMetronome(this);
      }
    }
    stopMetronome() {
      if (dart.test(this.clock.isMetronomePlaying(this))) {
        this.root[$querySelectorAll](html.Element, ".metronome-button").classes.remove("playing");
        this.clock.stopMetronome(this);
        this.metronome.cancelAllNotes();
      }
    }
    toggleMetronome() {
      if (dart.test(this.clock.isMetronomePlaying(this))) {
        this.stopMetronome();
      } else {
        this.startMetronome();
      }
    }
    getBoilerplate() {
      return tunepad.PythonCell.boilerplate == null ? "" : tunepad.PythonCell.boilerplate;
    }
    onScrubEnter(e) {
      if (dart.test(e.hasParam("line"))) {
        this.editor.setTraceMarker(core.int._check(e._get("line")));
      }
      if (this.clock.context != null) {
        this.synth.playNote(e.note, this.clock.context.destination);
      }
      this.instrument.noteOn(e.note.note);
    }
    onScrubLeave(e) {
      this.editor.clearTraceMarkers();
      this.synth.releaseNote(e.note);
      this.instrument.noteOff(e.note.note);
    }
    onHoverEnter(e) {
      if (dart.test(e.hasParam("line"))) {
        this.editor.setTraceMarker(core.int._check(e._get("line")));
      }
    }
    onHoverLeave(e) {
      this.editor.clearTraceMarkers();
      this.synth.releaseNote(e.note);
    }
    onClickNote(e) {
      if (this.clock.context != null) {
        this.synth.playNote(e.note, this.clock.context.destination);
      }
      if (dart.test(e.hasParam("line"))) {
        this.editor.setTraceMarker(core.int._check(e._get("line")));
      }
      this.instrument.noteOn(e.note.note);
    }
    onReleaseNote(e) {
      this.synth.releaseNote(e.note);
      this.instrument.noteOff(e.note.note);
    }
    onMovePlayhead(playhead) {
      this.pause();
      this[_lastTrace] = this.trace.advanceToBeat(playhead);
    }
    onDragPlayheadStart(playhead) {
      this.pause();
    }
    onDragPlayheadStop(playhead) {
      this.pause();
      this.synth.releaseAllNotes();
      this[_lastTrace] = this.trace.advanceToBeat(playhead);
      this.clock.setTime(playhead);
    }
    [_exportMidi]() {
      if (this.clock.context == null) return;
      let blob = this.midi.exportMidi(this.clock.bpm, this.trace.toJSON());
      if (blob != null) {
        let objectUrl = html.Url.createObjectUrlFromBlob(blob);
        let link = html.AnchorElement.new();
        link.href = objectUrl;
        link.download = "tunepad-" + dart.str(this.name) + ".midi";
        link.click();
        html.Url.revokeObjectUrl(objectUrl);
      }
    }
    [_downloadAudio](format) {
      return async.async(dart.void, (function* _downloadAudio() {
        let processed = (yield this[_exportAudio](format));
        if (processed == null) return;
        if (format === "mp3") {
          processed.downloadMP3("tunepad-" + dart.str(this.name) + ".mp3");
        } else {
          processed.downloadWAV("tunepad-" + dart.str(this.name) + ".wav");
        }
      }).bind(this));
    }
    [_exportAudio](format) {
      return async.async(buffer.GrowableAudioBuffer, (function* _exportAudio() {
        let t2;
        if (this.clock.context == null) return null;
        this.pause();
        let context = this.clock.context;
        let processed = new buffer.GrowableAudioBuffer.new(2);
        let gain = (t2 = context[$createGain](), t2.gain.value = 0.0, t2);
        let recorder = context[$createScriptProcessor](1024, 2, 2);
        recorder[$connectNode](gain);
        gain[$connectNode](context.destination);
        this.synth.setTempo(this.clock.bpm);
        let total_length = dart.notNull(this.beats) * 60 / dart.notNull(this.clock.bpm);
        this[_showProgressDialog]("Exporting audio data...");
        this[_setProgressStatus]("0%");
        this.synth.scheduleNotes(this.trace, recorder);
        let iter = async.StreamIterator.new(recorder[$onAudioProcess]);
        try {
          while (yield iter.moveNext()) {
            let e = iter.current;
            {
              processed.append(e.inputBuffer);
              for (let c = 0; c < dart.notNull(e.inputBuffer.numberOfChannels); c = c + 1) {
                let src = e.inputBuffer.getChannelData(c);
                e.outputBuffer.copyToChannel(src, c, 0);
              }
              if (!dart.test(this.synth.isPlaying)) {
                gain.disconnect();
                recorder.disconnect();
                gain = null;
                recorder = null;
                this[_hideProgressDialog]();
                return processed;
              } else {
                let progress = math.min(core.num, 1.0, dart.notNull(processed.duration) / total_length);
                this[_setProgressStatus](dart.str((progress * 100)[$round]()) + "%");
              }
            }
          }
        } finally {
          yield iter.cancel();
        }
      }).bind(this));
    }
    [_showProgressDialog](message) {
      let dialog = dialog$.Dialog.openModal("#export-dialog-template");
      if (dialog != null) {
        let m = dialog.querySelector(".progress-status");
        if (m != null) m[$innerHtml] = message;
      }
    }
    [_hideProgressDialog]() {
      dialog$.Dialog.closeModal();
    }
    [_setProgressStatus](status) {
      let m = html.HtmlElement._check(html.querySelector(".progress-dialog .progress-status"));
      if (m != null) m[$innerHtml] = status;
    }
    [_setName](name) {
      let nameField = html.InputElement._check(this.root.querySelector(".gadget-name"));
      if (nameField != null) nameField.value = name;
    }
    [_showElement](name) {
      this.root[$querySelectorAll](html.Element, "." + dart.str(name) + "-container").classes.remove("hidden");
      this.root[$querySelectorAll](html.Element, ".menu-item[data-command='show-" + dart.str(name) + "'] i.fas").classes.add("fa-check");
      this.settings[$_set]("show-" + dart.str(name), true);
    }
    [_hideElement](name) {
      this.root[$querySelectorAll](html.Element, "." + dart.str(name) + "-container").classes.add("hidden");
      this.root[$querySelectorAll](html.Element, ".menu-item[data-command='show-" + dart.str(name) + "'] i.fas").classes.remove("fa-check");
      this.settings[$_set]("show-" + dart.str(name), false);
    }
    [_isElementHidden](name) {
      return this.root[$querySelectorAll](html.Element, "." + dart.str(name) + "-container").classes.contains("hidden");
    }
    [_toggleElement](name) {
      dart.test(this[_isElementHidden](name)) ? this[_showElement](name) : this[_hideElement](name);
    }
    [_setElementState](name, visible) {
      dart.test(visible) ? this[_showElement](name) : this[_hideElement](name);
    }
    [_toggleMidiInput]() {
      this[_setMidiInput](!dart.test(this.instrument.isMidiArmed()));
    }
    [_toggleMidiOutput]() {
      this[_setMidiOutput](!dart.dtest(this.settings[$_get]("midi-output")));
    }
    [_setMidiInput](armed) {
      if (dart.test(armed)) {
        this.root[$querySelectorAll](html.Element, ".menu-item[data-command='midi-input'] i.fas").classes.add("fa-check");
        this.instrument.armMidi();
      } else {
        this.root[$querySelectorAll](html.Element, ".menu-item[data-command='midi-input'] i.fas").classes.remove("fa-check");
        this.instrument.disarmMidi();
      }
      this.settings[$_set]("midi-input", armed);
    }
    [_setMidiOutput](armed) {
      this.settings[$_set]("midi-output", armed);
      if (dart.test(armed)) {
        this.root[$querySelectorAll](html.Element, ".menu-item[data-command='midi-output'] i.fas").classes.add("fa-check");
      } else {
        this.root[$querySelectorAll](html.Element, ".menu-item[data-command='midi-output'] i.fas").classes.remove("fa-check");
      }
    }
    [_shareTrack]() {
      if (dart.test(this.datastore.isAnonymous)) {
        let dialog = dialog$.Dialog.openModal("#share-login-dialog");
        if (dialog != null) {
          dialog[$querySelectorAll](html.Element, ".confirm-button").onClick.listen(dart.fn(e => {
            dialog$.Dialog.closeModal();
            tunepad.UserAccounts.login(this.datastore);
          }, MouseEventToNull()));
        }
      } else {
        let dialog = dialog$.Dialog.openModal("#share-dialog", new (IdentityMapOfString$dynamic()).from([".track-name", this.name, ".track-author", this.datastore.user.name, ".track-duration", dart.str(this.beats) + " beats (" + (dart.notNull(this.beats) * 60 / dart.notNull(this.clock.bpm))[$toStringAsFixed](1) + " seconds)", ".track-tempo", dart.str(this.clock.bpm) + " bpm", ".track-meter", dart.str(this.clock.meter) + " time", ".track-key", dart.str(this.clock.key), ".track-code", dart.str(this.lineCount) + " lines of code", ".track-description textarea", this.description]));
        dialog[$querySelectorAll](html.Element, ".gadget-icon").classes.add(core.String._check(this.settings[$_get]("instrument")));
        dialog[$querySelectorAll](html.Element, ".confirm-button").onClick.listen(dart.fn(e => async.async(core.Null, (function*() {
          let text = html.TextAreaElement._check(dialog.querySelector(".track-description textarea"));
          if (text != null) this.settings[$_set]("description", text.value);
          this.settings[$_set]("public", true);
          dialog$.Dialog.closeModal();
          let processed = (yield this[_exportAudio]("mp3"));
          if (processed != null) {
            try {
              yield this.datastore.publishTrack(this, processed.toMP3Base64());
              dialog$.Dialog.message("Thanks for sharing <b>" + dart.str(this.name) + "</b>!<br>You can now see your track in the TunePad library.");
            } catch (e$) {
              let e = dart.getThrown(e$);
              dialog$.Dialog.message("There was a problem publishing your track<br>in the TunePad library.");
            }
          }
        }).bind(this)), MouseEventToFutureOfNull()));
      }
    }
    [_doContextMenu](menu) {
      let command = menu[$dataset][$_get]("command");
      switch (command) {
        case "delete-track":
        {
          async.Timer.new(C1 || CT.C1, dart.fn(() => {
            if (dart.test(html.window.confirm("Are you sure you want to delete this track?"))) {
              this.datastore.remove(this);
              this.pause();
              this.root[$remove]();
            }
          }, VoidToNull()));
          return;
        }
        case "clone-track":
        {
          this.datastore.clonePythonCell(this.save());
          return;
        }
        case "show-instrument":
        {
          this[_toggleElement]("instrument");
          break;
        }
        case "show-timeline":
        {
          this[_toggleElement]("timeline");
          break;
        }
        case "show-editor":
        {
          this[_toggleElement]("editor");
          break;
        }
        case "show-output":
        {
          this[_toggleElement]("output");
          break;
        }
        case "note-hints":
        {
          this.instrument.toggleNoteHints();
          break;
        }
        case "midi-hints":
        {
          this.instrument.toggleMidiHints();
          break;
        }
        case "keyb-hints":
        {
          this.instrument.toggleKeyboardHints();
          break;
        }
        case "export-wav":
        {
          this[_downloadAudio]("wav");
          return;
        }
        case "export-mp3":
        {
          this[_downloadAudio]("mp3");
          return;
        }
        case "export-midi":
        {
          this[_exportMidi]();
          return;
        }
        case "midi-input":
        {
          this[_toggleMidiInput]();
          break;
        }
        case "midi-output":
        {
          this[_toggleMidiOutput]();
          break;
        }
        case "share":
        {
          this[_shareTrack]();
          break;
        }
      }
      this.datastore.save(this);
    }
    [_updateGadgetInfo](count) {
      let div = html.DivElement._check(this.root.querySelector(".gadget-info"));
      if (div != null) div[$innerHtml] = dart.str(this.beats) + " BEATS &mdash; " + dart.str(count) + " LINES";
    }
  };
  (tunepad.PythonCell.new = function(id, datastore, clock, container) {
    let t2;
    this[settings] = new _js_helper.LinkedMap.new();
    this[timeline] = null;
    this[editor] = null;
    this[compiler$] = null;
    this[synth$] = new scheduler.SchedulerSynth.new();
    this[metronome] = new synth.Synthesizer.new();
    this[instrument] = new instruments.Piano.new();
    this[recorder] = null;
    this[root] = null;
    this[beats] = 4;
    this[_gain] = 1.0;
    this[_gainNode] = null;
    this[_pan] = 0.0;
    this[_panNode] = null;
    this[trace$] = new trace.Trace.new();
    this[midi$] = midi.MIDIManager.new();
    this[_lastline] = 0;
    this[_lastTrace] = null;
    this[_lastTime] = -1;
    this[_looped] = false;
    this[datastore$] = datastore;
    this[clock$] = clock;
    tunepad.PythonCell.__proto__.new.call(this, id);
    let template = html.TemplateElement._check(html.querySelector("#gadget-template"));
    if (template == null) return;
    this.root = (t2 = html.DivElement.new(), t2.id = "gadget-" + dart.str(id), t2.className = "gadget-container", t2);
    this.root[$append](template.content[$clone](true));
    container[$append](this.root);
    this.editor = new codemirror.CodeMirror.new(this, "#gadget-" + dart.str(id) + " .python-editor");
    this.editor.initialize();
    this.editor.connectFirepad(dart.str(this.datastore.root) + "/cells/" + dart.str(id));
    this.timeline = new tunepad.Timeline.new(this);
    this.timeline.insert(html.HtmlElement._check(this.root.querySelector(".timeline-container")));
    this.compiler = new compiler.PythonCompiler.new(this);
    this.settings = tunepad.PythonCell.DEFAULT_SETTINGS;
    this.datastore.addUpdateCallback(this, dart.bind(this, 'load'));
    this.datastore.addRemovedCallback(this, dart.fn(data => {
    }, dynamicToNull()));
    this.recorder = new tunepad.NoteRecorder.new(this.clock);
    this.midi.onMessage.listen(dart.fn(e => {
      let t2;
      if (dart.test(this.instrument.isMidiArmed(e.port))) {
        if (e.command === 9 && dart.notNull(e.velocity) > 0) {
          this.instrument.noteOn(e.note, e.velocity);
          this.recorder.noteOn(e.note, e.velocity);
          if (this.clock.context != null) {
            this.synth.playNote((t2 = new note.Note.new(e.note), t2.velocity = e.velocity, t2), this.clock.context.destination);
          }
        } else if (e.command === 8 || e.command === 9 && e.velocity === 0) {
          this.instrument.noteOff(e.note);
          this.recorder.noteOff(e.note);
          this.synth.releaseNote(new note.Note.new(e.note));
        } else if (e.command === 14) {
          let val = (dart.notNull(e.velocity) * 128 + dart.notNull(e.note) - 8192) / 8192;
          this.synth.pitchBend(val);
        }
        if (dart.test(this.recorder.isRecording)) {
          this.updateRecording();
        }
      }
    }, MIDIEventToNull()));
    this.root[$querySelectorAll](html.Element, ".instrument-container").onMouseDown.listen(dart.fn(e => {
      this.instrument.armKeyboard();
      this.instrument.showKeyboardHints();
      this.root[$querySelectorAll](html.Element, ".instrument-container").classes.add("armed");
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".instrument-container").onBlur.listen(dart.fn(e => {
      this.instrument.disarmKeyboard();
      this.instrument.hideKeyboardHints();
      this.root[$querySelectorAll](html.Element, ".instrument-container").classes.remove("armed");
    }, EventToNull()));
    this.root[$querySelectorAll](html.Element, ".play-button").onClick.listen(dart.fn(e => {
      this.play();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".pause-button").onClick.listen(dart.fn(e => {
      this.pause();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".step-button").onClick.listen(dart.fn(e => {
      this.step();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".record-button").onClick.listen(dart.fn(e => {
      this.startRecording();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".stop-button").onClick.listen(dart.fn(e => {
      this.stopRecording();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".clear-button").onClick.listen(dart.fn(e => {
      this.clearRecording();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".copy-button").onClick.listen(dart.fn(e => {
      this.copyRecording();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".quant-button").onClick.listen(dart.fn(e => {
      this.toggleQuantize();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".record-close-button").onClick.listen(dart.fn(e => {
      this.root[$querySelectorAll](html.Element, ".recording-container").classes.add("hidden");
      this.stopRecording();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".metronome-button").onClick.listen(dart.fn(e => {
      this.toggleMetronome();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".voice-selector").onMouseDown.listen(dart.fn(e => {
      tunepad.toggleContextMenu(this.root.querySelector(".voice-selector .context-menu"));
      e.stopPropagation();
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".voice-menu .menu-item").onMouseDown.listen(dart.fn(e => {
      this.settings[$_set]("voice", html.HtmlElement.as(e[$currentTarget])[$dataset][$_get]("voice"));
      this.settings[$_set]("instrument", html.HtmlElement.as(e[$currentTarget])[$dataset][$_get]("instrument"));
      this.datastore.save(this);
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".gadget-name").onBlur.listen(dart.fn(e => {
      let nameField = html.InputElement._check(this.root.querySelector(".gadget-name"));
      if (nameField != null) {
        this.name = nameField.value;
        this.datastore.save(this);
      }
    }, EventToNull()));
    this.root[$querySelectorAll](html.Element, ".gadget-name").onKeyPress.listen(dart.fn(e => {
      if (e.keyCode === 13) {
        this.root.querySelector(".gadget-name").blur();
      }
    }, KeyboardEventToNull()));
    this.root[$querySelectorAll](html.Element, ".output-hint").onMouseDown.listen(dart.fn(e => {
      this[_showElement]("output");
      this.datastore.save(this);
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".output-container .close-button").onClick.listen(dart.fn(e => {
      this[_hideElement]("output");
      this.datastore.save(this);
    }, MouseEventToNull()));
    this.root[$querySelectorAll](html.Element, ".menu-button").onMouseDown.listen(dart.fn(e => async.async(core.Null, (function*() {
      e.stopPropagation();
      tunepad.toggleContextMenu(this.root.querySelector(".menu-button .context-menu"));
    }).bind(this)), MouseEventToFutureOfNull()));
    this.root[$querySelectorAll](html.Element, ".menu-button .menu-item").onMouseDown.listen(dart.fn(e => async.async(core.Null, (function*() {
      e.stopPropagation();
      let menu = html.HtmlElement.as(e[$currentTarget]);
      if (menu != null) this[_doContextMenu](menu);
      tunepad.toggleContextMenu(this.root.querySelector(".menu-button .context-menu"));
    }).bind(this)), MouseEventToFutureOfNull()));
  }).prototype = tunepad.PythonCell.prototype;
  dart.addTypeTests(tunepad.PythonCell);
  dart.setMethodSignature(tunepad.PythonCell, () => ({
    __proto__: dart.getMethods(tunepad.PythonCell.__proto__),
    initAudio: dart.fnType(dart.void, []),
    load: dart.fnType(dart.void, [core.Map]),
    save: dart.fnType(core.Map, []),
    onProgramUpdate: dart.fnType(dart.void, [core.Map]),
    onCursorActivity: dart.fnType(dart.void, [core.Map]),
    onLineAdded: dart.fnType(dart.void, [core.Map]),
    onLineRemoved: dart.fnType(dart.void, [core.Map]),
    onEditorBlur: dart.fnType(dart.void, []),
    compile: dart.fnType(dart.void, [], [core.bool]),
    onPythonDone: dart.fnType(dart.void, [core.List]),
    onPythonError: dart.fnType(dart.void, [core.String, core.String, core.String, core.int]),
    playPause: dart.fnType(dart.void, []),
    play: dart.fnType(dart.void, []),
    pause: dart.fnType(dart.void, []),
    stop: dart.fnType(dart.void, []),
    [_pauseHelper]: dart.fnType(dart.void, []),
    startRecording: dart.fnType(dart.void, []),
    stopRecording: dart.fnType(dart.void, []),
    clearRecording: dart.fnType(dart.void, []),
    copyRecording: dart.fnType(dart.void, []),
    updateRecording: dart.fnType(dart.void, []),
    toggleQuantize: dart.fnType(dart.void, []),
    step: dart.fnType(dart.void, []),
    animate: dart.fnType(dart.void, [core.num]),
    setVoice: dart.fnType(dart.void, [core.String, core.String]),
    [_setInstrument]: dart.fnType(dart.void, [core.String, core.String]),
    onTempoChange: dart.fnType(dart.void, []),
    onTimeSignatureChange: dart.fnType(dart.void, []),
    onClockReset: dart.fnType(dart.void, []),
    onClockTimeChange: dart.fnType(dart.void, []),
    pulse: dart.fnType(dart.void, [core.int]),
    startMetronome: dart.fnType(dart.void, []),
    stopMetronome: dart.fnType(dart.void, []),
    toggleMetronome: dart.fnType(dart.void, []),
    getBoilerplate: dart.fnType(core.String, []),
    onScrubEnter: dart.fnType(dart.void, [trace.TraceEvent]),
    onScrubLeave: dart.fnType(dart.void, [trace.TraceEvent]),
    onHoverEnter: dart.fnType(dart.void, [trace.TraceEvent]),
    onHoverLeave: dart.fnType(dart.void, [trace.TraceEvent]),
    onClickNote: dart.fnType(dart.void, [trace.TraceEvent]),
    onReleaseNote: dart.fnType(dart.void, [trace.TraceEvent]),
    onMovePlayhead: dart.fnType(dart.void, [core.num]),
    onDragPlayheadStart: dart.fnType(dart.void, [core.num]),
    onDragPlayheadStop: dart.fnType(dart.void, [core.num]),
    [_exportMidi]: dart.fnType(dart.void, []),
    [_downloadAudio]: dart.fnType(dart.void, [core.String]),
    [_exportAudio]: dart.fnType(async.Future$(buffer.GrowableAudioBuffer), [core.String]),
    [_showProgressDialog]: dart.fnType(dart.void, [core.String]),
    [_hideProgressDialog]: dart.fnType(dart.void, []),
    [_setProgressStatus]: dart.fnType(dart.void, [core.String]),
    [_setName]: dart.fnType(dart.void, [core.String]),
    [_showElement]: dart.fnType(dart.void, [core.String]),
    [_hideElement]: dart.fnType(dart.void, [core.String]),
    [_isElementHidden]: dart.fnType(core.bool, [core.String]),
    [_toggleElement]: dart.fnType(dart.void, [core.String]),
    [_setElementState]: dart.fnType(dart.void, [core.String, core.bool]),
    [_toggleMidiInput]: dart.fnType(dart.void, []),
    [_toggleMidiOutput]: dart.fnType(dart.void, []),
    [_setMidiInput]: dart.fnType(dart.void, [core.bool]),
    [_setMidiOutput]: dart.fnType(dart.void, [core.bool]),
    [_shareTrack]: dart.fnType(dart.void, []),
    [_doContextMenu]: dart.fnType(dart.void, [html.HtmlElement]),
    [_updateGadgetInfo]: dart.fnType(dart.void, [core.int])
  }));
  dart.setGetterSignature(tunepad.PythonCell, () => ({
    __proto__: dart.getGetters(tunepad.PythonCell.__proto__),
    duration: core.num,
    lineCount: core.int,
    author: core.String,
    uid: core.String,
    description: core.String,
    gain: core.num,
    pan: core.num,
    isPublic: core.bool,
    hasError: core.bool,
    isPlaying: core.bool
  }));
  dart.setSetterSignature(tunepad.PythonCell, () => ({
    __proto__: dart.getSetters(tunepad.PythonCell.__proto__),
    gain: dart.dynamic,
    pan: dart.dynamic
  }));
  dart.setLibraryUri(tunepad.PythonCell, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.PythonCell, () => ({
    __proto__: dart.getFields(tunepad.PythonCell.__proto__),
    datastore: dart.fieldType(tunepad.Datastore),
    settings: dart.fieldType(core.Map),
    timeline: dart.fieldType(tunepad.Timeline),
    editor: dart.fieldType(codemirror.CodeMirror),
    compiler: dart.fieldType(compiler.PythonCompiler),
    synth: dart.fieldType(scheduler.SchedulerSynth),
    metronome: dart.fieldType(synth.Synthesizer),
    instrument: dart.fieldType(instruments.Instrument),
    recorder: dart.fieldType(tunepad.NoteRecorder),
    root: dart.fieldType(html.DivElement),
    clock: dart.fieldType(clock.PlayClock),
    beats: dart.fieldType(core.num),
    [_gain]: dart.fieldType(core.num),
    [_gainNode]: dart.fieldType(web_audio.GainNode),
    [_pan]: dart.fieldType(core.num),
    [_panNode]: dart.fieldType(web_audio.StereoPannerNode),
    trace: dart.fieldType(trace.Trace),
    midi: dart.fieldType(midi.MIDIManager),
    [_lastline]: dart.fieldType(core.int),
    [_lastTrace]: dart.fieldType(trace.TraceEvent),
    [_lastTime]: dart.fieldType(core.num),
    [_looped]: dart.fieldType(core.bool)
  }));
  dart.defineLazy(tunepad.PythonCell, {
    /*tunepad.PythonCell.boilerplate*/get boilerplate() {
      return null;
    },
    set boilerplate(_) {},
    /*tunepad.PythonCell.DEFAULT_SETTINGS*/get DEFAULT_SETTINGS() {
      return new _js_helper.LinkedMap.from(["name", "New Track", "author", "Anonymous", "description", "", "beats", 4, "tempo", 120, "meter", "4/4", "lines", 1, "key", "C major", "voice", "piano", "instrument", "piano", "show-timeline", true, "show-editor", true, "show-instrument", true, "show-output", false, "midi-input", false, "midi-output", false, "gain", 1.0, "pan", 0.0, "public", false]);
    }
  });
  const _credentials = dart.privateName(tunepad, "_credentials");
  const _updates = dart.privateName(tunepad, "_updates");
  const _adds = dart.privateName(tunepad, "_adds");
  const _removes = dart.privateName(tunepad, "_removes");
  const _logins = dart.privateName(tunepad, "_logins");
  const _logouts = dart.privateName(tunepad, "_logouts");
  const _onUpdated = dart.privateName(tunepad, "_onUpdated");
  const _onAdded = dart.privateName(tunepad, "_onAdded");
  const _onRemoved = dart.privateName(tunepad, "_onRemoved");
  const _onConnect = dart.privateName(tunepad, "_onConnect");
  const _onLogout = dart.privateName(tunepad, "_onLogout");
  const _sendJSON = dart.privateName(tunepad, "_sendJSON");
  const _onLogin = dart.privateName(tunepad, "_onLogin");
  const _saveProject = dart.privateName(tunepad, "_saveProject");
  const _saveCell = dart.privateName(tunepad, "_saveCell");
  const host$ = dart.privateName(tunepad, "Datastore.host");
  const root$ = dart.privateName(tunepad, "Datastore.root");
  const isEmpty = dart.privateName(tunepad, "Datastore.isEmpty");
  const user = dart.privateName(tunepad, "Datastore.user");
  tunepad.Datastore = class Datastore extends core.Object {
    get host() {
      return this[host$];
    }
    set host(value) {
      this[host$] = value;
    }
    get root() {
      return this[root$];
    }
    set root(value) {
      this[root$] = value;
    }
    get isEmpty() {
      return this[isEmpty];
    }
    set isEmpty(value) {
      this[isEmpty] = value;
    }
    get user() {
      return this[user];
    }
    set user(value) {
      this[user] = value;
    }
    connect() {
      return async.async(dart.void, (function* connect() {
        try {
          let data = (yield this[_sendJSON]("/api/login/"));
          if (core.Map.is(data) && dart.test(data[$containsKey]("id"))) {
            this.user = new tunepad.User.new(data[$_get]("id"));
            this.user.load(data);
          }
        } catch (e$) {
          let e = dart.getThrown(e$);
          if (tunepad.DatastoreException.is(e)) {
            core.print("No existing user session");
          } else
            throw e$;
        }
        for (let f of this[_logins])
          core.Function.apply(f, [this.user]);
      }).bind(this));
    }
    login(username, email, password) {
      return async.async(dart.void, (function* login() {
        if (!(password != null)) dart.assertFailed(null, "org-dartlang-app:///packages/tunepad/src/datastore.dart", 176, 12, "password != null");
        if (!(username != null || email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/tunepad/src/datastore.dart", 177, 12, "username != null || email != null");
        let jsonData = new (IdentityMapOfString$String()).from(["username", username, "email", email, "password", password]);
        let result = (yield this[_sendJSON]("/api/login/", "POST", jsonData));
        if (core.Map.is(result) && dart.test(result[$containsKey]("id"))) {
          for (let f of this[_logouts])
            core.Function.apply(f, [this.user]);
          this.user = new tunepad.User.new(result[$_get]("id"));
          this.user.load(result);
          for (let f of this[_logins])
            core.Function.apply(f, [this.user]);
        } else {
          dart.throw(new tunepad.DatastoreException.new(401));
        }
      }).bind(this));
    }
    loginWithGoogle() {
      js.context._set("onFirebaseLogin", dart.fn(jsonUserData => async.async(core.Null, (function*() {
        js.context._set("onFirebaseLogin", dart.bind(this, _onLogin));
        let userData = core.Map._check(convert.jsonDecode(core.String._check(jsonUserData)));
        try {
          yield this.login("", core.String._check(userData[$_get]("email")), "g00gl3");
          this.user.photo = core.String._check(userData[$_get]("photoURL"));
          this.user.displayName = core.String._check(userData[$_get]("displayName"));
          this.user.email = core.String._check(userData[$_get]("email"));
          for (let f of this[_logins])
            core.Function.apply(f, [this.user]);
        } catch (e$) {
          let e = dart.getThrown(e$);
          try {
            this.user = (yield this.register(null, core.String._check(userData[$_get]("email")), "g00gl3"));
            this.user.photo = core.String._check(userData[$_get]("photoURL"));
            this.user.displayName = core.String._check(userData[$_get]("displayName"));
            this.user.email = core.String._check(userData[$_get]("email"));
            for (let f of this[_logins])
              core.Function.apply(f, [this.user]);
          } catch (e$0) {
            let e = dart.getThrown(e$0);
            dialog$.Dialog.message("Failed to login with Google account.");
            js.context.callMethod("firebaseLogout");
          }
        }
      }).bind(this)), dynamicToFutureOfNull()));
      js.context.callMethod("firebaseLogin");
    }
    logout() {
      return async.async(tunepad.User, (function* logout() {
        js.context.callMethod("firebaseLogout");
        let result = (yield this[_sendJSON]("/api/logout/"));
        for (let f of this[_logouts])
          core.Function.apply(f, [this.user]);
        this.user = new tunepad.User.anonymous();
        for (let f of this[_logins])
          core.Function.apply(f, [this.user]);
        return this.user;
      }).bind(this));
    }
    register(username, email, password) {
      return async.async(tunepad.User, (function* register() {
        if (!(password != null && password !== "")) dart.assertFailed(null, "org-dartlang-app:///packages/tunepad/src/datastore.dart", 247, 12, "password != null && password != \"\"");
        if (!(email != null && email !== "")) dart.assertFailed(null, "org-dartlang-app:///packages/tunepad/src/datastore.dart", 248, 12, "email != null && email != \"\"");
        if (username == null) username = email;
        let data = new (IdentityMapOfString$String()).from(["username", username, "email", email, "password", password]);
        let result = (yield this[_sendJSON]("/api/register/", "POST", data));
        this.user = new tunepad.User.new(dart.dsend(result, '_get', ["id"]));
        this.user.load(core.Map._check(result));
        for (let f of this[_logins])
          core.Function.apply(f, [this.user]);
        return this.user;
      }).bind(this));
    }
    anonymousLogin() {
      js.context.callMethod("firebaseAnonymousLogin");
    }
    uniqueUsername(username) {
      return async.async(dart.dynamic, (function* uniqueUsername() {
        return yield this[_sendJSON]("/api/unique-username/", "POST", new (IdentityMapOfString$String()).from(["username", username]));
      }).bind(this));
    }
    uniqueEmail(email) {
      return async.async(dart.dynamic, (function* uniqueEmail() {
        return yield this[_sendJSON]("/api/unique-email/", "POST", new (IdentityMapOfString$String()).from(["email", email]));
      }).bind(this));
    }
    isValidEmail(email) {
      let regx = core.RegExp.new(tunepad.Datastore.REGEXP_EMAIL);
      return regx.hasMatch(email);
    }
    isValidUsername(username) {
      let regx = core.RegExp.new(tunepad.Datastore.REGEXP_USERNAME);
      return regx.hasMatch(username);
    }
    [_onLogin](jsonUserData) {
      return async.async(dart.void, function* _onLogin() {
      });
    }
    [_onConnect](jsonUserData) {
      return async.async(dart.void, function* _onConnect() {
      });
    }
    [_onLogout]() {
    }
    get isAnonymous() {
      return this.user.anonymous;
    }
    [_onUpdated](directory, jsonString) {
      if (dart.test(this[_updates][$containsKey](directory))) {
        for (let f of this[_updates][$_get](directory)) {
          core.Function.apply(f, [convert.jsonDecode(jsonString)]);
        }
      }
    }
    [_onAdded](directory, key, prevKey, jsonString) {
      if (dart.test(this[_adds][$containsKey](directory))) {
        for (let f of this[_adds][$_get](directory)) {
          core.Function.apply(f, [key, prevKey, convert.jsonDecode(jsonString)]);
        }
      }
    }
    [_onRemoved](directory, jsonString) {
      if (dart.test(this[_removes][$containsKey](directory))) {
        for (let f of this[_removes][$_get](directory)) {
          core.Function.apply(f, [convert.jsonDecode(jsonString)]);
        }
      }
    }
    addLoginCallback(callback) {
      this[_logins][$add](callback);
    }
    addLogoutCallback(callback) {
      this[_logouts][$add](callback);
    }
    addUpdateCallback(model, callback, directory) {
      if (directory === void 0) directory = null;
      if (directory == null) {
        if (tunepad.PythonCell.is(model)) {
          directory = "/" + dart.str(this.root) + "/cells/" + dart.str(model.id) + "/settings";
        } else if (tunepad.Project.is(model)) {
          directory = "/" + dart.str(this.root) + "/project";
        }
      }
      if (directory != null) {
        this[_updates][$putIfAbsent](directory, dart.fn(() => JSArrayOfFunction().of([]), VoidToListOfFunction()));
        this[_updates][$_get](directory)[$add](callback);
        js.context.callMethod("firebaseUpdatedCallback", [directory]);
      }
    }
    addRemovedCallback(model, callback, directory) {
      if (directory === void 0) directory = null;
      if (directory == null) {
        if (tunepad.PythonCell.is(model)) {
          directory = "/" + dart.str(this.root) + "/cells/" + dart.str(model.id) + "/settings";
        } else if (tunepad.Project.is(model)) {
          directory = "/" + dart.str(this.root) + "/project";
        }
      }
      if (directory != null) {
        this[_removes][$putIfAbsent](directory, dart.fn(() => JSArrayOfFunction().of([]), VoidToListOfFunction()));
        this[_removes][$_get](directory)[$add](callback);
        js.context.callMethod("firebaseRemovedCallback", [directory]);
      }
    }
    addAddedCallback(directory, callback) {
      this[_adds][$putIfAbsent](directory, dart.fn(() => JSArrayOfFunction().of([]), VoidToListOfFunction()));
      this[_adds][$_get](directory)[$add](callback);
      js.context.callMethod("firebaseAddedCallback", [directory]);
    }
    select(directory, callback) {
      this[_adds][$putIfAbsent](directory, dart.fn(() => JSArrayOfFunction().of([]), VoidToListOfFunction()));
      this[_adds][$_get](directory)[$clear]();
      this[_adds][$_get](directory)[$add](callback);
      js.context.callMethod("firebaseAddedCallback", [directory]);
    }
    save(item) {
      item.modified = new core.DateTime.now();
      if (tunepad.Project.is(item)) {
        this[_saveProject](item);
      } else if (tunepad.PythonCell.is(item)) {
        this[_saveCell](item);
      }
    }
    [_saveProject](project) {
      js.context.callMethod("firebaseUpdate", ["/" + dart.str(this.root) + "/project", convert.jsonEncode(project.save())]);
    }
    [_saveCell](cell) {
      return async.async(dart.void, (function* _saveCell() {
        let data = cell.save();
        let directory = "/" + dart.str(this.root) + "/cells/" + dart.str(cell.id) + "/settings";
        js.context.callMethod("firebaseUpdate", [directory, convert.jsonEncode(data)]);
      }).bind(this));
    }
    publishTrack(cell, preview) {
      return async.async(core.Map, (function* publishTrack() {
        if (!dart.test(cell.isPublic) || preview == null) return null;
        let gadget_id = 0;
        let cid = convert.base64Decode(core.String._check(cell.id));
        for (let i = 0; i < dart.notNull(cid[$length]) && i < 3; i = i + 1) {
          gadget_id = gadget_id + cid[$_get](dart.notNull(cid[$length]) - i - 1)[$leftShift](i * 8);
        }
        let data = cell.save();
        let track = collection.LinkedHashMap.from(data);
        track[$_set]("username", this.user.displayName);
        track[$_set]("gadget_id", gadget_id);
        track[$_set]("preview", preview);
        track[$_set]("line_count", data[$_get]("lines"));
        track[$_set]("public", true);
        try {
          let result = core.Map._check(yield this[_sendJSON]("/api/library/lookup/" + dart.str(gadget_id), "GET"));
          track[$_set]("id", result[$_get]("id"));
          track[$_set]("user_id", result[$_get]("user_id"));
          track[$_set]("like_count", result[$_get]("like_count"));
          track[$_set]("star_count", result[$_get]("star_count"));
          track[$_set]("remix_count", result[$_get]("remix_count"));
          return FutureOrOfMap()._check(yield this[_sendJSON]("/api/library/" + dart.str(result[$_get]("id")), "PUT", track));
        } catch (e$) {
          let e = dart.getThrown(e$);
          track[$_set]("user_id", this.user.uid);
          return FutureOrOfMap()._check(yield this[_sendJSON]("/api/library", "POST", track));
        }
      }).bind(this));
    }
    likeTrack(id) {
      return async.async(dart.dynamic, (function* likeTrack() {
        return yield this[_sendJSON]("/api/library/like/" + dart.str(id));
      }).bind(this));
    }
    unlikeTrack(id) {
      return async.async(dart.dynamic, (function* unlikeTrack() {
        return yield this[_sendJSON]("/api/library/unlike/" + dart.str(id));
      }).bind(this));
    }
    starTrack(id) {
      return async.async(dart.dynamic, (function* starTrack() {
        return yield this[_sendJSON]("/api/library/star/" + dart.str(id));
      }).bind(this));
    }
    unstarTrack(id) {
      return async.async(dart.dynamic, (function* unstarTrack() {
        return yield this[_sendJSON]("/api/library/unstar/" + dart.str(id));
      }).bind(this));
    }
    remixTrack(id) {
      return async.async(dart.dynamic, (function* remixTrack() {
        return yield this[_sendJSON]("/api/library/remix/" + dart.str(id));
      }).bind(this));
    }
    searchLibrary(filter, sort) {
      return async.async(core.List, (function* searchLibrary() {
        let url = "/api/library/search?filter=" + dart.str(filter[$join](",")) + "&sort=" + dart.str(sort);
        return FutureOrOfList()._check(yield this[_sendJSON](url));
      }).bind(this));
    }
    remove(item) {
      let directory = tunepad.Project.is(item) ? "/" + dart.str(this.root) + "/project" : "/" + dart.str(this.root) + "/cells/" + dart.str(item.id);
      item.modified = new core.DateTime.now();
      js.context.callMethod("firebaseRemove", [directory]);
    }
    createPythonCell() {
      let key = this.generateKey("/" + dart.str(this.root) + "/cells");
      let directory = "/" + dart.str(this.root) + "/cells/" + dart.str(key) + "/settings";
      let settings = collection.LinkedHashMap.from(tunepad.PythonCell.DEFAULT_SETTINGS);
      settings[$_set]("id", key);
      js.context.callMethod("firebaseUpdate", [directory, convert.jsonEncode(settings)]);
    }
    clonePythonCell(cellData) {
      let key = this.generateKey("/" + dart.str(this.root) + "/cells");
      let directory = "/" + dart.str(this.root) + "/cells/" + dart.str(key) + "/settings";
      let settings = collection.LinkedHashMap.from(cellData);
      settings[$_set]("id", key);
      settings[$_set]("cloned", true);
      settings[$remove]("preview");
      settings[$_set]("public", false);
      settings[$_set]("show-editor", true);
      settings[$_set]("show-instrument", true);
      settings[$_set]("show-output", false);
      settings[$_set]("show-timeline", true);
      settings[$_set]("midi-output", false);
      settings[$_set]("midi-input", false);
      settings[$_set]("original-id", cellData[$_get]("id"));
      settings[$_set]("original-uid", cellData[$_get]("uid"));
      settings[$_set]("original-author", cellData[$_get]("author"));
      js.context.callMethod("firebaseUpdate", [directory, convert.jsonEncode(settings)]);
    }
    generateKey(directory) {
      let key = core.String._check(js.context.callMethod("firebaseGenerateChildKey", [directory]));
      return key;
    }
    [_sendJSON](url, method, data) {
      if (method === void 0) method = "GET";
      if (data === void 0) data = null;
      return async.async(dart.dynamic, (function* _sendJSON() {
        try {
          let request = (yield html.HttpRequest.request(dart.str(this.host) + dart.str(url), {method: method, withCredentials: true, sendData: convert.jsonEncode(data)}));
          return convert.jsonDecode(request.responseText);
        } catch (e$) {
          let e = dart.getThrown(e$);
          if (html.ProgressEvent.is(e)) {
            dart.throw(new tunepad.DatastoreException.new(html.HttpRequest.as(e[$target]).status));
          } else
            throw e$;
        }
      }).bind(this));
    }
  };
  (tunepad.Datastore.new = function(host) {
    this[_credentials] = new _js_helper.LinkedMap.from(["apiKey", "AIzaSyBccCx1WaXXMqf8tq-_1dwO2qr76f6RHFo", "authDomain", "tunepadbeta.firebaseapp.com", "databaseURL", "https://tunepadbeta.firebaseio.com", "projectId", "tunepadbeta", "storageBucket", "tunepadbeta.appspot.com", "messagingSenderId", "803854221469", "appId", "1:803854221469:web:59b8d6beedab219d7bd474"]);
    this[root$] = null;
    this[isEmpty] = true;
    this[user] = new tunepad.User.anonymous();
    this[_updates] = new (LinkedMapOfString$ListOfFunction()).new();
    this[_adds] = new (LinkedMapOfString$ListOfFunction()).new();
    this[_removes] = new (LinkedMapOfString$ListOfFunction()).new();
    this[_logins] = JSArrayOfFunction().of([]);
    this[_logouts] = JSArrayOfFunction().of([]);
    this[host$] = host;
    js.context._set("onFirebaseUpdate", dart.bind(this, _onUpdated));
    js.context._set("onFirebaseAdded", dart.bind(this, _onAdded));
    js.context._set("onFirebaseRemoved", dart.bind(this, _onRemoved));
    js.context._set("onFirebaseLogin", dart.bind(this, _onConnect));
    js.context._set("onFirebaseLogout", dart.bind(this, _onLogout));
    this.isEmpty = core.bool._check(js.context.callMethod("firebaseInit", [convert.jsonEncode(this[_credentials])]));
    this.root = js.context.callMethod("firebaseRoot", []);
  }).prototype = tunepad.Datastore.prototype;
  dart.addTypeTests(tunepad.Datastore);
  dart.setMethodSignature(tunepad.Datastore, () => ({
    __proto__: dart.getMethods(tunepad.Datastore.__proto__),
    connect: dart.fnType(dart.void, []),
    login: dart.fnType(dart.void, [core.String, core.String, core.String]),
    loginWithGoogle: dart.fnType(dart.void, []),
    logout: dart.fnType(async.Future$(tunepad.User), []),
    register: dart.fnType(async.Future$(tunepad.User), [core.String, core.String, core.String]),
    anonymousLogin: dart.fnType(dart.void, []),
    uniqueUsername: dart.fnType(async.Future, [core.String]),
    uniqueEmail: dart.fnType(async.Future, [core.String]),
    isValidEmail: dart.fnType(core.bool, [core.String]),
    isValidUsername: dart.fnType(core.bool, [core.String]),
    [_onLogin]: dart.fnType(dart.void, [core.String]),
    [_onConnect]: dart.fnType(dart.void, [core.String]),
    [_onLogout]: dart.fnType(dart.void, []),
    [_onUpdated]: dart.fnType(dart.void, [core.String, core.String]),
    [_onAdded]: dart.fnType(dart.void, [core.String, core.String, core.String, core.String]),
    [_onRemoved]: dart.fnType(dart.void, [core.String, core.String]),
    addLoginCallback: dart.fnType(dart.void, [core.Function]),
    addLogoutCallback: dart.fnType(dart.void, [core.Function]),
    addUpdateCallback: dart.fnType(dart.void, [tunepad.DataModel, core.Function], [core.String]),
    addRemovedCallback: dart.fnType(dart.void, [tunepad.DataModel, core.Function], [core.String]),
    addAddedCallback: dart.fnType(dart.void, [core.String, core.Function]),
    select: dart.fnType(dart.void, [core.String, core.Function]),
    save: dart.fnType(dart.void, [tunepad.DataModel]),
    [_saveProject]: dart.fnType(dart.void, [tunepad.DataModel]),
    [_saveCell]: dart.fnType(dart.void, [tunepad.PythonCell]),
    publishTrack: dart.fnType(async.Future$(core.Map), [tunepad.PythonCell, core.String]),
    likeTrack: dart.fnType(async.Future, [core.int]),
    unlikeTrack: dart.fnType(async.Future, [core.int]),
    starTrack: dart.fnType(async.Future, [core.int]),
    unstarTrack: dart.fnType(async.Future, [core.int]),
    remixTrack: dart.fnType(async.Future, [core.int]),
    searchLibrary: dart.fnType(async.Future$(core.List), [core.List, core.String]),
    remove: dart.fnType(dart.void, [tunepad.DataModel]),
    createPythonCell: dart.fnType(dart.void, []),
    clonePythonCell: dart.fnType(dart.void, [core.Map]),
    generateKey: dart.fnType(core.String, [core.String]),
    [_sendJSON]: dart.fnType(async.Future, [core.String], [core.String, dart.dynamic])
  }));
  dart.setGetterSignature(tunepad.Datastore, () => ({
    __proto__: dart.getGetters(tunepad.Datastore.__proto__),
    isAnonymous: core.bool
  }));
  dart.setLibraryUri(tunepad.Datastore, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.Datastore, () => ({
    __proto__: dart.getFields(tunepad.Datastore.__proto__),
    host: dart.fieldType(core.String),
    [_credentials]: dart.finalFieldType(core.Map),
    root: dart.fieldType(dart.dynamic),
    isEmpty: dart.fieldType(core.bool),
    user: dart.fieldType(tunepad.User),
    [_updates]: dart.fieldType(core.Map$(core.String, core.List$(core.Function))),
    [_adds]: dart.fieldType(core.Map$(core.String, core.List$(core.Function))),
    [_removes]: dart.fieldType(core.Map$(core.String, core.List$(core.Function))),
    [_logins]: dart.fieldType(core.List$(core.Function)),
    [_logouts]: dart.fieldType(core.List$(core.Function))
  }));
  dart.defineLazy(tunepad.Datastore, {
    /*tunepad.Datastore.REGEXP_USERNAME*/get REGEXP_USERNAME() {
      return "^[a-zA-Z0-9]*[a-zA-Z0-9._-]*[a-zA-Z0-9]$";
    },
    /*tunepad.Datastore.REGEXP_EMAIL*/get REGEXP_EMAIL() {
      return "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$";
    }
  });
  const code$ = dart.privateName(tunepad, "DatastoreException.code");
  tunepad.DatastoreException = class DatastoreException extends core.Object {
    get code() {
      return this[code$];
    }
    set code(value) {
      this[code$] = value;
    }
  };
  (tunepad.DatastoreException.new = function(code) {
    this[code$] = -1;
    this[code$] = code;
    ;
  }).prototype = tunepad.DatastoreException.prototype;
  (tunepad.DatastoreException.Unauthorized = function() {
    this[code$] = -1;
    this.code = 401;
  }).prototype = tunepad.DatastoreException.prototype;
  dart.addTypeTests(tunepad.DatastoreException);
  tunepad.DatastoreException[dart.implements] = () => [core.Exception];
  dart.setLibraryUri(tunepad.DatastoreException, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.DatastoreException, () => ({
    __proto__: dart.getFields(tunepad.DatastoreException.__proto__),
    code: dart.fieldType(core.int)
  }));
  dart.defineLazy(tunepad.DatastoreException, {
    /*tunepad.DatastoreException.DEFAULT_ERROR*/get DEFAULT_ERROR() {
      return 0;
    },
    /*tunepad.DatastoreException.UNAUTHORIZED*/get UNAUTHORIZED() {
      return 401;
    },
    /*tunepad.DatastoreException.OBJECT_NOT_FOUND*/get OBJECT_NOT_FOUND() {
      return 404;
    },
    /*tunepad.DatastoreException.REQUEST_TOO_LARGE*/get REQUEST_TOO_LARGE() {
      return 413;
    },
    /*tunepad.DatastoreException.UNIQUE_EMAIL*/get UNIQUE_EMAIL() {
      return 1010;
    },
    /*tunepad.DatastoreException.UNIQUE_USERNAME*/get UNIQUE_USERNAME() {
      return 1020;
    }
  });
  const _registerEvents = dart.privateName(tunepad, "_registerEvents");
  const _setBpm = dart.privateName(tunepad, "_setBpm");
  const _setKey = dart.privateName(tunepad, "_setKey");
  const _setTimeSignature = dart.privateName(tunepad, "_setTimeSignature");
  const _switchTabs = dart.privateName(tunepad, "_switchTabs");
  const datastore$0 = dart.privateName(tunepad, "Project.datastore");
  const clock$0 = dart.privateName(tunepad, "Project.clock");
  const cells = dart.privateName(tunepad, "Project.cells");
  const DataModel_ClockSubscriber$36$ = class DataModel_ClockSubscriber extends tunepad.DataModel {};
  (DataModel_ClockSubscriber$36$.new = function(id) {
    DataModel_ClockSubscriber$36$.__proto__.new.call(this, id);
  }).prototype = DataModel_ClockSubscriber$36$.prototype;
  dart.applyMixin(DataModel_ClockSubscriber$36$, clock.ClockSubscriber);
  tunepad.Project = class Project extends DataModel_ClockSubscriber$36$ {
    get datastore() {
      return this[datastore$0];
    }
    set datastore(value) {
      this[datastore$0] = value;
    }
    get clock() {
      return this[clock$0];
    }
    set clock(value) {
      this[clock$0] = value;
    }
    get cells() {
      return this[cells];
    }
    set cells(value) {
      this[cells] = value;
    }
    get bpm() {
      return this.clock == null ? 120 : this.clock.bpm;
    }
    get meter() {
      return this.clock == null ? "4/4" : this.clock.meter;
    }
    get key() {
      return this.clock == null ? "C major" : this.clock.key;
    }
    get beats() {
      return this.clock == null ? 0 : this.clock.beats;
    }
    get isPlaying() {
      return !dart.test(this.clock.isPaused);
    }
    playAll() {
      html.querySelectorAll(html.Element, "#transport-pause-button").classes.remove("hidden");
      html.querySelectorAll(html.Element, "#transport-play-button").classes.add("hidden");
      this.cells[$forEach](dart.fn(cell => {
        cell.play();
      }, PythonCellToNull()));
      this.animate(0);
    }
    pauseAll() {
      this.cells[$forEach](dart.fn(cell => {
        cell.pause();
      }, PythonCellToNull()));
      html.querySelectorAll(html.Element, "#transport-pause-button").classes.add("hidden");
      html.querySelectorAll(html.Element, "#transport-play-button").classes.remove("hidden");
    }
    stopAll() {
      this.clock.stopAll();
      html.querySelectorAll(html.Element, "#transport-pause-button").classes.add("hidden");
      html.querySelectorAll(html.Element, "#transport-play-button").classes.remove("hidden");
    }
    animate(t) {
      let mc = html.HtmlElement._check(html.querySelector("#master-clock"));
      if (mc != null) mc[$innerHtml] = this.clock.timeString;
      if (dart.test(this.isPlaying)) html.window[$animationFrame].then(dart.void, dart.bind(this, 'animate'));
    }
    addCell(cell, prevKey) {
      if (this.clock.context != null) cell.initAudio();
      this.cells[$add](cell);
    }
    getCell(id) {
      for (let cell of this.cells) {
        if (dart.equals(cell.id, id)) return cell;
      }
      return null;
    }
    save() {
      return new _js_helper.LinkedMap.from(["id", this.id, "name", this.name, "bpm", this.bpm, "meter", this.meter, "key", this.key, "created", dart.toString(this.created), "modified", dart.toString(this.modified)]);
    }
    load(settings) {
      this.name = core.String._check(settings[$_get]("name"));
      this.clock.bpm = utils.toInt(settings[$_get]("bpm"), 120);
      this.clock.meter = utils.toStr(settings[$_get]("meter"), "4/4");
      this.clock.key = utils.toStr(settings[$_get]("key"), "C major");
      this.created = utils.toDateTime(settings[$_get]("created"));
      this.modified = utils.toDateTime(settings[$_get]("modified"));
      this[_setBpm]();
      this[_setKey]();
      this[_setTimeSignature]();
    }
    solo(track) {
      for (let cell of this.cells) {
        if (!dart.equals(cell.id, track.id)) {
          cell.pause();
        } else if (!dart.test(cell.isPlaying)) {
          cell.play();
        }
      }
    }
    onTempoChange() {
      this.stopAll();
    }
    onTimeSignatureChange() {
      this.stopAll();
    }
    onClockReset() {
    }
    onClockTimeChange() {
    }
    [_setTimeSignature]() {
      let time = html.HtmlElement._check(html.querySelector("#time-signature"));
      if (time != null) {
        time[$innerHtml] = this.clock.meter;
      }
      html.querySelectorAll(html.Element, "#change-time-signature i.fas").classes.remove("fa-check");
      html.querySelectorAll(html.Element, "#change-time-signature .menu-item[data-time='" + dart.str(this.clock.meter) + "'] i.fas").classes.add("fa-check");
    }
    [_setKey]() {
      let base = html.HtmlElement._check(html.querySelector("#key-base"));
      let scale = html.HtmlElement._check(html.querySelector("#key-scale"));
      let key = this.clock.key[$split](" ");
      if (base != null && scale != null && key[$length] === 2) {
        base[$innerHtml] = key[$_get](0);
        scale[$innerHtml] = key[$_get](1);
      }
      html.querySelectorAll(html.Element, "#change-key i.fas").classes.remove("fa-check");
      html.querySelectorAll(html.Element, "#change-key .menu-item[data-key='" + dart.str(this.clock.key) + "'] i.fas").classes.add("fa-check");
    }
    [_setBpm]() {
      let el = html.HtmlElement._check(html.querySelector("#bpm"));
      if (el != null) {
        el[$innerHtml] = dart.str(this.clock.bpm);
      }
      html.querySelectorAll(html.Element, "#change-bpm i.fas").classes.remove("fa-check");
      html.querySelectorAll(html.Element, "#change-bpm .menu-item[data-bpm='" + dart.str(this.clock.bpm) + "'] i.fas").classes.add("fa-check");
    }
    [_switchTabs](tabName) {
      html.querySelectorAll(html.Element, ".tab").classes.add("hidden");
      html.querySelectorAll(html.Element, ".tabs button").classes.remove("selected");
      html.querySelectorAll(html.Element, "#" + dart.str(tabName) + "-tab").classes.remove("hidden");
      html.querySelectorAll(html.Element, "#" + dart.str(tabName) + "-tab-button").classes.add("selected");
    }
    [_registerEvents]() {
      html.querySelectorAll(html.Element, "#transport-stop-button").onClick.listen(dart.fn(e => {
        this.stopAll();
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#transport-pause-button").onClick.listen(dart.fn(e => {
        this.pauseAll();
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#transport-play-button").onClick.listen(dart.fn(e => {
        this.playAll();
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#tracks-tab-button").onClick.listen(dart.fn(e => {
        this[_switchTabs]("tracks");
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#code-tab-button").onClick.listen(dart.fn(e => {
        this[_switchTabs]("code");
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#mixer-tab-button").onClick.listen(dart.fn(e => {
        this[_switchTabs]("mixer");
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-bpm .menu-item").onMouseDown.listen(dart.fn(e => {
        let menu = html.HtmlElement.as(e[$currentTarget]);
        this.clock.bpm = utils.toInt(menu[$dataset][$_get]("bpm"));
        this[_setBpm]();
        tunepad.toggleContextMenu(html.querySelector("#change-bpm .context-menu"));
        e.stopPropagation();
        this.datastore.save(this);
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-bpm").onMouseDown.listen(dart.fn(e => {
        tunepad.toggleContextMenu(html.querySelector("#change-bpm .context-menu"));
        e.stopPropagation();
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-key .menu-item").onMouseDown.listen(dart.fn(e => {
        let menu = html.HtmlElement.as(e[$currentTarget]);
        this.clock.key = menu[$dataset][$_get]("key");
        this[_setKey]();
        tunepad.toggleContextMenu(html.querySelector("#change-key .context-menu"));
        e.stopPropagation();
        this.datastore.save(this);
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-key").onMouseDown.listen(dart.fn(e => {
        tunepad.toggleContextMenu(html.querySelector("#change-key .context-menu"));
        e.stopPropagation();
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-time-signature .menu-item").onMouseDown.listen(dart.fn(e => {
        let menu = html.HtmlElement.as(e[$currentTarget]);
        this.clock.meter = menu[$dataset][$_get]("time");
        this[_setTimeSignature]();
        tunepad.toggleContextMenu(html.querySelector("#change-time-signature .context-menu"));
        e.stopPropagation();
        this.datastore.save(this);
      }, MouseEventToNull()));
      html.querySelectorAll(html.Element, "#change-time-signature").onMouseDown.listen(dart.fn(e => {
        tunepad.toggleContextMenu(html.querySelector("#change-time-signature .context-menu"));
        e.stopPropagation();
      }, MouseEventToNull()));
    }
  };
  (tunepad.Project.new = function(id, datastore) {
    this[clock$0] = new clock.PlayClock.new();
    this[cells] = JSArrayOfPythonCell().of([]);
    this[datastore$0] = datastore;
    tunepad.Project.__proto__.new.call(this, id);
    this.name = "TunePad Riff";
    this.datastore.addUpdateCallback(this, dart.bind(this, 'load'));
    html.document[$onMouseDown].first.then(core.Null, dart.fn(e => {
      this.clock.context = web_audio.AudioContext.new();
      this.clock.addSubscriber(this);
      this.cells[$forEach](dart.fn(cell => {
        cell.initAudio();
      }, PythonCellToNull()));
    }, MouseEventToNull()));
    this[_registerEvents]();
  }).prototype = tunepad.Project.prototype;
  dart.addTypeTests(tunepad.Project);
  dart.setMethodSignature(tunepad.Project, () => ({
    __proto__: dart.getMethods(tunepad.Project.__proto__),
    playAll: dart.fnType(dart.void, []),
    pauseAll: dart.fnType(dart.void, []),
    stopAll: dart.fnType(dart.void, []),
    animate: dart.fnType(dart.void, [core.num]),
    addCell: dart.fnType(dart.void, [tunepad.PythonCell, core.String]),
    getCell: dart.fnType(tunepad.PythonCell, [dart.dynamic]),
    save: dart.fnType(core.Map, []),
    load: dart.fnType(dart.void, [core.Map]),
    solo: dart.fnType(dart.void, [tunepad.PythonCell]),
    onTempoChange: dart.fnType(dart.void, []),
    onTimeSignatureChange: dart.fnType(dart.void, []),
    onClockReset: dart.fnType(dart.void, []),
    onClockTimeChange: dart.fnType(dart.void, []),
    [_setTimeSignature]: dart.fnType(dart.void, []),
    [_setKey]: dart.fnType(dart.void, []),
    [_setBpm]: dart.fnType(dart.void, []),
    [_switchTabs]: dart.fnType(dart.void, [core.String]),
    [_registerEvents]: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(tunepad.Project, () => ({
    __proto__: dart.getGetters(tunepad.Project.__proto__),
    bpm: core.int,
    meter: core.String,
    key: core.String,
    beats: core.num,
    isPlaying: core.bool
  }));
  dart.setLibraryUri(tunepad.Project, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.Project, () => ({
    __proto__: dart.getFields(tunepad.Project.__proto__),
    datastore: dart.fieldType(tunepad.Datastore),
    clock: dart.fieldType(clock.PlayClock),
    cells: dart.fieldType(core.List$(tunepad.PythonCell))
  }));
  const clock$1 = dart.privateName(tunepad, "NoteRecorder.clock");
  const start = dart.privateName(tunepad, "NoteRecorder.start");
  const recording = dart.privateName(tunepad, "NoteRecorder.recording");
  const quantize = dart.privateName(tunepad, "NoteRecorder.quantize");
  const notes = dart.privateName(tunepad, "NoteRecorder.notes");
  const Object_ClockSubscriber$36 = class Object_ClockSubscriber extends core.Object {};
  (Object_ClockSubscriber$36.new = function() {
  }).prototype = Object_ClockSubscriber$36.prototype;
  dart.applyMixin(Object_ClockSubscriber$36, clock.ClockSubscriber);
  tunepad.NoteRecorder = class NoteRecorder extends Object_ClockSubscriber$36 {
    get clock() {
      return this[clock$1];
    }
    set clock(value) {
      this[clock$1] = value;
    }
    get start() {
      return this[start];
    }
    set start(value) {
      this[start] = value;
    }
    get recording() {
      return this[recording];
    }
    set recording(value) {
      this[recording] = value;
    }
    get quantize() {
      return this[quantize];
    }
    set quantize(value) {
      this[quantize] = value;
    }
    get notes() {
      return this[notes];
    }
    set notes(value) {
      this[notes] = value;
    }
    get isRecording() {
      return this.recording;
    }
    record() {
      if (this.clock.context != null) {
        this.notes[$clear]();
        this.start = -1;
        this.recording = true;
      }
    }
    stop() {
      this.recording = false;
    }
    noteOn(midi, velocity) {
      let t8;
      if (dart.test(this.isRecording) && this.clock.context != null) {
        if (dart.notNull(this.start) < 0) this.start = this.clock.context.currentTime;
        let curr = (t8 = new tunepad.NoteSpacer.new(midi), t8.start = this.quant(this.clock.context.currentTime), t8.velocity = velocity, t8);
        let prev = dart.test(this.notes[$isEmpty]) ? null : this.notes[$last];
        if (prev != null) {
          curr.prev = prev;
          prev.next = curr;
        }
        this.notes[$add](curr);
      }
    }
    noteOff(midi) {
      let t8;
      if (dart.test(this.isRecording) && this.clock.context != null) {
        let curr = (t8 = new tunepad.NoteSpacer.new(midi), t8.start = this.quant(this.clock.context.currentTime), t8.type = "off", t8);
        let prev = dart.test(this.notes[$isEmpty]) ? null : this.notes[$last];
        if (prev != null) {
          curr.prev = prev;
          prev.next = curr;
          this.notes[$add](curr);
        }
      }
    }
    toString() {
      if (this.clock.context == null) return "";
      let result = "";
      let t = 0;
      for (let n of this.notes) {
        n.space(this.clock.context.currentTime, dart.test(this.quantize) ? tunepad.NoteRecorder.QUANT : dart.notNull(tunepad.NoteRecorder.QUANT) / 4);
        if (n.type === "on") {
          let rest = dart.notNull(n.start) - t;
          if (rest > 0) {
            result = result + ("rest(" + (dart.notNull(n.start) - t)[$toStringAsFixed](2) + ")\n");
          }
          result = result + (dart.notNull(dart.toString(n)) + "\n");
          t = dart.notNull(n.start) + dart.notNull(n.duration);
        }
      }
      return result;
    }
    onTempoChange() {
    }
    onTimeSignatureChange() {
    }
    onClockReset() {
    }
    onClockTimeChange() {
    }
    quant(t) {
      let elapsed = dart.notNull(t) - dart.notNull(this.start);
      let beats = elapsed * dart.notNull(this.clock.bpm) / 60;
      let quant = (beats / dart.notNull(tunepad.NoteRecorder.QUANT))[$round]() * dart.notNull(tunepad.NoteRecorder.QUANT);
      return dart.test(this.quantize) ? quant : beats;
    }
  };
  (tunepad.NoteRecorder.new = function(clock) {
    this[start] = -1;
    this[recording] = false;
    this[quantize] = true;
    this[notes] = JSArrayOfNoteSpacer().of([]);
    this[clock$1] = clock;
    this.clock.addSubscriber(this);
  }).prototype = tunepad.NoteRecorder.prototype;
  dart.addTypeTests(tunepad.NoteRecorder);
  dart.setMethodSignature(tunepad.NoteRecorder, () => ({
    __proto__: dart.getMethods(tunepad.NoteRecorder.__proto__),
    record: dart.fnType(dart.void, []),
    stop: dart.fnType(dart.void, []),
    noteOn: dart.fnType(dart.void, [core.num, core.int]),
    noteOff: dart.fnType(dart.void, [core.num]),
    onTempoChange: dart.fnType(dart.void, []),
    onTimeSignatureChange: dart.fnType(dart.void, []),
    onClockReset: dart.fnType(dart.void, []),
    onClockTimeChange: dart.fnType(dart.void, []),
    quant: dart.fnType(core.num, [core.num])
  }));
  dart.setGetterSignature(tunepad.NoteRecorder, () => ({
    __proto__: dart.getGetters(tunepad.NoteRecorder.__proto__),
    isRecording: core.bool
  }));
  dart.setLibraryUri(tunepad.NoteRecorder, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.NoteRecorder, () => ({
    __proto__: dart.getFields(tunepad.NoteRecorder.__proto__),
    clock: dart.fieldType(clock.PlayClock),
    start: dart.fieldType(core.num),
    recording: dart.fieldType(core.bool),
    quantize: dart.fieldType(core.bool),
    notes: dart.fieldType(core.List$(tunepad.NoteSpacer))
  }));
  dart.defineExtensionMethods(tunepad.NoteRecorder, ['toString']);
  dart.defineLazy(tunepad.NoteRecorder, {
    /*tunepad.NoteRecorder.QUANT*/get QUANT() {
      return 0.25;
    },
    set QUANT(_) {}
  });
  const type = dart.privateName(tunepad, "NoteSpacer.type");
  const midi$0 = dart.privateName(tunepad, "NoteSpacer.midi");
  const velocity = dart.privateName(tunepad, "NoteSpacer.velocity");
  const start$ = dart.privateName(tunepad, "NoteSpacer.start");
  const duration = dart.privateName(tunepad, "NoteSpacer.duration");
  const sustain = dart.privateName(tunepad, "NoteSpacer.sustain");
  const prev = dart.privateName(tunepad, "NoteSpacer.prev");
  const next = dart.privateName(tunepad, "NoteSpacer.next");
  tunepad.NoteSpacer = class NoteSpacer extends core.Object {
    get type() {
      return this[type];
    }
    set type(value) {
      this[type] = value;
    }
    get midi() {
      return this[midi$0];
    }
    set midi(value) {
      this[midi$0] = value;
    }
    get velocity() {
      return this[velocity];
    }
    set velocity(value) {
      this[velocity] = value;
    }
    get start() {
      return this[start$];
    }
    set start(value) {
      this[start$] = value;
    }
    get duration() {
      return this[duration];
    }
    set duration(value) {
      this[duration] = value;
    }
    get sustain() {
      return this[sustain];
    }
    set sustain(value) {
      this[sustain] = value;
    }
    get prev() {
      return this[prev];
    }
    set prev(value) {
      this[prev] = value;
    }
    get next() {
      return this[next];
    }
    set next(value) {
      this[next] = value;
    }
    toString() {
      if (this.type === "on" && dart.notNull(this.duration) >= 0) {
        let result = "playNote(" + dart.str(this.midi) + ", beats = " + this.duration[$toStringAsFixed](2);
        if (this.velocity !== 90) result = result + (", velocity = " + dart.str(this.velocity));
        if (dart.notNull(this.sustain) > 0) result = result + (", sustain = " + dart.str(this.sustain));
        return result + ")";
      }
      return "";
    }
    space(elapsedBeats, minDuration) {
      if (this.type === "on") {
        this.duration = -1;
        this.sustain = -1;
        let n = this.next;
        while (n != null) {
          if (n.type === "on") {
            this.duration = dart.notNull(n.start) - dart.notNull(this.start);
          } else if (n.type === "off" && n.midi == this.midi) {
            if (dart.notNull(this.duration) < 0) {
              this.duration = math.max(core.num, minDuration, dart.notNull(n.start) - dart.notNull(this.start));
            } else {
              this.sustain = dart.notNull(n.start) - dart.notNull(this.start);
            }
            return true;
          }
          n = n.next;
        }
        this.duration = dart.notNull(elapsedBeats) - dart.notNull(this.start);
      }
      return false;
    }
  };
  (tunepad.NoteSpacer.new = function(midi) {
    this[type] = "on";
    this[midi$0] = 0;
    this[velocity] = 80;
    this[start$] = 0;
    this[duration] = -1;
    this[sustain] = -1;
    this[prev] = null;
    this[next] = null;
    this[midi$0] = midi;
    ;
  }).prototype = tunepad.NoteSpacer.prototype;
  dart.addTypeTests(tunepad.NoteSpacer);
  dart.setMethodSignature(tunepad.NoteSpacer, () => ({
    __proto__: dart.getMethods(tunepad.NoteSpacer.__proto__),
    space: dart.fnType(core.bool, [core.num, core.num])
  }));
  dart.setLibraryUri(tunepad.NoteSpacer, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.NoteSpacer, () => ({
    __proto__: dart.getFields(tunepad.NoteSpacer.__proto__),
    type: dart.fieldType(core.String),
    midi: dart.fieldType(core.num),
    velocity: dart.fieldType(core.int),
    start: dart.fieldType(core.num),
    duration: dart.fieldType(core.num),
    sustain: dart.fieldType(core.num),
    prev: dart.fieldType(tunepad.NoteSpacer),
    next: dart.fieldType(tunepad.NoteSpacer)
  }));
  dart.defineExtensionMethods(tunepad.NoteSpacer, ['toString']);
  const _midi = dart.privateName(tunepad, "_midi");
  const _playhead = dart.privateName(tunepad, "_playhead");
  const _playheadLine = dart.privateName(tunepad, "_playheadLine");
  const _waveform = dart.privateName(tunepad, "_waveform");
  const _scroll_root = dart.privateName(tunepad, "_scroll_root");
  const _down = dart.privateName(tunepad, "_down");
  const _dragging = dart.privateName(tunepad, "_dragging");
  const _rendering = dart.privateName(tunepad, "_rendering");
  const _render = dart.privateName(tunepad, "_render");
  const _renderPlayhead = dart.privateName(tunepad, "_renderPlayhead");
  const _registerTouchEvents = dart.privateName(tunepad, "_registerTouchEvents");
  const _resize = dart.privateName(tunepad, "_resize");
  const _renderNote = dart.privateName(tunepad, "_renderNote");
  const _renderWaveform = dart.privateName(tunepad, "_renderWaveform");
  const listener$ = dart.privateName(tunepad, "Timeline.listener");
  const tracks = dart.privateName(tunepad, "Timeline.tracks");
  const beats$ = dart.privateName(tunepad, "Timeline.beats");
  const trace$0 = dart.privateName(tunepad, "Timeline.trace");
  const notes$ = dart.privateName(tunepad, "Timeline.notes");
  const root$0 = dart.privateName(tunepad, "Timeline.root");
  const container = dart.privateName(tunepad, "Timeline.container");
  const parent = dart.privateName(tunepad, "Timeline.parent");
  const width = dart.privateName(tunepad, "Timeline.width");
  const height = dart.privateName(tunepad, "Timeline.height");
  tunepad.Timeline = class Timeline extends core.Object {
    get listener() {
      return this[listener$];
    }
    set listener(value) {
      this[listener$] = value;
    }
    get tracks() {
      return this[tracks];
    }
    set tracks(value) {
      this[tracks] = value;
    }
    get beats() {
      return this[beats$];
    }
    set beats(value) {
      this[beats$] = value;
    }
    get trace() {
      return this[trace$0];
    }
    set trace(value) {
      this[trace$0] = value;
    }
    get notes() {
      return this[notes$];
    }
    set notes(value) {
      this[notes$] = value;
    }
    get root() {
      return this[root$0];
    }
    set root(value) {
      this[root$0] = value;
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
    get beatWidth() {
      return math.max(core.num, 40, dart.notNull(this.width) / dart.notNull(this.beats));
    }
    get trackHeight() {
      return math.max(core.num, 5, dart.notNull(this.scoreHeight) / dart.notNull(this.tracks));
    }
    get traceWidth() {
      return dart.notNull(this.beatWidth) * dart.notNull(this.beats);
    }
    get rulerHeight() {
      return 20;
    }
    get scoreHeight() {
      return dart.notNull(this.height) - dart.notNull(this.rulerHeight);
    }
    setTrace(trace, beats) {
      this.beats = dart.asInt(beats);
      this.trace = trace;
      this.tracks = 12;
      this[_waveform] = null;
      this[_render]();
    }
    showMidi() {
      if (!dart.test(this[_midi])) {
        this[_midi] = true;
        this[_render]();
      }
    }
    showWaveform() {
      if (dart.test(this[_midi])) {
        this[_midi] = false;
        this[_render]();
      }
    }
    toggleView() {
      dart.test(this[_midi]) ? this.showWaveform() : this.showMidi();
    }
    setInstrument(instrument) {
      this.container[$classes].removeWhere(dart.fn(c => c !== "container", StringTobool()));
      this.container[$classes].add(instrument);
    }
    noteToTrack(note) {
      let n = note[$round]();
      let minNote = this.trace == null || dart.notNull(this.trace.minNote) < 0 ? 0 : this.trace.minNote[$round]();
      let off = n - minNote;
      return dart.notNull(this.tracks) - off[$modulo](this.tracks) - 1;
    }
    noteToY(note) {
      return dart.notNull(this.noteToTrack(note)) * dart.notNull(this.trackHeight) + dart.notNull(this.rulerHeight);
    }
    beatToX(beat) {
      return dart.notNull(beat) * dart.notNull(this.beatWidth);
    }
    xToBeat(x) {
      let t8;
      let p = (t8 = this.container[$createSvgPoint](), t8.x = x, t8);
      p = p.matrixTransform(this.container[$getScreenCtm]().inverse());
      return dart.notNull(p.x) / dart.notNull(this.beatWidth);
    }
    set playhead(p) {
      this[_playhead] = p;
      this[_renderPlayhead]();
      for (let t of this.notes[$keys]) {
        if (dart.notNull(p) <= 0 || dart.notNull(t.time) > dart.notNull(p) || dart.notNull(t.end) < dart.notNull(p)) {
          if (dart.test(this.notes[$_get](t)[$classes].contains("highlighted"))) {
            this.notes[$_get](t)[$classes].remove("highlighted");
            if (dart.test(this[_down])) this.listener.onScrubLeave(t);
          }
        }
      }
      for (let t of this.notes[$keys]) {
        if (dart.notNull(p) > 0 && dart.notNull(t.time) <= dart.notNull(p) && dart.notNull(t.end) > dart.notNull(p)) {
          if (!dart.test(this.notes[$_get](t)[$classes].contains("highlighted"))) {
            if (dart.test(this[_down])) this.listener.onScrubEnter(t);
            this.notes[$_get](t)[$classes].add("highlighted");
          }
        }
      }
      if (!dart.test(this[_down]) && this[_scroll_root] != null) {
        this[_scroll_root][$scrollTo](dart.notNull(this.beatToX(p)) - dart.notNull(this.width) * 0.8, 0);
      }
    }
    insert(element) {
      let template = html.TemplateElement._check(html.querySelector("#timeline-template"));
      if (template == null || element == null) return;
      this.root = element[$attachShadow](new _js_helper.LinkedMap.from(["mode", "open"]));
      this.root[$append](template.content[$clone](true));
      this.container = svg.SvgSvgElement._check(this.root.querySelector("svg.container"));
      this.container[$append](this.parent);
      this[_scroll_root] = html.HtmlElement._check(this.root.querySelector(".scroll-container"));
      html.window[$onResize].listen(dart.fn(e => this[_render](), EventTovoid()));
      this[_render]();
      this[_registerTouchEvents]();
    }
    [_render]() {
      let t8, t8$, t8$0;
      if (this.container == null) return;
      this[_resize]();
      if (this.parent != null) this.parent[$remove]();
      this.parent = svg.GElement.new();
      this.container[$append](this.parent);
      let beatNumbers = svg.GElement.new();
      let beatBacker = (t8 = svg.RectElement.new(), t8[$attributes] = new (IdentityMapOfString$String()).from(["class", "ruler", "width", dart.str(this.traceWidth), "height", dart.str(this.rulerHeight), "x", dart.str(this.beatToX(0)), "y", "0"]), t8);
      beatNumbers[$append](beatBacker);
      beatBacker[$onMouseDown].listen(dart.fn(e => {
        this[_down] = true;
        this.playhead = this.xToBeat(e[$client].x);
        this.listener.onMovePlayhead(this[_playhead]);
        this[_dragging] = true;
      }, MouseEventToNull()));
      for (let i = 1; i <= dart.notNull(this.beats); i = i + 1) {
        let x = this.beatToX(i - 1);
        let text = (t8$ = svg.TextElement.new(), t8$[$attributes][$_set]("class", "ruler-marks"), t8$[$attributes][$_set]("x", dart.str(i === 1 ? dart.notNull(x) + 9 : dart.notNull(x) + 5)), t8$[$attributes][$_set]("y", dart.str(dart.notNull(this.rulerHeight) / 2)), t8$);
        text[$innerHtml] = i === 1 ? "BEAT" : dart.str(i);
        beatNumbers[$append](text);
        if (i === 1) continue;
        let line = (t8$0 = svg.LineElement.new(), t8$0[$attributes] = new (IdentityMapOfString$String()).from(["class", "beat-line", "x1", dart.str(x), "y1", "0", "x2", dart.str(x), "y2", dart.str(this.height)]), t8$0);
        beatNumbers[$append](line);
      }
      this.parent[$append](beatNumbers);
      if (this.trace != null && dart.test(this[_midi])) {
        this.notes[$clear]();
        for (let t of this.trace.trace) {
          if (t.command == trace.TraceEvent.PLAY) {
            this.notes[$_set](t, this[_renderNote](t));
          }
        }
        this.notes[$values][$forEach](dart.fn(note => this.parent[$append](note), SvgElementToNode()));
      }
      this.parent[$append](this[_playheadLine]);
      this[_renderPlayhead]();
      if (this[_waveform] == null) {
        this[_waveform] = svg.GElement.new();
        this[_renderWaveform]();
      }
      if (!dart.test(this[_midi])) {
        this.parent[$append](this[_waveform]);
      } else {
        this[_waveform][$remove]();
      }
    }
    [_registerTouchEvents]() {
      this[_playheadLine][$onMouseDown].listen(dart.fn(e => {
        this.listener.onDragPlayheadStart(this[_playhead]);
        this[_down] = true;
      }, MouseEventToNull()));
      this.container[$onMouseMove].listen(dart.fn(e => {
        if (dart.test(this[_down])) {
          this.playhead = this.xToBeat(e[$client].x);
          this[_dragging] = true;
        }
      }, MouseEventToNull()));
      this.container[$onMouseUp].listen(dart.fn(e => {
        if (dart.test(this[_down])) {
          this[_down] = false;
          this.listener.onDragPlayheadStop(this[_playhead]);
        }
        this[_dragging] = false;
      }, MouseEventToNull()));
      html.document[$onMouseUp].listen(dart.fn(e => {
        if (dart.test(this[_down])) {
          this[_down] = false;
          this.listener.onDragPlayheadStop(this[_playhead]);
        }
        this[_dragging] = false;
      }, MouseEventToNull()));
    }
    [_resize]() {
      if (this.container != null) {
        let scrollContainer = html.DivElement._check(this.container[$parent][$parent]);
        if (scrollContainer != null) {
          let rect = scrollContainer.getBoundingClientRect();
          this.width = rect[$width];
          this.height = rect[$height];
          if (this.width === 0) this.width = 800;
          if (this.height === 0) this.height = 120;
          this.container[$setAttribute]("viewBox", "0 0 " + dart.str(this.traceWidth) + " " + dart.str(this.height));
          this.container[$parent].style[$width] = dart.str(dart.notNull(this.traceWidth) - 2) + "px";
        }
      }
    }
    [_renderPlayhead]() {
      let h = math.max(core.num, 100, this.height);
      let rh = this.rulerHeight;
      let rh2 = dart.notNull(this.rulerHeight) - 5;
      let px = this.beatToX(this[_playhead]);
      this[_playheadLine][$setAttribute]("d", "M " + dart.str(dart.notNull(px) - 1) + " " + dart.str(h) + " l 0 -" + dart.str(h - dart.notNull(rh)) + " l -6 -6 l 0 -" + dart.str(rh2) + " l 14 0 l 0 " + dart.str(rh2) + " l -6 6 l 0 " + dart.str(h) + " Z");
      this[_playheadLine][$setAttribute]("class", "playhead");
    }
    [_renderNote](t) {
      let t8;
      let rect = (t8 = svg.RectElement.new(), t8[$attributes] = new (IdentityMapOfString$String()).from(["class", "timeline-note", "width", dart.str(math.max(core.num, 0, dart.notNull(this.beatToX(t.duration)) - 2)), "height", dart.str(dart.notNull(this.trackHeight) - 2), "x", dart.str(this.beatToX(t.time)), "y", dart.str(dart.notNull(this.noteToY(t.note.note)) + 1)]), t8);
      let tt = core.int.is(t.note.note) ? dart.str(t.note.note) : t.note.note[$toStringAsFixed](2);
      rect[$onMouseEnter].listen(dart.fn(e => {
        let t8;
        if (!dart.test(this[_down])) {
          this.listener.onHoverEnter(t);
          let hint = html.DivElement._check(this.root.querySelector("#note-hint"));
          let acc = t.note.accidental;
          if (acc === "") acc = "&nbsp;";
          if (hint != null) {
            hint.querySelector(".note-name")[$innerHtml] = t.note.name[$substring](0, 1);
            hint.querySelector(".accidental")[$innerHtml] = dart.str(acc);
            hint.querySelector(".octave")[$innerHtml] = dart.str(dart.notNull(t.note.octave) - 1);
            hint.querySelector(".note-info")[$innerHtml] = "Note " + tt;
            if (dart.test(t.hasParam("line"))) {
              t8 = hint.querySelector(".note-info");
              t8[$innerHtml] = dart.notNull(t8[$innerHtml]) + (" (line " + dart.str(t._get("line")) + ")");
            }
            hint[$classes].add("show");
          }
        }
      }, MouseEventToNull()));
      rect[$onMouseLeave].listen(dart.fn(e => {
        this.root[$querySelectorAll](html.Element, "#note-hint").classes.remove("show");
        this.listener.onHoverLeave(t);
      }, MouseEventToNull()));
      rect[$onMouseDown].listen(dart.fn(e => {
        this.listener.onClickNote(t);
      }, MouseEventToNull()));
      rect[$onMouseUp].listen(dart.fn(e => {
        this.listener.onReleaseNote(t);
      }, MouseEventToNull()));
      return rect;
    }
    [_renderWaveform]() {
      return async.async(dart.void, function* _renderWaveform() {
      });
    }
  };
  (tunepad.Timeline.new = function(listener) {
    this[_midi] = true;
    this[tracks] = 12;
    this[beats$] = 8;
    this[_playhead] = 0;
    this[_playheadLine] = svg.PathElement.new();
    this[trace$0] = null;
    this[notes$] = new (LinkedMapOfTraceEvent$SvgElement()).new();
    this[_waveform] = null;
    this[root$0] = null;
    this[container] = null;
    this[parent] = svg.GElement.new();
    this[width] = 900;
    this[height] = 200;
    this[_scroll_root] = null;
    this[_down] = false;
    this[_dragging] = false;
    this[_rendering] = false;
    this[listener$] = listener;
    ;
  }).prototype = tunepad.Timeline.prototype;
  dart.addTypeTests(tunepad.Timeline);
  dart.setMethodSignature(tunepad.Timeline, () => ({
    __proto__: dart.getMethods(tunepad.Timeline.__proto__),
    setTrace: dart.fnType(dart.void, [trace.Trace, core.num]),
    showMidi: dart.fnType(dart.void, []),
    showWaveform: dart.fnType(dart.void, []),
    toggleView: dart.fnType(dart.void, []),
    setInstrument: dart.fnType(dart.void, [core.String]),
    noteToTrack: dart.fnType(core.int, [core.num]),
    noteToY: dart.fnType(core.num, [core.num]),
    beatToX: dart.fnType(core.num, [core.num]),
    xToBeat: dart.fnType(core.num, [core.num]),
    insert: dart.fnType(dart.void, [html.HtmlElement]),
    [_render]: dart.fnType(dart.void, []),
    [_registerTouchEvents]: dart.fnType(dart.void, []),
    [_resize]: dart.fnType(dart.void, []),
    [_renderPlayhead]: dart.fnType(dart.void, []),
    [_renderNote]: dart.fnType(svg.SvgElement, [trace.TraceEvent]),
    [_renderWaveform]: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(tunepad.Timeline, () => ({
    __proto__: dart.getGetters(tunepad.Timeline.__proto__),
    beatWidth: core.num,
    trackHeight: core.num,
    traceWidth: core.num,
    rulerHeight: core.num,
    scoreHeight: core.num
  }));
  dart.setSetterSignature(tunepad.Timeline, () => ({
    __proto__: dart.getSetters(tunepad.Timeline.__proto__),
    playhead: core.num
  }));
  dart.setLibraryUri(tunepad.Timeline, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.Timeline, () => ({
    __proto__: dart.getFields(tunepad.Timeline.__proto__),
    listener: dart.fieldType(tunepad.TimelineListener),
    [_midi]: dart.fieldType(core.bool),
    tracks: dart.fieldType(core.int),
    beats: dart.fieldType(core.int),
    [_playhead]: dart.fieldType(core.num),
    [_playheadLine]: dart.fieldType(svg.PathElement),
    trace: dart.fieldType(trace.Trace),
    notes: dart.fieldType(core.Map$(trace.TraceEvent, svg.SvgElement)),
    [_waveform]: dart.fieldType(svg.GElement),
    root: dart.fieldType(html.ShadowRoot),
    container: dart.fieldType(svg.SvgSvgElement),
    parent: dart.fieldType(svg.GElement),
    width: dart.fieldType(core.num),
    height: dart.fieldType(core.num),
    [_scroll_root]: dart.fieldType(html.HtmlElement),
    [_down]: dart.fieldType(core.bool),
    [_dragging]: dart.fieldType(core.bool),
    [_rendering]: dart.fieldType(core.bool)
  }));
  const _rand = dart.privateName(tunepad, "_rand");
  const _randomColor = dart.privateName(tunepad, "_randomColor");
  const _randomIcon = dart.privateName(tunepad, "_randomIcon");
  const _loadColor = dart.privateName(tunepad, "_loadColor");
  const _loadIcon = dart.privateName(tunepad, "_loadIcon");
  const _loadPhoto = dart.privateName(tunepad, "_loadPhoto");
  const _loadDisplayName = dart.privateName(tunepad, "_loadDisplayName");
  const displayName = dart.privateName(tunepad, "User.displayName");
  const email = dart.privateName(tunepad, "User.email");
  const anonymous = dart.privateName(tunepad, "User.anonymous");
  const color = dart.privateName(tunepad, "User.color");
  const icon = dart.privateName(tunepad, "User.icon");
  const photo = dart.privateName(tunepad, "User.photo");
  tunepad.User = class User extends tunepad.DataModel {
    get displayName() {
      return this[displayName];
    }
    set displayName(value) {
      this[displayName] = value;
    }
    get email() {
      return this[email];
    }
    set email(value) {
      this[email] = value;
    }
    get anonymous() {
      return this[anonymous];
    }
    set anonymous(value) {
      this[anonymous] = value;
    }
    get color() {
      return this[color];
    }
    set color(value) {
      this[color] = value;
    }
    get icon() {
      return this[icon];
    }
    set icon(value) {
      this[icon] = value;
    }
    get photo() {
      return this[photo];
    }
    set photo(value) {
      this[photo] = value;
    }
    get uid() {
      return dart.toString(this.id);
    }
    save() {
      html.window.localStorage[$_set](dart.str(this.uid) + "-color", this.color);
      html.window.localStorage[$_set](dart.str(this.uid) + "-icon", this.icon);
      html.window.localStorage[$_set](dart.str(this.uid) + "-display-name", this.displayName);
      html.window.localStorage[$remove](dart.str(this.uid) + "-photo");
      if (this.photo != null && this.photo[$trim]() !== "" && this.photo !== "null") {
        html.window.localStorage[$_set](dart.str(this.uid) + "-photo", this.photo);
      }
      return new _js_helper.LinkedMap.from(["id", this.uid, "username", this.name, "displayName", this.displayName, "email", this.email, "anonymous", this.anonymous, "color", this.color, "icon", this.icon, "photo", this.photo, "created", dart.toString(this.created), "modified", dart.toString(this.modified)]);
    }
    load(userData) {
      this.id = utils.toStr(userData[$_get]("id"), null);
      this.name = utils.toStr(userData[$_get]("username"), null);
      this.email = utils.toStr(userData[$_get]("email"), null);
      this.anonymous = utils.toBool(userData[$_get]("anonymous"), true);
      this.color = utils.toStr(userData[$_get]("color"), this[_loadColor]());
      this.icon = utils.toStr(userData[$_get]("icon"), this[_loadIcon]());
      this.photo = utils.toStr(userData[$_get]("photo"), this[_loadPhoto]());
      this.displayName = utils.toStr(userData[$_get]("displayName"), this[_loadDisplayName]());
      this.created = utils.toDateTime(userData[$_get]("created"));
      this.modified = utils.toDateTime(userData[$_get]("modified"));
    }
    [_loadColor]() {
      if (html.window.localStorage[$_get](dart.str(this.uid) + "-color") != null) {
        return html.window.localStorage[$_get](dart.str(this.uid) + "-color");
      } else {
        return this[_randomColor]();
      }
    }
    [_loadPhoto]() {
      if (html.window.localStorage[$_get](dart.str(this.uid) + "-photo") != null) {
        return html.window.localStorage[$_get](dart.str(this.uid) + "-photo");
      } else {
        return null;
      }
    }
    [_loadIcon]() {
      if (html.window.localStorage[$_get](dart.str(this.uid) + "-icon") != null) {
        return html.window.localStorage[$_get](dart.str(this.uid) + "-icon");
      } else {
        return this[_randomIcon]();
      }
    }
    [_loadDisplayName]() {
      if (html.window.localStorage[$_get](dart.str(this.uid) + "-display-name") != null) {
        return html.window.localStorage[$_get](dart.str(this.uid) + "-display-name");
      } else if (this.name != null && this.name[$trim]() !== "") {
        return this.name;
      } else if (this.email != null && this.email[$trim]() !== "") {
        return this.email;
      } else {
        return "Anonymous User";
      }
    }
    [_randomColor]() {
      let r = (127 + dart.notNull(this[_rand].nextInt(128)))[$toRadixString](16);
      let g = (127 + dart.notNull(this[_rand].nextInt(128)))[$toRadixString](16);
      let b = (127 + dart.notNull(this[_rand].nextInt(128)))[$toRadixString](16);
      return "#" + r + g + b;
    }
    [_randomIcon]() {
      let icons = JSArrayOfString().of(["fa-user-astronaut", "fa-user-secret", "fa-user-ninja", "fa-dragon", "fa-cat", "fa-crow", "fa-dove", "fa-fish", "fa-frog", "fa-hippo", "fa-horse", "fa-spider"]);
      return icons[$_get](this[_rand].nextInt(icons[$length]));
    }
  };
  (tunepad.User.new = function(id) {
    this[displayName] = null;
    this[email] = null;
    this[anonymous] = false;
    this[color] = null;
    this[icon] = null;
    this[photo] = null;
    this[_rand] = math.Random.new();
    tunepad.User.__proto__.new.call(this, id);
    ;
  }).prototype = tunepad.User.prototype;
  (tunepad.User.anonymous = function() {
    this[displayName] = null;
    this[email] = null;
    this[anonymous] = false;
    this[color] = null;
    this[icon] = null;
    this[photo] = null;
    this[_rand] = math.Random.new();
    tunepad.User.__proto__.new.call(this, null);
    let generator = new uuid.Uuid.new();
    this.id = generator.v1();
    this.name = "Anonymous";
    this.displayName = "Anonymous User";
    this.email = null;
    this.anonymous = true;
    this.color = this[_randomColor]();
    this.icon = this[_randomIcon]();
    this.photo = null;
  }).prototype = tunepad.User.prototype;
  dart.addTypeTests(tunepad.User);
  dart.setMethodSignature(tunepad.User, () => ({
    __proto__: dart.getMethods(tunepad.User.__proto__),
    save: dart.fnType(core.Map, []),
    load: dart.fnType(dart.void, [core.Map]),
    [_loadColor]: dart.fnType(core.String, []),
    [_loadPhoto]: dart.fnType(core.String, []),
    [_loadIcon]: dart.fnType(core.String, []),
    [_loadDisplayName]: dart.fnType(core.String, []),
    [_randomColor]: dart.fnType(core.String, []),
    [_randomIcon]: dart.fnType(core.String, [])
  }));
  dart.setGetterSignature(tunepad.User, () => ({
    __proto__: dart.getGetters(tunepad.User.__proto__),
    uid: core.String
  }));
  dart.setLibraryUri(tunepad.User, "package:tunepad/tunepad.dart");
  dart.setFieldSignature(tunepad.User, () => ({
    __proto__: dart.getFields(tunepad.User.__proto__),
    displayName: dart.fieldType(core.String),
    email: dart.fieldType(core.String),
    anonymous: dart.fieldType(core.bool),
    color: dart.fieldType(core.String),
    icon: dart.fieldType(core.String),
    photo: dart.fieldType(core.String),
    [_rand]: dart.fieldType(math.Random)
  }));
  tunepad.toggleContextMenu = function toggleContextMenu(menu) {
    if (menu != null) {
      html.querySelectorAll(html.Element, ".context-menu")[$forEach](dart.fn(m => {
        if (!dart.equals(menu, m)) m[$classes].add("hidden");
      }, ElementToNull()));
      menu[$classes].toggle("hidden");
    }
  };
  dart.defineLazy(tunepad, {
    /*tunepad.patches*/get patches() {
      return new _js_helper.LinkedMap.from(["bass", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "cx", 517, "cy", 189, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/bass/21bassA1", "step", 21]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/bass/24bassC2", "step", 24]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/bass/36bassC3", "step", 36]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/bass/48bassC4", "step", 48])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.04, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 300, "cy", 188, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "guitar", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "cx", 517, "cy", 189, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/guitar/45acoustic-A2", "step", 45]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/guitar/50acoustic-D3", "step", 50]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/guitar/55acoustic-G3", "step", 55]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/guitar/59acoustic-B3", "step", 59]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/guitar/64acoustic-E4", "step", 64])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.04, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 300, "cy", 188, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "pop-bass", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "id", 0, "cx", 517, "cy", 189]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/party/party-C4", "step", 60])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 333, "cy", 250, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "party", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "id", 0, "cx", 517, "cy", 189]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/party/party-C4", "step", 48])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 333, "cy", 250, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "marimba", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/marimba/marimba-C1", "step", 24]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/marimba/marimba-C2", "step", 36]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/marimba/marimba-C3", "step", 48])]), "level", 1, "cx", 100, "cy", 100, "id", 0]), new (IdentityMapOfString$Object()).from(["cx", 300, "cy", 100, "type", "out", "id", 1])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 0, "dest", 1, "type", "out"])])]), "metronome", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "id", 0, "cx", 517, "cy", 189]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/rim", "step", 24])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 258, "cy", 228, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "musicbox", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "id", 0, "cx", 517, "cy", 189]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/musicbox/musicbox-D", "step", 51])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 258, "cy", 228, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "organ", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "cx", 517, "cy", 189, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/organ/rhodes-C2", "step", 36]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/organ/rhodes-C3", "step", 48]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/organ/rhodes-C4", "step", 60]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/organ/rhodes-C5", "step", 72]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/organ/rhodes-C6", "step", 84])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.1, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 300, "cy", 188, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "piano", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "out", "id", 0, "cx", 517, "cy", 189]), new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/21pianoA0", "step", 21]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/24pianoC1", "step", 24]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/28pianoE1", "step", 28]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/32pianoAb1", "step", 32]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/36pianoC2", "step", 36]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/40pianoE2", "step", 40]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/44pianoAb2", "step", 44]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/48pianoC3", "step", 48]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/52pianoE3", "step", 52]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/56pianoAb3", "step", 56]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/60pianoC4", "step", 60]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/64pianoE4", "step", 64]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/68pianoAb4", "step", 68]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/72pianoC5", "step", 72]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/76pianoE5", "step", 76]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/80pianoAb5", "step", 80]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/84pianoC6", "step", 84]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/88pianoE6", "step", 88]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/92pianoAb6", "step", 92]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/96pianoC7", "step", 96]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/100pianoE7", "step", 100]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/104pianoAb7", "step", 104]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/piano/108pianoC8", "step", 108])]), "id", 1, "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 300, "cy", 188, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 0, "type", "out"])])]), "synthesizer", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "sample", "id", 0, "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/synth/korg-NSR5-C3", "step", 36]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/synth/korg-NSR5-C4", "step", 48])]), "level", 1, "cx", 100, "cy", 100]), new (IdentityMapOfString$Object()).from(["cx", 554, "cy", 134, "type", "out", "id", 1]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0.01, "D", 0.1, "S", 1, "R", 0.3, "level", 1, "cx", 317, "cy", 169, "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 0, "dest", 2, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 2, "dest", 1, "type", "out"])])]), "808-drums", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/kick1", "step", 0, "name", "kick"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/kick2", "step", 1, "name", "kick"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/snare1", "step", 2, "name", "snare"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/snare2", "step", 3, "name", "snare"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/hihat", "step", 4, "name", "hat"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/openhat", "step", 5, "name", "hat"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/tom1", "step", 6, "name", "tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/tom2", "step", 7, "name", "tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/tom3", "step", 8, "name", "tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/cymb", "step", 9, "name", "cymbal"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/clap", "step", 10, "name", "clap"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/808-drums/shaker", "step", 11, "name", "shaker"])]), "level", 1, "cx", 100, "cy", 100, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0, "D", 0, "S", 1, "R", 0.3, "level", 1, "cx", 258, "cy", 228, "id", 1]), new (IdentityMapOfString$Object()).from(["cx", 300, "cy", 100, "type", "out", "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 0, "dest", 1, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "out"])])]), "rock-drums", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/kick", "step", 0, "name", "kick"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/rideBell", "step", 1, "name", "ride"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/snare1", "step", 2, "name", "snare1"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/snare2", "step", 3, "name", "snare2"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/closedHat", "step", 4, "name", "hat"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/openHat", "step", 5, "name", "open-hat"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/highTom", "step", 6, "name", "high-tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/midTom", "step", 7, "name", "mid-tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/floorTom", "step", 8, "name", "floor-tom"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/crash", "step", 9, "name", "crash"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/clap", "step", 10, "name", "clap"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/rock-drums/shaker", "step", 11, "name", "shaker"])]), "level", 1, "cx", 100, "cy", 100, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0, "D", 0, "S", 1, "R", 0.3, "level", 1, "cx", 258, "cy", 228, "id", 1]), new (IdentityMapOfString$Object()).from(["cx", 300, "cy", 100, "type", "out", "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 0, "dest", 1, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "out"])])]), "shot-drums", new (IdentityMapOfString$ListOfMapOfString$Object()).from(["nodes", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["type", "sample", "samples", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/kick", "step", 0, "name", "kick"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/bell", "step", 1, "name", "bell"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/perc1", "step", 2, "name", "perc"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/rim", "step", 3, "name", "rim"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/shaker1", "step", 4, "name", "shaker"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/shaker2", "step", 5, "name", "shaker"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/tick", "step", 6, "name", "stick"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/pulse", "step", 7, "name", "pulse"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/snap", "step", 8, "name", "snap"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/clap1", "step", 9, "name", "clap"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/clap2", "step", 10, "name", "clap"]), new (IdentityMapOfString$Object()).from(["sample", "packages/synthesizer/sounds/voices/shot-drums/clap3", "step", 11, "name", "clap"])]), "level", 1, "cx", 100, "cy", 100, "id", 0]), new (IdentityMapOfString$Object()).from(["type", "adsr", "A", 0, "D", 0, "S", 1, "R", 0.3, "level", 1, "cx", 258, "cy", 228, "id", 1]), new (IdentityMapOfString$Object()).from(["cx", 300, "cy", 100, "type", "out", "id", 2])]), "routing", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["source", 0, "dest", 1, "type", "in"]), new (IdentityMapOfString$Object()).from(["source", 1, "dest", 2, "type", "out"])])])]);
    },
    set patches(_) {}
  });
  dart.trackLibraries("packages/tunepad/tunepad", {
    "package:tunepad/tunepad.dart": tunepad
  }, {
    "package:tunepad/tunepad.dart": ["src/accounts.dart", "src/cell.dart", "src/datastore.dart", "src/patches.dart", "src/project.dart", "src/recorder.dart", "src/timeline.dart", "src/user.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/accounts.dart","src/datastore.dart","src/timeline.dart","src/cell.dart","src/project.dart","src/recorder.dart","src/user.dart","src/patches.dart"],"names":[],"mappings":"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","file":"tunepad.ddc.js"}');
  // Exports:
  return {
    tunepad: tunepad
  };
});

//# sourceMappingURL=tunepad.ddc.js.map
