define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const preprocessor = Object.create(dart.library);
  const $split = dartx.split;
  const $clear = dartx.clear;
  const $length = dartx.length;
  const $_get = dartx._get;
  const $join = dartx.join;
  const $_set = dartx._set;
  const $substring = dartx.substring;
  const $trim = dartx.trim;
  const $isNotEmpty = dartx.isNotEmpty;
  const $startsWith = dartx.startsWith;
  const $indexOf = dartx.indexOf;
  const $removeLast = dartx.removeLast;
  const $add = dartx.add;
  const $contains = dartx.contains;
  const $isEmpty = dartx.isEmpty;
  const $last = dartx.last;
  let LinkedMapOfint$int = () => (LinkedMapOfint$int = dart.constFn(_js_helper.LinkedMap$(core.int, core.int)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  const CT = Object.create(null);
  const _matchings = dart.privateName(preprocessor, "_matchings");
  const _output = dart.privateName(preprocessor, "_output");
  const _multiline = dart.privateName(preprocessor, "_multiline");
  const _lastValidIndent = dart.privateName(preprocessor, "_lastValidIndent");
  const linemap = dart.privateName(preprocessor, "Preprocessor.linemap");
  preprocessor.Preprocessor = class Preprocessor extends core.Object {
    get linemap() {
      return this[linemap];
    }
    set linemap(value) {
      this[linemap] = value;
    }
    process(code, lineOffset) {
      if (lineOffset === void 0) lineOffset = 0;
      let lines = code[$split]("\n");
      this.linemap[$clear]();
      this[_matchings][$clear]();
      this[_output][$clear]();
      this[_multiline] = false;
      this[_lastValidIndent] = "";
      for (let i = 0; i < dart.notNull(lines[$length]); i = i + 1) {
        let line = lines[$_get](i);
        this.processLine(line, i + 1, lineOffset);
      }
      return this[_output][$join]("\n");
    }
    processLine(line, lineNumber, lineOffset) {
      this.linemap[$_set](dart.notNull(this[_output][$length]) + 1 + dart.notNull(lineOffset), lineNumber);
      let indent = this.getIndentation(line);
      if (indent.length > 0) line = line[$substring](indent.length)[$trim]();
      let continuation = dart.test(this[_matchings][$isNotEmpty]) || dart.test(this[_multiline]);
      let hasColon = false;
      let lineExtender = false;
      let closeMultiline = false;
      let commentOnly = line[$startsWith]("#");
      let whitespaceOnly = line.length === 0;
      let matchingPlayNote = false;
      let returnLine = false;
      this[_multiline] = false;
      if (!continuation) this[_lastValidIndent] = indent;
      for (let i = 0; i < line.length; i = i + 1) {
        let c = line[$_get](i);
        if (line[$indexOf]("\"\"\"", i) === i) {
          if (dart.test(this.matches("\"\"\""))) {
            this[_matchings][$removeLast]();
            closeMultiline = true;
            i = i + 2;
          } else if (!dart.test(this.inString())) {
            this[_matchings][$add]("\"\"\"");
            i = i + 2;
          }
        } else if (line[$indexOf]("'''", i) === i) {
          if (dart.test(this.matches("'''"))) {
            this[_matchings][$removeLast]();
            closeMultiline = true;
            i = i + 2;
          } else if (!dart.test(this.inString())) {
            this[_matchings][$add]("'''");
            i = i + 2;
          }
        } else if (!dart.test(this.inString()) && "[({\"'"[$contains](c)) {
          this[_matchings][$add](c);
          lineExtender = false;
          closeMultiline = false;
        } else if ("])}"[$contains](c) && dart.test(this.matches(c))) {
          this[_matchings][$removeLast]();
          if (c === ")" && matchingPlayNote && dart.test(this[_matchings][$isEmpty])) {
            let inject = ", line=" + dart.str(lineNumber);
            line = line[$substring](0, i) + inject + line[$substring](i);
            i = i + inject.length;
            matchingPlayNote = false;
            lineExtender = false;
            closeMultiline = false;
          }
        } else if ("'\""[$contains](c) && dart.test(this.matches(c))) {
          this[_matchings][$removeLast]();
        } else if (c === ":" && dart.test(this[_matchings][$isEmpty])) {
          hasColon = true;
          lineExtender = false;
          closeMultiline = false;
        } else if (c === "\\" && !dart.test(this.inString())) {
          lineExtender = true;
        } else if (!dart.test(this.inString()) && c === "#") {
          break;
        } else if (" \t\r\v\f"[$contains](c)) {
          continue;
        } else {
          lineExtender = false;
          closeMultiline = false;
        }
        if (dart.test(this[_matchings][$isEmpty]) && line[$indexOf]("playNote(", i) === i) {
          matchingPlayNote = true;
        }
        if (!dart.test(this.inString()) && line[$indexOf]("return", i) === i) {
          returnLine = true;
        }
      }
      this[_output][$add](dart.str(indent) + dart.str(line));
      if (dart.test(this[_matchings][$isEmpty]) && !hasColon && !lineExtender && !whitespaceOnly && !commentOnly && !closeMultiline && !returnLine) {
        if (continuation) {
          this[_output][$add](dart.str(this[_lastValidIndent]) + "trace(" + dart.str(lineNumber) + ")");
        } else {
          this[_output][$add](dart.str(indent) + "trace(" + dart.str(lineNumber) + ")");
        }
      }
      this[_multiline] = lineExtender || dart.test(this[_matchings][$isNotEmpty]);
    }
    inString() {
      return dart.test(this[_matchings][$isNotEmpty]) && dart.test(JSArrayOfString().of(["\"", "'", "'''", "\"\"\""])[$contains](this[_matchings][$last]));
    }
    matches(c) {
      if (dart.test(this[_matchings][$isEmpty])) return false;
      let l = this[_matchings][$last];
      if (c === "]" && l === "[") return true;
      if (c === "}" && l === "{") return true;
      if (c === ")" && l === "(") return true;
      if (c == l && dart.test(JSArrayOfString().of(["\"", "'", "'''", "\"\"\""])[$contains](c))) return true;
      return false;
    }
    getIndentation(line) {
      let indent = "";
      if (dart.test(this[_matchings][$isEmpty])) {
        for (let i = 0; i < line.length; i = i + 1) {
          let c = line[$_get](i);
          if (c === " " || c === "\t") {
            indent = indent + c;
          } else {
            return indent;
          }
        }
      }
      return indent;
    }
  };
  (preprocessor.Preprocessor.new = function() {
    this[linemap] = new (LinkedMapOfint$int()).new();
    this[_matchings] = JSArrayOfString().of([]);
    this[_output] = JSArrayOfString().of([]);
    this[_multiline] = false;
    this[_lastValidIndent] = "";
    ;
  }).prototype = preprocessor.Preprocessor.prototype;
  dart.addTypeTests(preprocessor.Preprocessor);
  dart.setMethodSignature(preprocessor.Preprocessor, () => ({
    __proto__: dart.getMethods(preprocessor.Preprocessor.__proto__),
    process: dart.fnType(core.String, [core.String], [core.int]),
    processLine: dart.fnType(dart.void, [core.String, core.int, core.int]),
    inString: dart.fnType(core.bool, []),
    matches: dart.fnType(core.bool, [core.String]),
    getIndentation: dart.fnType(core.String, [core.String])
  }));
  dart.setLibraryUri(preprocessor.Preprocessor, "package:compiler/dart/preprocessor.dart");
  dart.setFieldSignature(preprocessor.Preprocessor, () => ({
    __proto__: dart.getFields(preprocessor.Preprocessor.__proto__),
    linemap: dart.fieldType(core.Map$(core.int, core.int)),
    [_matchings]: dart.fieldType(core.List$(core.String)),
    [_output]: dart.fieldType(core.List$(core.String)),
    [_multiline]: dart.fieldType(core.bool),
    [_lastValidIndent]: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/compiler/dart/preprocessor", {
    "package:compiler/dart/preprocessor.dart": preprocessor
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["preprocessor.dart"],"names":[],"mappings":"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","file":"preprocessor.ddc.js"}');
  // Exports:
  return {
    dart__preprocessor: preprocessor
  };
});

//# sourceMappingURL=preprocessor.ddc.js.map
