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
part of Instruments;


/**
 * Drum sequencer
 *
 * TODO: sound selector dialog
 * TODO: time signature change
 * TODO: animate sequencer
 * TODO: instrument state saved with python cell
 * TODO: drum selection dialog
 * TODO: hook up recording studio
 * TODO: fast compile?
 */
class Sequencer extends Instrument {


  /// list of all drum samples along with names and icons
  Map<int, DrumSample> drums = new Map<int, DrumSample>();

  /// each row is a different drum sound
  List<SequencerRow> rows = new List<SequencerRow>();

  /// how many steps in the sequencer
  int steps = 16;

  /// how many beats in each measure
  int beatsPerMeasure = 4;

  /// sequencer rows are appended to this group
  svg.GElement controls = new svg.GElement();


  Sequencer(Map patch) : super("sequencer") {
    if (patch['nodes'] is List) {
      for (Map node in patch['nodes']) {
        if (node['type'] == 'sample' && node['samples'] is List) {
          for (Map sample in node['samples']) {
            if (sample['step'] is int) {
              int midi = sample['step'];
              String name = "${sample['name']}";
              DrumSample sample = new DrumSample(midi, name);
              drums[midi] = sample;
            }
          }
        }
      }
    }
    controls.attributes = { "transform" : "translate(20, 30)" };
    parent.append(controls);
    rows.add(new SequencerRow(this, 0, 4, "gold"));   // hi-hat row
    rows.add(new SequencerRow(this, 1, 7, "#2f2"));   // tom-tom row
    rows.add(new SequencerRow(this, 2, 2, "magenta"));   // snare row
    rows.add(new SequencerRow(this, 3, 1, "cyan"));   // kick drum
  }


/**
 * Save instrument state
 */
  Map saveState() {
    var result = [ ];
    for (SequencerRow row in rows) {
      result.add(row.save());
    }
    return { "sequencer-rows" : result };
  }


/**
 * Load instrument state
 */
  void loadState(Map saved) {
    if (saved['sequencer-rows'] is List) {
      List l = saved['sequencer-rows'];
      for (int i=0; i<l.length; i++) {
        if (i < rows.length && l[i] is Map) {
          rows[i].restore(l[i]);
        }
      }
    }
  }


/**
 * Show note being played
 */
  void noteOn(num note, [ int velocity = 90 ]) { }
  void noteOff(num note) { }
  void allNotesOff() { }
  bool isNoteOn(num note) { return false; }
  void animate(num beats) {
    int step = (beats * 4).floor();
    if (beats <= 0) {
      clearHighlight();
    } else {
      highlight(step);
    }
  }


/**
 * Highlight the playhead when animating
 */
  void highlight(int step) {
    rows.forEach((row) { row.highlight(step); });
  }


/**
 * Clear highlight when paused or stopped
 */
  void clearHighlight() {
    rows.forEach((row) { row.clearHighlight(); });
  }


/**
 * Show the drum sound selection dialog box
 */
  void showDrumDialog(SequencerRow row) {
    _activeRow = row;
  }
  SequencerRow _activeRow;


/**
 * Change time signature
 */
  void changeTimeSignature(int beatsPerMeasure) {
    this.beatsPerMeasure = beatsPerMeasure;
    if (beatsPerMeasure < 3) {
      this.steps = 16;
    } else if (beatsPerMeasure > 8) {
      this.steps = beatsPerMeasure * 2;
    } else {
      this.steps = beatsPerMeasure * 4;
    }
    _resize();
  }


/**
 * Generate python code that gets inserted into the pre-cell buffer
 */
  String generatePythonCode() {
    String code = "";
    for (SequencerRoow row in rows) {
      code += row.generatePythonCode() + "\n";
    }
    return code;
  }


/**
 * Process a computer key down event ... possibly play a note
 */
  void _onKeyDown(KeyboardEvent e) { }
  void _onKeyUp(KeyboardEvent e) { }


  void _render() { }


  void _resize() {
    super._resize();
    SequencerButton.WIDTH = (width - 260) / steps;
    SequencerButton.HEIGHT = (height - 30) / rows.length;
    rows.forEach((row) => row._resize());
  }
}



/**
 * Represents a drumpad that you can tap or click
 */
class DrumSample {

  /// midi note number
  int midi = 0;

  /// drum name
  String name = "KICK";

  DrumSample(this.midi, this.name);
}


/**
 * Represents a row of sequencer buttons corresponding to one drum sound.
 * Also includes the drum selector button, mute button, volume, and pitch dials.
 */
class SequencerRow {

  Sequencer instrument;

  /// contains the row of UI elements
  svg.GElement container;

  /// vertical row index for this set of controls
  int position = 0;

  /// drum sound to play
  int sound = 4;

  /// color of this row
  String color = "blue";

  /// using brush fill?
  bool brushing = false;
  int brushVelocity = 0;

  /// pitch and volume dials
  TinyDial pitchDial, volumeDial;

  /// mute button
  ToggleButton muteButton;

  /// row of drum buttons
  List<SequencerButton> buttons = new List<SequencerButton>();

  /// drum sound selection button
  SequencerDrumButton dbutton;

  num get pitch => pitchDial.value;

  num get volume => volumeDial.value;

  bool get muted => ! muteButton.value;


  SequencerRow(this.instrument, this.position, this.sound, this.color) {

    num h = SequencerButton.HEIGHT;
    num w = SequencerButton.WIDTH;
    num y = h * position;
    num x = 0;

    container = new svg.GElement() .. attributes = { "transform" : "translate(0, $y)" };

    dbutton = new SequencerDrumButton(this);
    container.append(dbutton.container);
    x += SequencerDrumButton.WIDTH;

    muteButton = new ToggleButton(x + 15, h/2, 10) .. color = color;
    muteButton.buildUI(container);
    muteButton.onChanged = (button, value) { value ? unmute() : mute(); };
    x += 35;

    for (int c=0; c<instrument.steps; c++) {
      SequencerButton sb = new SequencerButton(this, c, x);
      container.append(sb.container);
      buttons.add(sb);
      x += w;
    }
    x += w * 0.15;

    volumeDial = new TinyDial("VOLUME", 1.0)
      .. trackColor = color;
    volumeDial.buildUI(container, x, 0);
    volumeDial.onChanged = (dial, value) {
      if (instrument.canUpdate()) {
        instrument.update();
      }
    };
    x += 60;

    pitchDial = new TinyDial("PITCH", 0.85)
      .. trackColor = color
      .. minValue = -1.0
      .. maxValue = 1.0
      .. value = 0.0;
    pitchDial.buildUI(container, x, 0);
    pitchDial.onChanged = (dial, value) {
      if (instrument.canUpdate()) {
        instrument.update();
      }
    };
  }


  /// export state to save in the database
  Map save() {
    Map result = {
      "buttons" : [ ],
      "sound" : sound,
      "muted" : muted,
      "volume" : volume,
      "pitch" : pitch,
    };
    for (SequencerButton button in buttons) {
      result['buttons'].add(button.velocity);
    }
    return result;
  }


  /// restore from the database
  void restore(Map m) {
    pitchDial.value = toNum(m['pitch'], 0.0);
    volumeDial.value = toNum(m['volume'], 1.0);
    muteButton.value = ! toBool(m['muted'], false);
    volumeDial.muted = muted;
    pitchDial.muted = muted;
    sound = toInt(m['sound'], sound);
    List l = m['buttons'];
    for (int i=0; i<buttons.length; i++) {
      if (i < l.length) {
        buttons[i].setVelocity(toInt(l[i], 0));
      }
      buttons[i].disabled = muted;
    }
    dbutton._setIcon();
  }


  void changeDrumSound(int sound) {
    this.sound = sound;
    this.dbutton._setIcon();
  }


  void fastCompile(Trace trace) {
    if (muted) return;
    TraceEvent evt = new TraceEvent(TraceEvent.PUSH_FX, 0);
    evt['beats'] = -1;
    evt['start'] = 0;
    evt['values'] = [ pitch * 1000 ];
    evt['effect'] = 'bend';
    trace.trace.add(evt);
    for (SequencerButton button in buttons) {
      button.fastCompile(trace);
    }
    evt = new TraceEvent(TraceEvent.POP_FX, instrument.steps / 4.0);
    trace.trace.add(evt);
  }


  void highlight(int step) {
    for (SequencerButton button in buttons) {
      button.highlight(step);
    }
  }


  void clearHighlight() {
    for (SequencerButton button in buttons) {
      button.clearHighlight();
    }
  }


  void toggleMute() {
    muted ? unmute() : mute();
  }


  void mute() {
    if (muteButton.value) muteButton.value = false;
    volumeDial.muted = true;
    pitchDial.muted = true;
    buttons.forEach((button) { button.disabled = true; });
    instrument.update();
  }


  void unmute() {
    if (!muteButton.value) muteButton.value = true;
    volumeDial.muted = false;
    pitchDial.muted = false;
    buttons.forEach((button) { button.disabled = false; });
    instrument.update();
  }


  String generatePythonCode() {
    String pattern = "";
    for (SequencerButton button in buttons) {
      pattern += button.mark;
    }
    String command = muted ? "#sequence" : "sequence";
    return "$command($sound, '$pattern', ${volume.toStringAsFixed(2)}, ${pitch.toStringAsFixed(2)})";
  }


  void lightFireController(js.JsArray<num> lights) {
    for (int i=0; i<16; i++) {
      if (i < buttons.length) {
        buttons[i].lightFireController(lights);
      } else {
        lights.add(0);
        lights.add(0);
        lights.add(0);
      }
    }
  }

  var fireColors = [
    [ 1.0, 0.8, 0.0 ],  // gold
    [ 0.1, 1.0, 0.2 ],  // green
    [ 1.0, 0.0, 0.1 ],  // magenta
    [ 0.0, 0.5, 1.0 ],  // cyan
    [ 0.0, 0.2, 1.0 ]   // blue
  ];
}


class SequencerDrumButton {

  static num WIDTH = 75;

  SequencerRow row;

  String name = "kick";

  String get image => "/assets/images/drumicons/$name-white.svg";

  svg.RectElement backing;

  svg.ImageElement icon;

  svg.TextElement label;

  svg.GElement container;



  SequencerDrumButton(this.row) {
    container = new svg.GElement();
    num w = SequencerDrumButton.WIDTH;
    num h = SequencerButton.HEIGHT;
    num m = SequencerButton.MARGIN;

    backing = new svg.RectElement()
      .. attributes = {
        "x" : "0", "y" : "0", "rx" : "4",
        "width" : "${w - m}", "height" : "${h - m}",
        "fill" : "#fff", "fill-opacity" : "0.1",
        "class" : "sequencer-button"
      };

    icon = new svg.ImageElement()
      .. attributes = {
        "x" : "0", "y" : "0", "width" : "${w - m}", "height" : "${h - m}",
        "href" : image,
        "style" : "pointer-events: none"
      };

    /// name of the dial
    label = new svg.TextElement()
      ..attributes = {
        "x": "5",
        "y": "5",
        "fill": "#fff",
        "text-anchor": "left",
        "dominant-baseline": "hanging",
        "font-family": "sans-serif",
        "font-weight": "100",
        "font-size": "12px",
        "style" : "user-select: none; pointer-events: none;"
      };
    label.innerHtml = "${row.sound}";
    _setIcon();


    container.append(backing);
    container.append(icon);
    container.append(label);

    backing.onClick.listen((e) {
      row.instrument.showDrumDialog(row);
    });
  }


  void _setIcon() {
    Map drums = row.instrument.drums;
    if (drums.containsKey(row.sound)) {
      DrumSample sample = drums[row.sound];
      this.name = sample.name;
      this.icon.attributes['href'] = image;
      this.label.innerHtml = "${row.sound}";
    }
  }
}


class SequencerButton {

  static num WIDTH = 50;
  static num HEIGHT = 50;
  static num MARGIN = 5;

  SequencerRow row;

  int col = 0;

  num x = 0;

  int velocity = 0;

  svg.RectElement backing, light;

  svg.GElement container;

  String get mark => (velocity == 0) ? "-" : (velocity >= 100) ? "!" : "*";

  bool _disabled = false;
  bool get disabled => _disabled;
  set disabled(bool b) {
    _disabled = b;
    setVelocity(velocity);
  }


  SequencerButton(this.row, this.col, this.x) {

    container = new svg.GElement();

    num fill = ((col ~/ 4 % 2) == 1) ? 0.1 : 0.2;

    backing = new svg.RectElement()
      .. attributes = {
        "x" : "$x", "y" : "0", "rx" : "4",
        "width" : "${WIDTH - MARGIN}", "height" : "${HEIGHT - MARGIN}",
        "fill" : "#fff",
        "fill-opacity" : "$fill"
      };
    light = new svg.RectElement()
      .. attributes = {
        "x" : "$x", "y" : "0", "rx" : "4",
        "width" : "${WIDTH - MARGIN}", "height" : "${HEIGHT - MARGIN}",
        "fill" : row.color,
        "fill-opacity" : "0.0",
        "class" : "sequencer-button"
      };

    container.append(backing);
    container.append(light);


    light.onMouseDown.listen((e) {
      if (!disabled && row.instrument.canUpdate()) {
        row.brushing = true;
        toggle();
        row.brushVelocity = velocity;
      }
    });
    light.onMouseUp.listen((e) {
      row.brushing = false;
    });
    light.onMouseEnter.listen((e) {
      if (!disabled && row.brushing && e.buttons > 0) {
        setVelocity(row.brushVelocity);
        row.instrument.update();
      }
    });
  }


  void toggle() {
    if (!disabled && row.instrument.canUpdate()) {
      setVelocity(velocity + 50);
      row.instrument.playNote(row.sound, velocity);
      row.instrument.update();
    }
  }


  void setVelocity(int v) {
    velocity = v;
    if (velocity > 100) velocity = 0;
    if (_disabled) {
      light.attributes['fill'] = "#777";
      light.attributes['fill-opacity'] = "1.0";
    }
    else {
      light.attributes['fill'] = row.color;
      light.attributes['fill-opacity'] = "${velocity / 100.0}";
    }
  }


  void clearHighlight() {
    if (!_disabled) {
      light.attributes['fill'] = row.color;
      light.attributes['fill-opacity'] = "${velocity / 100.0}";
    }
    backing.attributes['fill-opacity'] = ((col ~/ 4 % 2) == 1) ? "0.1" : "0.2";
    _highlighted = false;
  }


  void highlight(int step) {
    if (step == col) {
      if (!_disabled && velocity > 0) {
        light.attributes['fill'] = "#eee";
        light.attributes['fill-opacity'] = "1.0";
      } else {
        backing.attributes['fill-opacity'] = "0.3";
      }
      _highlighted = true;
    }
    else if (_highlighted) {
      clearHighlight();
    }
  }

  bool _highlighted = false;
}
