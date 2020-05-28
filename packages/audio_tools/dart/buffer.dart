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
import 'dart:js' as js;
import 'dart:html';
import 'dart:math';
import 'dart:async';
import 'dart:convert';
import 'dart:web_audio';
import 'dart:typed_data';
import 'dart:collection';

/**
 * Thin wrapper around the AudioBuffer class that allows for variable length buffers as well as 
 * exporting to WAV, MP3, and Base64. Also generates compressed waveform visualization data
 */
class GrowableAudioBuffer {

  /// this stores variable-length rendered audio before we convert it into an AudioBuffer
  List<List<Float32List>> _channels = new List<List<Float32List>>();

  /// audio samples per second
  int sampleRate = 44100;

  /// channel count
  int get numberOfChannels => _channels.length;

  /// length of the audio in samples
  int samples = 0;

  /// is the audio buffer empty
  bool get isEmpty => samples <= 0;

  /// length of the audio in seconds
  num get duration => samples / sampleRate;

  /// cached AudioBuffer object
  AudioBuffer _buffer;

  /// cached waveform object
  Queue<List<num>> waveform = new Queue<List<num>>();


  GrowableAudioBuffer([ int channels = 1, int sampleRate = 44100 ]) {
    reshape(channels, sampleRate);
  }


  GrowableAudioBuffer clone() {
    GrowableAudioBuffer b = new GrowableAudioBuffer(numberOfChannels, sampleRate);
    b.append(toAudioBuffer());
    return b;
  }


  /// clear existing audio data
  void clear() {
    this.samples = 0;
    this.waveform.clear();
    this._buffer = null;
    for (List<Float32List> channel in _channels) {
      channel.clear();
    }
  }


  /// sets the channel count and sample rate to match the given audio buffer.
  /// after calling, this buffer will have length 0
  void reshape(int channels, int sampleRate) {
    clear();
    this.sampleRate = sampleRate;
    this._channels.clear();
    if (channels < 0) channels = 1;
    for (int c = 0; c < channels; c++) {
      _channels.add(new List<Float32List>());
    }
  }


  /// trim the buffer from a start to an end point in seconds
  void trim(num start, num end) {
    end = end.clamp(0.0, duration);
    start = start.clamp(0.0, duration);
    if (end <= start || isEmpty) {
      clear();
      return;
    }

    // flatten audio buffer
    if (_buffer == null) toAudioBuffer();
    if (_buffer == null) return null;

    int A = (start * sampleRate).round();
    int B = (end * sampleRate).round();
    int len = B - A;


    // clear out old audio data
    for (List<Float32List> channel in _channels) {
      channel.clear();
      channel.add(new Float32List(len));
    }
    this.waveform.clear();


    // copy in trimmed data
    for (int c=0; c<numberOfChannels; c++) {
      Float32List src = _buffer.getChannelData(c);
      Float32List dst = _channels[c][0];
      for (int i=0; i<len; i++) {
        dst[i] = src[i + A];
      }
    }

    this.samples = len;
    this._buffer = null;
  }


  /// append the given audio data to this buffer
  void append(AudioBuffer b) {
    if (b == null) return;
    _buffer = null; // throw away cached buffer
    num amax = 0.0, amin = 0.0;

    for (int c=0; c < numberOfChannels && c < b.numberOfChannels; c++) {
      Float32List src = b.getChannelData(c);
      Float32List dest = new Float32List(src.length);
      for (int i=0; i<src.length; i++) {
        dest[i] = src[i];
        if (c == 0) {
          this.samples++;
          amax = max(amax, src[i]);
          amin = min(amin, src[i]);
          if (((samples + 1) % 2205) == 0) {
            waveform.addLast([ amin, amax ]);
            amax = 0.0;
            amin = 0.0;
          }
        }
      }
      _channels[c].add(dest);
    }
  }


  /// load audio source from a URL
  Future<bool> loadAudio(AudioContext context, String url) async {
    try {
      HttpRequest request = await HttpRequest.request(
        url,
        method: "GET",
        responseType: "arraybuffer");

      AudioBuffer buffer = await context.decodeAudioData(request.response);
      if (buffer != null) {
        reshape(buffer.numberOfChannels, buffer.sampleRate);
        append(buffer);
        return true;
      }
    }
    catch (e) {
      print(e);
      return false;
    }
  }  


  /// create an AudioBuffer from the saved audio data
  AudioBuffer toAudioBuffer() {
    if (_buffer != null) return _buffer;
    if (samples <= 0) return null;

    this._buffer = new AudioBuffer( {
      "length" : samples,
      "numberOfChannels" : numberOfChannels,
      "sampleRate" : sampleRate
    });
    for (int c=0; c < _channels.length; c++) {
      int index = 0;
      for (Float32List b in _channels[c]) {
        _buffer.copyToChannel(b, c, index);
        index += b.length;
      }
    }
    return _buffer;
  }


  /// encodes the audio buffer as an MP3 byte array
  Uint8List toMP3() {
    if (_buffer == null) toAudioBuffer();
    if (_buffer == null) return null;

    // only mono or stereo support
    int channels = min(2, _buffer.numberOfChannels);  
    bool stereo = channels == 2;

    Int16List left = new Int16List(_buffer.length);
    Int16List right = stereo ? new Int16List(_buffer.length) : left;

    for (int c=0; c < channels; c++) {
      Float32List src = _buffer.getChannelData(c);
      Int16List dest = (c == 0) ? left : right;
      for (int i=0; i<src.length; i++) {
        num s = max(-1, min(1, src[i]));
        dest[i] = (s * (1 << 15)).round();
      }
    }

    if (stereo) {
      return js.context.callMethod('encodeMP3Stereo', [ left, right, sampleRate ]);
    } else {
      return js.context.callMethod('encodeMP3Mono', [ left, sampleRate ]);
    }
  }


  /// encodes the audio buffer as a WAV byte array
  Uint8List toWAV() {
    if (_buffer == null) toAudioBuffer();
    if (_buffer == null) return null;

    // only mono or stereo support
    int channels = min(2, _buffer.numberOfChannels);  
    bool stereo = channels == 2;
    int len = _buffer.length;

    Int16List wav = new Int16List(len * channels + 23);
    wav[0] = 0x4952;  // "RI"
    wav[1] = 0x4646;  // "FF"

    wav[2] = (2 * len * channels + 15) & 0x0000ffff; // RIFF size
    wav[3] = ((2 * len * channels + 15) & 0xffff0000) >> 16; // RIFF size

    wav[4] = 0x4157; // "WA"
    wav[5] = 0x4556; // "VE"

    wav[6] = 0x6d66; // "fm"
    wav[7] = 0x2074; // "t "

    wav[8] = 0x0012; // fmt chunksize: 18
    wav[9] = 0x0000;

    wav[10] = 0x0001; // format tag : 1 
    wav[11] = channels; // channels: 2 or 1

    wav[12] = sampleRate & 0x0000ffff; // sample per sec
    wav[13] = (sampleRate & 0xffff0000) >> 16; // sample per sec

    wav[14] = (2 * channels * sampleRate) & 0x0000ffff; // byte per sec
    wav[15] = ((2 * channels * sampleRate) & 0xffff0000) >> 16; // byte per sec

    wav[16] = channels * 2; // block align
    wav[17] = 16;  // bits per sample
    wav[18] = 0x0000; // cb size
    wav[19] = 0x6164; // "da"
    wav[20] = 0x6174; // "ta"
    wav[21] = (2 * len * channels) & 0x0000ffff; // data size[byte]
    wav[22] = ((2 * len * channels) & 0xffff0000) >> 16; // data size[byte]  

    Float32List leftSource = _buffer.getChannelData(0);
    Float32List rightSource = stereo ? _buffer.getChannelData(1) : leftSource;

    for (int i=0; i<len; i++) {
      for (int c=0; c<channels; c++) {
        num sample = (c == 0) ? leftSource[i] : rightSource[i];
        sample = max(-1, min(1, sample));
        wav[i * channels + c + 23] = (sample * (1 << 15)).round();
      }
    }
    return wav.buffer.asUint8List();
  }


  /// downloads a WAV file as a blob
  void downloadWAV(String filename) {
    Uint8List wav = toWAV();
    Blob blob = new Blob([ wav ], "audio/wav");
    if (blob != null) {
      String objectUrl = Url.createObjectUrlFromBlob(blob);
      AnchorElement link = new AnchorElement();
      link.href = objectUrl;
      link.download = filename;
      link.click();
      Url.revokeObjectUrl(objectUrl);
    }
  }


  /// downloads an MP3 file as a blob
  void downloadMP3(String filename) {
    Uint8List wav = toMP3();
    Blob blob = new Blob([ wav ], "audio/mp3");
    if (blob != null) {
      String objectUrl = Url.createObjectUrlFromBlob(blob);
      AnchorElement link = new AnchorElement();
      link.href = objectUrl;
      link.download = filename;
      link.click();
      Url.revokeObjectUrl(objectUrl);
    }
  }


  /// encode audio buffer as a base64 encoded MP3 file
  String toMP3Base64() {
    Uint8List mp3 = toMP3();
    return (mp3 != null) ? "data:audio/mp3;base64,${base64.encode(mp3)}" : null;
  }


  /// encode audio buffer as a base64 encoded WAV file
  String toWAVBase64() {
    Uint8List wav = toWAV();
    return (wav != null) ? "data:audio/wav;base64,${base64.encode(wav)}" : null;
  }


  /// generate waveform data from an audio buffer
  void generateWaveform(int samples) {
    waveform.clear();
    AudioBuffer ab = toAudioBuffer();
    if (ab == null) return;
    Float32List left = ab.getChannelData(0);
    Float32List right = (ab.numberOfChannels > 1) ? ab.getChannelData(1) : left;

    int stride = left.length ~/ samples;
    num amax = 0.0, amin = 0.0;
    for (int i=0; i<left.length; i++) {
      amax = max(amax, max(left[i], right[i]));
      amin = min(amin, min(left[i], right[i]));
      if (((i+1) % stride) == 0) {
        waveform.addLast([ amin, amax ]);
        amax = 0.0;
        amin = 0.0;
      }
    }
  }


  void trimWaveform(int samples) {
    while (waveform.length > samples) {
      waveform.removeFirst();
    }
  }
}

