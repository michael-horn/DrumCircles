define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const _js_helper = dart_sdk._js_helper;
  const math = dart_sdk.math;
  const web_audio = dart_sdk.web_audio;
  const async = dart_sdk.async;
  const html = dart_sdk.html;
  const typed_data = dart_sdk.typed_data;
  const convert = dart_sdk.convert;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const key = Object.create(dart.library);
  const chain$ = Object.create(dart.library);
  const synth = Object.create(dart.library);
  const note$ = Object.create(dart.library);
  const event$ = Object.create(dart.library);
  const effect = Object.create(dart.library);
  const utils = Object.create(dart.library);
  const node$ = Object.create(dart.library);
  const trace$ = Object.create(dart.library);
  const clock = Object.create(dart.library);
  const scheduler = Object.create(dart.library);
  const synthesizer = Object.create(dart.library);
  const $_get = dartx._get;
  const $_set = dartx._set;
  const $connectNode = dartx.connectNode;
  const $values = dartx.values;
  const $forEach = dartx.forEach;
  const $isNotEmpty = dartx.isNotEmpty;
  const $add = dartx.add;
  const $remove = dartx.remove;
  const $length = dartx.length;
  const $floor = dartx.floor;
  const $removeLast = dartx.removeLast;
  const $clear = dartx.clear;
  const $onLoad = dartx.onLoad;
  const $response = dartx.response;
  const $decodeAudioData = dartx.decodeAudioData;
  const $onError = dartx.onError;
  const $append = dartx.append;
  const $truncate = dartx.truncate;
  const $modulo = dartx['%'];
  const $round = dartx.round;
  const $clamp = dartx.clamp;
  const $substring = dartx.substring;
  const $codeUnitAt = dartx.codeUnitAt;
  const $toUpperCase = dartx.toUpperCase;
  const $indexOf = dartx.indexOf;
  const $isEmpty = dartx.isEmpty;
  const $insert = dartx.insert;
  const $toString = dartx.toString;
  const $padLeft = dartx.padLeft;
  const $toLowerCase = dartx.toLowerCase;
  const $start2 = dartx.start2;
  const $connectParam = dartx.connectParam;
  const $containsKey = dartx.containsKey;
  const $console = dartx.console;
  const $map = dartx.map;
  const $toList = dartx.toList;
  const $keys = dartx.keys;
  const $split = dartx.split;
  let JSArrayOfint = () => (JSArrayOfint = dart.constFn(_interceptors.JSArray$(core.int)))();
  let LinkedMapOfint$SynthNode = () => (LinkedMapOfint$SynthNode = dart.constFn(_js_helper.LinkedMap$(core.int, node$.SynthNode)))();
  let SynthNodeToNull = () => (SynthNodeToNull = dart.constFn(dart.fnType(core.Null, [node$.SynthNode])))();
  let SynthNodeTovoid = () => (SynthNodeTovoid = dart.constFn(dart.fnType(dart.void, [node$.SynthNode])))();
  let JSArrayOfEffect = () => (JSArrayOfEffect = dart.constFn(_interceptors.JSArray$(effect.Effect)))();
  let JSArrayOfSynthEvent = () => (JSArrayOfSynthEvent = dart.constFn(_interceptors.JSArray$(event$.SynthEvent)))();
  let LinkedMapOfint$AudioBuffer = () => (LinkedMapOfint$AudioBuffer = dart.constFn(_js_helper.LinkedMap$(core.int, web_audio.AudioBuffer)))();
  let JSArrayOfSynthChain = () => (JSArrayOfSynthChain = dart.constFn(_interceptors.JSArray$(chain$.SynthChain)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let JSArrayOfAudioNode = () => (JSArrayOfAudioNode = dart.constFn(_interceptors.JSArray$(web_audio.AudioNode)))();
  let SynthEventTovoid = () => (SynthEventTovoid = dart.constFn(dart.fnType(dart.void, [event$.SynthEvent])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let ProgressEventToFutureOfNull = () => (ProgressEventToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [html.ProgressEvent])))();
  let ProgressEventTovoid = () => (ProgressEventTovoid = dart.constFn(dart.fnType(dart.void, [html.ProgressEvent])))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let ListOfnum = () => (ListOfnum = dart.constFn(core.List$(core.num)))();
  let JSArrayOfListOfnum = () => (JSArrayOfListOfnum = dart.constFn(_interceptors.JSArray$(ListOfnum())))();
  let JSArrayOfnum = () => (JSArrayOfnum = dart.constFn(_interceptors.JSArray$(core.num)))();
  let numTonum = () => (numTonum = dart.constFn(dart.fnType(core.num, [core.num])))();
  let JSArrayOfTraceEvent = () => (JSArrayOfTraceEvent = dart.constFn(_interceptors.JSArray$(trace$.TraceEvent)))();
  let LinkedMapOfString$dynamic = () => (LinkedMapOfString$dynamic = dart.constFn(_js_helper.LinkedMap$(core.String, dart.dynamic)))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let _HashSetOfClockSubscriber = () => (_HashSetOfClockSubscriber = dart.constFn(collection._HashSet$(clock.ClockSubscriber)))();
  let _HashSetOfMetronome = () => (_HashSetOfMetronome = dart.constFn(collection._HashSet$(clock.Metronome)))();
  let ClockSubscriberTovoid = () => (ClockSubscriberTovoid = dart.constFn(dart.fnType(dart.void, [clock.ClockSubscriber])))();
  let MetronomeTovoid = () => (MetronomeTovoid = dart.constFn(dart.fnType(dart.void, [clock.Metronome])))();
  let TimerToNull = () => (TimerToNull = dart.constFn(dart.fnType(core.Null, [async.Timer])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constList(["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"], core.String);
    },
    get C1() {
      return C1 = dart.constList(["rgb(229, 76, 78)", "rgb(223, 132, 74)", "rgb(228, 171, 81)", "rgb(227, 199, 73)", "rgb(223, 228, 78)", "rgb(174, 215, 71)", "rgb(63, 188, 70)", "rgb(63, 169, 180)", "rgb(64, 124, 180)", "rgb(78, 69, 179)", "rgb(141, 69, 183)", "rgb(202, 69, 147)"], core.String);
    },
    get C2() {
      return C2 = dart.const({
        __proto__: core.Duration.prototype,
        [Duration__duration]: 30000
      });
    }
  });
  const base = dart.privateName(key, "Key.base");
  const pattern = dart.privateName(key, "Key.pattern");
  const name$ = dart.privateName(key, "Key.name");
  const short = dart.privateName(key, "Key.short");
  key.Key = class Key extends core.Object {
    get base() {
      return this[base];
    }
    set base(value) {
      this[base] = value;
    }
    get pattern() {
      return this[pattern];
    }
    set pattern(value) {
      this[pattern] = value;
    }
    get name() {
      return this[name$];
    }
    set name(value) {
      this[name$] = value;
    }
    get short() {
      return this[short];
    }
    set short(value) {
      this[short] = value;
    }
  };
  (key.Key.new = function(name) {
    this[base] = 0;
    this[pattern] = JSArrayOfint().of([0, 2, 4, 5, 7, 9, 11]);
    this[name$] = "C major";
    this[short] = "Cmaj";
    this[name$] = name;
  }).prototype = key.Key.prototype;
  (key.Key.Cmaj = function() {
    this[base] = 0;
    this[pattern] = JSArrayOfint().of([0, 2, 4, 5, 7, 9, 11]);
    this[name$] = "C major";
    this[short] = "Cmaj";
    ;
  }).prototype = key.Key.prototype;
  dart.addTypeTests(key.Key);
  dart.setLibraryUri(key.Key, "package:synthesizer/src/key.dart");
  dart.setFieldSignature(key.Key, () => ({
    __proto__: dart.getFields(key.Key.__proto__),
    base: dart.fieldType(core.int),
    pattern: dart.fieldType(core.List$(core.int)),
    name: dart.fieldType(core.String),
    short: dart.fieldType(core.String)
  }));
  const _addNode = dart.privateName(chain$, "_addNode");
  const context$ = dart.privateName(chain$, "SynthChain.context");
  const free = dart.privateName(chain$, "SynthChain.free");
  const nodes = dart.privateName(chain$, "SynthChain.nodes");
  const out = dart.privateName(chain$, "SynthChain.out");
  const release = dart.privateName(chain$, "SynthChain.release");
  const maxD = dart.privateName(chain$, "SynthChain.maxD");
  chain$.SynthChain = class SynthChain extends core.Object {
    get context() {
      return this[context$];
    }
    set context(value) {
      this[context$] = value;
    }
    get free() {
      return this[free];
    }
    set free(value) {
      this[free] = value;
    }
    get nodes() {
      return this[nodes];
    }
    set nodes(value) {
      this[nodes] = value;
    }
    get out() {
      return this[out];
    }
    set out(value) {
      this[out] = value;
    }
    get release() {
      return this[release];
    }
    set release(value) {
      this[release] = value;
    }
    get maxD() {
      return this[maxD];
    }
    set maxD(value) {
      this[maxD] = value;
    }
    [_addNode](node) {
      node.enabled = false;
      this.nodes[$_set](node.id, node);
    }
    playNote(note, dest, when, offset, duration, sustain) {
      if (this.out == null) return 0.0;
      this.out.level[$connectNode](dest);
      this.maxD = duration;
      this.nodes[$values][$forEach](dart.fn(node => {
        node.start(note, when, offset, duration, sustain);
        if (node$.SynthSampleNode.is(node)) {
          this.maxD = math.max(core.num, this.maxD, node.sampleDuration);
        }
      }, SynthNodeToNull()));
      return dart.notNull(this.release) + dart.notNull(this.maxD);
    }
    pitchBend(cents) {
      this.nodes[$values][$forEach](dart.fn(node => node.pitchBend(cents), SynthNodeTovoid()));
    }
    schedulePitchBend(start, duration, cents) {
      this.nodes[$values][$forEach](dart.fn(node => node.schedulePitchBend(start, duration, cents), SynthNodeTovoid()));
    }
    releaseNote() {
      this.nodes[$values][$forEach](dart.fn(node => {
        node.release();
      }, SynthNodeToNull()));
    }
    cancel() {
      this.nodes[$values][$forEach](dart.fn(node => {
        node.cancel();
      }, SynthNodeToNull()));
    }
    destroy() {
      this.nodes[$values][$forEach](dart.fn(node => node.destroy(), SynthNodeTovoid()));
    }
  };
  (chain$.SynthChain.new = function(synth, context, config) {
    this[free] = true;
    this[nodes] = new (LinkedMapOfint$SynthNode()).new();
    this[out] = null;
    this[release] = 0.0;
    this[maxD] = 0.0;
    this[context$] = context;
    this.out = null;
    if (core.List.is(config[$_get]("nodes"))) {
      for (let node of core.Iterable._check(config[$_get]("nodes"))) {
        if (core.Map.is(node)) {
          switch (node[$_get]("type")) {
            case "sample":
            {
              this[_addNode](new node$.SynthSampleNode.new(synth, this.context, node));
              break;
            }
            case "fm":
            {
              this[_addNode](new node$.FMNode.new(this.context, node));
              break;
            }
            case "delay":
            {
              this[_addNode](new node$.SynthDelayNode.new(this.context, node));
              break;
            }
            case "adsr":
            {
              let adsr = new node$.ADSRNode.new(this.context, node);
              this.release = math.max(core.num, adsr.R, this.release);
              this[_addNode](adsr);
              break;
            }
            case "compressor":
            {
              this[_addNode](new node$.SynthCompressorNode.new(this.context, node));
              break;
            }
            case "filter":
            {
              this[_addNode](new node$.FilterNode.new(this.context, node));
              break;
            }
            case "out":
            {
              this.out = new node$.SynthNode.new(this.context, node);
              this[_addNode](this.out);
              break;
            }
            default:
            {
              this[_addNode](new node$.SynthNode.new(this.context, node));
              break;
            }
          }
        }
      }
    }
    for (let r of core.Iterable._check(config[$_get]("routing"))) {
      let source = this.nodes[$_get](dart.dsend(r, '_get', ["source"]));
      let dest = this.nodes[$_get](dart.dsend(r, '_get', ["dest"]));
      if (source != null && dest != null) {
        source.enabled = true;
        dest.connectFromSource(source, core.String._check(dart.dsend(r, '_get', ["type"])));
      }
    }
  }).prototype = chain$.SynthChain.prototype;
  dart.addTypeTests(chain$.SynthChain);
  dart.setMethodSignature(chain$.SynthChain, () => ({
    __proto__: dart.getMethods(chain$.SynthChain.__proto__),
    [_addNode]: dart.fnType(dart.void, [node$.SynthNode]),
    playNote: dart.fnType(core.num, [note$.Note, web_audio.AudioNode, core.num, core.num, core.num, core.bool]),
    pitchBend: dart.fnType(dart.void, [core.num]),
    schedulePitchBend: dart.fnType(dart.void, [core.num, core.num, core.List$(core.num)]),
    releaseNote: dart.fnType(dart.void, []),
    cancel: dart.fnType(dart.void, []),
    destroy: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(chain$.SynthChain, "package:synthesizer/src/chain.dart");
  dart.setFieldSignature(chain$.SynthChain, () => ({
    __proto__: dart.getFields(chain$.SynthChain.__proto__),
    context: dart.fieldType(web_audio.BaseAudioContext),
    free: dart.fieldType(core.bool),
    nodes: dart.fieldType(core.Map$(core.int, node$.SynthNode)),
    out: dart.fieldType(node$.SynthNode),
    release: dart.fieldType(core.num),
    maxD: dart.fieldType(core.num)
  }));
  const _bpm = dart.privateName(synth, "_bpm");
  const _bank = dart.privateName(synth, "_bank");
  const MAX_GENERATORS = dart.privateName(synth, "Synthesizer.MAX_GENERATORS");
  const effects = dart.privateName(synth, "Synthesizer.effects");
  const notes = dart.privateName(synth, "Synthesizer.notes");
  const config = dart.privateName(synth, "Synthesizer.config");
  const customRecordings = dart.privateName(synth, "Synthesizer.customRecordings");
  const voice = dart.privateName(synth, "Synthesizer.voice");
  synth.Synthesizer = class Synthesizer extends core.Object {
    get MAX_GENERATORS() {
      return this[MAX_GENERATORS];
    }
    set MAX_GENERATORS(value) {
      this[MAX_GENERATORS] = value;
    }
    get effects() {
      return this[effects];
    }
    set effects(value) {
      this[effects] = value;
    }
    get notes() {
      return this[notes];
    }
    set notes(value) {
      this[notes] = value;
    }
    get config() {
      return this[config];
    }
    set config(value) {
      this[config] = value;
    }
    get customRecordings() {
      return this[customRecordings];
    }
    set customRecordings(value) {
      this[customRecordings] = value;
    }
    get voice() {
      return this[voice];
    }
    set voice(value) {
      this[voice] = value;
    }
    get bpm() {
      return this[_bpm];
    }
    get isPlaying() {
      return this.notes[$isNotEmpty];
    }
    setTempo(tempo) {
      this[_bpm] = tempo;
    }
    loadPatch(name, patch, context) {
      return async.async(dart.void, (function* loadPatch() {
        this.voice = name;
        this.cancelAllNotes();
        this.config = patch;
        let load_count = 0;
        if (core.List.is(this.config[$_get]("nodes"))) {
          for (let t0 of core.Iterable._check(this.config[$_get]("nodes"))) {
            let node = core.Map._check(t0);
            if (dart.equals(node[$_get]("type"), "sample")) {
              if (core.List.is(node[$_get]("samples"))) {
                for (let t1 of core.Iterable._check(node[$_get]("samples"))) {
                  let sample = core.Map._check(t1);
                  if (sample[$_get]("sample") != null) {
                    load_count = load_count + 1;
                    let name = core.String._check(sample[$_get]("sample"));
                    this.loadAudioBuffer(name, context, dart.fn(n => {
                      load_count = load_count - 1;
                      if (load_count === 0) {
                      }
                    }, dynamicToNull()));
                  }
                }
              }
            }
          }
        }
      }).bind(this));
    }
    addCustomRecording(midi, buffer) {
      this.customRecordings[$_set](midi, buffer);
    }
    playNote(note, dest) {
      let t2;
      if (this.config == null) return null;
      let event = new event$.SynthEvent.new(note, dest.context);
      event.chain = this.allocateGenerator(dest.context);
      if (event.chain == null) return null;
      let gain = (t2 = dest.context.createGain(), t2.gain.value = note.gain, t2);
      gain[$connectNode](dest);
      dest = gain;
      event.playNote(dest);
      this.notes[$add](event);
      event.onEnded = dart.fn(() => {
        this.notes[$remove](event);
        if (event.chain != null) {
          this.releaseGenerator(event.chain);
          event.chain = null;
        }
        if (gain != null) {
          gain.disconnect();
          gain = null;
        }
      }, VoidToNull());
      return event;
    }
    release(event) {
      if (event != null) event.releaseNote();
    }
    releaseNote(note) {
      for (let i = dart.notNull(this.notes[$length]) - 1; i >= 0; i = i - 1) {
        if (this.notes[$_get](i).note.note == note.note) {
          this.release(this.notes[$_get](i));
        }
      }
    }
    releaseAllNotes() {
      for (let i = dart.notNull(this.notes[$length]) - 1; i >= 0; i = i - 1) {
        this.release(this.notes[$_get](i));
      }
    }
    scheduleNote(note, dest, start, delta) {
      if (start === void 0) start = 0;
      if (delta === void 0) delta = 0;
      return async.async(dart.void, (function* scheduleNote() {
        let t2;
        if (this.config == null) return;
        let now = dest.context.currentTime;
        let duration = dart.notNull(note.duration) * (60 / dart.notNull(this.bpm));
        let offset = math.max(core.num, 0, -dart.notNull(delta));
        let off = math.max(core.num, 0, offset - dart.notNull(start)) * (60 / dart.notNull(this.bpm));
        let delay = math.max(core.num, 0, delta) * (60 / dart.notNull(this.bpm));
        start = (dart.notNull(start) + dart.notNull(delta)) * (60 / dart.notNull(this.bpm));
        offset = offset * (60 / dart.notNull(this.bpm));
        let event = new event$.SynthEvent.new(note, dest.context);
        this.notes[$add](event);
        let fx = JSArrayOfEffect().of([]);
        for (let e of this.effects) {
          fx[$add](e.clone());
        }
        let slept = false;
        if (dart.notNull(start) > 0.3 && off <= 0) {
          let pause = ((dart.notNull(start) - 0.25) * 1000)[$floor]();
          yield async.Future.delayed(new core.Duration.new({milliseconds: pause}));
          slept = true;
          delta = dart.notNull(dest.context.currentTime) - dart.notNull(now);
          delay = math.max(core.num, 0, delay - dart.notNull(delta));
          offset = offset + dart.notNull(delta);
          start = dart.notNull(start) - dart.notNull(delta);
          now = dart.notNull(now) + dart.notNull(delta);
        }
        if (slept && dart.notNull(start) < -0.05 || dart.test(event.canceled)) {
          this.notes[$remove](event);
          return;
        }
        event.chain = this.allocateGenerator(dest.context);
        if (event.chain == null) {
          this.notes[$remove](event);
          return;
        }
        let nodes = JSArrayOfAudioNode().of([]);
        for (let i = dart.notNull(fx[$length]) - 1; i >= 0; i = i - 1) {
          dest = fx[$_get](i).connect(dest, this.bpm, delay, offset);
          nodes[$add](dest);
        }
        let gain = (t2 = dest.context.createGain(), t2.gain.value = note.gain, t2);
        gain[$connectNode](dest);
        nodes[$add](gain);
        dest = gain;
        event.scheduleNote(dest, dart.notNull(now) + dart.notNull(start), off, duration);
        for (let effect of fx) {
          effect.afterEffect(event, this.bpm, delay, offset);
        }
        event.onEnded = dart.fn(() => {
          for (let node of nodes)
            node.disconnect();
          this.notes[$remove](event);
          if (event.chain != null) {
            this.releaseGenerator(event.chain);
            event.chain = null;
          }
        }, VoidToNull());
      }).bind(this));
    }
    cancelAllNotes() {
      for (let i = dart.notNull(this.notes[$length]) - 1; i >= 0; i = i - 1) {
        this.notes[$_get](i).cancelNote();
      }
      this.destroyAllGenerators();
    }
    cancelAfter(beatsInFuture) {
      let t = dart.notNull(beatsInFuture) * (60 / dart.notNull(this.bpm));
      for (let i = dart.notNull(this.notes[$length]) - 1; i >= 0; i = i - 1) {
        let e = this.notes[$_get](i);
        let delta = dart.notNull(e.start) - dart.notNull(e.context.currentTime);
        if (e.start === 0 || delta >= t) e.cancelNote();
      }
    }
    pitchBend(cents) {
      this.notes[$forEach](dart.fn(event => event.pitchBend(cents), SynthEventTovoid()));
    }
    pushEffect(effect) {
      if (effect != null) {
        this.effects[$add](effect);
      }
    }
    popEffect() {
      return dart.test(this.effects[$isNotEmpty]) ? this.effects[$removeLast]() : null;
    }
    clearEffects() {
      this.effects[$clear]();
    }
    allocateGenerator(context) {
      if (dart.test(this[_bank][$isNotEmpty]) && !dart.equals(this[_bank][$_get](0).context, context)) {
        this.destroyAllGenerators();
      }
      for (let chain of this[_bank]) {
        if (dart.test(chain.free) && dart.equals(chain.context, context)) {
          chain.free = false;
          return chain;
        }
      }
      if (dart.notNull(this[_bank][$length]) < dart.notNull(this.MAX_GENERATORS)) {
        let chain = new chain$.SynthChain.new(this, context, this.config);
        chain.free = false;
        this[_bank][$add](chain);
        return chain;
      }
      return null;
    }
    releaseGenerator(generator) {
      generator.free = true;
    }
    destroyAllGenerators() {
      for (let chain of this[_bank]) {
        chain.destroy();
      }
      this[_bank][$clear]();
    }
    static hasSound(name) {
      return synth.Synthesizer.sounds[$_get](name) != null;
    }
    static getAudioBuffer(name) {
      return web_audio.AudioBuffer._check(synth.Synthesizer.sounds[$_get](name));
    }
    loadAudioBuffer(name, context, onLoaded) {
      return async.async(dart.void, function* loadAudioBuffer() {
        if (dart.test(synth.Synthesizer.hasSound(name))) return;
        let url = dart.test(synth.Synthesizer.supportsAudioType("ogg")) ? dart.str(name) + ".ogg" : dart.str(name) + ".wav";
        let request = html.HttpRequest.new();
        request.open("GET", url, {async: true});
        request.responseType = "arraybuffer";
        request[$onLoad].listen(dart.fn(e => async.async(core.Null, function*() {
          let buffer = (yield context[$decodeAudioData](typed_data.ByteBuffer._check(request[$response])));
          if (buffer != null) {
            synth.Synthesizer.sounds[$_set](name, buffer);
            core.Function.apply(onLoaded, [name]);
          }
        }), ProgressEventToFutureOfNull()));
        request[$onError].listen(dart.fn(e => core.print("BufferLoader: XHR error"), ProgressEventTovoid()));
        request.send();
      });
    }
    static supportsAudioType(filetype) {
      let supportsFormat = false;
      let audio = html.AudioElement.new();
      audio.id = "test-audio-node";
      let formats = new (IdentityMapOfString$String()).from(["mp3", "audio/mpeg", "mp4", "audio/mp4", "ogg", "audio/ogg", "aif", "audio/x-aiff", "wav", "audio/wav"]);
      html.document.body[$append](audio);
      if (audio.canPlayType(formats[$_get](filetype)) === "probably" || audio.canPlayType(formats[$_get](filetype)) === "maybe") {
        supportsFormat = true;
        html.querySelector("#test-audio-node")[$remove]();
      }
      return supportsFormat;
    }
  };
  (synth.Synthesizer.new = function() {
    this[MAX_GENERATORS] = 16;
    this[_bpm] = 120;
    this[effects] = JSArrayOfEffect().of([]);
    this[notes] = JSArrayOfSynthEvent().of([]);
    this[config] = null;
    this[customRecordings] = new (LinkedMapOfint$AudioBuffer()).new();
    this[_bank] = JSArrayOfSynthChain().of([]);
    this[voice] = "";
    ;
  }).prototype = synth.Synthesizer.prototype;
  dart.addTypeTests(synth.Synthesizer);
  dart.setMethodSignature(synth.Synthesizer, () => ({
    __proto__: dart.getMethods(synth.Synthesizer.__proto__),
    setTempo: dart.fnType(dart.void, [core.int]),
    loadPatch: dart.fnType(dart.void, [core.String, core.Map, web_audio.AudioContext]),
    addCustomRecording: dart.fnType(dart.void, [core.int, web_audio.AudioBuffer]),
    playNote: dart.fnType(event$.SynthEvent, [note$.Note, web_audio.AudioNode]),
    release: dart.fnType(dart.void, [event$.SynthEvent]),
    releaseNote: dart.fnType(dart.void, [note$.Note]),
    releaseAllNotes: dart.fnType(dart.void, []),
    scheduleNote: dart.fnType(dart.void, [note$.Note, web_audio.AudioNode], [core.num, core.num]),
    cancelAllNotes: dart.fnType(dart.void, []),
    cancelAfter: dart.fnType(dart.void, [core.num]),
    pitchBend: dart.fnType(dart.void, [core.num]),
    pushEffect: dart.fnType(dart.void, [effect.Effect]),
    popEffect: dart.fnType(effect.Effect, []),
    clearEffects: dart.fnType(dart.void, []),
    allocateGenerator: dart.fnType(chain$.SynthChain, [web_audio.BaseAudioContext]),
    releaseGenerator: dart.fnType(dart.void, [chain$.SynthChain]),
    destroyAllGenerators: dart.fnType(dart.void, []),
    loadAudioBuffer: dart.fnType(dart.void, [core.String, web_audio.AudioContext, core.Function])
  }));
  dart.setGetterSignature(synth.Synthesizer, () => ({
    __proto__: dart.getGetters(synth.Synthesizer.__proto__),
    bpm: core.int,
    isPlaying: core.bool
  }));
  dart.setLibraryUri(synth.Synthesizer, "package:synthesizer/src/synth.dart");
  dart.setFieldSignature(synth.Synthesizer, () => ({
    __proto__: dart.getFields(synth.Synthesizer.__proto__),
    MAX_GENERATORS: dart.fieldType(core.int),
    [_bpm]: dart.fieldType(core.int),
    effects: dart.fieldType(core.List$(effect.Effect)),
    notes: dart.fieldType(core.List$(event$.SynthEvent)),
    config: dart.fieldType(core.Map),
    customRecordings: dart.fieldType(core.Map$(core.int, web_audio.AudioBuffer)),
    [_bank]: dart.fieldType(core.List$(chain$.SynthChain)),
    voice: dart.fieldType(core.String)
  }));
  dart.defineLazy(synth.Synthesizer, {
    /*synth.Synthesizer.sounds*/get sounds() {
      return new _js_helper.LinkedMap.new();
    },
    set sounds(_) {}
  });
  const _note = dart.privateName(note$, "_note");
  const _velocity = dart.privateName(note$, "_velocity");
  const start = dart.privateName(note$, "Note.start");
  const duration = dart.privateName(note$, "Note.duration");
  note$.Note = class Note extends core.Object {
    get start() {
      return this[start];
    }
    set start(value) {
      this[start] = value;
    }
    get duration() {
      return this[duration];
    }
    set duration(value) {
      this[duration] = value;
    }
    get note() {
      return this[_note];
    }
    set note(n) {
      return this[_note] = math.max(core.num, 0, n);
    }
    get end() {
      return dart.notNull(this.start) + dart.notNull(this.duration);
    }
    get octave() {
      return (dart.notNull(this.note) / 12)[$truncate]();
    }
    set octave(o) {
      return this.note = dart.notNull(o) * 12 + dart.notNull(this.step);
    }
    get step() {
      return this.note[$round]()[$modulo](12);
    }
    set step(s) {
      return this.note = dart.notNull(this.octave) * 12 + dart.notNull(s);
    }
    get velocity() {
      return this[_velocity];
    }
    set velocity(v) {
      return this[_velocity] = v[$clamp](0, 127);
    }
    get gain() {
      return dart.notNull(this.velocity) * dart.notNull(this.velocity) / (127 * 127);
    }
    get name() {
      return dart.str(note$.NOTES[$_get](this.step));
    }
    get accidental() {
      return this.name[$substring](1);
    }
    get nameWithOctave() {
      return dart.str(note$.NOTES[$_get](this.step)) + dart.str(dart.notNull(this.octave) - 1);
    }
    get stepColor() {
      return note$.NOTE_COLORS[$_get](this.step[$modulo](note$.NOTE_COLORS[$length]));
    }
    get rate() {
      return math.pow(2, dart.notNull(this.octave) + dart.notNull(this.step) / 12);
    }
    get frequency() {
      return 16.3516 * dart.notNull(this.rate);
    }
    nameToOctave(n) {
      if (n == null || n.length < 2) {
        return 0;
      } else if (n.length === 2) {
        return math.max(core.int, 0, math.min(core.int, 8, n[$codeUnitAt](1) - 48));
      } else {
        return math.max(core.int, 0, math.min(core.int, 8, n[$codeUnitAt](2) - 48));
      }
    }
    nameToStep(n) {
      if (n == null || n === "") {
        return 0;
      } else if (n.length <= 2) {
        n = n[$_get](0)[$toUpperCase]();
      } else {
        n = n[$substring](0, 2)[$toUpperCase]();
      }
      return math.max(core.int, 0, note$.NOTES[$indexOf](n));
    }
  };
  (note$.Note.new = function(n) {
    this[_note] = 60;
    this[start] = 0.0;
    this[duration] = 1.0;
    this[_velocity] = 90;
    this.note = n;
  }).prototype = note$.Note.prototype;
  (note$.Note.fromName = function(n) {
    this[_note] = 60;
    this[start] = 0.0;
    this[duration] = 1.0;
    this[_velocity] = 90;
    this.octave = this.nameToOctave(n);
    this.step = this.nameToStep(n);
  }).prototype = note$.Note.prototype;
  dart.addTypeTests(note$.Note);
  dart.setMethodSignature(note$.Note, () => ({
    __proto__: dart.getMethods(note$.Note.__proto__),
    nameToOctave: dart.fnType(core.int, [core.String]),
    nameToStep: dart.fnType(core.int, [core.String])
  }));
  dart.setGetterSignature(note$.Note, () => ({
    __proto__: dart.getGetters(note$.Note.__proto__),
    note: core.num,
    end: core.num,
    octave: core.int,
    step: core.int,
    velocity: core.num,
    gain: core.num,
    name: core.String,
    accidental: core.String,
    nameWithOctave: core.String,
    stepColor: core.String,
    rate: core.num,
    frequency: core.num
  }));
  dart.setSetterSignature(note$.Note, () => ({
    __proto__: dart.getSetters(note$.Note.__proto__),
    note: core.num,
    octave: core.int,
    step: core.int,
    velocity: core.num
  }));
  dart.setLibraryUri(note$.Note, "package:synthesizer/src/note.dart");
  dart.setFieldSignature(note$.Note, () => ({
    __proto__: dart.getFields(note$.Note.__proto__),
    [_note]: dart.fieldType(core.num),
    start: dart.fieldType(core.num),
    duration: dart.fieldType(core.num),
    [_velocity]: dart.fieldType(core.num)
  }));
  let C0;
  let C1;
  dart.defineLazy(note$, {
    /*note$.A0Hz*/get A0Hz() {
      return 27.5;
    },
    /*note$.C0Hz*/get C0Hz() {
      return 16.3516;
    },
    /*note$.NOTES*/get NOTES() {
      return C0 || CT.C0;
    },
    /*note$.NOTE_COLORS*/get NOTE_COLORS() {
      return C1 || CT.C1;
    }
  });
  const note$0 = dart.privateName(event$, "SynthEvent.note");
  const context$0 = dart.privateName(event$, "SynthEvent.context");
  const chain = dart.privateName(event$, "SynthEvent.chain");
  const start$ = dart.privateName(event$, "SynthEvent.start");
  const end = dart.privateName(event$, "SynthEvent.end");
  const onEnded = dart.privateName(event$, "SynthEvent.onEnded");
  const canceled = dart.privateName(event$, "SynthEvent.canceled");
  event$.SynthEvent = class SynthEvent extends core.Object {
    get note() {
      return this[note$0];
    }
    set note(value) {
      this[note$0] = value;
    }
    get context() {
      return this[context$0];
    }
    set context(value) {
      this[context$0] = value;
    }
    get chain() {
      return this[chain];
    }
    set chain(value) {
      this[chain] = value;
    }
    get start() {
      return this[start$];
    }
    set start(value) {
      this[start$] = value;
    }
    get end() {
      return this[end];
    }
    set end(value) {
      this[end] = value;
    }
    get onEnded() {
      return this[onEnded];
    }
    set onEnded(value) {
      this[onEnded] = value;
    }
    get canceled() {
      return this[canceled];
    }
    set canceled(value) {
      this[canceled] = value;
    }
    playNote(dest) {
      if (this.chain != null) {
        this.start = this.chain.context.currentTime;
        this.chain.playNote(this.note, dest, 0, 0, 0, true);
      }
    }
    releaseNote() {
      if (this.chain != null) {
        this.chain.releaseNote();
        let timeout = (dart.notNull(this.chain.release) * 1000)[$round]() + 200;
        async.Timer.new(new core.Duration.new({milliseconds: timeout}), dart.fn(() => {
          if (this.onEnded != null) core.Function.apply(this.onEnded, []);
        }, VoidToNull()));
      }
    }
    scheduleNote(dest, when, offset, duration) {
      if (this.chain != null) {
        this.chain.playNote(this.note, dest, when, offset, duration, false);
        this.start = when;
        this.end = dart.notNull(this.start) + dart.notNull(duration);
        let now = this.context.currentTime;
        let timeout = ((dart.notNull(when) - dart.notNull(now) + dart.notNull(duration) + dart.notNull(this.chain.release)) * 1000)[$round]() + 200;
        async.Timer.new(new core.Duration.new({milliseconds: timeout}), dart.fn(() => {
          if (this.onEnded != null) core.Function.apply(this.onEnded, []);
        }, VoidToNull()));
      }
    }
    cancelNote() {
      this.canceled = true;
      if (this.onEnded != null) core.Function.apply(this.onEnded, []);
      this.onEnded = null;
    }
    pitchBend(cents) {
      if (this.chain != null) this.chain.pitchBend(cents);
    }
    schedulePitchBend(start, duration, cents) {
      if (this.chain != null) this.chain.schedulePitchBend(start, duration, cents);
    }
  };
  (event$.SynthEvent.new = function(note, context) {
    this[context$0] = null;
    this[chain] = null;
    this[start$] = 0;
    this[end] = 0;
    this[onEnded] = null;
    this[canceled] = false;
    this[note$0] = note;
    this[context$0] = context;
    ;
  }).prototype = event$.SynthEvent.prototype;
  dart.addTypeTests(event$.SynthEvent);
  dart.setMethodSignature(event$.SynthEvent, () => ({
    __proto__: dart.getMethods(event$.SynthEvent.__proto__),
    playNote: dart.fnType(dart.void, [web_audio.AudioNode]),
    releaseNote: dart.fnType(dart.void, []),
    scheduleNote: dart.fnType(dart.void, [web_audio.AudioNode, core.num, core.num, core.num]),
    cancelNote: dart.fnType(dart.void, []),
    pitchBend: dart.fnType(dart.void, [core.num]),
    schedulePitchBend: dart.fnType(dart.void, [core.num, core.num, core.List$(core.num)])
  }));
  dart.setLibraryUri(event$.SynthEvent, "package:synthesizer/src/event.dart");
  dart.setFieldSignature(event$.SynthEvent, () => ({
    __proto__: dart.getFields(event$.SynthEvent.__proto__),
    note: dart.fieldType(note$.Note),
    context: dart.fieldType(web_audio.BaseAudioContext),
    chain: dart.fieldType(chain$.SynthChain),
    start: dart.fieldType(core.num),
    end: dart.fieldType(core.num),
    onEnded: dart.fieldType(core.Function),
    canceled: dart.fieldType(core.bool)
  }));
  const name$0 = dart.privateName(effect, "Effect.name");
  const params$ = dart.privateName(effect, "Effect.params");
  const start$0 = dart.privateName(effect, "Effect.start");
  const beats = dart.privateName(effect, "Effect.beats");
  const node = dart.privateName(effect, "Effect.node");
  const oparams = dart.privateName(effect, "Effect.oparams");
  effect.Effect = class Effect extends core.Object {
    get name() {
      return this[name$0];
    }
    set name(value) {
      this[name$0] = value;
    }
    get params() {
      return this[params$];
    }
    set params(value) {
      this[params$] = value;
    }
    get start() {
      return this[start$0];
    }
    set start(value) {
      this[start$0] = value;
    }
    get beats() {
      return this[beats];
    }
    set beats(value) {
      this[beats] = value;
    }
    get node() {
      return this[node];
    }
    set node(value) {
      this[node] = value;
    }
    get oparams() {
      return this[oparams];
    }
    set oparams(value) {
      this[oparams] = value;
    }
    static new(name, params) {
      if (name === "lowpass" || name === "filter") {
        return new effect.BiquadFilter.new("lowpass", params);
      } else if (name === "highpass") {
        return new effect.BiquadFilter.new("highpass", params);
      } else if (name === "bandpass") {
        return new effect.BiquadFilter.new("bandpass", params);
      } else if (name === "notch") {
        return new effect.BiquadFilter.new("notch", params);
      } else if (name === "pan") {
        return new effect.PanEffect.new(params);
      } else if (name === "gain") {
        return new effect.GainEffect.new(params);
      } else if (name === "bend") {
        return new effect.PitchBendEffect.new(params);
      } else {
        return null;
      }
    }
    clone() {
      return effect.Effect.new(this.name, this.oparams);
    }
    connect(dest, bpm, delay, offset) {
      let t2;
      this.node = (t2 = dest.context.createGain(), t2.gain.value = 1.0, t2);
      this.node[$connectNode](dest);
      return this.node;
    }
    disconnect() {
      if (this.node != null) this.node.disconnect();
      this.node = null;
    }
    afterEffect(event, bpm, delay, offset) {
    }
    clampParam(param, minVal, maxVal) {
      for (let i = 0; i < dart.notNull(param[$length]); i = i + 1) {
        param[$_set](i, param[$_get](i)[$clamp](minVal, maxVal));
      }
    }
  };
  (effect.Effect._internal = function(name, params) {
    this[params$] = JSArrayOfListOfnum().of([]);
    this[start$0] = 0;
    this[beats] = -1.0;
    this[node] = null;
    this[oparams] = null;
    this[name$0] = name;
    this.start = math.max(core.num, 0, utils.toNum(params[$_get]("start")));
    this.beats = utils.toNum(params[$_get]("beats"));
    this.oparams = params;
    for (let c of core.Iterable._check(params[$_get]("values"))) {
      let values = JSArrayOfnum().of([]);
      if (core.List.is(c)) {
        for (let val of c)
          values[$add](utils.toNum(val));
      } else if (typeof c == 'number') {
        values[$add](c);
      }
      this.params[$add](values);
    }
  }).prototype = effect.Effect.prototype;
  dart.addTypeTests(effect.Effect);
  dart.setMethodSignature(effect.Effect, () => ({
    __proto__: dart.getMethods(effect.Effect.__proto__),
    clone: dart.fnType(effect.Effect, []),
    connect: dart.fnType(web_audio.AudioNode, [web_audio.AudioNode, core.int, core.num, core.num]),
    disconnect: dart.fnType(dart.void, []),
    afterEffect: dart.fnType(dart.void, [event$.SynthEvent, core.int, core.num, core.num]),
    clampParam: dart.fnType(dart.void, [core.List$(core.num), core.num, core.num])
  }));
  dart.setLibraryUri(effect.Effect, "package:synthesizer/src/effect.dart");
  dart.setFieldSignature(effect.Effect, () => ({
    __proto__: dart.getFields(effect.Effect.__proto__),
    name: dart.fieldType(core.String),
    params: dart.fieldType(core.List$(core.List$(core.num))),
    start: dart.fieldType(core.num),
    beats: dart.fieldType(core.num),
    node: dart.fieldType(web_audio.AudioNode),
    oparams: dart.fieldType(core.Map$(core.String, dart.dynamic))
  }));
  const type = dart.privateName(effect, "BiquadFilter.type");
  effect.BiquadFilter = class BiquadFilter extends effect.Effect {
    get type() {
      return this[type];
    }
    set type(value) {
      this[type] = value;
    }
    get frequency() {
      return this.params[$_get](0);
    }
    get Q() {
      return this.params[$_get](1);
    }
    get gain() {
      return this.params[$_get](2);
    }
    connect(dest, bpm, delay, offset) {
      let t2;
      this.node = (t2 = dest.context.createBiquadFilter(), t2.type = this.type, t2);
      this.node[$connectNode](dest);
      let fp = web_audio.BiquadFilterNode.as(this.node).frequency;
      let qp = web_audio.BiquadFilterNode.as(this.node).Q;
      let gp = web_audio.BiquadFilterNode.as(this.node).gain;
      let when = dart.notNull(dest.context.currentTime) + dart.notNull(delay) + dart.notNull(this.start) * (60 / dart.notNull(bpm)) - dart.notNull(offset);
      fp.value = this.frequency[$_get](0);
      qp.value = this.Q[$_get](0);
      gp.value = this.gain[$_get](0);
      if (dart.notNull(this.beats) > 0 && dart.notNull(this.frequency[$length]) > 1) {
        fp.cancelScheduledValues(0);
        fp.setValueCurveAtTime(this.frequency, when, dart.notNull(this.beats) * (60 / dart.notNull(bpm)));
      }
      if (dart.notNull(this.beats) > 0 && dart.notNull(this.Q[$length]) > 1) {
        qp.cancelScheduledValues(0);
        qp.setValueCurveAtTime(this.Q, when, dart.notNull(this.beats) * (60 / dart.notNull(bpm)));
      }
      if (dart.notNull(this.beats) > 0 && dart.notNull(this.gain[$length]) > 1) {
        gp.cancelScheduledValues(0);
        gp.setValueCurveAtTime(this.gain, when, dart.notNull(this.beats) * (60 / dart.notNull(bpm)));
      }
      return this.node;
    }
  };
  (effect.BiquadFilter.new = function(name, params) {
    this[type] = "lowpass";
    effect.BiquadFilter.__proto__._internal.call(this, name, params);
    this.type = name;
    if (dart.test(this.params[$isEmpty])) {
      this.params[$add](JSArrayOfnum().of([]));
      this.frequency[$add](1000);
    }
    if (dart.notNull(this.params[$length]) < 2) {
      this.params[$add](JSArrayOfnum().of([]));
      this.Q[$add](0.8);
    }
    if (dart.notNull(this.params[$length]) < 3) {
      this.params[$add](JSArrayOfnum().of([]));
      this.gain[$add](1.0);
    }
    this.clampParam(this.frequency, 10, 22050);
    if (name === "highpass" || name === "lowpass") this.clampParam(this.Q, -20.0, 20.0);
  }).prototype = effect.BiquadFilter.prototype;
  dart.addTypeTests(effect.BiquadFilter);
  dart.setGetterSignature(effect.BiquadFilter, () => ({
    __proto__: dart.getGetters(effect.BiquadFilter.__proto__),
    frequency: core.List$(core.num),
    Q: core.List$(core.num),
    gain: core.List$(core.num)
  }));
  dart.setLibraryUri(effect.BiquadFilter, "package:synthesizer/src/effect.dart");
  dart.setFieldSignature(effect.BiquadFilter, () => ({
    __proto__: dart.getFields(effect.BiquadFilter.__proto__),
    type: dart.fieldType(core.String)
  }));
  effect.PitchBendEffect = class PitchBendEffect extends effect.Effect {
    get values() {
      return this.params[$_get](0);
    }
    afterEffect(event, bpm, delay, offset) {
      if (dart.test(this.values[$isEmpty])) return;
      if (dart.notNull(this.beats) <= 0) {
        event.pitchBend(this.values[$_get](0));
      } else {
        if (this.values[$length] === 1) this.values[$insert](0, 0.0);
        let when = dart.notNull(delay) + dart.notNull(this.start) * (60 / dart.notNull(bpm)) - dart.notNull(offset);
        event.schedulePitchBend(math.max(core.num, 0, when), dart.notNull(this.beats) * (60 / dart.notNull(bpm)), this.values);
      }
    }
  };
  (effect.PitchBendEffect.new = function(params) {
    effect.PitchBendEffect.__proto__._internal.call(this, "bend", params);
    ;
  }).prototype = effect.PitchBendEffect.prototype;
  dart.addTypeTests(effect.PitchBendEffect);
  dart.setGetterSignature(effect.PitchBendEffect, () => ({
    __proto__: dart.getGetters(effect.PitchBendEffect.__proto__),
    values: core.List$(core.num)
  }));
  dart.setLibraryUri(effect.PitchBendEffect, "package:synthesizer/src/effect.dart");
  effect.PanEffect = class PanEffect extends effect.Effect {
    get values() {
      return this.params[$_get](0);
    }
    connect(dest, bpm, delay, offset) {
      this.node = dest.context.createStereoPanner();
      this.node[$connectNode](dest);
      let p = web_audio.StereoPannerNode.as(this.node).pan;
      if (dart.test(this.values[$isEmpty])) return this.node;
      p.value = this.values[$_get](0);
      if (dart.notNull(this.beats) > 0 && dart.notNull(this.values[$length]) > 1) {
        let when = dart.notNull(dest.context.currentTime) + dart.notNull(delay) + dart.notNull(this.start) * (60 / dart.notNull(bpm)) - dart.notNull(offset);
        p.cancelScheduledValues(0);
        p.setValueCurveAtTime(this.values, when, dart.notNull(this.beats) * (60 / dart.notNull(bpm)));
      }
      return this.node;
    }
  };
  (effect.PanEffect.new = function(params) {
    effect.PanEffect.__proto__._internal.call(this, "pan", params);
    this.clampParam(this.values, -1.0, 1.0);
  }).prototype = effect.PanEffect.prototype;
  dart.addTypeTests(effect.PanEffect);
  dart.setGetterSignature(effect.PanEffect, () => ({
    __proto__: dart.getGetters(effect.PanEffect.__proto__),
    values: core.List$(core.num)
  }));
  dart.setLibraryUri(effect.PanEffect, "package:synthesizer/src/effect.dart");
  effect.GainEffect = class GainEffect extends effect.Effect {
    get values() {
      return this.params[$_get](0);
    }
    connect(dest, bpm, delay, offset) {
      this.node = dest.context.createGain();
      this.node[$connectNode](dest);
      let param = web_audio.GainNode.as(this.node).gain;
      if (dart.test(this.values[$isEmpty])) return this.node;
      param.value = this.values[$_get](0);
      if (dart.notNull(this.beats) > 0 && dart.notNull(this.values[$length]) > 1) {
        let when = dart.notNull(dest.context.currentTime) + dart.notNull(delay) + dart.notNull(this.start) * (60 / dart.notNull(bpm)) - dart.notNull(offset);
        param.cancelScheduledValues(0);
        param.setValueCurveAtTime(this.values, when, dart.notNull(this.beats) * (60 / dart.notNull(bpm)));
      }
      return this.node;
    }
  };
  (effect.GainEffect.new = function(params) {
    effect.GainEffect.__proto__._internal.call(this, "gain", params);
    ;
  }).prototype = effect.GainEffect.prototype;
  dart.addTypeTests(effect.GainEffect);
  dart.setGetterSignature(effect.GainEffect, () => ({
    __proto__: dart.getGetters(effect.GainEffect.__proto__),
    values: core.List$(core.num)
  }));
  dart.setLibraryUri(effect.GainEffect, "package:synthesizer/src/effect.dart");
  utils.toInt = function toInt(d, defaultValue) {
    if (defaultValue === void 0) defaultValue = 0;
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
  utils.toNum = function toNum(d, defaultValue) {
    if (defaultValue === void 0) defaultValue = 0;
    if (d == null) {
      return defaultValue;
    } else if (typeof d == 'number') {
      return d;
    } else {
      try {
        return core.num.parse(dart.toString(d));
      } catch (e) {
        let ex = dart.getThrown(e);
        if (core.Exception.is(ex)) {
          return defaultValue;
        } else
          throw e;
      }
    }
  };
  utils.toDateTime = function toDateTime(d) {
    if (d == null) {
      return new core.DateTime.now();
    } else if (core.int.is(d)) {
      return new core.DateTime.fromMillisecondsSinceEpoch(d);
    } else if (typeof d == 'string') {
      try {
        return core.DateTime.parse(d);
      } catch (e$) {
        let e = dart.getThrown(e$);
        core.print("unable to parse datetime");
      }
    }
    return new core.DateTime.now();
  };
  utils.formatDateTime = function formatDateTime(d) {
    let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = dart.str(months[$_get](d.month)) + " " + dart.str(d.day) + ", " + dart.str(d.year);
    let h = d.hour[$modulo](12);
    if (h === 0) h = 12;
    let time = dart.str(h) + ":" + dart.toString(d.minute)[$padLeft](2, "0");
    time = time + (dart.notNull(d.hour) < 12 ? "AM" : "PM");
    return date + " " + time;
  };
  utils.toBool = function toBool(b, defaultValue) {
    if (defaultValue === void 0) defaultValue = false;
    if (b == null) {
      return defaultValue;
    } else if (typeof b == 'boolean') {
      return b;
    } else {
      let s = dart.toString(b);
      if (s[$toLowerCase]() === "true" || s[$toLowerCase]() === "t") {
        return true;
      } else if (s[$toLowerCase]() === "false" || s[$toLowerCase]() === "f") {
        return false;
      }
    }
    return defaultValue;
  };
  utils.toStr = function toStr(o, defaultValue) {
    if (defaultValue === void 0) defaultValue = "";
    return o == null ? defaultValue : dart.toString(o);
  };
  const _level = dart.privateName(node$, "_level");
  const context$1 = dart.privateName(node$, "SynthNode.context");
  const level = dart.privateName(node$, "SynthNode.level");
  const enabled = dart.privateName(node$, "SynthNode.enabled");
  const id = dart.privateName(node$, "SynthNode.id");
  node$.SynthNode = class SynthNode extends core.Object {
    get context() {
      return this[context$1];
    }
    set context(value) {
      this[context$1] = value;
    }
    get level() {
      return this[level];
    }
    set level(value) {
      this[level] = value;
    }
    get enabled() {
      return this[enabled];
    }
    set enabled(value) {
      this[enabled] = value;
    }
    get id() {
      return this[id];
    }
    set id(value) {
      this[id] = value;
    }
    connectFromSource(source, type) {
      source.level[$connectNode](this.level);
    }
    start(note, when, offset, duration, sustain) {
    }
    release() {
    }
    cancel() {
      this.level.gain.cancelScheduledValues(0);
    }
    destroy() {
      if (this.level != null) this.level.disconnect();
      this.level = null;
    }
    pitchBend(cents) {
    }
    schedulePitchBend(start, duration, cents) {
    }
  };
  (node$.SynthNode.new = function(context, config) {
    this[level] = null;
    this[_level] = 1.0;
    this[enabled] = true;
    this[id] = 0;
    this[context$1] = context;
    this.id = utils.toInt(config[$_get]("id"));
    this.level = this.context.createGain();
    this.enabled = utils.toBool(config[$_get]("enabled"), true);
    this[_level] = utils.toNum(config[$_get]("level"), 1.0);
    this.level.gain.value = this[_level];
  }).prototype = node$.SynthNode.prototype;
  dart.addTypeTests(node$.SynthNode);
  dart.setMethodSignature(node$.SynthNode, () => ({
    __proto__: dart.getMethods(node$.SynthNode.__proto__),
    connectFromSource: dart.fnType(dart.void, [node$.SynthNode, core.String]),
    start: dart.fnType(dart.void, [note$.Note, core.num, core.num, core.num, core.bool]),
    release: dart.fnType(dart.void, []),
    cancel: dart.fnType(dart.void, []),
    destroy: dart.fnType(dart.void, []),
    pitchBend: dart.fnType(dart.void, [core.num]),
    schedulePitchBend: dart.fnType(dart.void, [core.num, core.num, core.List$(core.num)])
  }));
  dart.setLibraryUri(node$.SynthNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.SynthNode, () => ({
    __proto__: dart.getFields(node$.SynthNode.__proto__),
    context: dart.fieldType(web_audio.BaseAudioContext),
    level: dart.fieldType(web_audio.GainNode),
    [_level]: dart.fieldType(core.num),
    enabled: dart.fieldType(core.bool),
    id: dart.fieldType(core.int)
  }));
  const A = dart.privateName(node$, "ADSRNode.A");
  const D = dart.privateName(node$, "ADSRNode.D");
  const S = dart.privateName(node$, "ADSRNode.S");
  const R = dart.privateName(node$, "ADSRNode.R");
  const adsr = dart.privateName(node$, "ADSRNode.adsr");
  node$.ADSRNode = class ADSRNode extends node$.SynthNode {
    get A() {
      return this[A];
    }
    set A(value) {
      this[A] = value;
    }
    get D() {
      return this[D];
    }
    set D(value) {
      this[D] = value;
    }
    get S() {
      return this[S];
    }
    set S(value) {
      this[S] = value;
    }
    get R() {
      return this[R];
    }
    set R(value) {
      this[R] = value;
    }
    get adsr() {
      return this[adsr];
    }
    set adsr(value) {
      this[adsr] = value;
    }
    connectFromSource(source, type) {
      source.level[$connectNode](this.adsr);
    }
    start(note, when, offset, duration, sustain) {
      let param = this.adsr.gain;
      let d = dart.notNull(duration) - dart.notNull(offset);
      param.cancelScheduledValues(0);
      param.setValueAtTime(0.0, when);
      if (dart.test(sustain)) {
        param.setTargetAtTime(1.0, when, dart.notNull(this.A) / 2);
        if (dart.notNull(this.D) > 0) param.setTargetAtTime(this.S, dart.notNull(this.A) + dart.notNull(when), dart.notNull(this.D) / 2);
      } else if (d <= 0) {
        return;
      } else if (d < dart.notNull(this.A)) {
        param.setTargetAtTime(d / dart.notNull(this.A), when, d / 2);
        param.setTargetAtTime(0.0, dart.notNull(when) + d, dart.notNull(this.R) / 2);
      } else if (d < dart.notNull(this.A) + dart.notNull(this.D)) {
        param.setTargetAtTime(1.0, when, dart.notNull(this.A) / 2);
        param.setTargetAtTime(0.0, dart.notNull(when) + dart.notNull(this.A), dart.notNull(this.R) / 2);
      } else if (dart.notNull(this.D) <= 0) {
        param.setTargetAtTime(1.0, when, dart.notNull(this.A) / 2);
        param.setTargetAtTime(0.0, dart.notNull(when) + d, dart.notNull(this.R) / 2);
      } else {
        param.setTargetAtTime(1.0, when, dart.notNull(this.A) / 2);
        param.setTargetAtTime(this.S, dart.notNull(when) + dart.notNull(this.A), dart.notNull(this.D) / 2);
        param.setTargetAtTime(0.0, dart.notNull(when) + d, dart.notNull(this.R) / 2);
      }
    }
    release() {
      super.release();
      if (this.adsr != null) {
        let param = this.adsr.gain;
        let now = this.adsr.context.currentTime;
        param.setTargetAtTime(0.0, now, dart.notNull(this.R) / 3);
      }
    }
    cancel() {
      super.cancel();
      this.adsr.gain.cancelScheduledValues(0);
    }
    destroy() {
      super.destroy();
      if (this.adsr != null) this.adsr.disconnect();
      this.adsr = null;
    }
  };
  (node$.ADSRNode.new = function(context, config) {
    this[A] = 0.1;
    this[D] = 0.2;
    this[S] = 1.0;
    this[R] = 0.2;
    this[adsr] = null;
    node$.ADSRNode.__proto__.new.call(this, context, config);
    this.adsr = context.createGain();
    this.A = utils.toNum(config[$_get]("A"), this.A);
    this.D = utils.toNum(config[$_get]("D"), this.D);
    this.S = utils.toNum(config[$_get]("S"), this.S);
    this.R = utils.toNum(config[$_get]("R"), this.R);
    this.adsr[$connectNode](this.level);
    this.adsr.gain.value = 0.0;
  }).prototype = node$.ADSRNode.prototype;
  dart.addTypeTests(node$.ADSRNode);
  dart.setLibraryUri(node$.ADSRNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.ADSRNode, () => ({
    __proto__: dart.getFields(node$.ADSRNode.__proto__),
    A: dart.fieldType(core.num),
    D: dart.fieldType(core.num),
    S: dart.fieldType(core.num),
    R: dart.fieldType(core.num),
    adsr: dart.fieldType(web_audio.GainNode)
  }));
  const osc = dart.privateName(node$, "FMNode.osc");
  const dIn = dart.privateName(node$, "FMNode.dIn");
  const fIn = dart.privateName(node$, "FMNode.fIn");
  const frequency = dart.privateName(node$, "FMNode.frequency");
  const relative = dart.privateName(node$, "FMNode.relative");
  node$.FMNode = class FMNode extends node$.SynthNode {
    get osc() {
      return this[osc];
    }
    set osc(value) {
      this[osc] = value;
    }
    get dIn() {
      return this[dIn];
    }
    set dIn(value) {
      this[dIn] = value;
    }
    get fIn() {
      return this[fIn];
    }
    set fIn(value) {
      this[fIn] = value;
    }
    get frequency() {
      return this[frequency];
    }
    set frequency(value) {
      this[frequency] = value;
    }
    get relative() {
      return this[relative];
    }
    set relative(value) {
      this[relative] = value;
    }
    start(note, when, offset, duration, sustain) {
      if (this.osc == null || !dart.test(this.enabled)) return;
      let f = dart.test(this.relative) ? dart.notNull(note.frequency) * dart.notNull(this.frequency) : this.frequency;
      this.osc.frequency.cancelScheduledValues(0);
      this.osc.frequency.setValueAtTime(f, this.osc.context.currentTime);
      this.osc.detune.cancelScheduledValues(0);
      this.osc.detune.setValueAtTime(0, this.osc.context.currentTime);
    }
    pitchBend(cents) {
      let when = this.osc.context.currentTime;
      this.osc.detune.linearRampToValueAtTime(cents, dart.notNull(when) + 0.01);
    }
    schedulePitchBend(start, duration, cents) {
      let when = this.osc.context.currentTime;
      this.osc.detune.cancelScheduledValues(when);
      this.osc.detune.setValueCurveAtTime(cents, dart.notNull(when) + dart.notNull(start), duration);
    }
    cancel() {
      super.cancel();
      this.osc.frequency.cancelScheduledValues(0);
      this.osc.detune.cancelScheduledValues(0);
    }
    destroy() {
      super.destroy();
      if (this.osc == null || !dart.test(this.enabled)) return;
      this.osc.stop();
      this.dIn.disconnect();
      this.fIn.disconnect();
      this.osc.disconnect();
      this.dIn = null;
      this.fIn = null;
      this.osc = null;
    }
    connectFromSource(source, type) {
      if (type === "detune") {
        source.level[$connectNode](this.dIn);
      } else if (type === "frequency") {
        source.level[$connectNode](this.fIn);
      } else if (type === "amplitude") {
        source.level[$connectParam](this.level.gain);
      }
    }
  };
  (node$.FMNode.new = function(context, config) {
    this[osc] = null;
    this[dIn] = null;
    this[fIn] = null;
    this[frequency] = 1.0;
    this[relative] = true;
    node$.FMNode.__proto__.new.call(this, context, config);
    this.frequency = utils.toNum(config[$_get]("frequency"), 220.0);
    this.relative = utils.toBool(config[$_get]("relative"), true);
    this.osc = context.createOscillator();
    this.osc.frequency.value = 1800.0;
    this.osc.detune.value = utils.toNum(config[$_get]("detune"), 0.0);
    this.osc.type = utils.toStr(config[$_get]("waveform"), "sine");
    this.osc[$start2]();
    this.dIn = context.createGain();
    this.dIn.gain.value = utils.toNum(config[$_get]("dIn"), 400.0);
    this.fIn = context.createGain();
    this.fIn.gain.value = utils.toNum(config[$_get]("fIn"), 100.0);
    this.dIn[$connectParam](this.osc.detune);
    this.fIn[$connectParam](this.osc.frequency);
    this.osc[$connectNode](this.level);
  }).prototype = node$.FMNode.prototype;
  dart.addTypeTests(node$.FMNode);
  dart.setLibraryUri(node$.FMNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.FMNode, () => ({
    __proto__: dart.getFields(node$.FMNode.__proto__),
    osc: dart.fieldType(web_audio.OscillatorNode),
    dIn: dart.fieldType(web_audio.GainNode),
    fIn: dart.fieldType(web_audio.GainNode),
    frequency: dart.fieldType(core.num),
    relative: dart.fieldType(core.bool)
  }));
  const synth$ = dart.privateName(node$, "SynthSampleNode.synth");
  const source = dart.privateName(node$, "SynthSampleNode.source");
  const samples = dart.privateName(node$, "SynthSampleNode.samples");
  const sampleDuration = dart.privateName(node$, "SynthSampleNode.sampleDuration");
  node$.SynthSampleNode = class SynthSampleNode extends node$.SynthNode {
    get synth() {
      return this[synth$];
    }
    set synth(value) {
      this[synth$] = value;
    }
    get source() {
      return this[source];
    }
    set source(value) {
      this[source] = value;
    }
    get samples() {
      return this[samples];
    }
    set samples(value) {
      this[samples] = value;
    }
    get sampleDuration() {
      return this[sampleDuration];
    }
    set sampleDuration(value) {
      this[sampleDuration] = value;
    }
    start(note, when, offset, duration, sustain) {
      if (!dart.test(this.enabled)) return;
      if (this.source != null) this.source.disconnect();
      this.source = this.context.createBufferSource();
      this.source[$connectNode](this.level);
      let step = -1;
      let score = 100000;
      let delta = 0;
      let sample = null;
      for (let s of this.samples) {
        let d = dart.notNull(note.note) - dart.notNull(core.num._check(dart.dsend(s, '_get', ["step"])));
        if (d < 0) d = d * -1 + 12;
        if (d < score) {
          step = core.num._check(dart.dsend(s, '_get', ["step"]));
          delta = dart.notNull(note.note) - dart.notNull(step);
          score = d;
          sample = core.String._check(dart.dsend(s, '_get', ["sample"]));
        }
      }
      let buffer = null;
      if (dart.test(this.synth.customRecordings[$containsKey](step))) {
        buffer = this.synth.customRecordings[$_get](step);
      } else if (sample != null) {
        buffer = synth.Synthesizer.getAudioBuffer(sample);
      }
      if (buffer != null) {
        let playback = math.pow(2, delta / 12);
        this.source.buffer = buffer;
        this.source.playbackRate.value = playback;
        this.source.start(when, offset);
        this.sampleDuration = dart.notNull(buffer.duration) / playback;
      }
    }
    pitchBend(cents) {
      if (this.source != null && dart.test(this.enabled)) {
        let when = this.source.context.currentTime;
        try {
          this.source.detune.linearRampToValueAtTime(cents, dart.notNull(when) + 0.01);
        } catch (e) {
          let err = dart.getThrown(e);
          html.window[$console].info("The browser does not support detune; " + "Using playbackrate");
          let semitoneRatio = math.pow(2, 1 / 1200);
          this.source.playbackRate.linearRampToValueAtTime(math.pow(semitoneRatio, cents), dart.notNull(when) + 0.01);
        }
      }
    }
    schedulePitchBend(start, duration, cents) {
      if (this.source != null && dart.test(this.enabled)) {
        let when = this.source.context.currentTime;
        try {
          this.source.detune.cancelScheduledValues(when);
          this.source.detune.setValueCurveAtTime(cents, dart.notNull(when) + dart.notNull(start), duration);
        } catch (e) {
          let err = dart.getThrown(e);
          html.window[$console].info("The browser does not support detune; " + "Using playbackrate");
          let semitoneRatio = math.pow(2, 1 / 1200);
          cents = cents[$map](core.num, dart.fn(cent => math.pow(semitoneRatio, cent), numTonum()))[$toList]();
          this.source.playbackRate.setValueCurveAtTime(cents, dart.notNull(when) + dart.notNull(start), duration);
        }
      }
    }
    cancel() {
      super.cancel();
      if (this.source != null) {
        this.source.stop();
        this.source = null;
      }
    }
    destroy() {
      super.destroy();
      if (this.source != null) this.source.disconnect();
      this.source = null;
    }
  };
  (node$.SynthSampleNode.new = function(synth, context, config) {
    this[synth$] = null;
    this[source] = null;
    this[samples] = null;
    this[sampleDuration] = 0;
    node$.SynthSampleNode.__proto__.new.call(this, context, config);
    this.synth = synth;
    this.samples = core.List._check(config[$_get]("samples"));
  }).prototype = node$.SynthSampleNode.prototype;
  dart.addTypeTests(node$.SynthSampleNode);
  dart.setLibraryUri(node$.SynthSampleNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.SynthSampleNode, () => ({
    __proto__: dart.getFields(node$.SynthSampleNode.__proto__),
    synth: dart.fieldType(synth.Synthesizer),
    source: dart.fieldType(web_audio.AudioBufferSourceNode),
    samples: dart.fieldType(core.List),
    sampleDuration: dart.fieldType(core.num)
  }));
  const delay = dart.privateName(node$, "SynthDelayNode.delay");
  const delayTime = dart.privateName(node$, "SynthDelayNode.delayTime");
  node$.SynthDelayNode = class SynthDelayNode extends node$.SynthNode {
    get delay() {
      return this[delay];
    }
    set delay(value) {
      this[delay] = value;
    }
    get delayTime() {
      return this[delayTime];
    }
    set delayTime(value) {
      this[delayTime] = value;
    }
    connectFromSource(source, type) {
      source.level[$connectNode](this.delay);
    }
    destroy() {
      super.destroy();
      if (this.delay != null) this.delay.disconnect();
      this.delay = null;
    }
  };
  (node$.SynthDelayNode.new = function(context, config) {
    this[delay] = null;
    this[delayTime] = 0.1;
    node$.SynthDelayNode.__proto__.new.call(this, context, config);
    this.delay = context.createDelay();
    this.delayTime = utils.toNum(config[$_get]("delay"), 0.1);
    this.delay[$connectNode](this.level);
    this.delay.delayTime.value = this.delayTime;
  }).prototype = node$.SynthDelayNode.prototype;
  dart.addTypeTests(node$.SynthDelayNode);
  dart.setLibraryUri(node$.SynthDelayNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.SynthDelayNode, () => ({
    __proto__: dart.getFields(node$.SynthDelayNode.__proto__),
    delay: dart.fieldType(web_audio.DelayNode),
    delayTime: dart.fieldType(core.num)
  }));
  const compressor = dart.privateName(node$, "SynthCompressorNode.compressor");
  node$.SynthCompressorNode = class SynthCompressorNode extends node$.SynthNode {
    get compressor() {
      return this[compressor];
    }
    set compressor(value) {
      this[compressor] = value;
    }
    connectFromSource(source, type) {
      source.level[$connectNode](this.compressor);
    }
    destroy() {
      super.destroy();
      if (this.compressor != null) this.compressor.disconnect();
      this.compressor = null;
    }
  };
  (node$.SynthCompressorNode.new = function(context, config) {
    this[compressor] = null;
    node$.SynthCompressorNode.__proto__.new.call(this, context, config);
    this.compressor = context.createDynamicsCompressor();
    this.compressor[$connectNode](this.level);
    this.compressor.threshold.value = utils.toNum(config[$_get]("threshold"), -24);
    this.compressor.knee.value = utils.toNum(config[$_get]("knee"), 30);
    this.compressor.ratio.value = utils.toNum(config[$_get]("ratio"), 12);
    this.compressor.release.value = utils.toNum(config[$_get]("release"), 0.25);
  }).prototype = node$.SynthCompressorNode.prototype;
  dart.addTypeTests(node$.SynthCompressorNode);
  dart.setLibraryUri(node$.SynthCompressorNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.SynthCompressorNode, () => ({
    __proto__: dart.getFields(node$.SynthCompressorNode.__proto__),
    compressor: dart.fieldType(web_audio.DynamicsCompressorNode)
  }));
  const filter = dart.privateName(node$, "FilterNode.filter");
  node$.FilterNode = class FilterNode extends node$.SynthNode {
    get filter() {
      return this[filter];
    }
    set filter(value) {
      this[filter] = value;
    }
    connectFromSource(source, type) {
      source.level[$connectNode](this.filter);
    }
    destroy() {
      super.destroy();
      if (this.filter != null) this.filter.disconnect();
      this.filter = null;
    }
  };
  (node$.FilterNode.new = function(context, config) {
    this[filter] = null;
    node$.FilterNode.__proto__.new.call(this, context, config);
    this.filter = context.createBiquadFilter();
    this.filter[$connectNode](this.level);
    this.filter.frequency.value = utils.toNum(config[$_get]("frequency"), 350.0);
    this.filter.detune.value = utils.toNum(config[$_get]("detune"), 0.0);
    this.filter.Q.value = utils.toNum(config[$_get]("Q"), 1.0);
    this.filter.gain.value = utils.toNum(config[$_get]("gain"), 0.0);
    this.filter.type = utils.toStr(config[$_get]("filter type"), "lowpass");
  }).prototype = node$.FilterNode.prototype;
  dart.addTypeTests(node$.FilterNode);
  dart.setLibraryUri(node$.FilterNode, "package:synthesizer/src/node.dart");
  dart.setFieldSignature(node$.FilterNode, () => ({
    __proto__: dart.getFields(node$.FilterNode.__proto__),
    filter: dart.fieldType(web_audio.BiquadFilterNode)
  }));
  const _timer = dart.privateName(trace$, "_timer");
  const _beats = dart.privateName(trace$, "_beats");
  const _minNote = dart.privateName(trace$, "_minNote");
  const _maxNote = dart.privateName(trace$, "_maxNote");
  const trace = dart.privateName(trace$, "Trace.trace");
  const bug = dart.privateName(trace$, "Trace.bug");
  trace$.Trace = class Trace extends core.Object {
    get trace() {
      return this[trace];
    }
    set trace(value) {
      this[trace] = value;
    }
    get bug() {
      return this[bug];
    }
    set bug(value) {
      this[bug] = value;
    }
    get length() {
      return this.trace[$length];
    }
    get isEmpty() {
      return this.trace[$isEmpty];
    }
    get beats() {
      return this[_beats];
    }
    get minNote() {
      return this[_minNote];
    }
    get maxNote() {
      return this[_maxNote];
    }
    _get(index) {
      return this.trace[$_get](index);
    }
    clear() {
      this.trace[$clear]();
      this.bug = 0;
      this[_timer] = 0;
      this[_beats] = 0;
      this[_minNote] = -1;
      this[_maxNote] = -1;
    }
    restart() {
      this.bug = 0;
    }
    current() {
      return dart.notNull(this.bug) >= 0 && dart.notNull(this.bug) < dart.notNull(this.trace[$length]) ? this.trace[$_get](this.bug) : null;
    }
    advance() {
      if (dart.notNull(this.bug) < dart.notNull(this.trace[$length])) this.bug = dart.notNull(this.bug) + 1;
      return this.current();
    }
    advanceToEvent(t) {
      for (let i = 0; i < dart.notNull(this.trace[$length]); i = i + 1) {
        if (dart.equals(this.trace[$_get](i), t)) {
          this.bug = i;
          return this.trace[$_get](i);
        }
      }
      this.bug = 0;
      return null;
    }
    advanceToBeat(beats) {
      let target = null;
      for (let t of this.trace) {
        if (t.command == trace$.TraceEvent.TRACE) {
          if (dart.notNull(t.time) <= dart.notNull(beats)) {
            if (target == null || dart.notNull(t.time) > dart.notNull(target.time)) target = t;
          }
        }
      }
      return this.advanceToEvent(target);
    }
    get isDone() {
      return dart.notNull(this.bug) >= dart.notNull(this.trace[$length]);
    }
    addEvent(jsonString) {
      let event = null;
      try {
        let json = core.Map._check(convert.jsonDecode(jsonString));
        event = new trace$.TraceEvent.fromJSON(json);
        this.trace[$add](event);
        if (event.command == trace$.TraceEvent.TRACE) {
          this[_timer] = event.time;
        } else if (event.command == trace$.TraceEvent.PLAY) {
          this[_beats] = math.max(core.num, dart.notNull(event.time) + dart.notNull(event.duration), this[_beats]);
          if (dart.notNull(this[_minNote]) < 0 || dart.notNull(event.note.note) < dart.notNull(this[_minNote])) this[_minNote] = event.note.note;
          this[_maxNote] = math.max(core.num, this[_maxNote], event.note.note);
        }
      } catch (e) {
        let exception = dart.getThrown(e);
        core.print("error decoding trace event: " + dart.notNull(jsonString));
      }
    }
    addPrint(output) {
      let t10;
      this.trace[$add]((t10 = new trace$.TraceEvent.new(trace$.TraceEvent.PRINT, this[_timer]), t10.duration = 1, t10.params[$_set]("output", output), t10));
    }
    toJSON() {
      let json = [];
      for (let t of this.trace)
        json[$add](t.toJSON());
      return json;
    }
    fromJSON(json) {
      this.clear();
      if (core.List.is(json)) {
        for (let t of json) {
          this.trace[$add](new trace$.TraceEvent.fromJSON(core.Map._check(t)));
        }
      }
    }
  };
  (trace$.Trace.new = function() {
    this[trace] = JSArrayOfTraceEvent().of([]);
    this[bug] = 0;
    this[_timer] = 0;
    this[_beats] = 0;
    this[_minNote] = -1;
    this[_maxNote] = -1;
  }).prototype = trace$.Trace.prototype;
  dart.addTypeTests(trace$.Trace);
  dart.setMethodSignature(trace$.Trace, () => ({
    __proto__: dart.getMethods(trace$.Trace.__proto__),
    _get: dart.fnType(trace$.TraceEvent, [core.int]),
    clear: dart.fnType(dart.void, []),
    restart: dart.fnType(dart.void, []),
    current: dart.fnType(trace$.TraceEvent, []),
    advance: dart.fnType(trace$.TraceEvent, []),
    advanceToEvent: dart.fnType(trace$.TraceEvent, [trace$.TraceEvent]),
    advanceToBeat: dart.fnType(trace$.TraceEvent, [core.num]),
    addEvent: dart.fnType(dart.void, [core.String]),
    addPrint: dart.fnType(dart.void, [core.String]),
    toJSON: dart.fnType(core.List, []),
    fromJSON: dart.fnType(dart.void, [dart.dynamic])
  }));
  dart.setGetterSignature(trace$.Trace, () => ({
    __proto__: dart.getGetters(trace$.Trace.__proto__),
    length: core.int,
    isEmpty: core.bool,
    beats: core.num,
    minNote: core.num,
    maxNote: core.num,
    isDone: core.bool
  }));
  dart.setLibraryUri(trace$.Trace, "package:synthesizer/src/trace.dart");
  dart.setFieldSignature(trace$.Trace, () => ({
    __proto__: dart.getFields(trace$.Trace.__proto__),
    trace: dart.fieldType(core.List$(trace$.TraceEvent)),
    bug: dart.fieldType(core.int),
    [_timer]: dart.fieldType(core.num),
    [_beats]: dart.fieldType(core.num),
    [_minNote]: dart.fieldType(core.num),
    [_maxNote]: dart.fieldType(core.num)
  }));
  const command$ = dart.privateName(trace$, "TraceEvent.command");
  const time$ = dart.privateName(trace$, "TraceEvent.time");
  const duration$ = dart.privateName(trace$, "TraceEvent.duration");
  const params = dart.privateName(trace$, "TraceEvent.params");
  trace$.TraceEvent = class TraceEvent extends core.Object {
    get command() {
      return this[command$];
    }
    set command(value) {
      this[command$] = value;
    }
    get time() {
      return this[time$];
    }
    set time(value) {
      this[time$] = value;
    }
    get duration() {
      return this[duration$];
    }
    set duration(value) {
      this[duration$] = value;
    }
    get params() {
      return this[params];
    }
    set params(value) {
      this[params] = value;
    }
    get end() {
      return dart.notNull(this.time) + dart.notNull(this.duration);
    }
    get note() {
      return note$.Note.as(this.params[$_get]("note"));
    }
    _get(key) {
      return this.params[$_get](key);
    }
    _set(key, value$) {
      let value = value$;
      this.params[$_set](key, value);
      return value$;
    }
    hasParam(key) {
      return this.params[$containsKey](key);
    }
    clone() {
      let t = new trace$.TraceEvent.new(this.command, this.time);
      for (let key of this.params[$keys]) {
        t._set(key, this.params[$_get](key));
      }
      return t;
    }
    toJSON() {
      let json = new (IdentityMapOfString$dynamic()).from(["command", this.command, "time", this.time, "duration", this.duration, "params", new _js_helper.LinkedMap.new()]);
      for (let key of this.params[$keys]) {
        if (key === "note") {
          core.Map.as(json[$_get]("params"))[$_set](key, this.note.note);
        } else {
          core.Map.as(json[$_get]("params"))[$_set](key, this.params[$_get](key));
        }
      }
      return json;
    }
  };
  (trace$.TraceEvent.new = function(command, time) {
    this[command$] = null;
    this[time$] = 0;
    this[duration$] = 1;
    this[params] = new (LinkedMapOfString$dynamic()).new();
    this[command$] = command;
    this[time$] = time;
    ;
  }).prototype = trace$.TraceEvent.prototype;
  (trace$.TraceEvent.fromJSON = function(json) {
    this[command$] = null;
    this[time$] = 0;
    this[duration$] = 1;
    this[params] = new (LinkedMapOfString$dynamic()).new();
    this.command = utils.toStr(json[$_get]("command"));
    this.time = utils.toNum(json[$_get]("time"), 0);
    this.duration = utils.toNum(json[$_get]("duration"), 1);
    let note = null;
    if (core.Map.is(json[$_get]("params"))) {
      for (let t10 of core.Iterable._check(dart.dload(json[$_get]("params"), 'keys'))) {
        let key = core.String._check(t10);
        if (key === "note") {
          note = new note$.Note.new(utils.toNum(dart.dsend(json[$_get]("params"), '_get', [key]), 60));
          note.duration = this.duration;
          this.params[$_set](key, note);
        } else {
          this.params[$_set](key, dart.dsend(json[$_get]("params"), '_get', [key]));
        }
      }
    }
    if (note != null && dart.test(this.params[$containsKey]("velocity"))) {
      note.velocity = utils.toInt(this.params[$_get]("velocity"), 100);
    }
    if (note != null && dart.test(this.params[$containsKey]("sustain"))) {
      let sustain = utils.toNum(this.params[$_get]("sustain"), 0);
      note.duration = math.max(core.num, note.duration, sustain);
      this.duration = note.duration;
    }
  }).prototype = trace$.TraceEvent.prototype;
  dart.addTypeTests(trace$.TraceEvent);
  dart.setMethodSignature(trace$.TraceEvent, () => ({
    __proto__: dart.getMethods(trace$.TraceEvent.__proto__),
    _get: dart.fnType(dart.dynamic, [core.String]),
    _set: dart.fnType(dart.void, [core.String, dart.dynamic]),
    hasParam: dart.fnType(core.bool, [core.String]),
    clone: dart.fnType(trace$.TraceEvent, []),
    toJSON: dart.fnType(core.Map, [])
  }));
  dart.setGetterSignature(trace$.TraceEvent, () => ({
    __proto__: dart.getGetters(trace$.TraceEvent.__proto__),
    end: core.num,
    note: note$.Note
  }));
  dart.setLibraryUri(trace$.TraceEvent, "package:synthesizer/src/trace.dart");
  dart.setFieldSignature(trace$.TraceEvent, () => ({
    __proto__: dart.getFields(trace$.TraceEvent.__proto__),
    command: dart.fieldType(core.String),
    time: dart.fieldType(core.num),
    duration: dart.fieldType(core.num),
    params: dart.fieldType(core.Map$(core.String, dart.dynamic))
  }));
  dart.defineLazy(trace$.TraceEvent, {
    /*trace$.TraceEvent.TRACE*/get TRACE() {
      return "trace";
    },
    /*trace$.TraceEvent.PLAY*/get PLAY() {
      return "play";
    },
    /*trace$.TraceEvent.PRINT*/get PRINT() {
      return "print";
    },
    /*trace$.TraceEvent.REST*/get REST() {
      return "rest";
    },
    /*trace$.TraceEvent.START*/get START() {
      return "start";
    },
    /*trace$.TraceEvent.STOP*/get STOP() {
      return "stop";
    },
    /*trace$.TraceEvent.VOICE*/get VOICE() {
      return "voice";
    },
    /*trace$.TraceEvent.COLOR*/get COLOR() {
      return "color";
    },
    /*trace$.TraceEvent.PUSH_FX*/get PUSH_FX() {
      return "push_fx";
    },
    /*trace$.TraceEvent.POP_FX*/get POP_FX() {
      return "pop_fx";
    },
    /*trace$.TraceEvent.PATCH*/get PATCH() {
      return "patch";
    }
  });
  clock.ClockSubscriber = class ClockSubscriber extends core.Object {};
  (clock.ClockSubscriber.new = function() {
    ;
  }).prototype = clock.ClockSubscriber.prototype;
  dart.addTypeTests(clock.ClockSubscriber);
  dart.setLibraryUri(clock.ClockSubscriber, "package:synthesizer/src/clock.dart");
  clock.Metronome = class Metronome extends core.Object {};
  (clock.Metronome.new = function() {
    ;
  }).prototype = clock.Metronome.prototype;
  dart.addTypeTests(clock.Metronome);
  dart.setLibraryUri(clock.Metronome, "package:synthesizer/src/clock.dart");
  const _start = dart.privateName(clock, "_start");
  const _elapsedBeats = dart.privateName(clock, "_elapsedBeats");
  const _bpm$ = dart.privateName(clock, "_bpm");
  const _meter = dart.privateName(clock, "_meter");
  const _beatsPerMeasure = dart.privateName(clock, "_beatsPerMeasure");
  const _beatValue = dart.privateName(clock, "_beatValue");
  const _key = dart.privateName(clock, "_key");
  const _timer$ = dart.privateName(clock, "_timer");
  const Duration__duration = dart.privateName(core, "Duration._duration");
  let C2;
  const subscribers = dart.privateName(clock, "PlayClock.subscribers");
  const listeners = dart.privateName(clock, "PlayClock.listeners");
  const context = dart.privateName(clock, "PlayClock.context");
  const metronomes = dart.privateName(clock, "PlayClock.metronomes");
  clock.PlayClock = class PlayClock extends core.Object {
    get subscribers() {
      return this[subscribers];
    }
    set subscribers(value) {
      this[subscribers] = value;
    }
    get listeners() {
      return this[listeners];
    }
    set listeners(value) {
      this[listeners] = value;
    }
    get context() {
      return this[context];
    }
    set context(value) {
      this[context] = value;
    }
    get metronomes() {
      return this[metronomes];
    }
    set metronomes(value) {
      this[metronomes] = value;
    }
    get bpm() {
      return this[_bpm$];
    }
    set bpm(tempo) {
      return this.setTempo(tempo);
    }
    get meter() {
      return this[_meter];
    }
    set meter(m) {
      return this.setTimeSignature(m);
    }
    get beatsPerMeasure() {
      return this[_beatsPerMeasure];
    }
    get beatValue() {
      return this[_beatValue];
    }
    get key() {
      return this[_key].name;
    }
    set key(keyName) {
      this[_key] = new key.Key.new(keyName);
    }
    get time() {
      return dart.test(this.isPaused) || this.context == null ? this[_start] : dart.notNull(this.context.currentTime) - dart.notNull(this[_start]);
    }
    get timeString() {
      let m = dart.str((dart.notNull(this.time) / 60)[$truncate]()[$modulo](60));
      let s = dart.str(this.time[$round]()[$modulo](60));
      let c = dart.str((dart.notNull(this.time) * 100)[$floor]()[$modulo](100));
      if (m.length === 1) m = "0" + m;
      if (s.length === 1) s = "0" + s;
      if (c.length === 1) c = "0" + c;
      return m + ":" + s + "." + c;
    }
    get beats() {
      return dart.notNull(this.time) * dart.notNull(this.bpm) / 60 + dart.notNull(this[_elapsedBeats]);
    }
    get isPaused() {
      return this.subscribers[$isEmpty];
    }
    addSubscriber(subscriber) {
      this.listeners.add(subscriber);
    }
    isPlaying(subscriber) {
      return this.subscribers.contains(subscriber);
    }
    play(subscriber) {
      if (this.context != null && dart.test(this.isPaused)) {
        this[_start] = dart.notNull(this.context.currentTime) - dart.notNull(this[_start]);
      }
      this.subscribers.add(subscriber);
      this.listeners.add(subscriber);
    }
    pause(subscriber) {
      this.listeners.add(subscriber);
      if (dart.test(this.isPlaying(subscriber))) {
        this.subscribers.remove(subscriber);
        if (dart.test(this.isPaused) && this.context != null) {
          this[_start] = dart.notNull(this.context.currentTime) - dart.notNull(this[_start]);
        }
      }
    }
    stopAll() {
      this[_elapsedBeats] = 0;
      this[_start] = 0;
      this.subscribers.clear();
      this.listeners[$forEach](dart.fn(s => s.onClockReset(), ClockSubscriberTovoid()));
    }
    setTime(elapsedBeats) {
      this[_elapsedBeats] = elapsedBeats;
      this[_start] = 0;
      this.listeners[$forEach](dart.fn(s => s.onClockTimeChange(), ClockSubscriberTovoid()));
      this.subscribers.clear();
    }
    setTempo(tempo) {
      let lastBeats = this.beats;
      this[_bpm$] = math.max(core.int, 1, tempo);
      if (this.context != null) {
        this[_elapsedBeats] = dart.notNull(lastBeats) * 60 / dart.notNull(this[_bpm$]) - dart.notNull(this.context.currentTime);
      }
      this.listeners[$forEach](dart.fn(s => s.onTempoChange(), ClockSubscriberTovoid()));
    }
    setTimeSignature(s) {
      if (s == null || s[$split]("/")[$length] !== 2) s = "4/4";
      this[_beatsPerMeasure] = utils.toInt(s[$split]("/")[$_get](0), -1);
      this[_beatValue] = utils.toInt(s[$split]("/")[$_get](1), -1);
      if (dart.notNull(this[_beatsPerMeasure]) < 0 || dart.notNull(this[_beatValue]) < 0) {
        this[_beatsPerMeasure] = 4;
        this[_beatValue] = 4;
      }
      this[_meter] = dart.str(this[_beatsPerMeasure]) + "/" + dart.str(this[_beatValue]);
      this.listeners[$forEach](dart.fn(s => s.onTimeSignatureChange(), ClockSubscriberTovoid()));
    }
    startMetronome(metronome) {
      if (metronome != null && this.context != null) {
        this.metronomes.add(metronome);
        if (this[_timer$] == null) {
          let start_time = this.context.currentTime;
          let beat = 0;
          this.metronomes[$forEach](dart.fn(m => m.pulse(0), MetronomeTovoid()));
          this[_timer$] = async.Timer.periodic(C2 || CT.C2, dart.fn(t => {
            if (dart.test(this.metronomes[$isEmpty])) {
              this[_timer$].cancel();
              this[_timer$] = null;
            } else {
              let beat_len = 60 / dart.notNull(this.bpm);
              let elapsed = dart.notNull(this.context.currentTime) - dart.notNull(start_time);
              let b = (elapsed / beat_len)[$truncate]()[$modulo](this.beatsPerMeasure);
              if (b !== beat) {
                beat = b;
                this.metronomes[$forEach](dart.fn(m => m.pulse(beat), MetronomeTovoid()));
              }
            }
          }, TimerToNull()));
        }
      }
    }
    stopMetronome(metronome) {
      this.metronomes.remove(metronome);
    }
    isMetronomePlaying(metronome) {
      return this.metronomes.contains(metronome);
    }
  };
  (clock.PlayClock.new = function() {
    this[_start] = 0;
    this[_elapsedBeats] = 0;
    this[_bpm$] = 120;
    this[_meter] = "4/4";
    this[_beatsPerMeasure] = 4;
    this[_beatValue] = 4;
    this[_key] = new key.Key.Cmaj();
    this[subscribers] = new (_HashSetOfClockSubscriber()).new();
    this[listeners] = new (_HashSetOfClockSubscriber()).new();
    this[context] = null;
    this[metronomes] = new (_HashSetOfMetronome()).new();
    this[_timer$] = null;
    ;
  }).prototype = clock.PlayClock.prototype;
  dart.addTypeTests(clock.PlayClock);
  dart.setMethodSignature(clock.PlayClock, () => ({
    __proto__: dart.getMethods(clock.PlayClock.__proto__),
    addSubscriber: dart.fnType(dart.void, [clock.ClockSubscriber]),
    isPlaying: dart.fnType(core.bool, [clock.ClockSubscriber]),
    play: dart.fnType(dart.void, [clock.ClockSubscriber]),
    pause: dart.fnType(dart.void, [clock.ClockSubscriber]),
    stopAll: dart.fnType(dart.void, []),
    setTime: dart.fnType(dart.void, [core.num]),
    setTempo: dart.fnType(dart.void, [core.int]),
    setTimeSignature: dart.fnType(dart.void, [core.String]),
    startMetronome: dart.fnType(dart.void, [clock.Metronome]),
    stopMetronome: dart.fnType(dart.void, [clock.Metronome]),
    isMetronomePlaying: dart.fnType(core.bool, [clock.Metronome])
  }));
  dart.setGetterSignature(clock.PlayClock, () => ({
    __proto__: dart.getGetters(clock.PlayClock.__proto__),
    bpm: core.int,
    meter: core.String,
    beatsPerMeasure: core.int,
    beatValue: core.int,
    key: core.String,
    time: core.num,
    timeString: core.String,
    beats: core.num,
    isPaused: core.bool
  }));
  dart.setSetterSignature(clock.PlayClock, () => ({
    __proto__: dart.getSetters(clock.PlayClock.__proto__),
    bpm: core.int,
    meter: core.String,
    key: core.String
  }));
  dart.setLibraryUri(clock.PlayClock, "package:synthesizer/src/clock.dart");
  dart.setFieldSignature(clock.PlayClock, () => ({
    __proto__: dart.getFields(clock.PlayClock.__proto__),
    [_start]: dart.fieldType(core.num),
    [_elapsedBeats]: dart.fieldType(core.num),
    [_bpm$]: dart.fieldType(core.int),
    [_meter]: dart.fieldType(core.String),
    [_beatsPerMeasure]: dart.fieldType(core.int),
    [_beatValue]: dart.fieldType(core.int),
    [_key]: dart.fieldType(key.Key),
    subscribers: dart.fieldType(core.Set$(clock.ClockSubscriber)),
    listeners: dart.fieldType(core.Set$(clock.ClockSubscriber)),
    context: dart.fieldType(web_audio.AudioContext),
    metronomes: dart.fieldType(core.Set$(clock.Metronome)),
    [_timer$]: dart.fieldType(async.Timer)
  }));
  scheduler.SchedulerSynth = class SchedulerSynth extends synth.Synthesizer {
    scheduleNotes(trace, dest, opts) {
      let delay = opts && 'delay' in opts ? opts.delay : 0;
      let offset = opts && 'offset' in opts ? opts.offset : 0;
      let withOffsets = opts && 'withOffsets' in opts ? opts.withOffsets : true;
      for (let t of trace.trace) {
        if (t.command == trace$.TraceEvent.START) {
          this.clearEffects();
        } else if (t.command == trace$.TraceEvent.PLAY) {
          if (dart.test(withOffsets) && dart.notNull(t.end) >= dart.notNull(offset) || !dart.test(withOffsets) && dart.notNull(t.time) >= dart.notNull(offset)) {
            let delta = dart.notNull(delay) > 0 ? delay : dart.notNull(offset) > 0 ? -dart.notNull(offset) : 0;
            this.scheduleNote(t.note, dest, t.time, delta);
          }
        } else if (t.command == trace$.TraceEvent.PATCH) {
          this.loadPatch("custom", core.Map._check(t._get("patch")), web_audio.AudioContext._check(dest.context));
        } else if (t.command == trace$.TraceEvent.PUSH_FX) {
          this.pushEffect(effect.Effect.new(core.String._check(t._get("effect")), t.params));
        } else if (t.command == trace$.TraceEvent.POP_FX) {
          this.popEffect();
        } else if (t.command == trace$.TraceEvent.STOP) {
          this.clearEffects();
        }
      }
    }
  };
  (scheduler.SchedulerSynth.new = function() {
    scheduler.SchedulerSynth.__proto__.new.call(this);
    ;
  }).prototype = scheduler.SchedulerSynth.prototype;
  dart.addTypeTests(scheduler.SchedulerSynth);
  dart.setMethodSignature(scheduler.SchedulerSynth, () => ({
    __proto__: dart.getMethods(scheduler.SchedulerSynth.__proto__),
    scheduleNotes: dart.fnType(dart.void, [trace$.Trace, web_audio.AudioNode], {delay: core.num, offset: core.num, withOffsets: core.bool}, {})
  }));
  dart.setLibraryUri(scheduler.SchedulerSynth, "package:synthesizer/src/scheduler.dart");
  dart.trackLibraries("packages/synthesizer/src/chain", {
    "package:synthesizer/src/key.dart": key,
    "package:synthesizer/src/chain.dart": chain$,
    "package:synthesizer/src/synth.dart": synth,
    "package:synthesizer/src/note.dart": note$,
    "package:synthesizer/src/event.dart": event$,
    "package:synthesizer/src/effect.dart": effect,
    "package:synthesizer/src/utils.dart": utils,
    "package:synthesizer/src/node.dart": node$,
    "package:synthesizer/src/trace.dart": trace$,
    "package:synthesizer/src/clock.dart": clock,
    "package:synthesizer/src/scheduler.dart": scheduler,
    "package:synthesizer/synthesizer.dart": synthesizer
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["key.dart","chain.dart","synth.dart","note.dart","event.dart","effect.dart","utils.dart","node.dart","trace.dart","clock.dart","scheduler.dart"],"names":[],"mappings":"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","file":"chain.ddc.js"}');
  // Exports:
  return {
    src__key: key,
    src__chain: chain$,
    src__synth: synth,
    src__note: note$,
    src__event: event$,
    src__effect: effect,
    src__utils: utils,
    src__node: node$,
    src__trace: trace$,
    src__clock: clock,
    src__scheduler: scheduler,
    synthesizer: synthesizer
  };
});

//# sourceMappingURL=chain.ddc.js.map
