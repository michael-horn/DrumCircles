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
import 'dart:svg' as svg;



/**
 * Effects dial widget used by the recording studio
 */
class EffectsDial {

  /// name of the dial
  String name = "LEVEL";

  /// position of the dial in the SVG container
  num width = 100, height = 80;

  /// minimum possible value of the dial
  num minValue = 0.0;

  /// maximum possible value of the dial
  num maxValue = 1.0;

  /// optional step value between min and max values
  num step = null;

  /// optional array of fixed values for the dial from low to high
  List<num> values = null;

  /// unit of measure for value label (e.g. Hz, seconds)
  String unit = "";

  /// range of the dial from min to max
  num get range => (maxValue - minValue);

  /// radius of the track
  num get trackRadius => 37;

  /// radius of the knob
  num get knobRadius => 25;

  /// angular sweep of the dial in radians
  num get sweep => 3 * pi / 2;

  /// current value of the dial
  num get value {
    if (values != null && values.length > 0) {
      int index = ((values.length - 1) * _value).round();
      return values[index];
    }
    num v = (_value * range) + minValue;
    if (step != null) {
      return (v / step).round() * step;
    } else {
      return v;
    }
  }

  set value(num v) {
    if (values != null && values.contains(v) && values.length > 1) {
      v = values.indexOf(v) / (values.length - 1);
    } else {
      v = (v - minValue) / range;
    }
    _value = max(0.0, min(1.0, v));
    _updateDrawing();
  }

  String get valueAsString {
    if (values != null && values.length > 0) {
      return value.toString() + unit;
    } else {
      return value.toStringAsFixed(1) + unit;
    }
  }

  /// disable the dial
  bool get disabled => _disabled;

  set disabled(bool d) {
    _disabled = d;
    _updateDrawing();
  }

  /// gets called when the user is finished adjusting and releases the mouse
  Function onChanged = null;

  /// gets called every time the dial is moved
  Function onAdjusted = null;

  /// is the dial currently being adjusted
  bool _dragging = false;

  /// current position of the dial from 0.0 to 1.0
  num _value = 0.0;

  bool _disabled = false;

  num _touchY = 0.0;


  svg.PathElement _arc;
  svg.LineElement _line;
  svg.PathElement _track;
  svg.CircleElement knob;


  EffectsDial(String name) {
    _track = new svg.PathElement() ..attributes = {
        "class" : "dial-track", "d": _describeArc(0, 0, trackRadius, 0, sweep)
      };
    _arc = new svg.PathElement() ..attributes = {
        "class" : "dial-track-fill", "d": _describeArc(0, 0, trackRadius, 0, _value * sweep),
      };
    _line = new svg.LineElement()
      ..attributes = {
        "class" : "dial-pointer",
        "x1": "0",
        "y1": "0",
        "x2": "${polarX(_value, knobRadius)}",
        "y2": "${polarY(_value, knobRadius)}"
      };
    this.name = name;
  }



  void buildUI(Element container) {

    svg.SvgSvgElement parent = new svg.SvgSvgElement()
      .. attributes = {
        "width" : "100%",
        "viewBox" : "0 0 $width $height",
        "preserveAspectRatio" : "none"
      };


    svg.GElement widgetGroup = new svg.GElement()
      ..attributes['transform'] =
          "translate(${width / 2}, ${height / 2})";

    svg.GElement knobGroup = new svg.GElement()
      ..attributes['transform'] = "rotate(135, 0, 0)";

    widgetGroup.nodes.add(knobGroup);

    // gradient light grey dial
    knob = new svg.CircleElement()
      ..attributes = {
        "cx": "0",
        "cy": "0",
        "r": "${knobRadius}",
        "fill": "none",
        "stroke": "#fff8",
        "stroke-opacity": "1",
        "stroke-width": "4"
      };
    knobGroup.nodes.add(knob);

    knobGroup.nodes.add(_track);

    knobGroup.nodes.add(_arc);

    knobGroup.append(_line);

    svg.CircleElement overlay = new svg.CircleElement()
      ..attributes = {
        "cx": "0",
        "cy": "0",
        "r": "$trackRadius",
        "fill": "white",
        "fill-opacity": "0.0"
      };
    overlay.style.cursor = "ns-resize";
    widgetGroup.nodes.add(overlay);

    parent.append(widgetGroup);
    container.append(parent);

    overlay.onMouseDown.listen((e) {
      if (_disabled) return;
      _dragging = true;
      _touchY = e.client.y;
      knob.attributes['fill'] = "#ccc";
    });

    document.onMouseUp.listen((e) {
      if (_dragging && !_disabled && onChanged != null) {
        Function.apply(onChanged, [this, value]);
      }
      knob.attributes['fill'] = "none";
      _dragging = false;
    });

    document.onMouseMove.listen((e) {
      if (_dragging && !_disabled) {
        num deltaY = _touchY - e.client.y;
        _touchY = e.client.y;
        _value = max(0.0, min(1.0, _value + deltaY / 50.0));
        _updateDrawing();
        if (onAdjusted != null) {
          Function.apply(onAdjusted, [this, value]);
        }
      }
    });
  }

  String _describeArc(num x, num y, num radius, num startAngle, num endAngle) {
    num sx = radius * cos(endAngle);
    num sy = radius * sin(endAngle);
    num ex = radius * cos(startAngle);
    num ey = radius * sin(startAngle);
    int large = (endAngle >= pi) ? 1 : 0;

    return ["M", ex, ey, "A", radius, radius, 0, large, 1, sx, sy].join(" ");
  }

  void _updateDrawing() {
    if (_line != null) {
      num r = knobRadius - 2;
      if (disabled) {
        _track.setAttribute("stroke-opacity", "0");
        _arc.setAttribute("stroke-opacity", "0");
        _line.setAttribute("x1", "${polarX(0.28, r)}");
        _line.setAttribute("y1", "${polarY(0.28, r)}");
        _line.setAttribute("x2", "${polarX(0.95, r)}");
        _line.setAttribute("y2", "${polarY(0.95, r)}");
      } else {
        _track.setAttribute("stroke-opacity", "0.5");
        _arc.setAttribute("stroke-opacity", "1.0");
        _line.setAttribute("x1", "0");
        _line.setAttribute("y1", "0");
        _line.setAttribute("x2", "${polarX(_value, knobRadius - 2)}");
        _line.setAttribute("y2", "${polarY(_value, knobRadius - 2)}");
      }
    }
    if (_arc != null) {
      _arc.setAttribute(
          "d", _describeArc(0, 0, trackRadius, 0, _value * 3 * pi / 2));
    }
  }

  num polarX(num v, num r) => r * cos(v * sweep);
  num polarY(num v, num r) => r * sin(v * sweep);

}


/**
 * Roundish toggle button for muting tracks
 */
class ToggleButton {

  num cx, cy, radius;

  svg.CircleElement _button;

  /// called when the button state changes
  Function onChanged = null;

  bool _value = true;
  bool get value => _value;
  set value(bool b) {
    _value = b;
    _button.attributes['fill'] = value ? color : '#555';
  }

  String _color = "cyan";
  String get color => _color;
  set color(String c) {
    _color = c;
    _button.attributes['fill'] = value ? color : '#555';
  }


  ToggleButton(this.cx, this.cy, this.radius) {
    _button = new svg.CircleElement()
      ..attributes = {
        "cx": "$cx",
        "cy": "$cy",
        "r": "${radius - 3}",
        "fill": "cyan",
        "class" : "mute-button"
      };
  }


  void buildUI(svg.GElement container) {

    svg.CircleElement outline = new svg.CircleElement()
      ..attributes = {
        "cx": "$cx",
        "cy": "$cy",
        "r": "$radius",
        "stroke": "white",
        "stroke-width" : "2",
        "stroke-opacity" : "0.5"
      };

    container.append(outline);
    container.append(_button);

    _button.onMouseEnter.listen((e) {
      outline.attributes['stroke-opacity'] = '1.0';
    });

    _button.onMouseLeave.listen((e) {
      outline.attributes['stroke-opacity'] = '0.5';
      _button.attributes['fill'] = value ? color : '#555';
    });

    _button.onMouseDown.listen((e) {
      _button.attributes['fill'] = "white";
    });

    _button.onClick.listen((e) {
      value = !value;
      if (onChanged != null) Function.apply(onChanged, [ this, value ]);
    });
  }
}
