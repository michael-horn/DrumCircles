define(['dart_sdk', 'packages/compiler/dart/preprocessor'], function(dart_sdk, packages__compiler__dart__preprocessor) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const convert = dart_sdk.convert;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const preprocessor = packages__compiler__dart__preprocessor.dart__preprocessor;
  const compiler = Object.create(dart.library);
  const $length = dartx.length;
  const $split = dartx.split;
  const $postMessage = dartx.postMessage;
  const $onMessage = dartx.onMessage;
  const $data = dartx.data;
  const $toString = dartx.toString;
  const $containsKey = dartx.containsKey;
  const $_get = dartx._get;
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  const CT = Object.create(null);
  compiler.PythonListener = class PythonListener extends core.Object {};
  (compiler.PythonListener.new = function() {
    ;
  }).prototype = compiler.PythonListener.prototype;
  dart.addTypeTests(compiler.PythonListener);
  dart.setLibraryUri(compiler.PythonListener, "package:compiler/dart/compiler.dart");
  const _compiling = dart.privateName(compiler, "_compiling");
  const listener$ = dart.privateName(compiler, "PythonCompiler.listener");
  const pp = dart.privateName(compiler, "PythonCompiler.pp");
  compiler.PythonCompiler = class PythonCompiler extends core.Object {
    get listener() {
      return this[listener$];
    }
    set listener(value) {
      this[listener$] = value;
    }
    get pp() {
      return this[pp];
    }
    set pp(value) {
      this[pp] = value;
    }
    get isCompiling() {
      return this[_compiling];
    }
    compile(code) {
      return async.async(core.bool, (function* compile() {
        this[_compiling] = true;
        let bplate = this.listener != null ? this.listener.getBoilerplate() : "";
        if (bplate == null) return false;
        let pcode = this.pp.process(code, bplate[$split]("\n")[$length]);
        let worker = html.Worker.new("packages/compiler/js/skulpt-webworker.js");
        try {
          let message = convert.jsonDecode(convert.jsonEncode(JSArrayOfString().of([dart.notNull(bplate) + "\n" + dart.notNull(pcode)])));
          worker[$postMessage](message);
          let error = false;
          let iter = async.StreamIterator.new(worker[$onMessage]);
          try {
            while (yield iter.moveNext()) {
              let e = iter.current;
              {
                if (dart.equals(dart.dsend(e[$data], '_get', [0]), "error")) {
                  this.pythonError(core.String._check(dart.dsend(e[$data], '_get', [1])), core.String._check(dart.dsend(e[$data], '_get', [2])), core.String._check(dart.dsend(e[$data], '_get', [3])), core.int._check(dart.dsend(e[$data], '_get', [4])));
                  error = true;
                } else if (dart.equals(dart.dsend(e[$data], '_get', [0]), "done")) {
                  this[_compiling] = false;
                  this.pythonDone(core.List._check(dart.dsend(e[$data], '_get', [1])));
                  return !error;
                }
              }
            }
          } finally {
            yield iter.cancel();
          }
        } catch (e$) {
          let e = dart.getThrown(e$);
          core.print(dart.toString(e));
        }
      }).bind(this));
    }
    pythonError(name, message, details, line) {
      if (message == null || message === "") message = "Unknown";
      if (dart.notNull(line) >= 0 && dart.test(this.pp.linemap[$containsKey](line))) {
        line = this.pp.linemap[$_get](line);
      } else {
        line = -1;
      }
      if (this.listener != null) this.listener.onPythonError(name, message, details, line);
    }
    pythonDone(outputs) {
      if (this.listener != null) this.listener.onPythonDone(outputs);
    }
  };
  (compiler.PythonCompiler.new = function(listener) {
    this[_compiling] = false;
    this[pp] = new preprocessor.Preprocessor.new();
    this[listener$] = listener;
    ;
  }).prototype = compiler.PythonCompiler.prototype;
  dart.addTypeTests(compiler.PythonCompiler);
  dart.setMethodSignature(compiler.PythonCompiler, () => ({
    __proto__: dart.getMethods(compiler.PythonCompiler.__proto__),
    compile: dart.fnType(async.Future$(core.bool), [core.String]),
    pythonError: dart.fnType(dart.void, [core.String, core.String, core.String, core.int]),
    pythonDone: dart.fnType(dart.void, [core.List])
  }));
  dart.setGetterSignature(compiler.PythonCompiler, () => ({
    __proto__: dart.getGetters(compiler.PythonCompiler.__proto__),
    isCompiling: core.bool
  }));
  dart.setLibraryUri(compiler.PythonCompiler, "package:compiler/dart/compiler.dart");
  dart.setFieldSignature(compiler.PythonCompiler, () => ({
    __proto__: dart.getFields(compiler.PythonCompiler.__proto__),
    listener: dart.fieldType(compiler.PythonListener),
    [_compiling]: dart.fieldType(core.bool),
    pp: dart.fieldType(preprocessor.Preprocessor)
  }));
  dart.trackLibraries("packages/compiler/dart/compiler", {
    "package:compiler/dart/compiler.dart": compiler
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["compiler.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;EA8BA;;;;;;;IASiB;;;;;;IAOF;;;;;;;AAHW;IAAU;YAWN;AAAR;AAED,QAAjB,mBAAa;AAEN,qBAAU,AAAS,iBAAG,OAAQ,AAAS,iCAAmB;AACjE,YAAI,AAAO,MAAD,IAAI,MAAM,MAAO;AAEpB,oBAAQ,AAAG,gBAAQ,IAAI,EAAE,AAAO,AAAY,MAAb,SAAO;AAEtC,qBAAa,gBAAO;AAE3B;AAEM,wBAAU,mBAAW,mBAAY,sBAAS,AAAO,aAAd,MAAM,IAAG,oBAAO,KAAK;AACjC,UAA3B,AAAO,MAAD,eAAa,OAAO;AACrB,sBAAQ;AAEb,8CAA6B,AAAO,MAAD;;;kBAAX;;AACtB,oBAAc,YAAJ,WAAN,AAAE,CAAD,kBAAM,KAAM;AACwC,kBAAvD,oCAAkB,WAAN,AAAE,CAAD,kBAAM,yBAAU,WAAN,AAAE,CAAD,kBAAM,yBAAU,WAAN,AAAE,CAAD,kBAAM,sBAAU,WAAN,AAAE,CAAD,kBAAM;AACxC,kBAAZ,QAAQ;sBAEL,KAAc,YAAJ,WAAN,AAAE,CAAD,kBAAM,KAAM;AACF,kBAAlB,mBAAa;AACQ,kBAArB,iCAAiB,WAAN,AAAE,CAAD,kBAAM;AAClB,wBAAO,EAAC,KAAK;;;;;YARO;;;cAYpB;AACe,UAAnB,WAAQ,cAAF,CAAC;;MAEX;;gBAMwB,MAAa,SAAgB,SAAa;AAChE,UAAI,AAAQ,OAAD,IAAI,QAAQ,AAAQ,OAAD,KAAI,IAAI,AAAmB,UAAT;AAEhD,UAAS,aAAL,IAAI,KAAI,eAAK,AAAG,AAAQ,8BAAY,IAAI;AACnB,QAAvB,OAAO,AAAG,AAAO,uBAAC,IAAI;;AAEb,QAAT,OAAO,CAAC;;AAEV,UAAI,iBAAY,MAAM,AAAS,AAA2C,4BAA7B,IAAI,EAAE,OAAO,EAAE,OAAO,EAAE,IAAI;IAC3E;eAMqB;AACnB,UAAI,iBAAY,MAAM,AAAS,AAAqB,2BAAR,OAAO;IACrD;;0CA5DoB;IAPf,mBAAa;IAIL,WAAS;IAGF;;EAAS","file":"compiler.ddc.js"}');
  // Exports:
  return {
    dart__compiler: compiler
  };
});

//# sourceMappingURL=compiler.ddc.js.map
