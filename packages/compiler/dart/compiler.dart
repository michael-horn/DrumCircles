/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2018, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import 'dart:async';
import 'dart:convert';
import 'dart:html';
import 'preprocessor.dart';


/**
 * interface for receiving python event callbacks
 */
abstract class PythonListener {

  void onPythonDone(List outputs);

  void onPythonError(String name, String message, String details, int line);

  /// subclasses override to provide boilerplate python code
  String getBoilerplate();
}


/**
 * Webworker that manages the skulp compiler
 */
class PythonCompiler {

  /// receives python callback messages
  PythonListener listener;

  /// is a compile in process?
  bool _compiling = false;
  bool get isCompiling => _compiling;

  /// adds trace messages to the python source code
  Preprocessor pp = new Preprocessor();


  PythonCompiler(this.listener);


  /// Recompile the given python source code. Will respond with either
  /// an error or success callback
  Future<bool> compile(String code) async {

    _compiling = true;

    String bplate = (listener != null) ? listener.getBoilerplate() : "";
    if (bplate == null) return false;

    String pcode = pp.process(code, bplate.split('\n').length);

    Worker worker = new Worker('packages/compiler/js/skulpt-webworker.js');

    try {

      var message = jsonDecode(jsonEncode( [ bplate + "\n" + pcode ] ));
      worker.postMessage(message);
      bool error = false;

      await for (MessageEvent e in worker.onMessage) {
        if (e.data[0] == 'error') {
          pythonError(e.data[1], e.data[2], e.data[3], e.data[4]);
          error = true;
        }
        else if (e.data[0] == 'done') {
          _compiling = false;
          pythonDone(e.data[1]);
          return !error;
        }
      }
    }
    catch(e) {
      print(e.toString());
    }
  }


///------------------------------------------------------------------------
/// Called by skulpt on python syntax and runtime errors
///------------------------------------------------------------------------
  void pythonError(String name, String message, String details, int line) {
    if (message == null || message == "") message = "Unknown";

    if (line >= 0 && pp.linemap.containsKey(line)) {
      line = pp.linemap[line];
    } else {
      line = -1;
    }
    if (listener != null) listener.onPythonError(name, message, details, line);
  }


///------------------------------------------------------------------------
/// Called by skulpt when a python program has finished running
///------------------------------------------------------------------------
  void pythonDone(List outputs) {
    if (listener != null) listener.onPythonDone(outputs);
  }
}
