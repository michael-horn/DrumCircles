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
import 'dart:js' as js;
import 'dart:convert';


/**
 * Receives callback functions from the editor
 */
abstract class CodeMirrorListener {

  /// user made a change to the code
  void onProgramUpdate(Map change);

  /// user adjusted the cursor position
  void onCursorActivity(Map position);

  /// user added a newline to the program
  void onLineAdded(Map change);

  /// user deleted a line from the program
  void onLineRemoved(Map change);

  /// editor window lost focus
  void onEditorBlur();
}


/**
 * Provides an interface to a codemirror instance
 */
class CodeMirror {

  /// each new instance uses these maps to register codemirror callbacks
  static Map<String, Function> programUpdateMap = new Map<String, Function>();
  static Map<String, Function> cursorActivityMap = new Map<String, Function>();
  static Map<String, Function> editorBlurMap = new Map<String, Function>();

  /// unique codemirror HTML selector
  String id;

  /// listener receives callbacks
  CodeMirrorListener listener;

  /// text has been modified since last call to clean()
  bool _dirty = false;
  bool get isDirty => _dirty;

  /// containing element for the editor
  Element parent;


  CodeMirror(this.listener, this.id) {
    Element el = querySelector(id);
    if (el != null) this.parent = el.parent;

    //-----------------------------------------------------
    // static codemirror callback functions that relay to individual instances.
    //-----------------------------------------------------
    if (js.context['onProgramUpdate'] == null) {
      js.context['onProgramUpdate'] = CodeMirror.onProgramUpdate;
      js.context['onCursorActivity'] = CodeMirror.onCursorActivity;
      js.context['onBlur'] = CodeMirror.onEditorBlur;
    }

    //-----------------------------------------------------
    // tells the static callback functions how to relay messages
    //-----------------------------------------------------
    programUpdateMap[id] = _onProgramUpdate;
    cursorActivityMap[id] = _onCursorActivity;
    editorBlurMap[id] = _onEditorBlur;
  }

  /// inserts code mirror editor into a textarea
  void initialize() {
    js.context.callMethod('codemirror', [ id ]);
  }

  /// allow for concurrent multi-user editing
  void connectFirepad(String directory) {
    js.context.callMethod('connectFirepad', [ id, directory ]);
  }

  String getCode() {
    return js.context.callMethod('getCode', [ id ]);
  }

  void setCode(String code) {
    js.context.callMethod('setCode', [ id, code ]);
    _dirty = true;
  }

  void setCursorPosition(int line, int col) {
    js.context.callMethod('setCursorPosition', [ id, line, 0 ]);
  }

  void setTraceMarker(int line) {
    if (line != null && line > 0) {
      js.context.callMethod('setTraceMarker', [ id, line ]);
    }
  }

  void clearTraceMarkers() {
    js.context.callMethod('clearTraceMarkers', [ id ]);
  }

  void setErrorMarker(int line) {
    js.context.callMethod('setErrorMarker', [ id, line ]);
  }

  void clearErrorMarkers() {
    js.context.callMethod('clearErrorMarkers', [ id ]);
  }

/**
 * Clears isDirty marker
 */
  void clean() { _dirty = false; }


/**
 * Called by codemirror when the user makes a program change
 */
  static void onProgramUpdate(String editor, String change) {
    if (programUpdateMap.containsKey(editor)) {
      Function.apply(programUpdateMap[editor], [ jsonDecode(change) ]);
    }
  }

  void _onProgramUpdate(Map change) {
    _dirty = true;
    listener.onProgramUpdate(change);

    // line added or removed
    if (change['text'].length > 1) {
      listener.onLineAdded(change);
    } else if (change['from']['line'] != change['to']['line']) {
      listener.onLineRemoved(change);
    }
  }


/**
 * Called by codemirror every time the cursor position is updated
 */
  static void onCursorActivity(String editor, String position) {
    if (cursorActivityMap.containsKey(editor)) {
      Function.apply(cursorActivityMap[editor], [ jsonDecode(position) ]);
    }
  }

  void _onCursorActivity(Map position) {
    listener.onCursorActivity(position);
  }


/**
 * Called by codemirror every time the cursor leaves and editor window.
 * This might trigger a recompile iff there are uncompiled changes.
 */
  static void onEditorBlur(String editor) {
    if (editorBlurMap.containsKey(editor)) {
      Function.apply(editorBlurMap[editor], []);
    }
  }

  void _onEditorBlur() {
    listener.onEditorBlur();
  }
}
