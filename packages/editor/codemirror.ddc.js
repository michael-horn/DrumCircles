define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const js = dart_sdk.js;
  const convert = dart_sdk.convert;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var codemirror = Object.create(dart.library);
  var $parent = dartx.parent;
  var $_set = dartx._set;
  var $containsKey = dartx.containsKey;
  var $_get = dartx._get;
  var StringLAndStringLTovoid = () => (StringLAndStringLTovoid = dart.constFn(dart.fnType(dart.void, [core.String, core.String])))();
  var StringLTovoid = () => (StringLTovoid = dart.constFn(dart.fnType(dart.void, [core.String])))();
  var LinkedMapOfStringL$FunctionL = () => (LinkedMapOfStringL$FunctionL = dart.constFn(_js_helper.LinkedMap$(core.String, core.Function)))();
  const CT = Object.create(null);
  var L0 = "package:editor/codemirror.dart";
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.fn(codemirror.CodeMirror.onProgramUpdate, StringLAndStringLTovoid());
    },
    get C1() {
      return C1 = dart.fn(codemirror.CodeMirror.onCursorActivity, StringLAndStringLTovoid());
    },
    get C2() {
      return C2 = dart.fn(codemirror.CodeMirror.onEditorBlur, StringLTovoid());
    }
  }, false);
  codemirror.CodeMirrorListener = class CodeMirrorListener extends core.Object {};
  (codemirror.CodeMirrorListener.new = function() {
    ;
  }).prototype = codemirror.CodeMirrorListener.prototype;
  dart.addTypeTests(codemirror.CodeMirrorListener);
  dart.addTypeCaches(codemirror.CodeMirrorListener);
  dart.setLibraryUri(codemirror.CodeMirrorListener, L0);
  var _dirty = dart.privateName(codemirror, "_dirty");
  var C0;
  var C1;
  var C2;
  var _onProgramUpdate = dart.privateName(codemirror, "_onProgramUpdate");
  var _onCursorActivity = dart.privateName(codemirror, "_onCursorActivity");
  var _onEditorBlur = dart.privateName(codemirror, "_onEditorBlur");
  var id$ = dart.privateName(codemirror, "CodeMirror.id");
  var listener$ = dart.privateName(codemirror, "CodeMirror.listener");
  var parent = dart.privateName(codemirror, "CodeMirror.parent");
  codemirror.CodeMirror = class CodeMirror extends core.Object {
    get id() {
      return this[id$];
    }
    set id(value) {
      this[id$] = value;
    }
    get listener() {
      return this[listener$];
    }
    set listener(value) {
      this[listener$] = value;
    }
    get parent() {
      return this[parent];
    }
    set parent(value) {
      this[parent] = value;
    }
    get isDirty() {
      return this[_dirty];
    }
    initialize() {
      js.context.callMethod("codemirror", [this.id]);
    }
    connectFirepad(directory) {
      js.context.callMethod("connectFirepad", [this.id, directory]);
    }
    getCode() {
      return core.String.as(js.context.callMethod("getCode", [this.id]));
    }
    setCode(code) {
      js.context.callMethod("setCode", [this.id, code]);
      this[_dirty] = true;
    }
    setCursorPosition(line, col) {
      js.context.callMethod("setCursorPosition", [this.id, line, 0]);
    }
    setTraceMarker(line) {
      if (line != null && dart.notNull(line) > 0) {
        js.context.callMethod("setTraceMarker", [this.id, line]);
      }
    }
    clearTraceMarkers() {
      js.context.callMethod("clearTraceMarkers", [this.id]);
    }
    setErrorMarker(line) {
      js.context.callMethod("setErrorMarker", [this.id, line]);
    }
    clearErrorMarkers() {
      js.context.callMethod("clearErrorMarkers", [this.id]);
    }
    clean() {
      this[_dirty] = false;
    }
    static onProgramUpdate(editor, change) {
      if (dart.test(codemirror.CodeMirror.programUpdateMap[$containsKey](editor))) {
        core.Function.apply(codemirror.CodeMirror.programUpdateMap[$_get](editor), [convert.jsonDecode(change)]);
      }
    }
    [_onProgramUpdate](change) {
      this[_dirty] = true;
      this.listener.onProgramUpdate(change);
      if (dart.dtest(dart.dsend(dart.dload(change[$_get]("text"), 'length'), '>', [1]))) {
        this.listener.onLineAdded(change);
      } else if (!dart.equals(dart.dsend(change[$_get]("from"), '_get', ["line"]), dart.dsend(change[$_get]("to"), '_get', ["line"]))) {
        this.listener.onLineRemoved(change);
      }
    }
    static onCursorActivity(editor, position) {
      if (dart.test(codemirror.CodeMirror.cursorActivityMap[$containsKey](editor))) {
        core.Function.apply(codemirror.CodeMirror.cursorActivityMap[$_get](editor), [convert.jsonDecode(position)]);
      }
    }
    [_onCursorActivity](position) {
      this.listener.onCursorActivity(position);
    }
    static onEditorBlur(editor) {
      if (dart.test(codemirror.CodeMirror.editorBlurMap[$containsKey](editor))) {
        core.Function.apply(codemirror.CodeMirror.editorBlurMap[$_get](editor), []);
      }
    }
    [_onEditorBlur]() {
      this.listener.onEditorBlur();
    }
  };
  (codemirror.CodeMirror.new = function(listener, id) {
    this[_dirty] = false;
    this[parent] = null;
    this[listener$] = listener;
    this[id$] = id;
    let el = html.querySelector(this.id);
    if (el != null) this.parent = el[$parent];
    if (js.context._get("onProgramUpdate") == null) {
      js.context._set("onProgramUpdate", C0 || CT.C0);
      js.context._set("onCursorActivity", C1 || CT.C1);
      js.context._set("onBlur", C2 || CT.C2);
    }
    codemirror.CodeMirror.programUpdateMap[$_set](this.id, dart.bind(this, _onProgramUpdate));
    codemirror.CodeMirror.cursorActivityMap[$_set](this.id, dart.bind(this, _onCursorActivity));
    codemirror.CodeMirror.editorBlurMap[$_set](this.id, dart.bind(this, _onEditorBlur));
  }).prototype = codemirror.CodeMirror.prototype;
  dart.addTypeTests(codemirror.CodeMirror);
  dart.addTypeCaches(codemirror.CodeMirror);
  dart.setMethodSignature(codemirror.CodeMirror, () => ({
    __proto__: dart.getMethods(codemirror.CodeMirror.__proto__),
    initialize: dart.fnType(dart.void, []),
    connectFirepad: dart.fnType(dart.void, [core.String]),
    getCode: dart.fnType(core.String, []),
    setCode: dart.fnType(dart.void, [core.String]),
    setCursorPosition: dart.fnType(dart.void, [core.int, core.int]),
    setTraceMarker: dart.fnType(dart.void, [core.int]),
    clearTraceMarkers: dart.fnType(dart.void, []),
    setErrorMarker: dart.fnType(dart.void, [core.int]),
    clearErrorMarkers: dart.fnType(dart.void, []),
    clean: dart.fnType(dart.void, []),
    [_onProgramUpdate]: dart.fnType(dart.void, [core.Map]),
    [_onCursorActivity]: dart.fnType(dart.void, [core.Map]),
    [_onEditorBlur]: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(codemirror.CodeMirror, () => ({
    __proto__: dart.getGetters(codemirror.CodeMirror.__proto__),
    isDirty: core.bool
  }));
  dart.setLibraryUri(codemirror.CodeMirror, L0);
  dart.setFieldSignature(codemirror.CodeMirror, () => ({
    __proto__: dart.getFields(codemirror.CodeMirror.__proto__),
    id: dart.fieldType(core.String),
    listener: dart.fieldType(codemirror.CodeMirrorListener),
    [_dirty]: dart.fieldType(core.bool),
    parent: dart.fieldType(html.Element)
  }));
  dart.defineLazy(codemirror.CodeMirror, {
    /*codemirror.CodeMirror.programUpdateMap*/get programUpdateMap() {
      return new (LinkedMapOfStringL$FunctionL()).new();
    },
    set programUpdateMap(_) {},
    /*codemirror.CodeMirror.cursorActivityMap*/get cursorActivityMap() {
      return new (LinkedMapOfStringL$FunctionL()).new();
    },
    set cursorActivityMap(_) {},
    /*codemirror.CodeMirror.editorBlurMap*/get editorBlurMap() {
      return new (LinkedMapOfStringL$FunctionL()).new();
    },
    set editorBlurMap(_) {}
  }, true);
  dart.trackLibraries("packages/editor/codemirror", {
    "package:editor/codemirror.dart": codemirror
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["codemirror.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAqCA;;;;;;;;;;;;;;;IAcS;;;;;;IAGY;;;;;;IAOX;;;;;;;AAHY;IAAM;;AA6BmB,MAAxC,AAAQ,sBAAW,cAAc,CAAE;IACxC;mBAG2B;AACiC,MAAvD,AAAQ,sBAAW,kBAAkB,CAAE,SAAI,SAAS;IACzD;;AAGE,4BAAU,AAAQ,sBAAW,WAAW,CAAE;IAC5C;YAEoB;AAC4B,MAA3C,AAAQ,sBAAW,WAAW,CAAE,SAAI,IAAI;AAC9B,MAAb,eAAS;IACX;sBAE2B,MAAU;AACwB,MAAxD,AAAQ,sBAAW,qBAAqB,CAAE,SAAI,IAAI,EAAE;IACzD;mBAEwB;AACtB,UAAI,IAAI,IAAI,QAAa,aAAL,IAAI,IAAG;AAC4B,QAAlD,AAAQ,sBAAW,kBAAkB,CAAE,SAAI,IAAI;;IAEtD;;AAGoD,MAA/C,AAAQ,sBAAW,qBAAqB,CAAE;IAC/C;mBAEwB;AAC+B,MAAlD,AAAQ,sBAAW,kBAAkB,CAAE,SAAI,IAAI;IACpD;;AAGoD,MAA/C,AAAQ,sBAAW,qBAAqB,CAAE;IAC/C;;AAK6B,MAAd,eAAS;IAAO;2BAMI,QAAe;AAChD,oBAAI,AAAiB,qDAAY,MAAM;AAC2B,QAAvD,oBAAM,AAAgB,8CAAC,MAAM,GAAG,CAAE,mBAAW,MAAM;;IAEhE;uBAE0B;AACX,MAAb,eAAS;AACuB,MAAhC,AAAS,8BAAgB,MAAM;AAG/B,qBAA0B,WAAP,WAAf,AAAM,MAAA,QAAC,0BAAiB;AACE,QAA5B,AAAS,0BAAY,MAAM;YACtB,kBAAkB,WAAd,AAAM,MAAA,QAAC,kBAAQ,UAAuB,WAAZ,AAAM,MAAA,QAAC,gBAAM;AAClB,QAA9B,AAAS,4BAAc,MAAM;;IAEjC;4BAMoC,QAAe;AACjD,oBAAI,AAAkB,sDAAY,MAAM;AAC6B,QAA1D,oBAAM,AAAiB,+CAAC,MAAM,GAAG,CAAE,mBAAW,QAAQ;;IAEnE;wBAE2B;AACU,MAAnC,AAAS,+BAAiB,QAAQ;IACpC;wBAOgC;AAC9B,oBAAI,AAAc,kDAAY,MAAM;AACO,QAAhC,oBAAM,AAAa,2CAAC,MAAM,GAAG;;IAE1C;;AAGyB,MAAvB,AAAS;IACX;;wCApHgB,UAAe;IAP1B,eAAS;IAIN;IAGQ;IAAe;AACrB,aAAK,mBAAc;AAC3B,QAAI,EAAE,IAAI,MAAW,AAAkB,cAAT,AAAG,EAAD;AAKhC,QAAO,AAAO,AAAoB,gBAAnB,sBAAsB;AACuB,MAAvD,AAAO,gBAAC;AACiD,MAAzD,AAAO,gBAAC;AACmC,MAA3C,AAAO,gBAAC;;AAM0B,IAAvC,AAAgB,8CAAC,mBAAM;AACkB,IAAzC,AAAiB,+CAAC,mBAAM;AACS,IAAjC,AAAa,2CAAC,mBAAM;EACtB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MArC6B,sCAAgB;YAAO;;;MACvB,uCAAiB;YAAO;;;MACxB,mCAAa;YAAO","file":"codemirror.ddc.js"}');
  // Exports:
  return {
    codemirror: codemirror
  };
});

//# sourceMappingURL=codemirror.ddc.js.map
