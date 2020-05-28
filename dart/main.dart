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
import 'dart:html';
import 'dart:math';
import 'dart:convert';
import 'library.dart';
import 'userlist.dart';
import 'package:ui/ui.dart';
import 'package:tunepad/tunepad.dart';
import 'package:synthesizer/synthesizer.dart';


Datastore datastore;
Project project;
UserList userlist;
TrackLibrary library;
WebSocket socket;

/**
 * TODO: Lowpass Filter
 * TODO: Mixer Analyzer Node
 */

void main() async {

//  datastore = new Datastore("http://localhost:5000");
//  socket = new WebSocket('ws://localhost:4040/ws');
  datastore = new Datastore("https://tunepad.club");
  socket = new WebSocket('wss://tunepad.club:8765');
  project = new Project(datastore.root, datastore);
  userlist = new UserList(socket);
  library = new TrackLibrary(datastore);


  if (datastore.isEmpty) {
    datastore.save(project);
    datastore.createPythonCell();
    datastore.isEmpty = false;
  }

  datastore.addAddedCallback("/${datastore.root}/cells", (key, prevKey, data) {
    PythonCell cell = new PythonCell(key, datastore, project.clock, querySelector("#code-tab"));
    project.addCell(cell, prevKey);
    _addCellMenu(cell, prevKey);
    _addMixTrack(cell, prevKey);
    datastore.addUpdateCallback(cell, (data) {
      _updateCellMenu(cell);
    });
    datastore.addRemovedCallback(cell, (data) {
      _removeCellMenu(cell);
      _removeMixTrack(cell);
    });
    //cell.root.scrollIntoView();
  });

  querySelectorAll("#add-cell-button").onClick.listen((e) {
    datastore.createPythonCell();
  });

  datastore.addLoginCallback((User user) { userlist.login(user); });
  datastore.addLogoutCallback((User user) { userlist.logout(user); });
  querySelectorAll("#login-button").onClick.listen((e) { UserAccounts.login(datastore); });
  querySelectorAll("#logout-button").onClick.listen((e) { datastore.logout(); });
  querySelectorAll("#help-button").onClick.listen((e) { Dialog.openModal("#help-template"); });
  querySelectorAll("#library-button").onClick.listen((e) { library.show(); });

  document.onMouseDown.listen((e) { DropdownMenu.closeAllMenus(); });

  datastore.connect();
}


void _addMixTrack(PythonCell cell, String prevKey) {
  DivElement container = querySelector("#mixer-container");
  TemplateElement template = querySelector("#mixer-template");
  if (container != null && template != null) {
    DocumentFragment frag = template.content.clone(true);
    DivElement track = frag.querySelector(".mixer-track");
    if (track != null) {

      //-------------------------------------------------------------
      // add the track to the DOM
      //-------------------------------------------------------------
      track.id = "mixer-${cell.id}";
      DivElement prev = container.querySelector("#mixer-$prevKey");
      if (prev != null) {
        prev.insertAdjacentElement('afterEnd', track);
      } else {
        container.insertAdjacentElement('afterBegin', track);
      }

      //-------------------------------------------------------------
      // create the pan dial
      //-------------------------------------------------------------
      EffectsDial dial = new EffectsDial("PAN: 0.0");
      dial.minValue = -1.0;
      dial.maxValue = 1.0;
      dial.value = cell.pan;
      dial.step = 0.05;
      dial.onAdjusted = (EffectsDial d, num value) {
        DivElement label = track.querySelector(".mixer-dial-label");
        if (label != null) {
          int v = (value * 100).abs().round();
          String d = (value > 0) ? "R" : "L";
          label.innerHtml = (v == 0) ? "PAN" : "PAN: $v% $d";
          cell.pan = value;
        }
      };
      dial.onChanged = (EffectsDial d, num value) { datastore.save(cell); };
      DivElement dialContainer = track.querySelector(".mixer-dial");
      if (dialContainer != null) { dial.buildUI(dialContainer); }


      //-------------------------------------------------------------
      // create the gain slider
      //-------------------------------------------------------------
      MixSlider slider = new MixSlider(100, 300);
      slider.minValue = 0.0;
      slider.maxValue = 1.0;
      slider.value = gainToValue(cell.gain);
      var dbs = [ 10, 5, 0, -5, -10, -20, -30 ];
      dbs.forEach((db) { slider.addTickLabel("$db —", dBToValue(db)); });
      slider.addTickLabel("-INF —", 0.0);
      slider.onAdjusted = (MixSlider s, num value) {
        num db = valueTodB(value);
        num gain = dBToGain(db);
        cell.gain = gain;
        DivElement label = track.querySelector(".mixer-slider-label");
        if (label != null) {
          label.innerHtml = "GAIN: ${gainTodB(cell.gain).toStringAsFixed(1)} Db";
        }
      };
      slider.onChanged = (MixSlider s, num value) { datastore.save(cell); };
      DivElement slideContainer = track.querySelector(".mixer-slider");
      if (slideContainer != null) { slider.buildUI(slideContainer); }

      //-------------------------------------------------------------
      // play / pause / solo buttons
      //-------------------------------------------------------------
      track.querySelectorAll(".mixer-play-button").onClick.listen((e) { cell.play(); });
      track.querySelectorAll(".mixer-pause-button").onClick.listen((e) { cell.pause(); });
      track.querySelectorAll(".mixer-solo-button").onClick.listen((e) { project.solo(cell); });

      //-------------------------------------------------------------
      // when cell is updated
      //-------------------------------------------------------------
      datastore.addUpdateCallback(cell, (data) {
        track.classes.removeWhere((cname) => cname != "mixer-track");
        track.classes.add(cell.settings['instrument']);
        DivElement name = track.querySelector(".mixer-cell-name");
        if (name != null) { name.innerHtml = cell.name; }
        DivElement beats = track.querySelector(".mixer-beats");
        if (beats != null) {
          if (cell.hasError) {
            track.classes.add("error");
            beats.innerHtml = "ERROR";
          } else {
            track.classes.remove("error");
            beats.innerHtml = "${cell.beats} BEATS";
          }
        }
        dial.value = cell.pan;
        slider.value = gainToValue(cell.gain);
        slider.setKnobImage("images/instruments/${cell.settings['instrument']}.svg");
      });
    }
  }
}

num dBToGain(num dB) => pow(10, dB/20).clamp(0.0, 3.5);
num gainTodB(num gain) => 20 * log(gain) / ln10;
num dBToValue(num dB) => pow(10, dB/40) / 1.78;
num gainToValue(num gain) => dBToValue(gainTodB(gain));
num valueTodB(num value) => 40 * log(1.78 * value) / ln10;

void _removeMixTrack(PythonCell cell) {
  DivElement track = querySelector("#mixer-${cell.id}");
  if (track != null) track.remove();
}


void _addCellMenu(PythonCell cell, String prevKey) {
  UListElement list = querySelector(".cell-nav .cell-list");
  TemplateElement template = querySelector("#cell-nav-template");
  if (list != null && template != null) {
    DocumentFragment frag = template.content.clone(true);
    Element item = frag.querySelector("li");
    if (item != null) {
      item.id = "cell-nav-${cell.id}";
      item.querySelectorAll(".shortcut-play-button").onClick.listen((e) {
        if (cell != null) cell.play();
      });
      item.querySelectorAll(".shortcut-pause-button").onClick.listen((e) {
        if (cell != null) cell.pause();
      });
      item.querySelectorAll(".shortcut-cell-name").onClick.listen((e) {
        cell.root.scrollIntoView();
        window.scrollBy({
          "top" : -50,
          "left": 0,
          "behavior": 'smooth' });
      });
      Element prev = list.querySelector("#cell-nav-${prevKey}");
      if (prev != null) {
        prev.insertAdjacentElement('afterEnd', item);
      } else {
        list.insertAdjacentElement('afterBegin', item);
      }
    }
  }
}


void _removeCellMenu(PythonCell cell) {
  Element item = querySelector("#cell-nav-${cell.id}");
  if (item != null) item.remove();
}


void _updateCellMenu(PythonCell cell) {
  Element item = querySelector("#cell-nav-${cell.id}");
  if (item != null) {
    DivElement cellName = item.querySelector(".shortcut-cell-name");
    if (cellName != null) {
      cellName.innerHtml = cell.name;
      cellName.classes.removeWhere((cname) => cname != "shortcut-cell-name");
      cellName.classes.add(cell.settings['instrument']);
    }
  }
}
