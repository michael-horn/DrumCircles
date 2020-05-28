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
 
/// Parses an int from an object (usually a string)
int toInt(var d, [ int defaultValue = 0 ]) {
  if (d == null) {
    return defaultValue;
  }
  else if (d is int) {
    return d;
  }
  else if (d is num) {
    return d.round();
  }
  else {
    try {
      return int.parse(d.toString());
    } on Exception {
      return defaultValue;
    }
  }
}


/// parses an int from an object (usually a string)
num toNum(var d, [ num defaultValue = 0 ]) {
  if (d == null) {
    return defaultValue;
  }
  else if (d is num) {
    return d;
  }
  else {
    try {
      return num.parse(d.toString());
    } on Exception {
      return defaultValue;
    }
  }
}


/// parses a DateTime object from an int representing milliseconds since the epoch.
/// returns DateTime.now() as a default value.
DateTime toDateTime(var d) {
  if (d == null) {
    return new DateTime.now();
  }
  else if (d is int) {
    return new DateTime.fromMillisecondsSinceEpoch(d);
  }
  else if (d is String) {
    try {
      return DateTime.parse(d);
    } catch (e) {
      print("unable to parse datetime");
    }
  }
  return new DateTime.now();
}


String formatDateTime(DateTime d) {
  List months = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  String date = "${months[d.month]} ${d.day}, ${d.year}";
  int h = d.hour % 12;
  if (h == 0) h = 12;
  String time = "${h}:${d.minute.toString().padLeft(2, '0')}";
  time += (d.hour < 12) ? "AM" : "PM";
  return "${date} ${time}";
}


/// parses a bool from an object (usually string or bool)
bool toBool(var b, [bool defaultValue = false ]) {
  if (b == null) {
    return defaultValue;
  }
  else if (b is bool) {
    return b;
  }
  else {
    String s = b.toString();
    if (s.toLowerCase() == "true" || s.toLowerCase() == "t") {
      return true;
    }
    else if (s.toLowerCase() == "false" || s.toLowerCase() == "f") {
      return false;
    }
  }
  return defaultValue;
}


/// converts a value to a string
String toStr(var o, [ String defaultValue = "" ]) {
  return (o == null) ? defaultValue : o.toString();
}
