define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const typed_data = dart_sdk.typed_data;
  const collection = dart_sdk.collection;
  const _native_typed_data = dart_sdk._native_typed_data;
  const math = dart_sdk.math;
  const html = dart_sdk.html;
  const async = dart_sdk.async;
  const web_audio = dart_sdk.web_audio;
  const _js_helper = dart_sdk._js_helper;
  const js = dart_sdk.js;
  const convert = dart_sdk.convert;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var buffer = Object.create(dart.library);
  var $length = dartx.length;
  var $clear = dartx.clear;
  var $add = dartx.add;
  var $clamp = dartx.clamp;
  var $round = dartx.round;
  var $_get = dartx._get;
  var $_set = dartx._set;
  var $modulo = dartx['%'];
  var $response = dartx.response;
  var $decodeAudioData = dartx.decodeAudioData;
  var $buffer = dartx.buffer;
  var $asUint8List = dartx.asUint8List;
  var $truncate = dartx.truncate;
  var ListOfFloat32ListL = () => (ListOfFloat32ListL = dart.constFn(core.List$(typed_data.Float32List)))();
  var JSArrayOfListLOfFloat32ListL = () => (JSArrayOfListLOfFloat32ListL = dart.constFn(_interceptors.JSArray$(ListOfFloat32ListL())))();
  var ListOfnumL = () => (ListOfnumL = dart.constFn(core.List$(core.num)))();
  var ListQueueOfListLOfnumL = () => (ListQueueOfListLOfnumL = dart.constFn(collection.ListQueue$(ListOfnumL())))();
  var JSArrayOfFloat32ListL = () => (JSArrayOfFloat32ListL = dart.constFn(_interceptors.JSArray$(typed_data.Float32List)))();
  var JSArrayOfnumL = () => (JSArrayOfnumL = dart.constFn(_interceptors.JSArray$(core.num)))();
  const CT = Object.create(null);
  var L0 = "package:audio_tools/dart/buffer.dart";
  var _channels = dart.privateName(buffer, "_channels");
  var _buffer = dart.privateName(buffer, "_buffer");
  var sampleRate$ = dart.privateName(buffer, "GrowableAudioBuffer.sampleRate");
  var samples = dart.privateName(buffer, "GrowableAudioBuffer.samples");
  var waveform = dart.privateName(buffer, "GrowableAudioBuffer.waveform");
  buffer.GrowableAudioBuffer = class GrowableAudioBuffer extends core.Object {
    get sampleRate() {
      return this[sampleRate$];
    }
    set sampleRate(value) {
      this[sampleRate$] = value;
    }
    get samples() {
      return this[samples];
    }
    set samples(value) {
      this[samples] = value;
    }
    get waveform() {
      return this[waveform];
    }
    set waveform(value) {
      this[waveform] = value;
    }
    get numberOfChannels() {
      return this[_channels][$length];
    }
    get isEmpty() {
      return dart.notNull(this.samples) <= 0;
    }
    get duration() {
      return dart.notNull(this.samples) / dart.notNull(this.sampleRate);
    }
    clone() {
      let b = new buffer.GrowableAudioBuffer.new(this.numberOfChannels, this.sampleRate);
      b.append(this.toAudioBuffer());
      return b;
    }
    clear() {
      this.samples = 0;
      this.waveform.clear();
      this[_buffer] = null;
      for (let channel of this[_channels]) {
        channel[$clear]();
      }
    }
    reshape(channels, sampleRate) {
      this.clear();
      this.sampleRate = sampleRate;
      this[_channels][$clear]();
      if (dart.notNull(channels) < 0) channels = 1;
      for (let c = 0; c < dart.notNull(channels); c = c + 1) {
        this[_channels][$add](JSArrayOfFloat32ListL().of([]));
      }
    }
    trim(start, end) {
      end = end[$clamp](0.0, this.duration);
      start = start[$clamp](0.0, this.duration);
      if (dart.notNull(end) <= dart.notNull(start) || dart.test(this.isEmpty)) {
        this.clear();
        return;
      }
      if (this[_buffer] == null) this.toAudioBuffer();
      if (this[_buffer] == null) return null;
      let A = (dart.notNull(start) * dart.notNull(this.sampleRate))[$round]();
      let B = (dart.notNull(end) * dart.notNull(this.sampleRate))[$round]();
      let len = B - A;
      for (let channel of this[_channels]) {
        channel[$clear]();
        channel[$add](_native_typed_data.NativeFloat32List.new(len));
      }
      this.waveform.clear();
      for (let c = 0; c < dart.notNull(this.numberOfChannels); c = c + 1) {
        let src = this[_buffer].getChannelData(c);
        let dst = this[_channels][$_get](c)[$_get](0);
        for (let i = 0; i < len; i = i + 1) {
          dst[$_set](i, src[$_get](i + A));
        }
      }
      this.samples = len;
      this[_buffer] = null;
    }
    append(b) {
      if (b == null) return;
      this[_buffer] = null;
      let amax = 0.0;
      let amin = 0.0;
      for (let c = 0; c < dart.notNull(this.numberOfChannels) && c < dart.notNull(b.numberOfChannels); c = c + 1) {
        let src = b.getChannelData(c);
        let dest = _native_typed_data.NativeFloat32List.new(src[$length]);
        for (let i = 0; i < dart.notNull(src[$length]); i = i + 1) {
          dest[$_set](i, src[$_get](i));
          if (c === 0) {
            this.samples = dart.notNull(this.samples) + 1;
            amax = math.max(core.num, amax, src[$_get](i));
            amin = math.min(core.num, amin, src[$_get](i));
            if ((dart.notNull(this.samples) + 1)[$modulo](2205) === 0) {
              this.waveform.addLast(JSArrayOfnumL().of([amin, amax]));
              amax = 0.0;
              amin = 0.0;
            }
          }
        }
        this[_channels][$_get](c)[$add](dest);
      }
    }
    loadAudio(context, url) {
      return async.async(core.bool, (function* loadAudio() {
        try {
          let request = (yield html.HttpRequest.request(url, {method: "GET", responseType: "arraybuffer"}));
          let buffer = (yield context[$decodeAudioData](typed_data.ByteBuffer.as(request[$response])));
          if (buffer != null) {
            this.reshape(buffer.numberOfChannels, dart.asNullableInt(buffer.sampleRate));
            this.append(buffer);
            return true;
          }
        } catch (e$) {
          let e = dart.getThrown(e$);
          core.print(e);
          return false;
        }
      }).bind(this));
    }
    toAudioBuffer() {
      if (this[_buffer] != null) return this[_buffer];
      if (dart.notNull(this.samples) <= 0) return null;
      this[_buffer] = web_audio.AudioBuffer.new(new _js_helper.LinkedMap.from(["length", this.samples, "numberOfChannels", this.numberOfChannels, "sampleRate", this.sampleRate]));
      for (let c = 0; c < dart.notNull(this[_channels][$length]); c = c + 1) {
        let index = 0;
        for (let b of this[_channels][$_get](c)) {
          this[_buffer].copyToChannel(b, c, index);
          index = index + dart.notNull(b[$length]);
        }
      }
      return this[_buffer];
    }
    toMP3() {
      if (this[_buffer] == null) this.toAudioBuffer();
      if (this[_buffer] == null) return null;
      let channels = math.min(core.int, 2, this[_buffer].numberOfChannels);
      let stereo = channels === 2;
      let left = _native_typed_data.NativeInt16List.new(this[_buffer].length);
      let right = stereo ? _native_typed_data.NativeInt16List.new(this[_buffer].length) : left;
      for (let c = 0; c < channels; c = c + 1) {
        let src = this[_buffer].getChannelData(c);
        let dest = c === 0 ? left : right;
        for (let i = 0; i < dart.notNull(src[$length]); i = i + 1) {
          let s = math.max(core.num, -1, math.min(core.num, 1, src[$_get](i)));
          dest[$_set](i, (s * (1 << 15))[$round]());
        }
      }
      if (stereo) {
        return typed_data.Uint8List.as(js.context.callMethod("encodeMP3Stereo", [left, right, this.sampleRate]));
      } else {
        return typed_data.Uint8List.as(js.context.callMethod("encodeMP3Mono", [left, this.sampleRate]));
      }
    }
    toWAV() {
      if (this[_buffer] == null) this.toAudioBuffer();
      if (this[_buffer] == null) return null;
      let channels = math.min(core.int, 2, this[_buffer].numberOfChannels);
      let stereo = channels === 2;
      let len = this[_buffer].length;
      let wav = _native_typed_data.NativeInt16List.new(dart.notNull(len) * channels + 23);
      wav[$_set](0, 18770);
      wav[$_set](1, 17990);
      wav[$_set](2, 2 * dart.notNull(len) * channels + 15 & 65535);
      wav[$_set](3, (2 * dart.notNull(len) * channels + 15 & 4294901760) >>> 16);
      wav[$_set](4, 16727);
      wav[$_set](5, 17750);
      wav[$_set](6, 28006);
      wav[$_set](7, 8308);
      wav[$_set](8, 18);
      wav[$_set](9, 0);
      wav[$_set](10, 1);
      wav[$_set](11, channels);
      wav[$_set](12, dart.notNull(this.sampleRate) & 65535);
      wav[$_set](13, (dart.notNull(this.sampleRate) & 4294901760) >>> 16);
      wav[$_set](14, 2 * channels * dart.notNull(this.sampleRate) & 65535);
      wav[$_set](15, (2 * channels * dart.notNull(this.sampleRate) & 4294901760) >>> 16);
      wav[$_set](16, channels * 2);
      wav[$_set](17, 16);
      wav[$_set](18, 0);
      wav[$_set](19, 24932);
      wav[$_set](20, 24948);
      wav[$_set](21, 2 * dart.notNull(len) * channels & 65535);
      wav[$_set](22, (2 * dart.notNull(len) * channels & 4294901760) >>> 16);
      let leftSource = this[_buffer].getChannelData(0);
      let rightSource = stereo ? this[_buffer].getChannelData(1) : leftSource;
      for (let i = 0; i < dart.notNull(len); i = i + 1) {
        for (let c = 0; c < channels; c = c + 1) {
          let sample = c === 0 ? leftSource[$_get](i) : rightSource[$_get](i);
          sample = math.max(core.num, -1, math.min(core.num, 1, sample));
          wav[$_set](i * channels + c + 23, (dart.notNull(sample) * (1 << 15))[$round]());
        }
      }
      return wav[$buffer][$asUint8List]();
    }
    downloadWAV(filename) {
      let wav = this.toWAV();
      let blob = html.Blob.new([wav], "audio/wav");
      if (blob != null) {
        let objectUrl = html.Url.createObjectUrlFromBlob(blob);
        let link = html.AnchorElement.new();
        link.href = objectUrl;
        link.download = filename;
        link.click();
        html.Url.revokeObjectUrl(objectUrl);
      }
    }
    downloadMP3(filename) {
      let wav = this.toMP3();
      let blob = html.Blob.new([wav], "audio/mp3");
      if (blob != null) {
        let objectUrl = html.Url.createObjectUrlFromBlob(blob);
        let link = html.AnchorElement.new();
        link.href = objectUrl;
        link.download = filename;
        link.click();
        html.Url.revokeObjectUrl(objectUrl);
      }
    }
    toMP3Base64() {
      let mp3 = this.toMP3();
      return mp3 != null ? "data:audio/mp3;base64," + dart.str(convert.base64.encode(mp3)) : null;
    }
    toWAVBase64() {
      let wav = this.toWAV();
      return wav != null ? "data:audio/wav;base64," + dart.str(convert.base64.encode(wav)) : null;
    }
    generateWaveform(samples) {
      this.waveform.clear();
      let ab = this.toAudioBuffer();
      if (ab == null) return;
      let left = ab.getChannelData(0);
      let right = dart.notNull(ab.numberOfChannels) > 1 ? ab.getChannelData(1) : left;
      let stride = (dart.notNull(left[$length]) / dart.notNull(samples))[$truncate]();
      let amax = 0.0;
      let amin = 0.0;
      for (let i = 0; i < dart.notNull(left[$length]); i = i + 1) {
        amax = math.max(core.num, amax, math.max(core.num, left[$_get](i), right[$_get](i)));
        amin = math.min(core.num, amin, math.min(core.num, left[$_get](i), right[$_get](i)));
        if ((i + 1)[$modulo](stride) === 0) {
          this.waveform.addLast(JSArrayOfnumL().of([amin, amax]));
          amax = 0.0;
          amin = 0.0;
        }
      }
    }
    trimWaveform(samples) {
      while (dart.notNull(this.waveform[$length]) > dart.notNull(samples)) {
        this.waveform.removeFirst();
      }
    }
  };
  (buffer.GrowableAudioBuffer.new = function(channels = 1, sampleRate = 44100) {
    this[_channels] = JSArrayOfListLOfFloat32ListL().of([]);
    this[sampleRate$] = 44100;
    this[samples] = 0;
    this[_buffer] = null;
    this[waveform] = new (ListQueueOfListLOfnumL()).new();
    this.reshape(channels, sampleRate);
  }).prototype = buffer.GrowableAudioBuffer.prototype;
  dart.addTypeTests(buffer.GrowableAudioBuffer);
  dart.addTypeCaches(buffer.GrowableAudioBuffer);
  dart.setMethodSignature(buffer.GrowableAudioBuffer, () => ({
    __proto__: dart.getMethods(buffer.GrowableAudioBuffer.__proto__),
    clone: dart.fnType(buffer.GrowableAudioBuffer, []),
    clear: dart.fnType(dart.void, []),
    reshape: dart.fnType(dart.void, [core.int, core.int]),
    trim: dart.fnType(dart.void, [core.num, core.num]),
    append: dart.fnType(dart.void, [web_audio.AudioBuffer]),
    loadAudio: dart.fnType(async.Future$(core.bool), [web_audio.AudioContext, core.String]),
    toAudioBuffer: dart.fnType(web_audio.AudioBuffer, []),
    toMP3: dart.fnType(typed_data.Uint8List, []),
    toWAV: dart.fnType(typed_data.Uint8List, []),
    downloadWAV: dart.fnType(dart.void, [core.String]),
    downloadMP3: dart.fnType(dart.void, [core.String]),
    toMP3Base64: dart.fnType(core.String, []),
    toWAVBase64: dart.fnType(core.String, []),
    generateWaveform: dart.fnType(dart.void, [core.int]),
    trimWaveform: dart.fnType(dart.void, [core.int])
  }));
  dart.setGetterSignature(buffer.GrowableAudioBuffer, () => ({
    __proto__: dart.getGetters(buffer.GrowableAudioBuffer.__proto__),
    numberOfChannels: core.int,
    isEmpty: core.bool,
    duration: core.num
  }));
  dart.setLibraryUri(buffer.GrowableAudioBuffer, L0);
  dart.setFieldSignature(buffer.GrowableAudioBuffer, () => ({
    __proto__: dart.getFields(buffer.GrowableAudioBuffer.__proto__),
    [_channels]: dart.fieldType(core.List$(core.List$(typed_data.Float32List))),
    sampleRate: dart.fieldType(core.int),
    samples: dart.fieldType(core.int),
    [_buffer]: dart.fieldType(web_audio.AudioBuffer),
    waveform: dart.fieldType(collection.Queue$(core.List$(core.num)))
  }));
  dart.trackLibraries("packages/audio_tools/dart/buffer", {
    "package:audio_tools/dart/buffer.dart": buffer
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["buffer.dart"],"names":[],"mappings":"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","file":"buffer.ddc.js"}');
  // Exports:
  return {
    dart__buffer: buffer
  };
});

//# sourceMappingURL=buffer.ddc.js.map
