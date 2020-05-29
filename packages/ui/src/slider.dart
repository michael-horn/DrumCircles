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
 * Mixing board style slider
 */
class MixSlider {

  /// svg element parent
  svg.SvgSvgElement parent;

  /// position and size
  num width = 100, height = 300;

  /// height minus margins
  num get innerHeight => height - (knobRadius * 2);

  num get y0 => knobRadius;
  num get y1 => height - knobRadius;

  /// minimum possible value of the slider (at the bottom)
  num minValue = 0.0;

  /// maximum possible value of the slider (at the top)
  num maxValue = 1.0;

  /// optional step value between min and max values
  num step = null;

  /// unit of measure for value label (e.g. Hz, seconds)
  String unit = "";

  /// range of the dial from min to max
  num get range => (maxValue - minValue);

  /// current value of the dial
  num get value {
    num v = (_value * range) + minValue;
    if (step != null) {
      return (v / step).round() * step;
    } else {
      return v;
    }
  }

  set value(num v) {
    v = (v - minValue) / range;
    _value = max(0.0, min(1.0, v));
    _updateDrawing();
  }

  String get valueAsString {
    return value.toStringAsFixed(1) + unit;
  }

  num get valueAsY => valueToY(_value);

  num valueToY(v) => y0 + (1.0 - v) * innerHeight;
  num yToValue(y) => 1.0 - ((y - y0) / innerHeight).clamp(0.0, 1.0);

  /// disable the dial
  bool get disabled => _disabled;

  set disabled(bool d) {
    _disabled = d;
    _updateDrawing();
  }

  /// radius of the control knob
  num get knobRadius => 18.0;

  /// gets called when the user is finished adjusting and releases the mouse
  Function onChanged = null;

  /// gets called every time the slider is moved
  Function onAdjusted = null;

  /// list of tick labels with associated y-values
  List<Map> ticks = new List<Map>();

  /// is the slider currently being adjusted?
  bool _dragging = false;

  /// current position of the slider from 0.0 to 1.0
  num _value = 0.0;

  bool _disabled = false;

  num _touchY = 0.0;


  svg.LineElement _line;
  svg.CircleElement _knob;
  svg.GElement _knobGroup;
  svg.ImageElement _knobImage;


  MixSlider(this.width, this.height) {
    parent = new svg.SvgSvgElement()
      .. attributes = {
        "viewBox" : "0 0 $width $height",
        "preserveAspectRatio" : "none"
      };

    _line = new svg.LineElement()
      ..attributes = {
        "class" : "slider-track",
        "x1": "${width/2}",
        "y1": "$y0",
        "x2": "${width/2}",
        "y2": "$y1"
      };
    _knobGroup = new svg.GElement();
    _knob = new svg.CircleElement()
      ..attributes = {
        "class" : "slider-knob",
        "cx" : "0", "cy": "0",
        "r": "${knobRadius}"
      };
    _knobImage = new svg.ImageElement()
      ..attributes = {
        "x" : "-${knobRadius * 0.7}",
        "y" : "-${knobRadius * 0.7}",
        "width" : "${knobRadius * 1.4}",
        "height" : "${knobRadius * 1.4}",
        "pointer-events" : "none",
        "href" : "images/instruments/synth.svg"
      };
    _knobGroup.append(_knob);
    _knobGroup.append(_knobImage);
  }

/**
 * Set the knob image
 */
  void setKnobImage(String href) {
    _knobImage.attributes['href'] = href;
  }

/**
 * Add a tick label with the given value between 0.0 and 1.0
 */
  void addTickLabel(String label, num value) {
    ticks.add({ "label" : label, "value" : value });
  }


  void buildUI(Element container) {
    container.append(parent);
    svg.GElement widgetGroup = new svg.GElement();

    _knobGroup.attributes['transform'] = "translate(${width/2}, ${valueAsY})";

    widgetGroup.nodes.add(_line);

    widgetGroup.append(_knobGroup);

    /// tick labels
    svg.GElement tickGroup = new svg.GElement();
    for (Map tick in ticks) {
      svg.TextElement t = new svg.TextElement() .. attributes = {
        "x" : "${width / 2 - 8}",
        "y" : "${valueToY(tick['value'])}",
        "class" : "slider-tick-label"
      };
      t.innerHtml = "${tick['label']}";
      tick['svg'] = t;
      tickGroup.append(t);
    }

    parent.append(tickGroup);
    parent.append(widgetGroup);


    _knobGroup.onMouseDown.listen((e) {
      if (_disabled) return;
      _dragging = true;
      _touchY = e.client.y;
      _knob.classes.add('dragging');
    });

    document.onMouseUp.listen((e) {
      if (_dragging && !_disabled && onChanged != null) {
        Function.apply(onChanged, [this, value]);
      }
      if (_dragging) _knob.classes.remove('dragging');
      _dragging = false;
    });

    document.onMouseMove.listen((e) {
      if (_dragging && !_disabled) {
        num deltaY = _touchY - e.client.y;
        _touchY = e.client.y;
        _value = yToValue(valueAsY - deltaY);
        _updateDrawing();
        if (onAdjusted != null) {
          Function.apply(onAdjusted, [this, value]);
        }
      }
    });
  }


  void _updateDrawing() {
    if (_knobGroup != null) {
      _knobGroup.attributes['transform'] = 'translate(${width/2}, ${valueAsY})';
    }
    if (disabled) {
      _line.setAttribute("stroke-opacity", "0");
    } else {
      _line.setAttribute("stroke-opacity", "1.0");
    }
  }
}
