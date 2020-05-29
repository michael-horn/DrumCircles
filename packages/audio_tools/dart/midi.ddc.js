define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const async = dart_sdk.async;
  const js = dart_sdk.js;
  const convert = dart_sdk.convert;
  const _native_typed_data = dart_sdk._native_typed_data;
  const html = dart_sdk.html;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var midi$ = Object.create(dart.library);
  var $codeUnits = dartx.codeUnits;
  var $_get = dartx._get;
  var $_set = dartx._set;
  var $remove = dartx.remove;
  var $toString = dartx.toString;
  var $round = dartx.round;
  var LinkedMapOfintL$MapL = () => (LinkedMapOfintL$MapL = dart.constFn(_js_helper.LinkedMap$(core.int, core.Map)))();
  var StreamControllerOfMIDIEventL = () => (StreamControllerOfMIDIEventL = dart.constFn(async.StreamController$(midi$.MIDIEvent)))();
  const CT = Object.create(null);
  var L0 = "package:audio_tools/dart/midi.dart";
  var _stateStream = dart.privateName(midi$, "_stateStream");
  var _messageStream = dart.privateName(midi$, "_messageStream");
  var _midiEvent = dart.privateName(midi$, "_midiEvent");
  var _midiConnection = dart.privateName(midi$, "_midiConnection");
  var inputs = dart.privateName(midi$, "MIDIManager.inputs");
  var outputs = dart.privateName(midi$, "MIDIManager.outputs");
  midi$.MIDIManager = class MIDIManager extends core.Object {
    get inputs() {
      return this[inputs];
    }
    set inputs(value) {
      this[inputs] = value;
    }
    get outputs() {
      return this[outputs];
    }
    set outputs(value) {
      this[outputs] = value;
    }
    get onStateChange() {
      return this[_stateStream].stream;
    }
    get onMessage() {
      return this[_messageStream].stream;
    }
    static new() {
      return midi$.MIDIManager._singleton;
    }
    sendNoteOn(note, velocity, port = null) {
      let command = 144;
      js.context.callMethod("midiSendMessage", [port, command, note, velocity]);
    }
    sendNoteOff(note, port = null) {
      let command = 128;
      js.context.callMethod("midiSendMessage", [port, command, note, 0]);
    }
    exportMidi(bpm, trace) {
      let bytes = core.String.as(js.context.callMethod("exportMidi", [bpm, convert.jsonEncode(trace)]));
      if (bytes != null) {
        let buffer = _native_typed_data.NativeUint8List.fromList(bytes[$codeUnits]);
        return html.Blob.new([buffer], "audio/midi");
      } else {
        return null;
      }
    }
    [_midiConnection](jsonString) {
      let midi = core.Map.as(convert.jsonDecode(jsonString));
      let port = midi$._toInt(midi[$_get]("port"), 0);
      if (dart.equals(midi[$_get]("type"), "input") && dart.equals(midi[$_get]("state"), "connected") && port !== 0) {
        this.inputs[$_set](port, midi);
      } else if (dart.equals(midi[$_get]("type"), "input") && dart.equals(midi[$_get]("state"), "disconnected") && port !== 0) {
        this.inputs[$remove](port);
      } else if (dart.equals(midi[$_get]("type"), "output") && dart.equals(midi[$_get]("state"), "connected") && port !== 0) {
        this.outputs[$_set](port, midi);
      } else if (dart.equals(midi[$_get]("type"), "output") && dart.equals(midi[$_get]("state"), "disconnected") && port !== 0) {
        this.outputs[$remove](port);
      }
      this[_stateStream].add(new midi$.MIDIEvent.new(midi));
    }
    [_midiEvent](jsonString) {
      let midi = core.Map.as(convert.jsonDecode(jsonString));
      this[_messageStream].add(new midi$.MIDIEvent.new(midi));
    }
  };
  (midi$.MIDIManager._internal = function() {
    this[inputs] = new (LinkedMapOfintL$MapL()).new();
    this[outputs] = new (LinkedMapOfintL$MapL()).new();
    this[_stateStream] = null;
    this[_messageStream] = null;
    this[_stateStream] = StreamControllerOfMIDIEventL().broadcast();
    this[_messageStream] = StreamControllerOfMIDIEventL().broadcast();
    js.context._set("midiEvent", dart.bind(this, _midiEvent));
    js.context._set("midiConnection", dart.bind(this, _midiConnection));
    js.context.callMethod("midiInit", []);
  }).prototype = midi$.MIDIManager.prototype;
  dart.addTypeTests(midi$.MIDIManager);
  dart.addTypeCaches(midi$.MIDIManager);
  dart.setMethodSignature(midi$.MIDIManager, () => ({
    __proto__: dart.getMethods(midi$.MIDIManager.__proto__),
    sendNoteOn: dart.fnType(dart.void, [core.int, core.int], [core.int]),
    sendNoteOff: dart.fnType(dart.void, [core.int], [core.int]),
    exportMidi: dart.fnType(html.Blob, [core.int, core.List]),
    [_midiConnection]: dart.fnType(dart.void, [core.String]),
    [_midiEvent]: dart.fnType(dart.void, [core.String])
  }));
  dart.setGetterSignature(midi$.MIDIManager, () => ({
    __proto__: dart.getGetters(midi$.MIDIManager.__proto__),
    onStateChange: async.Stream$(midi$.MIDIEvent),
    onMessage: async.Stream$(midi$.MIDIEvent)
  }));
  dart.setLibraryUri(midi$.MIDIManager, L0);
  dart.setFieldSignature(midi$.MIDIManager, () => ({
    __proto__: dart.getFields(midi$.MIDIManager.__proto__),
    inputs: dart.fieldType(core.Map$(core.int, core.Map)),
    outputs: dart.fieldType(core.Map$(core.int, core.Map)),
    [_stateStream]: dart.fieldType(async.StreamController$(midi$.MIDIEvent)),
    [_messageStream]: dart.fieldType(async.StreamController$(midi$.MIDIEvent))
  }));
  dart.defineLazy(midi$.MIDIManager, {
    /*midi$.MIDIManager._singleton*/get _singleton() {
      return new midi$.MIDIManager._internal();
    }
  }, true);
  var data$ = dart.privateName(midi$, "MIDIEvent.data");
  midi$.MIDIEvent = class MIDIEvent extends core.Object {
    get data() {
      return this[data$];
    }
    set data(value) {
      this[data$] = value;
    }
    get port() {
      return midi$._toInt(this.data[$_get]("port"));
    }
    get name() {
      return core.String.as(this.data[$_get]("name"));
    }
    get state() {
      return core.String.as(this.data[$_get]("state"));
    }
    get connection() {
      return core.String.as(this.data[$_get]("connection"));
    }
    get manufacturer() {
      return core.String.as(this.data[$_get]("manufacturer"));
    }
    get command() {
      return midi$._toInt(this.data[$_get]("command"));
    }
    get channel() {
      return midi$._toInt(this.data[$_get]("channel"));
    }
    get note() {
      return midi$._toInt(this.data[$_get]("note"));
    }
    get velocity() {
      return midi$._toInt(this.data[$_get]("velocity"));
    }
    get timestamp() {
      return core.num.as(this.data[$_get]("timestamp"));
    }
    toString() {
      return dart.toString(this.data);
    }
  };
  (midi$.MIDIEvent.new = function(data) {
    this[data$] = data;
    ;
  }).prototype = midi$.MIDIEvent.prototype;
  dart.addTypeTests(midi$.MIDIEvent);
  dart.addTypeCaches(midi$.MIDIEvent);
  dart.setGetterSignature(midi$.MIDIEvent, () => ({
    __proto__: dart.getGetters(midi$.MIDIEvent.__proto__),
    port: core.int,
    name: core.String,
    state: core.String,
    connection: core.String,
    manufacturer: core.String,
    command: core.int,
    channel: core.int,
    note: core.int,
    velocity: core.int,
    timestamp: core.num
  }));
  dart.setLibraryUri(midi$.MIDIEvent, L0);
  dart.setFieldSignature(midi$.MIDIEvent, () => ({
    __proto__: dart.getFields(midi$.MIDIEvent.__proto__),
    data: dart.fieldType(core.Map)
  }));
  dart.defineExtensionMethods(midi$.MIDIEvent, ['toString']);
  midi$._toInt = function _toInt(d, defaultValue = 0) {
    if (d == null) {
      return defaultValue;
    } else if (core.int.is(d)) {
      return d;
    } else if (typeof d == 'number') {
      return d[$round]();
    } else {
      try {
        return core.int.parse(dart.toString(d));
      } catch (e) {
        let ex = dart.getThrown(e);
        if (core.Exception.is(ex)) {
          return defaultValue;
        } else
          throw e;
      }
    }
  };
  dart.trackLibraries("packages/audio_tools/dart/midi", {
    "package:audio_tools/dart/midi.dart": midi$
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["midi.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;IA0BgB;;;;;;IAGA;;;;;;;AAIyB,YAAA,AAAa;IAAM;;AAIvB,YAAA,AAAe;IAAM;;AAOtD,YAAO;IACT;eAGoB,MAAU,UAAgB;AACxC,oBAAU;AAC6D,MAAxE,AAAQ,sBAAW,mBAAmB,CAAE,IAAI,EAAE,OAAO,EAAE,IAAI,EAAE,QAAQ;IAC1E;gBAGqB,MAAY;AAC3B,oBAAU;AACsD,MAAjE,AAAQ,sBAAW,mBAAmB,CAAE,IAAI,EAAE,OAAO,EAAE,IAAI,EAAE;IAClE;eAQoB,KAAU;AACrB,iCAAW,AAAQ,sBAAW,cAAc,CAAE,GAAG,EAAE,mBAAW,KAAK;AAC1E,UAAI,KAAK,IAAI;AACD,qBAAa,4CAAmB,AAAM,KAAD;AAC/C,cAAW,eAAK,CAAE,MAAM,GAAI;;AAE5B,cAAO;;IAEX;sBAmB4B;AACtB,6BAAO,mBAAW,UAAU;AAC5B,iBAAO,aAAO,AAAI,IAAA,QAAC,SAAS;AAChC,UAAiB,YAAb,AAAI,IAAA,QAAC,SAAW,YAAyB,YAAd,AAAI,IAAA,QAAC,UAAY,gBAAe,IAAI,KAAI;AAClD,QAAnB,AAAM,mBAAC,IAAI,EAAI,IAAI;YAEhB,KAAiB,YAAb,AAAI,IAAA,QAAC,SAAW,YAAyB,YAAd,AAAI,IAAA,QAAC,UAAY,mBAAkB,IAAI,KAAI;AAC1D,QAAnB,AAAO,qBAAO,IAAI;YAEf,KAAiB,YAAb,AAAI,IAAA,QAAC,SAAW,aAA0B,YAAd,AAAI,IAAA,QAAC,UAAY,gBAAe,IAAI,KAAI;AACvD,QAApB,AAAO,oBAAC,IAAI,EAAI,IAAI;YAEjB,KAAiB,YAAb,AAAI,IAAA,QAAC,SAAW,aAA0B,YAAd,AAAI,IAAA,QAAC,UAAY,mBAAkB,IAAI,KAAI;AAC1D,QAApB,AAAQ,sBAAO,IAAI;;AAEgB,MAArC,AAAa,uBAAQ,wBAAU,IAAI;IACrC;iBAOuB;AACjB,6BAAO,mBAAW,UAAU;AACO,MAAvC,AAAe,yBAAQ,wBAAU,IAAI;IACvC;;;IA5Fc,eAAa;IAGb,gBAAc;IAGA;IAIA;AA4CgC,IAA1D,qBAAmB;AACyC,IAA5D,uBAAqB;AACe,IAAjC,AAAO,gBAAC,uBAAe;AACoB,IAA3C,AAAO,gBAAC,4BAAoB;AACO,IAAnC,AAAQ,sBAAW,YAAY;EACpC;;;;;;;;;;;;;;;;;;;;;;;;;MA7CyB,4BAAU;YAAO;;;;;IAqGtC;;;;;;;AAjBY,0BAAO,AAAI,iBAAC;IAAQ;;AAGjB,4BAAA,AAAI,iBAAC;IAAO;;AAGX,4BAAA,AAAI,iBAAC;IAAQ;;AACR,4BAAA,AAAI,iBAAC;IAAa;;AAChB,4BAAA,AAAI,iBAAC;IAAe;;AAG5B,0BAAO,AAAI,iBAAC;IAAW;;AACvB,0BAAO,AAAI,iBAAC;IAAW;;AAC1B,0BAAO,AAAI,iBAAC;IAAQ;;AAChB,0BAAO,AAAI,iBAAC;IAAY;;AACvB,yBAAA,AAAI,iBAAC;IAAY;;AAOjB,YAAK,eAAL;IAAe;;;IAFrB;;EAAK;;;;;;;;;;;;;;;;;;;;;;iCAOP,GAAS;AACtB,QAAI,AAAE,CAAD,IAAI;AACP,YAAO,aAAY;UAEhB,KAAM,YAAF,CAAC;AACR,YAAO,EAAC;UAEL,KAAM,OAAF,CAAC;AACR,YAAO,AAAE,EAAD;;AAGR;AACE,cAAW,gBAAQ,cAAF,CAAC;;;AAClB;AACA,gBAAO,aAAY;;;;;EAGzB","file":"midi.ddc.js"}');
  // Exports:
  return {
    dart__midi: midi$
  };
});

//# sourceMappingURL=midi.ddc.js.map
