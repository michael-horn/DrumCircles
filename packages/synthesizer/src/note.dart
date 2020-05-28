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
import 'dart:math';


/// frequency (Hz) of note A in octave 0
const A0Hz = 27.5; // Hz

/// frequency (Hz) of note C in octave 0
const C0Hz = 16.3516; 

/// musical notes (in half steps) in the 12-note chromatic scale ♭
///                    0    1     2    3     4    5    6     7    8     9    10    11
const NOTES = const [ "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B" ];



/// pitch to color mappings
const NOTE_COLORS = const [ 
  "rgb(229, 76, 78)",
  "rgb(223, 132, 74)",
  "rgb(228, 171, 81)",
  "rgb(227, 199, 73)",
  "rgb(223, 228, 78)",
  "rgb(174, 215, 71)",
  "rgb(63, 188, 70)",
  "rgb(63, 169, 180)",
  "rgb(64, 124, 180)",
  "rgb(78, 69, 179)",
  "rgb(141, 69, 183)",
  "rgb(202, 69, 147)" ];



class Note {

  /// midi note number
  num _note = 60;   // middle C
  num get note => _note;
  set note(num n) => _note = max(0, n);


  /// when in the future this note will be played (time in beats)
  num start = 0.0;

  /// when this note will finish playing
  num get end => start + duration;

  /// duration of the note in beats (quarter notes)
  num duration = 1.0;


  /// note octave (0 - 8) maintains current note letter
  int get octave => note ~/ 12;
  set octave(int o) => note = o * 12 + step;


  /// note half-step (0 - 11) maintains current octave
  int get step => note.round() % 12;
  set step(int s) => note = octave * 12 + s;


  /// midi velocity (0 - 127)
  num _velocity = 90;
  num get velocity => _velocity;
  set velocity(num v) => _velocity = v.clamp(0, 127);


  /// velocity to gain conversion
  num get gain => (velocity * velocity) / (127 * 127);


  /// note name (e.g. "C", "D♯")
  String get name => "${NOTES[ step ]}";


  /// accidental (either ♯ or empty string)
  String get accidental => name.substring(1);


  /// 0 == C-1; 12 == C0; 24 == C1
  String get nameWithOctave => "${NOTES[ step ]}${octave - 1}";


  /// step value color match
  String get stepColor => NOTE_COLORS[ step % NOTE_COLORS.length ];


  /// note "playback rate"
  num get rate => pow(2, octave + (step / 12));


  /// note frequency (Hz)
  num get frequency => C0Hz * rate;


  /// create a note from a midi code (0-127)
  Note(num n) {
    this.note = n;
  } 


  /// create a note by name (e.g. D#4, C2)
  Note.fromName(String n) {
    octave = nameToOctave(n);
    step = nameToStep(n);
  }


  int nameToOctave(String n) {
    if (n == null || n.length < 2) {
      return 0;
    } else if (n.length == 2) {
      return max(0, min(8, n.codeUnitAt(1) - 48));
    } else {
      return max(0, min(8, n.codeUnitAt(2) - 48));
    }
  }


  int nameToStep(String n) {
    if (n == null || n == "") {
      return 0;
    } else if (n.length <= 2) {
      n = n[0].toUpperCase();
    } else {
      n = n.substring(0, 2).toUpperCase();
    }
    return max(0, NOTES.indexOf(n));
  }
}
