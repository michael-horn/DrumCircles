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


class PythonCell extends DataModel with
  PythonListener,
  CodeMirrorListener,
  TimelineListener,
  ClockSubscriber,
  Metronome {

  /// link to the datastore interface
  Datastore datastore;

  /// stores state of user options (e.g. which components are visible)
  Map settings = { };

  /// MIDI note timeline view
  Timeline timeline;

  /// codemirror editor
  CodeMirror editor;

  ///compiler to convert python code into trace objects
  PythonCompiler compiler;

  /// synthesizer to generate and schedule notes
  SchedulerSynth synth = new SchedulerSynth();

  /// synthesizer to generate metronome ticks
  Synthesizer metronome = new Synthesizer();

  /// visual interactive instrument
  Instrument instrument = new Piano();

  /// used to convert instrument playing into python code (MCC)
  NoteRecorder recorder;

  /// template for the cell is embedded inside of a shadow DOM
  DivElement root;

  /// centralized clock for all cells
  PlayClock clock;

  /// beat count for this cell
  num beats = 4;

  /// duration in seconds for this cell
  num get duration => beats * 60 / clock.bpm;

  /// Python code line count
  int get lineCount => (editor.getCode().split('\n').length);

  /// author of this track
  String get author => datastore.user != null ? datastore.user.name : "Anonymous";

  /// user id
  String get uid => datastore.user != null ? datastore.user.uid : "";

  /// short description of this track
  String get description => toStr(settings['description'], "");

  /// master gain level for this cell/track
  num _gain = 1.0;
  GainNode _gainNode = null;
  num get gain => _gain;
  num set gain(g) {
    _gain = g.clamp(0.0, 3.5);
    if (_gainNode != null) { _gainNode.gain.value = _gain; }
    return _gain;
  }

  /// master stereo pan setting for this cell/track
  num _pan = 0.0;
  StereoPannerNode _panNode = null;
  num get pan => _pan;
  num set pan(p) {
    _pan = p.clamp(-1.0, 1.0);
    if (_panNode != null) { _panNode.pan.value = _pan; }
    return _pan;
  }

  /// has this been shared with other tunepad users?
  bool get isPublic => toBool(settings['public'], false);

  /// python boilerplate code passed to the compiler
  static String boilerplate;

  /// trace object stores compiled music
  Trace trace = new Trace();

  /// listens for MIDI input and sends output to MIDI devices
  MIDIManager midi = new MIDIManager();

  /// is there currently a compile error
  bool get hasError => (root != null && root.classes.contains("error"));


  static final Map DEFAULT_SETTINGS = {
    "name" : "New Track",
    "author" : "Anonymous",
    "description" : "",
    "beats" : 4,
    "tempo" : 120,
    "meter" : "4/4",
    "lines" : 1,
    "key" : "C major",
    "voice" : "piano",
    "instrument" : "piano",
    "show-timeline" : true,
    "show-editor" : true,
    "show-instrument" : true,
    "show-output" : false,
    "midi-input" : false,
    "midi-output" : false,
    "gain" : 1.0,
    "pan" : 0.0,
    "public" : false
  };


  PythonCell(dynamic id, this.datastore, this.clock, HtmlElement container) : super(id) {

    //---------------------------------------------------------------
    // load the template and create the container element
    //---------------------------------------------------------------
    TemplateElement template = querySelector("#gadget-template");
    if (template == null) return;
    this.root = new DivElement()
      .. id = "gadget-$id"
      .. className = "gadget-container";
    this.root.append(template.content.clone(true));
    container.append(root);


    //---------------------------------------------------------------
    // create the codemirror editor and connect it to firebase
    //---------------------------------------------------------------
    editor = new CodeMirror(this, "#gadget-$id .python-editor");
    editor.initialize();
    editor.connectFirepad("${datastore.root}/cells/$id");


    //---------------------------------------------------------------
    // setup the timeline component
    //---------------------------------------------------------------
    timeline = new Timeline(this);
    timeline.insert(root.querySelector(".timeline-container"));


    //---------------------------------------------------------------
    // setup the python compiler
    //---------------------------------------------------------------
    compiler = new PythonCompiler(this);


    //---------------------------------------------------------------
    // listen for datastore update events
    //---------------------------------------------------------------
    this.settings = DEFAULT_SETTINGS;
    datastore.addUpdateCallback(this, load);
    datastore.addRemovedCallback(this, (data) { });

    //---------------------------------------------------------------
    // converts manual instrument playing to python code
    //---------------------------------------------------------------
    this.recorder = new NoteRecorder(clock);

    //---------------------------------------------------------------
    // listen for midi events
    //---------------------------------------------------------------
    //midi.onStateChange.listen((MIDIEvent e) { print(e); });
    midi.onMessage.listen((MIDIEvent e) {
      if (instrument.isMidiArmed(e.port)) {
        if (e.command == 9 && e.velocity > 0) {
          instrument.noteOn(e.note, e.velocity);
          recorder.noteOn(e.note, e.velocity);
          if (clock.context != null) {
            synth.playNote(new Note(e.note) .. velocity = e.velocity, clock.context.destination);
          }
        } else if (e.command == 8 || (e.command == 9 && e.velocity == 0)) {
          instrument.noteOff(e.note);
          recorder.noteOff(e.note);
          synth.releaseNote(new Note(e.note));
        } else if (e.command == 14) {
          num val = ((e.velocity * 128 + e.note) - 8192) / 8192;
          synth.pitchBend(val);
        }
        if (recorder.isRecording) { updateRecording(); }
      }
    });


    //---------------------------------------------------------------
    // bring the instrument into or out of focus
    //---------------------------------------------------------------
    root.querySelectorAll(".instrument-container").onMouseDown.listen((e) {
      instrument.armKeyboard();
      instrument.showKeyboardHints();
      root.querySelectorAll(".instrument-container").classes.add("armed");
    });
    root.querySelectorAll(".instrument-container").onBlur.listen((e) {
      instrument.disarmKeyboard();
      instrument.hideKeyboardHints();
      root.querySelectorAll(".instrument-container").classes.remove("armed");
    });

    //---------------------------------------------------------------
    // button toolbar
    //---------------------------------------------------------------
    root.querySelectorAll(".play-button").onClick.listen((e) { play(); });
    root.querySelectorAll(".pause-button").onClick.listen((e) { pause(); });
    root.querySelectorAll(".step-button").onClick.listen((e) { step(); });
    root.querySelectorAll(".record-button").onClick.listen((e) { startRecording(); });

    //---------------------------------------------------------------
    // recording pad toolbar
    //---------------------------------------------------------------
    root.querySelectorAll(".stop-button").onClick.listen((e) { stopRecording(); });
    root.querySelectorAll(".clear-button").onClick.listen((e) { clearRecording(); });
    root.querySelectorAll(".copy-button").onClick.listen((e) { copyRecording(); });
    root.querySelectorAll(".quant-button").onClick.listen((e) { toggleQuantize(); });
    root.querySelectorAll(".record-close-button").onClick.listen((e) {
      root.querySelectorAll(".recording-container").classes.add('hidden');
      stopRecording();
    });
    root.querySelectorAll(".metronome-button").onClick.listen((e) { toggleMetronome(); });

    root.querySelectorAll(".voice-selector").onMouseDown.listen((e) {
      toggleContextMenu(root.querySelector(".voice-selector .context-menu"));
      e.stopPropagation();
    });
    root.querySelectorAll(".voice-menu .menu-item").onMouseDown.listen((e) {
      settings['voice'] = (e.currentTarget as HtmlElement).dataset['voice'];
      settings['instrument'] = (e.currentTarget as HtmlElement).dataset['instrument'];
      datastore.save(this);
    });

    //---------------------------------------------------------------
    // name field
    //---------------------------------------------------------------
    root.querySelectorAll(".gadget-name").onBlur.listen((e) {
      InputElement nameField = root.querySelector(".gadget-name");
      if (nameField != null) {
        this.name = nameField.value;
        datastore.save(this);
      }
    });
    root.querySelectorAll(".gadget-name").onKeyPress.listen((e) {
      if (e.keyCode == 13) {  // user presses ENTER or RETURN
        root.querySelector(".gadget-name").blur();
      }
    });

    //---------------------------------------------------------------
    // show the output window when you click on the hint
    //---------------------------------------------------------------
    root.querySelectorAll(".output-hint").onMouseDown.listen((e) {
      _showElement('output');
      datastore.save(this);
    });

    root.querySelectorAll(".output-container .close-button").onClick.listen((e) {
      _hideElement('output');
      datastore.save(this);
    });

    //---------------------------------------------------------------
    // cell menu
    //---------------------------------------------------------------
    root.querySelectorAll(".menu-button").onMouseDown.listen((e) async {
      e.stopPropagation();
      toggleContextMenu(root.querySelector(".menu-button .context-menu"));
    });

    root.querySelectorAll(".menu-button .menu-item").onMouseDown.listen((e) async {
      e.stopPropagation();
      HtmlElement menu = (e.currentTarget as HtmlElement);
      if (menu != null) _doContextMenu(menu);
      toggleContextMenu(root.querySelector(".menu-button .context-menu"));
    });
  }


  void initAudio() {
    this.clock.addSubscriber(this);
    setVoice(settings['voice'], settings['instrument']);
    metronome.loadPatch('metronome', patches['metronome'], clock.context);
  }


  void load(Map data) {
    this.name = data['name'];
    this.created = toDateTime(data['created']);
    this.modified = toDateTime(data['modified']);
    this.pan = toNum(data['pan'], 0.0);
    this.gain = toNum(data['gain'], 1.0);
    _setName(name);
    _setElementState("timeline", toBool(data['show-timeline']));
    _setElementState("editor", toBool(data['show-editor']));
    _setElementState("instrument", toBool(data['show-instrument']));
    _setElementState("output", toBool(data['show-output']));
    _setMidiInput(toBool(data['midi-input']));
    _setMidiOutput(toBool(data['midi-output']));
    setVoice(data['voice'], data['instrument']);
    this.settings = data;
    if (toBool(settings['cloned'], false)) {
      editor.setCode(settings['code']);
      settings['cloned'] = false;
    }
  }


  Map save() {
    settings['id'] = id;
    settings['name'] = name;
    settings['author'] = author;
    settings['code'] = editor.getCode();
    settings['uid'] = uid;
    settings['description'] = description;
    settings['beats'] = beats;
    settings['tempo'] = clock.bpm;
    settings['meter'] = clock.meter;
    settings['key'] = clock.key;
    settings['lines'] = lineCount;
    settings['pan'] = pan;
    settings['gain'] = gain;
    settings['created'] = created.toString();
    settings['modified'] = modified.toString();
    return new Map.from(settings);
  }


/**
 * user made a change to the code
 */
  void onProgramUpdate(Map change) { }


/**
 * adjusted the cursor position
 */
  void onCursorActivity(Map position) {
    int line = position['line'];
    if (editor.isDirty && line != _lastline) {
      compile();
    }
    _lastline = line;
  }
  int _lastline = 0;


/**
 *  user added a newline to the program
 */
  void onLineAdded(Map change) {
    compile();
  }


/**
 * user deleted a line from the program
 */
  void onLineRemoved(Map change) {
    compile();
  }


/**
 * editor window lost focus
 */
  void onEditorBlur() { }


/**
 * Invoke the python compiler
 */
  void compile([ bool runWhenDone = false ]) async {
    if (PythonCell.boilerplate == null) {
      PythonCell.boilerplate = await
      HttpRequest.getString("packages/compiler/python/boilerplate.py");
    }

    if (!compiler.isCompiling) {
      editor.clearErrorMarkers();
      editor.clearTraceMarkers();
      editor.clean();
      root.querySelectorAll(".error-container").classes.add("hidden");
      querySelectorAll("#cell-nav-$id .shortcut-error").classes.add('hidden');
      root.classes.remove("error");
      String code = editor.getCode();
      if (code == null) return;
      bool success = await compiler.compile(code);
      _updateGadgetInfo(editor.getCode().split('\n').length);
      if (runWhenDone && success) {
        play();
      }
    }
  }


/**
 * Python has finished compiling with either success or error
 */
  void onPythonDone(List outputs) {
    int out_count = 0;
    root.querySelectorAll(".output-hint").classes.remove("visible");
    PreElement out = root.querySelector(".output");
    if (out != null) out.innerHtml = "--- PYTHON OUTPUT ---\n";
    trace.clear();

    for (var output in outputs) {
      if (output != null && output is String) {
        if (output.startsWith("**TRACE**")) {
          trace.addEvent(output.substring(9));
        } else if (output.trim() != '') {
          trace.addPrint(output);
          out.innerHtml += output + "\n";
          out_count++;
        }
      }
    }

    beats = clock.beatsPerMeasure * (trace.beats / clock.beatsPerMeasure).ceil();
    if (beats <= 0) beats = clock.beatsPerMeasure;
    timeline.setTrace(trace, beats);

    if (out_count > 0) {
      root.querySelectorAll(".output-hint").classes.add("visible");
      root.querySelector(".output-count").innerHtml = "$out_count";
      new Timer(const Duration(seconds : 3), () {
        root.querySelectorAll(".output-hint").classes.remove("visible");
      });
    }
    datastore.save(this);
  }


/**
 * Python generated an error message
 */
  void onPythonError(String name, String message, String details, int line) {
    Element name_el = root.querySelector(".error-name");
    Element desc_el = root.querySelector(".error-description");
    if (name_el != null && desc_el != null) {
      name_el.innerHtml = name;
      desc_el.innerHtml = message;
      if (line > 0) desc_el.innerHtml += " on line $line.";
      if (details != null && details != "") desc_el.innerHtml += "<br>$details";
      root.querySelectorAll(".error-container").classes.remove("hidden");
      root.classes.add("error");
      querySelectorAll("#cell-nav-$id .shortcut-error").classes.remove('hidden');
    }
    if (line > 0) {
      editor.setErrorMarker(line);
    }
  }


/**
 * Is audio playback happening?
 */
  bool get isPlaying => (clock.isPlaying(this));


/**
 * Toggle play/pause
 */
  void playPause() {
    isPlaying ? pause() : play();
  }


/**
 * Run python code and start audio playback
 */
  void play() {
    if (editor.isDirty) {
      compile(true);
    } else if (clock.context != null) {
      root.querySelectorAll(".play-button").classes.add('hidden');
      root.querySelectorAll(".pause-button").classes.remove('hidden');
      querySelectorAll("#cell-nav-$id .shortcut-play-button").classes.add('hidden');
      querySelectorAll("#cell-nav-$id .shortcut-pause-button").classes.remove('hidden');
      querySelectorAll("#mixer-$id .mixer-play-button").classes.add('hidden');
      querySelectorAll("#mixer-$id .mixer-pause-button").classes.remove('hidden');
      if (!isPlaying) {
        _gainNode = clock.context.createGain();
        _gainNode.gain.value = gain;
        _panNode = clock.context.createStereoPanner();
        _panNode.pan.value = pan;
        _panNode.connectNode(_gainNode);
        _gainNode.connectNode(clock.context.destination);
        synth.setTempo(clock.bpm);
        clock.play(this);
        num b = (clock.beats % beats);
        synth.scheduleNotes(trace, _panNode, offset : b);
        _looped = false;
        _lastTime = -1;
        window.animationFrame.then(animate);
      }
    }
    trace.restart();
  }


/**
 * Pause playback
 */
  void pause() {
    _pauseHelper();
    clock.pause(this);
  }


/**
 * Stop playback
 */
  void stop() {
    _pauseHelper();
    _lastTrace = null;
    trace.restart();
    if (timeline != null) timeline.playhead = 0;
  }


  void _pauseHelper() {
    root.querySelectorAll(".play-button").classes.remove('hidden');
    root.querySelectorAll(".pause-button").classes.add('hidden');
    querySelectorAll("#cell-nav-$id .shortcut-play-button").classes.remove('hidden');
    querySelectorAll("#cell-nav-$id .shortcut-pause-button").classes.add('hidden');
    querySelectorAll("#mixer-$id .mixer-play-button").classes.remove('hidden');
    querySelectorAll("#mixer-$id .mixer-pause-button").classes.add('hidden');
    if (_gainNode != null) {
      _gainNode.disconnect();
      _gainNode = null;
    }
    if (_panNode != null) {
      _panNode.disconnect();
      _panNode = null;
    }
    synth.cancelAllNotes();
    instrument.allNotesOff();
  }

/**
 * Toggle recording
 */
  void startRecording() {
    root.querySelectorAll(".recording-container").classes.remove('hidden');
    root.classes.add("recording");
    if (!recorder.isRecording) {
      recorder.record();
    }
  }

  void stopRecording() {
    root.classes.remove("recording");
    stopMetronome();
    if (recorder.isRecording) { recorder.stop(); }
  }

  void clearRecording() {
    PreElement output = root.querySelector(".recording-pad");
    if (output != null) output.innerHtml = "# RECORDING PAD\n";
  }

  void copyRecording() {
    PreElement output = root.querySelector(".recording-pad");
    if (output != null) {
      window.navigator.clipboard.writeText(output.innerHtml);
    }
  }

  void updateRecording() {
    if (recorder.isRecording) {
      PreElement output = root.querySelector(".recording-pad");
      if (output != null) {
        output.innerHtml = recorder.toString();
        output.scrollTop = output.scrollHeight;
      }
    }
  }

  void toggleQuantize() {
    if (recorder.quantize) {
      root.querySelectorAll(".quant-button i.fas").classes.remove("fa-check");
    } else {
      root.querySelectorAll(".quant-button i.fas").classes.add("fa-check");
    }
    recorder.quantize = !recorder.quantize;
  }


/**
 * Step forward one trace event
 */
  void step() {

    // stop all of the other instruments
    TraceEvent t = _lastTrace;
    clock.stopAll();
    _lastTrace = t;

    // automatically fast-forward to the playhead to the last pause point
    if (_lastTrace != null) {
      editor.setTraceMarker(_lastTrace['line']);
      timeline.playhead = _lastTrace.time;
      trace.advanceToEvent(_lastTrace);
    }

    // advance until we get to the next line trace event
    Trace subtrace = new Trace();
    TraceEvent e = trace.advance();
    num advance = 0.0;
    while (e != null && e.command != TraceEvent.TRACE) {
      subtrace.trace.add(e);
      advance = max(advance, e.duration);
      e = trace.advance();
    }

    // play audio between this trace event and the previous
    if (e != null && e.command == TraceEvent.TRACE) {
      if (clock.context != null) {
        synth.scheduleNotes(subtrace, clock.context.destination, offset : e.time);
      }
      timeline.playhead = e.time + advance - 0.01;
      editor.setTraceMarker(e['line']);
      _lastTrace = e;
    }

    //---------------------------------------------------
    // restart if done
    //---------------------------------------------------
    else {
      trace.restart();
      timeline.playhead = 0;
      _lastTrace = null;
    }
  }
  TraceEvent _lastTrace = null;


/**
 * Main animation / draw loop. This is separate from audio loop and runs
 * on the window.animationFrame timer.
 */
  num _lastTime = -1;
  bool _looped = false;

  void animate(num t) {
    if (isPlaying && clock.context != null) {
      num current = (clock.beats % beats);
      num remaining = beats - current;

      if (current < _lastTime) {
        if (!_looped) {
          synth.scheduleNotes(trace, _panNode, offset : current);
        }
        _lastTime = -1;
        _looped = false;
        instrument.allNotesOff();
      }

      // less than a 8th note left? loop around
      else if (remaining > 0 && remaining < 0.5 && !_looped) {
        synth.scheduleNotes(trace, _panNode, delay : remaining);
        _looped = true;
      }

      for (TraceEvent e in trace.trace) {
        if (e.time > _lastTime && e.time <= current) {
          if (e.command == TraceEvent.TRACE) {
            //editor.setTraceMarker(e['line']);
            _lastTrace = e;
          }
        }

        if (e.command == TraceEvent.PLAY) {
          if (e.time <= current && e.end > current) {
            if (!instrument.isNoteOn(e.note.note)) instrument.noteOn(e.note.note);
          }
          else if (e.time <= _lastTime && e.end > _lastTime) {
            instrument.noteOff(e.note.note);
          }
          else if (_looped) {
            instrument.noteOff(e.note.note);
          }
        }
      }

      timeline.playhead = current;
      _lastTime = current;

      // trigger next animation frame
      window.animationFrame.then(animate);
    }
  }


/**
 * changes the instrument voice
 */
  void setVoice(String voice, String instr) async {
    if (instr == null) instr = "piano";
    root.querySelectorAll(".voice-menu i.fas").classes.remove("fa-check");
    root.querySelectorAll(".voice-menu .menu-item[data-voice='$voice'] .fas").classes.add("fa-check");
    if (clock.context != null && synth.voice != voice) {
      root.querySelector(".voice-name").innerHtml = "Loading...";
      pause();
      if (patches[voice] is Map) {
        await synth.loadPatch(voice, patches[voice], clock.context);
        root.querySelector(".voice-name").innerHtml = voice.toUpperCase();
      }
    } else {
      root.querySelector(".voice-name").innerHtml = voice.toUpperCase();
    }
    _setInstrument(voice, instr);
  }


/**
 * Changes the instrument type
 */
  void _setInstrument(String voice, String instr) {
    DivElement container = root.querySelector(".instrument-container");
    if (container == null) return;
    Instrument old = null;

    if (instr == "drums") {
      if (instrument is! Drums) {
        old = instrument;
        this.instrument = new Drums(patches[voice]);
      }
    }
    else if (instr == "drumkit") {
      if (instrument is! DrumKit) {
        old = instrument;
        this.instrument = new DrumKit("#gadget-$id", patches[voice]);
      }
    }
    else if (instrument is! Piano || !instrument.isInitialized) {
      old = instrument;
      this.instrument = new Piano();
    }

    root.querySelectorAll('.gadget-icon').classes.removeWhere((item) => item != "gadget-icon");
    root.querySelectorAll('.gadget-icon').classes.add(instr);
    if (timeline != null) timeline.setInstrument(instr);

    if (old != null) {
      old.unload();
      this.instrument.insert(container);

      _setMidiInput(toBool(settings['midi-input']));
      instrument.onNoteEvent.listen((NoteEvent e) {
        bool out = settings['midi-output'];
        //bool fromMidi = (e.source == NoteEvent.INPUT_MIDI);
        if (e.message == NoteEvent.NOTE_ON && clock.context != null) {
          if (out) midi.sendNoteOn(e.midi, e.velocity);
          recorder.noteOn(e.midi, e.velocity);
          synth.playNote(new Note(e.midi) .. velocity = e.velocity, clock.context.destination);
        }
        else if (e.message == NoteEvent.NOTE_OFF && clock.context != null) {
          if (out) midi.sendNoteOff(e.midi);
          recorder.noteOff(e.midi);
          synth.releaseNote(new Note(e.midi));
        }
        if (recorder.isRecording) { updateRecording(); }
      });
    }
  }


/**
 * called whenever the master clock tempo changes
 */
  void onTempoChange() {
    if (isPlaying) {
      num b = (clock.beats % beats);
      synth.setTempo(clock.bpm);
      //pgadget.setTempo(clock.bpm, b, clock.compressor);
      //if (_looped) _looped = false;
    }
    metronome.cancelAllNotes();
  }


/**
 * Called whenever the time signature is changed
 */
  void onTimeSignatureChange() {
    stop();
    compile();
    metronome.cancelAllNotes();
  }


/**
 * called whenever restart is called by any instrument
 */
  void onClockReset() {
    stop();
  }


/**
 * called whenever the playhead is manually adjusted on any instrument
 */
  void onClockTimeChange() {
    stop();
    pause();
    if (timeline != null) timeline.playhead = (clock.beats % beats);
  }

/**
 * Metronome clock pulse
 */
  void pulse(int beat) {
    if (clock.context != null) {
      root.querySelectorAll(".metronome-button").classes.toggle("tock");
      metronome.setTempo(clock.bpm);
      if (beat == 0) {
        for (int i=0; i<clock.beatsPerMeasure; i++) {
          Note n = (i == 0) ? new Note(24) : new Note(20);
          metronome.scheduleNote(n, clock.context.destination, i);
        }
      }
    }
  }

  void startMetronome() {
    if (!clock.isMetronomePlaying(this)) {
      root.querySelectorAll(".metronome-button").classes.add('playing');
      clock.startMetronome(this);
    }
  }

  void stopMetronome() {
    if (clock.isMetronomePlaying(this)) {
      root.querySelectorAll(".metronome-button").classes.remove('playing');
      clock.stopMetronome(this);
      metronome.cancelAllNotes();
    }
  }

  void toggleMetronome() {
    if (clock.isMetronomePlaying(this)) {
      stopMetronome();
    } else {
      startMetronome();
    }
  }


  /// subclasses override to provide boilerplate python code
  String getBoilerplate() {
    return (boilerplate == null) ? "" : boilerplate;
  }


/**
 * Fired as the user drags the playhead over the timeline
 */
  void onScrubEnter(TraceEvent e) {
    if (e.hasParam("line")) {
      editor.setTraceMarker(e['line']);
    }
    if (clock.context != null) {
      synth.playNote(e.note, clock.context.destination);
    }
    instrument.noteOn(e.note.note);
  }

  void onScrubLeave(TraceEvent e) {
    editor.clearTraceMarkers();
    synth.releaseNote(e.note);
    instrument.noteOff(e.note.note);
  }

/**
 * Mouse hovers over a note on the timeline
 */
  void onHoverEnter(TraceEvent e) {
    if (e.hasParam("line")) {
      editor.setTraceMarker(e['line']);
    }
  }
  void onHoverLeave(TraceEvent e) {
    editor.clearTraceMarkers();
    synth.releaseNote(e.note);
  }

/**
 * User clicks on a note on the timeline
 */
  void onClickNote(TraceEvent e) {
    if (clock.context != null) {
      synth.playNote(e.note, clock.context.destination);
    }
    if (e.hasParam("line")) {
      editor.setTraceMarker(e['line']);
    }
    instrument.noteOn(e.note.note);
  }
  void onReleaseNote(TraceEvent e) {
    synth.releaseNote(e.note);
    instrument.noteOff(e.note.note);
  }

/**
 * User clicks on the ruler to move playhead
 */
  void onMovePlayhead(num playhead) {
    pause();
    _lastTrace = trace.advanceToBeat(playhead);
  }

/**
 * User starts dragging the playhead
 */
  void onDragPlayheadStart(num playhead) {
    pause();
  }

/**
 * User stops dragging the playhead
 */
  void onDragPlayheadStop(num playhead) {
    pause();
    synth.releaseAllNotes();
    _lastTrace = trace.advanceToBeat(playhead);
    clock.setTime(playhead);
  }


/**
 * Export MIDI file
 */
  void _exportMidi() {
    if (clock.context == null) return;
    Blob blob = midi.exportMidi(clock.bpm, trace.toJSON());
    if (blob != null) {
      String objectUrl = Url.createObjectUrlFromBlob(blob);
      AnchorElement link = new AnchorElement();
      link.href = objectUrl;
      link.download = "tunepad-$name.midi";
      link.click();
      Url.revokeObjectUrl(objectUrl);
    }
  }


/**
 * Export audio file (format is one of "wav" or "mp3")
 */
  void _downloadAudio(String format) async {
    GrowableAudioBuffer processed = await _exportAudio(format);
    if (processed == null) return;
    if (format == "mp3") {
      processed.downloadMP3("tunepad-$name.mp3");
    } else {
      processed.downloadWAV("tunepad-$name.wav");
    }
  }


  Future<GrowableAudioBuffer> _exportAudio(String format) async {
    if (clock.context == null) return null;
    pause();
    AudioContext context = clock.context;
    GrowableAudioBuffer processed = new GrowableAudioBuffer(2);
    GainNode gain = context.createGain() .. gain.value = 0.0; // mute while exporting
    ScriptProcessorNode recorder = context.createScriptProcessor(1024, 2, 2);
    recorder.connectNode(gain);
    gain.connectNode(context.destination);

    synth.setTempo(clock.bpm);
    num total_length = beats * 60 / clock.bpm;
    _showProgressDialog("Exporting audio data...");
    _setProgressStatus("0%");

    synth.scheduleNotes(trace, recorder);

    await for (AudioProcessingEvent e in recorder.onAudioProcess) {
//    recorder.onAudioProcess.listen((AudioProcessingEvent e) {
      // record audio
      processed.append(e.inputBuffer);

      // audio passes through unaltered
      for (int c=0; c<e.inputBuffer.numberOfChannels; c++) {
        Float32List src = e.inputBuffer.getChannelData(c);
        e.outputBuffer.copyToChannel(src, c, 0);
      }

      if (!synth.isPlaying) {
        gain.disconnect();
        recorder.disconnect();
        gain = null;
        recorder = null;
        _hideProgressDialog();
        return processed;
      }
      else {
        num progress = min(1.0, (processed.duration / total_length));
        _setProgressStatus("${(progress * 100).round()}%");
      }
    }
  }


  void _showProgressDialog(String message) {
    DivElement dialog = Dialog.openModal("#export-dialog-template");
    if (dialog != null) {
      Element m = dialog.querySelector(".progress-status");
      if (m != null) m.innerHtml = message;
    }
  }

  void _hideProgressDialog() {
    Dialog.closeModal();
  }

  void _setProgressStatus(String status) {
    HtmlElement m = querySelector(".progress-dialog .progress-status");
    if (m != null) m.innerHtml = status;
  }

  void _setName(String name) {
    InputElement nameField = root.querySelector(".gadget-name");
    if (nameField != null) nameField.value = name;
  }

  void _showElement(String name) {
    root.querySelectorAll(".$name-container").classes.remove("hidden");
    root.querySelectorAll(".menu-item[data-command='show-$name'] i.fas").classes.add("fa-check");
    settings['show-$name'] = true;
  }

  void _hideElement(String name) {
    root.querySelectorAll(".$name-container").classes.add("hidden");
    root.querySelectorAll(".menu-item[data-command='show-$name'] i.fas").classes.remove("fa-check");
    settings['show-$name'] = false;
  }

  bool _isElementHidden(String name) {
    return root.querySelectorAll(".$name-container").classes.contains("hidden");
  }

  void _toggleElement(String name) {
    _isElementHidden(name) ? _showElement(name) : _hideElement(name);
  }

  void _setElementState(String name, bool visible) {
    visible ? _showElement(name) : _hideElement(name);
  }

  void _toggleMidiInput() {
    _setMidiInput(! instrument.isMidiArmed());
  }

  void _toggleMidiOutput() {
    _setMidiOutput(!settings['midi-output']);
  }

  void _setMidiInput(bool armed) {
    if (armed) {
      root.querySelectorAll(".menu-item[data-command='midi-input'] i.fas").classes.add("fa-check");
      instrument.armMidi();
    } else {
      root.querySelectorAll(".menu-item[data-command='midi-input'] i.fas").classes.remove("fa-check");
      instrument.disarmMidi();
    }
    this.settings['midi-input'] = armed;
  }

  void _setMidiOutput(bool armed) {
    this.settings['midi-output'] = armed;
    if (armed) {
      root.querySelectorAll(".menu-item[data-command='midi-output'] i.fas").classes.add("fa-check");
    } else {
      root.querySelectorAll(".menu-item[data-command='midi-output'] i.fas").classes.remove("fa-check");
    }
  }


  void _shareTrack() {
    if (datastore.isAnonymous) {
      DivElement dialog = Dialog.openModal("#share-login-dialog");
      if (dialog != null) {
        dialog.querySelectorAll(".confirm-button").onClick.listen((e) {
          Dialog.closeModal();
          UserAccounts.login(datastore);
        });
      }
    } else {
      DivElement dialog = Dialog.openModal("#share-dialog", {
        ".track-name" : name,
        ".track-author" : datastore.user.name,
        ".track-duration" : "${beats} beats (${(beats * 60 / clock.bpm).toStringAsFixed(1)} seconds)",
        ".track-tempo" : "${clock.bpm} bpm",
        ".track-meter" : "${clock.meter} time",
        ".track-key" : "${clock.key}",
        ".track-code" : "${lineCount} lines of code",
        ".track-description textarea" : description
      });
      dialog.querySelectorAll(".gadget-icon").classes.add(settings['instrument']);
      dialog.querySelectorAll(".confirm-button").onClick.listen((e) async {
        TextAreaElement text = dialog.querySelector(".track-description textarea");
        if (text != null) settings['description'] = text.value;
        settings['public'] = true;
        Dialog.closeModal();
        GrowableAudioBuffer processed = await _exportAudio('mp3');
        if (processed != null) {
          try {
            await datastore.publishTrack(this, processed.toMP3Base64());
            Dialog.message("Thanks for sharing <b>$name</b>!<br>You can now see your track in the TunePad library.");
          } catch(e) {
            Dialog.message("There was a problem publishing your track<br>in the TunePad library.");
          }
        }
      });
    }
  }


  void _doContextMenu(HtmlElement menu) {
    String command = menu.dataset['command'];
    switch (command) {
      case 'delete-track':
        new Timer(const Duration(milliseconds : 200), () {
          if (window.confirm("Are you sure you want to delete this track?")) {
            datastore.remove(this);
            pause();
            root.remove();
          }
        });
        return;
      case 'clone-track': datastore.clonePythonCell(save()); return;
      case 'show-instrument': _toggleElement("instrument"); break;
      case 'show-timeline': _toggleElement("timeline"); break;
      case 'show-editor': _toggleElement("editor"); break;
      case 'show-output': _toggleElement("output"); break;

      case 'note-hints': instrument.toggleNoteHints(); break;
      case 'midi-hints': instrument.toggleMidiHints(); break;
      case 'keyb-hints': instrument.toggleKeyboardHints(); break;

      case 'export-wav': _downloadAudio("wav"); return;
      case 'export-mp3': _downloadAudio("mp3"); return;
      case 'export-midi': _exportMidi(); return;

      case 'midi-input': _toggleMidiInput(); break;
      case 'midi-output': _toggleMidiOutput(); break;
      case 'share': _shareTrack(); break;
    }
    datastore.save(this);
  }


  void _updateGadgetInfo(int count) {
    DivElement div = root.querySelector(".gadget-info");
    if (div != null) div.innerHtml = "$beats BEATS &mdash; $count LINES";
  }
}




void toggleContextMenu(Element menu) {
  if (menu != null) {
    querySelectorAll(".context-menu").forEach((m) { if (menu != m) m.classes.add("hidden"); });
    menu.classes.toggle('hidden');
  }
}
