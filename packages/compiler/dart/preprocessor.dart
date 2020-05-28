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

/**
 * This class preprocesses python code by adding trace statements after 
 * each statement line. It also inserts line number parameters into playNote 
 * statements so that they can be decorated in the timeline view.
 */

class Preprocessor {

  /// used to generate correct line numbers for error messages
  Map<int,int> linemap = new Map<int, int>();

  /// stack for matching special open / close characters ---> []{}()""''
  List<String> _matchings = new List<String>();

  /// stores processed code
  List<String> _output = new List<String>();

  /// this is the continuation of a multiline statement
  bool _multiline = false;
  String _lastValidIndent = "";


  Preprocessor();


  /// preprocess Python code and return the resulting code as a String
  String process(String code, [ int lineOffset = 0 ]) {

    // break code into lines
    List<String> lines = code.split('\n');

    // reset data structures
    linemap.clear();
    _matchings.clear();
    _output.clear();
    _multiline = false;
    _lastValidIndent = "";


    // process each line in turn
    for (int i=0; i<lines.length; i++) {
      String line = lines[i];
      processLine(line, i+1, lineOffset);
    }

    return _output.join('\n');
  }


  /// process one line of code
  void processLine(String line, int lineNumber, int lineOffset) {

    // map new line number to the original line number to help correct error message line numbers
    linemap[_output.length + 1 + lineOffset] = lineNumber;

    // save indentation level string
    String indent = getIndentation(line);
    if (indent.length > 0) line = line.substring(indent.length).trim();

    bool continuation = _matchings.isNotEmpty || _multiline;
    bool hasColon = false;
    bool lineExtender = false;
    bool closeMultiline = false;
    bool commentOnly = (line.startsWith('#'));
    bool whitespaceOnly = (line.length == 0);
    bool matchingPlayNote = false;
    bool returnLine = false;

    _multiline = false;
    if (!continuation) _lastValidIndent = indent;

    for (int i=0; i<line.length; i++) {
      String c = line[i];

      //-----------------------------------------------------
      // multiline quote type 1 (double quotes)
      //-----------------------------------------------------
      if (line.indexOf('"""', i) == i) {
        if (matches('"""')) {
          _matchings.removeLast();
          closeMultiline = true;
          i += 2;
        }
        else if (!inString()) {
          _matchings.add('"""');
          i += 2;
        }
      }

      //-----------------------------------------------------
      // multiline quote type 2 (single quotes)
      //-----------------------------------------------------
      else if (line.indexOf("'''", i) == i) {
        if (matches("'''")) {
          _matchings.removeLast();
          closeMultiline = true;
          i += 2;
        }
        else if (!inString()) {
          _matchings.add("'''");
          i += 2;
        }
      }

      //-----------------------------------------------------
      // opening paren, bracket, or quote
      //-----------------------------------------------------
      else if (!inString() && '[({"\''.contains(c)) {
        _matchings.add(c);
        lineExtender = false;
        closeMultiline = false;
      }

      //-----------------------------------------------------
      // closing paren or bracket
      //-----------------------------------------------------
      else if ('])}'.contains(c) && matches(c)) {
        _matchings.removeLast();
        if (c == ')' && matchingPlayNote && _matchings.isEmpty) {
          String inject = ", line=$lineNumber";
          line = line.substring(0, i) + inject + line.substring(i);
          i += inject.length;
          matchingPlayNote = false;
          lineExtender = false;
          closeMultiline = false;
        }
      }

      //-----------------------------------------------------
      // close single line quote
      //-----------------------------------------------------
      else if ("'\"".contains(c) && matches(c)) {
        _matchings.removeLast();
      }

      //-----------------------------------------------------
      // colon character to start block
      //-----------------------------------------------------
      else if (c == ':' && _matchings.isEmpty) {
        hasColon = true;
        lineExtender = false;
        closeMultiline = false;
      }

      //-----------------------------------------------------
      // backslash to start multiline statement
      //-----------------------------------------------------
      else if (c == '\\' && !inString()) {
        lineExtender = true;
      }

      //-----------------------------------------------------
      // reached comment character, so exit the loop
      //-----------------------------------------------------
      else if (!inString() && c == '#') {
        break;
      }

      //-----------------------------------------------------
      // ignore whitespace
      //-----------------------------------------------------
      else if (" \t\r\v\f".contains(c)) {
        continue;
      }

      //-----------------------------------------------------
      // non-whitespace character
      //-----------------------------------------------------
      else {
        lineExtender = false;
        closeMultiline = false;
      }

      //-----------------------------------------------------
      // add parameter to playNote statements
      //-----------------------------------------------------
      if (_matchings.isEmpty && line.indexOf("playNote(", i) == i) {
        matchingPlayNote = true;        
      }

      //-----------------------------------------------------
      // don't put trace statements after return statements
      //-----------------------------------------------------
      if (!inString() && line.indexOf("return", i) == i) {
        returnLine = true;
      }

    }

    _output.add("$indent$line");
    
    //-----------------------------------------------------
    // insert a trace statement?
    //-----------------------------------------------------
    if (_matchings.isEmpty && 
        !hasColon && 
        !lineExtender && 
        !whitespaceOnly && 
        !commentOnly && 
        !closeMultiline &&
        !returnLine) 
    {
      if (continuation) {
        _output.add("${_lastValidIndent}trace($lineNumber)");
      } else {
        _output.add("${indent}trace($lineNumber)");
      }
    }
    _multiline = (lineExtender || _matchings.isNotEmpty);

  }


  /// are we currently in a single or multi-line string?
  bool inString() { 
    return (_matchings.isNotEmpty && [ '"', "'", "'''", '"""' ].contains(_matchings.last));
  }


  /// does the character c close a string paren or bracket?
  bool matches(String c) {
    if (_matchings.isEmpty) return false;
    String l = _matchings.last;

    if (c == ']' && l == '[') return true;

    if (c == '}' && l == '{') return true;

    if (c == ')' && l == '(') return true;

    if (c == l && ['"', "'", "'''", '"""'].contains(c)) return true;

    return false;
  }


  /// extract indentation string for a given line
  String getIndentation(String line) {
    String indent = "";
    if (_matchings.isEmpty) {
      for (int i=0; i<line.length; i++) {
        String c = line[i];
        if (c == " " || c == "\t") {
          indent += c;
        } else {
          return indent;
        }
      }
    }
    return indent;
  }
}
