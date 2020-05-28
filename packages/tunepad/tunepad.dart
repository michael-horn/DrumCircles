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
library TunePad;

import 'dart:js' as js;
import 'dart:svg' as svg;
import 'dart:async';
import 'dart:html';
import 'dart:math';
import 'dart:convert';
import 'dart:web_audio';
import 'dart:typed_data';

import 'package:audio_tools/audio_tools.dart';
import 'package:editor/codemirror.dart';
import 'package:compiler/python.dart';
import 'package:synthesizer/synthesizer.dart';
import 'package:instruments/instruments.dart';
import 'package:ui/ui.dart';
import 'package:uuid/uuid.dart';


part 'src/accounts.dart';
part 'src/cell.dart';
part 'src/datastore.dart';
part 'src/patches.dart';
part 'src/project.dart';
part 'src/recorder.dart';
part 'src/timeline.dart';
part 'src/user.dart';
