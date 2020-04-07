/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2017, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */

var _cmEditors = { };

var _errorLines = [ ];
var _traceLine = null;


function codemirror(selector) {
  var container = document.querySelector(selector);
  var editor;

  if (container) {
    editor = CodeMirror(container, {
      mode: {name: "python", version: 3, singleLineStringErrors: false},
      lineNumbers: true,
      theme: "tunepad-dark",
      foldGutter: true,
      gutters: ["trace", "CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
      styleActiveLine: true,
      indentUnit: 4,
      matchBrackets: true,
      search: true,
      extraKeys: {
        "Tab": function(cm){
            cm.replaceSelection("    " , "end");
        },
        "Ctrl-L": "jumpToLine",
        "Cmd-L": "jumpToLine"
      }
    });
    editor.on('change', function(cMirror, change) {
      onProgramUpdate(selector, JSON.stringify(change));
    });
    editor.on('cursorActivity', function(cMirror) {
      onCursorActivity(selector, JSON.stringify(cMirror.getCursor()));
    });
    editor.on('blur', function() {
      onBlur(selector);
    });
    _cmEditors[selector] = editor;
  }
}


//----------------------------------------------------------
// concurrent multi-user editing with firepad
//----------------------------------------------------------
function connectFirepad(selector, config) {
  if (_cmEditors[selector]) {
    editor = _cmEditors[selector];

    firebase.initializeApp(JSON.parse(config));

    // database reference.
    var firepadRef = getExampleRef();

    // create firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, editor, { defaultText: '# TunePad drum circle' });
  }
}


//----------------------------------------------------------
// get code from a code mirror editor
//----------------------------------------------------------
function getCode(selector) {
  if (_cmEditors[selector]) {
    return _cmEditors[selector].getValue();
  }
  return "";
}


//----------------------------------------------------------
// set code for a code mirror editor
//----------------------------------------------------------
function setCode(selector, code) {
  if (_cmEditors[selector]) {
    return _cmEditors[selector].setValue(code);
  }
  return "";
}


//----------------------------------------------------------
// set the codemirror cursor position
//----------------------------------------------------------
function setCursorPosition(selector, line, col) {
  if (_cmEditors[selector]) {
    _cmEditors[selector].focus();
    _cmEditors[selector].setCursor({line: line - 1, ch: col});
  }
}


//----------------------------------------------------------
// set / clear an error marker
//----------------------------------------------------------
function setErrorMarker(selector, line) {
  if (_cmEditors[selector]) {
    var marked = _cmEditors[selector].addLineClass(line - 1, "gutter", "error");
    _cmEditors[selector].addLineClass(line - 1, "text", "error");
    _errorLines.push(marked);
  }
}

function clearErrorMarkers(selector) {
  if (_cmEditors[selector]) {
    for (let marked of _errorLines) {
      _cmEditors[selector].removeLineClass(marked, "gutter", "error");
      _cmEditors[selector].removeLineClass(marked, "text", "error");
    }
    _errorLines = [];
  }
}


//----------------------------------------------------------
// trace a line
//----------------------------------------------------------
function setTraceMarker(selector, line) {
  if (_cmEditors[selector]) {
    clearTraceMarkers(selector);
    _traceLine = _cmEditors[selector].addLineClass(line - 1, "gutter", "trace");
    _cmEditors[selector].addLineClass(line - 1, "text", "trace");
  }
}


function clearTraceMarkers(selector) {
  if (_cmEditors[selector] && _traceLine != null) {
    _cmEditors[selector].removeLineClass(_traceLine, "text", "trace");
    _cmEditors[selector].removeLineClass(_traceLine, "gutter", "trace");
    _traceLine = null;
  }
}


// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  return ref;
}
