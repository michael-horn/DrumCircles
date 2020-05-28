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
 * Represents a musical key
 */
class Key {

  /// base note (e.g. C == 0)
  int base = 0;

  /// note pattern (default is a major scale)
  List<int> pattern = [ 0, 2, 4, 5, 7, 9, 11 ];

  /// key name
  String name = "C major";

  /// short name
  String short = "Cmaj";


  /// placeholder -- this will generate the correct key based on the name
  Key(this.name) { }

  Key.Cmaj();

}
