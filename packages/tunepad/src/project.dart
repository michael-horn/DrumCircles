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


class Project extends DataModel with ClockSubscriber {

  /// link to the datastore interface
  Datastore datastore;

  /// centralized clock for all cells
  PlayClock clock = new PlayClock();

  /// beats per minutes
  int get bpm => (clock == null) ? 120 : clock.bpm;

  /// time signature
  String get meter => (clock == null) ? "4/4" : clock.meter;

  /// musical key
  String get key => (clock == null) ? "C major" : clock.key;

  /// beat count for the project
  num get beats => (clock == null) ? 0 : clock.beats;

  /// list of cells in this project
  List<PythonCell> cells = new List<PythonCell>();


  Project(dynamic id, this.datastore) : super(id) {
    this.name = "TunePad Riff";
    datastore.addUpdateCallback(this, load);

    /// init the audio system first time the user clicks on something
    document.onMouseDown.first.then((e) {
      this.clock.context = new AudioContext();
      this.clock.addSubscriber(this);
      cells.forEach((cell) { cell.initAudio(); });
    });

    _registerEvents();
  }


  bool get isPlaying => !clock.isPaused;


  void playAll() {
    querySelectorAll("#transport-pause-button").classes.remove('hidden');
    querySelectorAll("#transport-play-button").classes.add('hidden');
    cells.forEach((cell) { cell.play(); });
    animate(0);
  }


  void pauseAll() {
    cells.forEach((cell) { cell.pause(); });
    querySelectorAll("#transport-pause-button").classes.add('hidden');
    querySelectorAll("#transport-play-button").classes.remove('hidden');
  }


  void stopAll() {
    clock.stopAll();
    querySelectorAll("#transport-pause-button").classes.add('hidden');
    querySelectorAll("#transport-play-button").classes.remove('hidden');
  }


  void animate(num t) {
    HtmlElement mc = querySelector("#master-clock");
    if (mc != null) mc.innerHtml = clock.timeString;
    if (isPlaying) window.animationFrame.then(animate);
  }


  void addCell(PythonCell cell, String prevKey) {
    if (clock.context != null) cell.initAudio();
    cells.add(cell);
  }

  PythonCell getCell(dynamic id) {
    for (PythonCell cell in cells) {
      if (cell.id == id) return cell;
    }
    return null;
  }


  Map save() {
    return {
      "id" : id,
      "name" : name,
      "bpm" : bpm,
      "meter" : meter,
      "key" : key,
      "created" : created.toString(),
      "modified" : modified.toString()
    };
  }


  void load(Map settings) {
    this.name = settings['name'];
    clock.bpm = toInt(settings['bpm'], 120);
    clock.meter = toStr(settings['meter'], "4/4");
    clock.key = toStr(settings['key'], "C major");
    created = toDateTime(settings['created']);
    modified = toDateTime(settings['modified']);
    _setBpm();
    _setKey();
    _setTimeSignature();
  }

/**
 * Solo a track
 */
  void solo(PythonCell track) {
    for (PythonCell cell in cells) {
      if (cell.id != track.id) {
        cell.pause();
      } else if (!cell.isPlaying) {
        cell.play();
      }
    }
  }


/**
 * called whenever the master clock tempo changes
 */
  void onTempoChange() { stopAll(); }


/**
 * Called whenever the time signature is changed
 */
  void onTimeSignatureChange() { stopAll(); }


/**
 * called whenever restart is called by any instrument
 */
  void onClockReset() { }


/**
 * called whenever the playhead is manually adjusted on any instrument
 */
  void onClockTimeChange() { }


  void _setTimeSignature() {
    HtmlElement time = querySelector("#time-signature");
    if (time != null) {
      time.innerHtml = clock.meter;
    }
    querySelectorAll("#change-time-signature i.fas").classes.remove("fa-check");
    querySelectorAll("#change-time-signature .menu-item[data-time='${clock.meter}'] i.fas").classes.add("fa-check");
  }

  void _setKey() {
    HtmlElement base = querySelector("#key-base");
    HtmlElement scale = querySelector("#key-scale");
    List<String> key = clock.key.split(' ');
    if (base != null && scale != null && key.length == 2) {
      base.innerHtml = key[0];
      scale.innerHtml = key[1];
    }
    querySelectorAll("#change-key i.fas").classes.remove("fa-check");
    querySelectorAll("#change-key .menu-item[data-key='${clock.key}'] i.fas").classes.add("fa-check");
  }

  void _setBpm() {
    HtmlElement el = querySelector("#bpm");
    if (el != null) { el.innerHtml = "${clock.bpm}"; }
    querySelectorAll("#change-bpm i.fas").classes.remove("fa-check");
    querySelectorAll("#change-bpm .menu-item[data-bpm='${clock.bpm}'] i.fas").classes.add("fa-check");
  }


  void _switchTabs(String tabName) {
    querySelectorAll(".tab").classes.add('hidden');
    querySelectorAll(".tabs button").classes.remove('selected');
    querySelectorAll("#$tabName-tab").classes.remove('hidden');
    querySelectorAll("#$tabName-tab-button").classes.add('selected');
  }

  void _registerEvents() {

    //---------------------------------------------------------------
    // transport play pause stop buttons
    //---------------------------------------------------------------
    querySelectorAll("#transport-stop-button").onClick.listen((e) { stopAll(); });
    querySelectorAll("#transport-pause-button").onClick.listen((e) { pauseAll(); });
    querySelectorAll("#transport-play-button").onClick.listen((e) { playAll(); });

    //---------------------------------------------------------------
    // tab buttons
    //---------------------------------------------------------------
    querySelectorAll("#tracks-tab-button").onClick.listen((e) { _switchTabs("tracks"); });
    querySelectorAll("#code-tab-button").onClick.listen((e) { _switchTabs("code"); });
    querySelectorAll("#mixer-tab-button").onClick.listen((e) { _switchTabs("mixer"); });

    querySelectorAll("#change-bpm .menu-item").onMouseDown.listen((e) {
      HtmlElement menu = (e.currentTarget as HtmlElement);
      this.clock.bpm = toInt(menu.dataset['bpm']);
      _setBpm();
      toggleContextMenu(querySelector("#change-bpm .context-menu"));
      e.stopPropagation();
      datastore.save(this);
    });

    querySelectorAll("#change-bpm").onMouseDown.listen((e) {
      toggleContextMenu(querySelector("#change-bpm .context-menu"));
      e.stopPropagation();
    });

    querySelectorAll("#change-key .menu-item").onMouseDown.listen((e) {
      HtmlElement menu = (e.currentTarget as HtmlElement);
      this.clock.key = menu.dataset['key'];
      _setKey();
      toggleContextMenu(querySelector("#change-key .context-menu"));
      e.stopPropagation();
      datastore.save(this);
    });

    querySelectorAll("#change-key").onMouseDown.listen((e) {
      toggleContextMenu(querySelector("#change-key .context-menu"));
      e.stopPropagation();
    });

    querySelectorAll("#change-time-signature .menu-item").onMouseDown.listen((e) {
      HtmlElement menu = (e.currentTarget as HtmlElement);
      this.clock.meter = menu.dataset['time'];
      _setTimeSignature();
      toggleContextMenu(querySelector("#change-time-signature .context-menu"));
      e.stopPropagation();
      datastore.save(this);
    });

    querySelectorAll("#change-time-signature").onMouseDown.listen((e) {
      toggleContextMenu(querySelector("#change-time-signature .context-menu"));
      e.stopPropagation();
    });
  }
}
