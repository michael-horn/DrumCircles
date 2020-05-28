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
part of TunePad;


/**
 * Interface to firebase
 */
class NoteRecorder with ClockSubscriber {

  /// quantize to the 16th note
  static num QUANT = 0.25;

  /// link to the master playclock for time keeping
  PlayClock clock;

  /// recording start time in seconds
  num start = -1;

  /// are we currently recording
  bool recording = false;

  /// is recording
  bool get isRecording => recording;

  /// quantize timing?
  bool quantize = true;

  /// history of note events sorted by start time
  List<NoteSpacer> notes = new List<NoteSpacer>();


  NoteRecorder(this.clock) {
    clock.addSubscriber(this);
  }


/**
 * start recording
 */
  void record() {
    if (clock.context != null) {
      notes.clear();
      start = -1;
      recording = true;
    }
  }


/**
 * stop recording
 */
  void stop() {
    recording = false;
  }


/**
 * a note on the instrument is pressed
 */
  void noteOn(num midi, int velocity) {
    if (isRecording && clock.context != null) {
      if (start < 0) start = clock.context.currentTime;
      NoteSpacer curr = new NoteSpacer(midi)
        .. start = quant(clock.context.currentTime)
        .. velocity = velocity;
      NoteSpacer prev = notes.isEmpty ? null : notes.last;
      if (prev != null) {
        curr.prev = prev;
        prev.next = curr;
      }
      notes.add(curr);
    }
  }


/**
 * a note on the instrument is released
 */
  void noteOff(num midi) {
    if (isRecording && clock.context != null) {
      NoteSpacer curr = new NoteSpacer(midi)
        .. start = quant(clock.context.currentTime)
        .. type = "off";
      NoteSpacer prev = notes.isEmpty ? null : notes.last;
      if (prev != null) {
        curr.prev = prev;
        prev.next = curr;
        notes.add(curr); // don't start with a note off event
      }
    }
  }



/**
 * render current recording to string
 */
  String toString() {
    if (clock.context == null) return "";

    String result = "";
    num t = 0;
    for (NoteSpacer n in notes) {
      n.space(clock.context.currentTime, quantize ? QUANT : QUANT / 4);
      if (n.type == "on") {
        num rest = n.start - t;
        if (rest > 0) {
          result += "rest(${(n.start - t).toStringAsFixed(2)})\n";
        }
        result += n.toString() + "\n";
        t = n.start + n.duration;
      }
    }
    return result;
  }




/**
 * called whenever the master clock tempo changes
 */
  void onTempoChange() { }


/**
 * Called whenever the time signature is changed
 */
  void onTimeSignatureChange() { }


/**
 * called whenever restart is called by any instrument
 */
  void onClockReset() { }


/**
 * called whenever the playhead is manually adjusted on any instrument
 */
  void onClockTimeChange() { }


/**
 * convert elapsed seconds to beats
 */
  num quant(num t) {
    num elapsed = t - start;
    num beats = elapsed * clock.bpm / 60;
    num quant = (beats / NoteRecorder.QUANT).round() * NoteRecorder.QUANT;
    return quantize ? quant : beats;
  }
}


class NoteSpacer {

  String type = "on";
  num midi = 0;
  int velocity = 80;
  num start = 0;
  num duration = -1;
  num sustain = -1;

  NoteSpacer prev = null;
  NoteSpacer next = null;

  NoteSpacer(this.midi);

  String toString() {
    if (type == "on" && duration >= 0) {
      String result = "playNote($midi, beats = ${duration.toStringAsFixed(2)}";
      if (velocity != 90) result += ", velocity = $velocity";
      if (sustain > 0) result += ", sustain = $sustain";
      return result + ")";
    }
    return "";
  }


  bool space(num elapsedBeats, num minDuration) {
    if (type == "on") {
      this.duration = -1;
      this.sustain = -1;
      NoteSpacer n = next;
      while (n != null) {
        if (n.type == "on") {
          this.duration = n.start - this.start;
        }
        else if (n.type == "off" && n.midi == this.midi) {
          if (this.duration < 0) {
            this.duration = max(minDuration, n.start - this.start);
          } else {
            this.sustain = n.start - this.start;
          }
          return true;
        }
        n = n.next;
      }
      this.duration = elapsedBeats - this.start;
    }
    return false;
  }
}
