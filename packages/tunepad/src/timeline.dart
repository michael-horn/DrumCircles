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
 * The timeline sends event messages to listeners
 */
abstract class TimelineListener {

/**
 * Fired as the user drags the playhead over notes on the timeline
 */
  void onScrubEnter(TraceEvent e);
  void onScrubLeave(TraceEvent e);

/**
 * Mouse hovers over a note on the timeline
 */
  void onHoverEnter(TraceEvent e);
  void onHoverLeave(TraceEvent e);

/**
 * User clicks on a note on the timeline
 */
  void onClickNote(TraceEvent e);
  void onReleaseNote(TraceEvent e);

/**
 * User clicks on the ruler to move playhead
 */
  void onMovePlayhead(num playhead);

/**
 * User starts or stops dragging the playhead
 */
  void onDragPlayheadStart(num playhead);
  void onDragPlayheadStop(num playhead);
}


/**
 * Displays a midi piano roll.
 */
class Timeline {

  /// listens for timeline user events
  TimelineListener listener;

  /// visualize as midi roll or as waveform?
  bool _midi = true;

  /// how many rows to draw
  int tracks = 12;

  /// how many beats to draw
  int beats = 8;

  /// how many pixels wide per quarter note
  num get beatWidth => max(40, width / beats);

  /// how many pixels per note track
  num get trackHeight => max(5, scoreHeight / tracks);

  /// how many pixels wide for the entire trace
  num get traceWidth => beatWidth * beats;

  /// height of the top ruler
  num get rulerHeight => 20;

  /// height of the track area
  num get scoreHeight => (height - rulerHeight);

  /// position of the orange playhead in beats
  num _playhead = 0;

  /// path that renders the playhead and handles user input events
  svg.PathElement _playheadLine = new svg.PathElement();

  /// contains the playback trace data
  Trace trace;

  /// list of rectangles representing notes
  Map<TraceEvent, svg.SvgElement> notes = new Map<TraceEvent, svg.SvgElement>();

  /// waveform path element (keep this to avoid costs of rerendering every time we toggle the view)
  svg.GElement _waveform = null;

  /// all of the HTML elements for the recording studio are contained within a shadow DOM
  ShadowRoot root;

  /// <svg> tag that contains the instrument
  svg.SvgSvgElement container;

  /// group that contains all of the visual elements
  svg.GElement parent = new svg.GElement();

  /// height of the containing element
  num width = 900, height = 200;


  Timeline(this.listener);


  /// update the audio trace
  void setTrace(Trace trace, num beats) {
    this.beats = beats;
    this.trace = trace;
    this.tracks = 12;
    _waveform = null;
    _render();
  }

  /// render as midi
  void showMidi() {
    if (!_midi) { _midi = true; _render(); }
  }

  /// render as a waveform
  void showWaveform() {
    if (_midi) { _midi = false; _render(); }
  }

  /// toggle between midi and waveform view
  void toggleView() {
    _midi ? showWaveform() : showMidi();
  }

  /// sets the instrument (color scheme)
  void setInstrument(String instrument) {
    container.classes.removeWhere((c) => c != "container");
    container.classes.add(instrument);
  }

  int noteToTrack(num note) {
    int n = note.round();
    int minNote = (trace == null || trace.minNote < 0) ? 0 : trace.minNote.round();
    int off = (n - minNote);
    return (tracks - (off % tracks)) - 1;
  }

  num noteToY(num note) {
    return noteToTrack(note) * trackHeight + rulerHeight;
  }

  num beatToX(num beat) {
    return beat * beatWidth;
  }

  num xToBeat(num x) {
    svg.Point p = container.createSvgPoint()..x = x;
    p = p.matrixTransform(container.getScreenCtm().inverse());
    return p.x / beatWidth;
  }


  /// move the playhead to the given location in beats
  num set playhead(num p) {
    _playhead = p;
    _renderPlayhead();

    // once through to clear highlights
    for (TraceEvent t in notes.keys) {
      if (p <= 0 || t.time > p || t.end < p) {
        if (notes[t].classes.contains("highlighted")) {
          notes[t].classes.remove("highlighted");
          if (_down) listener.onScrubLeave(t);
        }
      }
    }

    // once through to add highlights
    for (TraceEvent t in notes.keys) {
      if (p > 0 && t.time <= p && t.end > p) {
        if (!notes[t].classes.contains("highlighted")) {
          if (_down) listener.onScrubEnter(t);
          notes[t].classes.add("highlighted");
        }
      }
    }

    // auto scroll so that the playhead is always in view
    if (!_down && _scroll_root != null) {
      _scroll_root.scrollTo(beatToX(p) - width * 0.8, 0);
    }
  }

/**
 * Inject the timeline inside of a containing element
 */
  void insert(HtmlElement element) {

    // load the instrument template
    TemplateElement template = querySelector("#timeline-template");
    if (template == null || element == null) return;

    // create shadow DOM and append HTML template
    this.root = element.attachShadow({ "mode" : "open" });
    this.root.append(template.content.clone(true));

    // load the container <svg> element from the shadow dom
    this.container = root.querySelector("svg.container");
    this.container.append(parent);
    this._scroll_root = root.querySelector(".scroll-container");

    // listen for resize events
    window.onResize.listen((e) => _render());

    // render SVG content
    _render();
    _registerTouchEvents();
  }
  HtmlElement _scroll_root = null;


/**
 * Render the instrument as svg elements
 */
  void _render() {
    if (container == null) return;

    _resize();


    if (parent != null) parent.remove();

    parent = new svg.GElement();
    container.append(parent);

    //----------------------------------------------------
    // beat numbers in the header
    //----------------------------------------------------
    svg.GElement beatNumbers = new svg.GElement();
    svg.RectElement beatBacker = new svg.RectElement()
      ..attributes = {
        "class" : "ruler",
        "width": "$traceWidth",
        "height": "$rulerHeight",
        "x": "${beatToX(0)}",
        "y": "0"
      };
    beatNumbers.append(beatBacker);
    beatBacker.onMouseDown.listen((MouseEvent e) {
      _down = true;
      playhead = xToBeat(e.client.x);
      listener.onMovePlayhead(_playhead);
      _dragging = true;
    });

    for (int i=1; i <= beats; i++) {
      num x = beatToX(i - 1);
      svg.TextElement text = new svg.TextElement()
        ..attributes['class'] = "ruler-marks"
        ..attributes["x"] = "${(i == 1) ? x + 9 : x + 5}"
        ..attributes["y"] = "${rulerHeight / 2}";
      text.innerHtml = (i == 1) ? "BEAT" : "$i";
      beatNumbers.append(text);
      if (i == 1) continue;
      svg.LineElement line = new svg.LineElement() .. attributes = {
        "class" : "beat-line", "x1" : "${x}", "y1" : "0", "x2" : "${x}", "y2" : "$height"
      };
      beatNumbers.append(line);
    }

/*
      if ((i + 1) % 2 == 0) {
        text.innerHtml = ".";
      } else {
        text.innerHtml = (i == 0) ? "BEAT" : "${(i + 1) ~/ 2}";
      }
      beatNumbers.append(text);
    }
*/
    parent.append(beatNumbers);

    //----------------------------------------------------
    // draw notes
    //----------------------------------------------------
    if (trace != null && _midi) {
      notes.clear();
      for (TraceEvent t in trace.trace) {
        if (t.command == TraceEvent.PLAY) {
          notes[t] = _renderNote(t);
        }
      }
      notes.values.forEach((note) => parent.append(note));
    }

    //----------------------------------------------------
    // draw playhead
    //----------------------------------------------------
    parent.append(_playheadLine);
    _renderPlayhead();

    //----------------------------------------------------
    // render waveform
    //----------------------------------------------------
    if (_waveform == null) {
      _waveform = new svg.GElement();
      _renderWaveform();
    }
    if (!_midi) {
      parent.append(_waveform);
    } else {
      _waveform.remove();
    }
  }


  bool _down = false, _dragging = false;

  void _registerTouchEvents() {
    _playheadLine.onMouseDown.listen((MouseEvent e) {
      listener.onDragPlayheadStart(_playhead);
      _down = true;
    });
    container.onMouseMove.listen((MouseEvent e) {
      if (_down) {
        playhead = xToBeat(e.client.x);
        _dragging = true;
      }
    });

    container.onMouseUp.listen((MouseEvent e) {
      if (_down) {
        _down = false;
        listener.onDragPlayheadStop(_playhead);
      }
      _dragging = false;
    });

    ///while dragging the playhead, we might go out of the container
    document.onMouseUp.listen((MouseEvent e) {
      if (_down) {
        _down = false;
        listener.onDragPlayheadStop(_playhead);
      }
      _dragging = false;
    });
  }


  /**
   * Called when the window and possibly containing element are resized.
   */
  void _resize() {
    if (container != null) {
      DivElement scrollContainer = container.parent.parent;
      if (scrollContainer != null) {
        Rectangle<num> rect = scrollContainer.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        if (width == 0) width = 800;
        if (height == 0) height = 120;
        container.setAttribute("viewBox", "0 0 ${traceWidth} $height");
        container.parent.style.width = "${traceWidth - 2}px";
      }
    }
  }


  void _renderPlayhead() {
    num h = max(100, height);
    num rh = rulerHeight;
    num rh2 = rulerHeight - 5;
    num px = beatToX(_playhead);
    _playheadLine.setAttribute("d",
        "M ${px - 1} $h l 0 -${h - rh} l -6 -6 l 0 -$rh2 l 14 0 l 0 $rh2 l -6 6 l 0 $h Z");
    _playheadLine.setAttribute("class", "playhead");
  }


  /// create the rectangle representing the note as well as the associated tooltip
  /// and event handlers to preview the note.
  svg.SvgElement _renderNote(TraceEvent t) {
    svg.RectElement rect = new svg.RectElement()
      ..attributes = {
        "class": "timeline-note",
        "width": "${max(0, beatToX(t.duration) - 2)}",
        "height": "${trackHeight - 2}",
        "x": "${beatToX(t.time)}",
        "y": "${noteToY(t.note.note) + 1}"
      };
    String tt = (t.note.note is int)
        ? "${t.note.note}"
        : "${t.note.note.toStringAsFixed(2)}";

    // on mouse over, preview the note
    rect.onMouseEnter.listen((e) {
      if (!_down) {
        listener.onHoverEnter(t);
        DivElement hint =  root.querySelector("#note-hint");
        String acc = t.note.accidental;
        if (acc == "") acc = "&nbsp;";
        if (hint != null) {
          hint.querySelector(".note-name").innerHtml = "${t.note.name.substring(0,1)}";
          hint.querySelector(".accidental").innerHtml = "$acc";
          hint.querySelector(".octave").innerHtml = "${t.note.octave - 1}";
          hint.querySelector(".note-info").innerHtml = "Note $tt";
          if (t.hasParam("line")) hint.querySelector(".note-info").innerHtml += " (line ${t['line']})";
          hint.classes.add("show");
        }
      }
    });

    rect.onMouseLeave.listen((e) {
      root.querySelectorAll("#note-hint").classes.remove("show");
      listener.onHoverLeave(t);
    });

    rect.onMouseDown.listen((e) { listener.onClickNote(t); });
    rect.onMouseUp.listen((e) { listener.onReleaseNote(t); });
    return rect;
  }


  /// creates a path that visualizes the waveform
  void _renderWaveform() async {
/*
    if (_rendering) return;
    _rendering = true;
    svg.GElement spinner = null;
    if (!_midi) {
      spinner = new svg.GElement()
        ..attributes = {
          "class": "timeline-spinner",
          "transform": "translate(100, ${rulerHeight + scoreHeight / 2})"
        };
      for (int i = 0; i < 5; i++) {
        spinner.append(new svg.PathElement()
          ..attributes = {"d": "M ${i * 10} -25 l 0 50"});
      }
      parent.append(spinner);
    }
    Waveform waveform = await instrument.generateWaveform(w ~/ 2);
    svg.PathElement path = waveform.generateSvg();
    path.classes.add("timeline-waveform");

    num scaleX = w / waveform.slices;
    _waveform.setAttribute("transform",
        "translate(2, ${rulerHeight + scoreHeight / 2}), scale($scaleX, ${scoreHeight / 2})");
    _waveform.append(path);
    if (spinner != null) {
      spinner.remove();
    }
    _rendering = false;
*/
  }

  bool _rendering = false;

}
