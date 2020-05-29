define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const _interceptors = dart_sdk._interceptors;
  const svg = dart_sdk.svg;
  const _js_helper = dart_sdk._js_helper;
  const math = dart_sdk.math;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var menu = Object.create(dart.library);
  var slider = Object.create(dart.library);
  var dialog$ = Object.create(dart.library);
  var ui = Object.create(dart.library);
  var dial = Object.create(dart.library);
  var $onMouseDown = dartx.onMouseDown;
  var $querySelectorAll = dartx.querySelectorAll;
  var $currentTarget = dartx.currentTarget;
  var $classes = dartx.classes;
  var $forEach = dartx.forEach;
  var $attributes = dartx.attributes;
  var $append = dartx.append;
  var $round = dartx.round;
  var $toStringAsFixed = dartx.toStringAsFixed;
  var $_set = dartx._set;
  var $add = dartx.add;
  var $nodes = dartx.nodes;
  var $_get = dartx._get;
  var $innerHtml = dartx.innerHtml;
  var $client = dartx.client;
  var $onMouseUp = dartx.onMouseUp;
  var $onMouseMove = dartx.onMouseMove;
  var $setAttribute = dartx.setAttribute;
  var $clone = dartx.clone;
  var $keys = dartx.keys;
  var $remove = dartx.remove;
  var $length = dartx.length;
  var $contains = dartx.contains;
  var $indexOf = dartx.indexOf;
  var $toString = dartx.toString;
  var $cursor = dartx.cursor;
  var $join = dartx.join;
  var $onMouseEnter = dartx.onMouseEnter;
  var $onMouseLeave = dartx.onMouseLeave;
  var $onClick = dartx.onClick;
  var MouseEventLToNullN = () => (MouseEventLToNullN = dart.constFn(dart.fnType(core.Null, [html.MouseEvent])))();
  var ElementLToNullN = () => (ElementLToNullN = dart.constFn(dart.fnType(core.Null, [html.Element])))();
  var JSArrayOfMapL = () => (JSArrayOfMapL = dart.constFn(_interceptors.JSArray$(core.Map)))();
  var IdentityMapOfStringL$StringL = () => (IdentityMapOfStringL$StringL = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  var JSArrayOfObjectL = () => (JSArrayOfObjectL = dart.constFn(_interceptors.JSArray$(core.Object)))();
  const CT = Object.create(null);
  var L2 = "package:ui/src/dialog.dart";
  var L1 = "package:ui/src/slider.dart";
  var L0 = "package:ui/src/menu.dart";
  var L3 = "package:ui/src/dial.dart";
  menu.DropdownMenu = class DropdownMenu extends core.Object {
    static armMenu(target, onSelected) {
      if (target != null) {
        target[$onMouseDown].listen(dart.fn(e => {
          menu.DropdownMenu._toggleMenu(target.querySelector(".context-menu"));
          e.stopPropagation();
        }, MouseEventLToNullN()));
        target[$querySelectorAll](html.Element, ".menu-item").onMouseDown.listen(dart.fn(e => {
          core.Function.apply(onSelected, [html.HtmlElement.as(e[$currentTarget])]);
        }, MouseEventLToNullN()));
      }
    }
    static closeAllMenus() {
      html.querySelectorAll(html.Element, ".context-menu").classes.add("hidden");
    }
    static _toggleMenu(menu) {
      if (menu != null) {
        html.querySelectorAll(html.Element, ".context-menu")[$forEach](dart.fn(m => {
          if (!dart.equals(menu, m)) m[$classes].add("hidden");
        }, ElementLToNullN()));
        menu[$classes].toggle("hidden");
      }
    }
  };
  (menu.DropdownMenu.new = function() {
    ;
  }).prototype = menu.DropdownMenu.prototype;
  dart.addTypeTests(menu.DropdownMenu);
  dart.addTypeCaches(menu.DropdownMenu);
  dart.setLibraryUri(menu.DropdownMenu, L0);
  var _dragging = dart.privateName(slider, "_dragging");
  var _value = dart.privateName(slider, "_value");
  var _disabled = dart.privateName(slider, "_disabled");
  var _touchY = dart.privateName(slider, "_touchY");
  var _line = dart.privateName(slider, "_line");
  var _knob = dart.privateName(slider, "_knob");
  var _knobGroup = dart.privateName(slider, "_knobGroup");
  var _knobImage = dart.privateName(slider, "_knobImage");
  var _updateDrawing = dart.privateName(slider, "_updateDrawing");
  var parent = dart.privateName(slider, "MixSlider.parent");
  var width$ = dart.privateName(slider, "MixSlider.width");
  var height$ = dart.privateName(slider, "MixSlider.height");
  var minValue = dart.privateName(slider, "MixSlider.minValue");
  var maxValue = dart.privateName(slider, "MixSlider.maxValue");
  var step = dart.privateName(slider, "MixSlider.step");
  var unit = dart.privateName(slider, "MixSlider.unit");
  var onChanged = dart.privateName(slider, "MixSlider.onChanged");
  var onAdjusted = dart.privateName(slider, "MixSlider.onAdjusted");
  var ticks = dart.privateName(slider, "MixSlider.ticks");
  slider.MixSlider = class MixSlider extends core.Object {
    get parent() {
      return this[parent];
    }
    set parent(value) {
      this[parent] = value;
    }
    get width() {
      return this[width$];
    }
    set width(value) {
      this[width$] = value;
    }
    get height() {
      return this[height$];
    }
    set height(value) {
      this[height$] = value;
    }
    get minValue() {
      return this[minValue];
    }
    set minValue(value) {
      this[minValue] = value;
    }
    get maxValue() {
      return this[maxValue];
    }
    set maxValue(value) {
      this[maxValue] = value;
    }
    get step() {
      return this[step];
    }
    set step(value) {
      this[step] = value;
    }
    get unit() {
      return this[unit];
    }
    set unit(value) {
      this[unit] = value;
    }
    get onChanged() {
      return this[onChanged];
    }
    set onChanged(value) {
      this[onChanged] = value;
    }
    get onAdjusted() {
      return this[onAdjusted];
    }
    set onAdjusted(value) {
      this[onAdjusted] = value;
    }
    get ticks() {
      return this[ticks];
    }
    set ticks(value) {
      this[ticks] = value;
    }
    get innerHeight() {
      return dart.notNull(this.height) - dart.notNull(this.knobRadius) * 2;
    }
    get y0() {
      return this.knobRadius;
    }
    get y1() {
      return dart.notNull(this.height) - dart.notNull(this.knobRadius);
    }
    get range() {
      return dart.notNull(this.maxValue) - dart.notNull(this.minValue);
    }
    get value() {
      let v = dart.notNull(this[_value]) * dart.notNull(this.range) + dart.notNull(this.minValue);
      if (this.step != null) {
        return (v / dart.notNull(this.step))[$round]() * dart.notNull(this.step);
      } else {
        return v;
      }
    }
    set value(v) {
      v = (dart.notNull(v) - dart.notNull(this.minValue)) / dart.notNull(this.range);
      this[_value] = math.max(core.num, 0.0, math.min(core.num, 1.0, v));
      this[_updateDrawing]();
    }
    get valueAsString() {
      return this.value[$toStringAsFixed](1) + dart.notNull(this.unit);
    }
    get valueAsY() {
      return this.valueToY(this[_value]);
    }
    valueToY(v) {
      return dart.notNull(this.y0) + (1.0 - dart.notNull(core.num.as(v))) * dart.notNull(this.innerHeight);
    }
    yToValue(y) {
      return 1.0 - dart.notNull(core.num.as(dart.dsend(dart.dsend(dart.dsend(y, '-', [this.y0]), '/', [this.innerHeight]), 'clamp', [0.0, 1.0])));
    }
    get disabled() {
      return this[_disabled];
    }
    set disabled(d) {
      this[_disabled] = d;
      this[_updateDrawing]();
    }
    get knobRadius() {
      return 18.0;
    }
    setKnobImage(href) {
      this[_knobImage][$attributes][$_set]("href", href);
    }
    addTickLabel(label, value) {
      this.ticks[$add](new _js_helper.LinkedMap.from(["label", label, "value", value]));
    }
    buildUI(container) {
      let t0;
      container[$append](this.parent);
      let widgetGroup = svg.GElement.new();
      this[_knobGroup][$attributes][$_set]("transform", "translate(" + dart.str(dart.notNull(this.width) / 2) + ", " + dart.str(this.valueAsY) + ")");
      widgetGroup[$nodes][$add](this[_line]);
      widgetGroup[$append](this[_knobGroup]);
      let tickGroup = svg.GElement.new();
      for (let tick of this.ticks) {
        let t = (t0 = svg.TextElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["x", dart.str(dart.notNull(this.width) / 2 - 8), "y", dart.str(this.valueToY(tick[$_get]("value"))), "class", "slider-tick-label"]), t0);
        t[$innerHtml] = dart.str(tick[$_get]("label"));
        tick[$_set]("svg", t);
        tickGroup[$append](t);
      }
      this.parent[$append](tickGroup);
      this.parent[$append](widgetGroup);
      this[_knobGroup][$onMouseDown].listen(dart.fn(e => {
        if (dart.test(this[_disabled])) return;
        this[_dragging] = true;
        this[_touchY] = e[$client].y;
        this[_knob][$classes].add("dragging");
      }, MouseEventLToNullN()));
      html.document[$onMouseUp].listen(dart.fn(e => {
        if (dart.test(this[_dragging]) && !dart.test(this[_disabled]) && this.onChanged != null) {
          core.Function.apply(this.onChanged, [this, this.value]);
        }
        if (dart.test(this[_dragging])) this[_knob][$classes].remove("dragging");
        this[_dragging] = false;
      }, MouseEventLToNullN()));
      html.document[$onMouseMove].listen(dart.fn(e => {
        if (dart.test(this[_dragging]) && !dart.test(this[_disabled])) {
          let deltaY = dart.notNull(this[_touchY]) - dart.notNull(e[$client].y);
          this[_touchY] = e[$client].y;
          this[_value] = this.yToValue(dart.notNull(this.valueAsY) - deltaY);
          this[_updateDrawing]();
          if (this.onAdjusted != null) {
            core.Function.apply(this.onAdjusted, [this, this.value]);
          }
        }
      }, MouseEventLToNullN()));
    }
    [_updateDrawing]() {
      if (this[_knobGroup] != null) {
        this[_knobGroup][$attributes][$_set]("transform", "translate(" + dart.str(dart.notNull(this.width) / 2) + ", " + dart.str(this.valueAsY) + ")");
      }
      if (dart.test(this.disabled)) {
        this[_line][$setAttribute]("stroke-opacity", "0");
      } else {
        this[_line][$setAttribute]("stroke-opacity", "1.0");
      }
    }
  };
  (slider.MixSlider.new = function(width, height) {
    let t0, t0$, t0$0, t0$1;
    this[parent] = null;
    this[width$] = 100;
    this[height$] = 300;
    this[minValue] = 0.0;
    this[maxValue] = 1.0;
    this[step] = null;
    this[unit] = "";
    this[onChanged] = null;
    this[onAdjusted] = null;
    this[ticks] = JSArrayOfMapL().of([]);
    this[_dragging] = false;
    this[_value] = 0.0;
    this[_disabled] = false;
    this[_touchY] = 0.0;
    this[_line] = null;
    this[_knob] = null;
    this[_knobGroup] = null;
    this[_knobImage] = null;
    this[width$] = width;
    this[height$] = height;
    this.parent = (t0 = svg.SvgSvgElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["viewBox", "0 0 " + dart.str(this.width) + " " + dart.str(this.height), "preserveAspectRatio", "none"]), t0);
    this[_line] = (t0$ = svg.LineElement.new(), t0$[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "slider-track", "x1", dart.str(dart.notNull(this.width) / 2), "y1", dart.str(this.y0), "x2", dart.str(dart.notNull(this.width) / 2), "y2", dart.str(this.y1)]), t0$);
    this[_knobGroup] = svg.GElement.new();
    this[_knob] = (t0$0 = svg.CircleElement.new(), t0$0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "slider-knob", "cx", "0", "cy", "0", "r", dart.str(this.knobRadius)]), t0$0);
    this[_knobImage] = (t0$1 = svg.ImageElement.new(), t0$1[$attributes] = new (IdentityMapOfStringL$StringL()).from(["x", "-" + dart.str(dart.notNull(this.knobRadius) * 0.7), "y", "-" + dart.str(dart.notNull(this.knobRadius) * 0.7), "width", dart.str(dart.notNull(this.knobRadius) * 1.4), "height", dart.str(dart.notNull(this.knobRadius) * 1.4), "pointer-events", "none", "href", "images/instruments/synth.svg"]), t0$1);
    this[_knobGroup][$append](this[_knob]);
    this[_knobGroup][$append](this[_knobImage]);
  }).prototype = slider.MixSlider.prototype;
  dart.addTypeTests(slider.MixSlider);
  dart.addTypeCaches(slider.MixSlider);
  dart.setMethodSignature(slider.MixSlider, () => ({
    __proto__: dart.getMethods(slider.MixSlider.__proto__),
    valueToY: dart.fnType(core.num, [dart.dynamic]),
    yToValue: dart.fnType(core.num, [dart.dynamic]),
    setKnobImage: dart.fnType(dart.void, [core.String]),
    addTickLabel: dart.fnType(dart.void, [core.String, core.num]),
    buildUI: dart.fnType(dart.void, [html.Element]),
    [_updateDrawing]: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(slider.MixSlider, () => ({
    __proto__: dart.getGetters(slider.MixSlider.__proto__),
    innerHeight: core.num,
    y0: core.num,
    y1: core.num,
    range: core.num,
    value: core.num,
    valueAsString: core.String,
    valueAsY: core.num,
    disabled: core.bool,
    knobRadius: core.num
  }));
  dart.setSetterSignature(slider.MixSlider, () => ({
    __proto__: dart.getSetters(slider.MixSlider.__proto__),
    value: core.num,
    disabled: core.bool
  }));
  dart.setLibraryUri(slider.MixSlider, L1);
  dart.setFieldSignature(slider.MixSlider, () => ({
    __proto__: dart.getFields(slider.MixSlider.__proto__),
    parent: dart.fieldType(svg.SvgSvgElement),
    width: dart.fieldType(core.num),
    height: dart.fieldType(core.num),
    minValue: dart.fieldType(core.num),
    maxValue: dart.fieldType(core.num),
    step: dart.fieldType(core.num),
    unit: dart.fieldType(core.String),
    onChanged: dart.fieldType(core.Function),
    onAdjusted: dart.fieldType(core.Function),
    ticks: dart.fieldType(core.List$(core.Map)),
    [_dragging]: dart.fieldType(core.bool),
    [_value]: dart.fieldType(core.num),
    [_disabled]: dart.fieldType(core.bool),
    [_touchY]: dart.fieldType(core.num),
    [_line]: dart.fieldType(svg.LineElement),
    [_knob]: dart.fieldType(svg.CircleElement),
    [_knobGroup]: dart.fieldType(svg.GElement),
    [_knobImage]: dart.fieldType(svg.ImageElement)
  }));
  dialog$.Dialog = class Dialog extends core.Object {
    static message(message) {
      let t0;
      let dialog = (t0 = html.DivElement.new(), t0.className = "dialog", t0);
      dialog[$innerHtml] = "    <p>" + dart.str(message) + "</p>\n    <div class='dialog-button-row'>\n      <button class=\"cancel-button primary\">OK</button>\n    </div>";
      dialog$.Dialog._showModal(dialog);
    }
    static openModal(templateSelector, fieldValues = null) {
      let template = html.TemplateElement.as(html.querySelector(templateSelector));
      if (template != null) {
        let frag = html.DocumentFragment.as(template.content[$clone](true));
        let dialog = html.DivElement.as(frag.querySelector(".dialog"));
        if (dialog != null && fieldValues != null) {
          for (let selector of fieldValues[$keys]) {
            let el = html.HtmlElement.as(dialog.querySelector(selector));
            if (el != null) el[$innerHtml] = dart.str(fieldValues[$_get](selector));
          }
        }
        dialog$.Dialog._showModal(dialog);
        return dialog;
      }
      return null;
    }
    static closeModal() {
      html.querySelectorAll(html.Element, ".overlay")[$forEach](dart.fn(o => {
        o[$remove]();
      }, ElementLToNullN()));
      html.querySelectorAll(html.Element, "body").classes.remove("modal-open");
    }
    static _showModal(dialog) {
      let t0;
      dialog$.Dialog.closeModal();
      if (dialog != null) {
        let overlay = (t0 = html.DivElement.new(), t0.className = "overlay", t0);
        html.querySelectorAll(html.Element, "body").classes.add("modal-open");
        dialog[$querySelectorAll](html.Element, ".close-button").onClick.listen(dart.fn(e => {
          dialog$.Dialog.closeModal();
        }, MouseEventLToNullN()));
        dialog[$querySelectorAll](html.Element, ".cancel-button").onClick.listen(dart.fn(e => {
          dialog$.Dialog.closeModal();
        }, MouseEventLToNullN()));
        overlay[$onMouseDown].listen(dart.fn(e => {
          dialog$.Dialog.closeModal();
        }, MouseEventLToNullN()));
        dialog[$onMouseDown].listen(dart.fn(e => {
          menu.DropdownMenu.closeAllMenus();
          e.stopPropagation();
        }, MouseEventLToNullN()));
        overlay[$append](dialog);
        html.document.body[$append](overlay);
      }
    }
  };
  (dialog$.Dialog.new = function() {
    ;
  }).prototype = dialog$.Dialog.prototype;
  dart.addTypeTests(dialog$.Dialog);
  dart.addTypeCaches(dialog$.Dialog);
  dart.setLibraryUri(dialog$.Dialog, L2);
  var _dragging$ = dart.privateName(dial, "_dragging");
  var _value$ = dart.privateName(dial, "_value");
  var _disabled$ = dart.privateName(dial, "_disabled");
  var _touchY$ = dart.privateName(dial, "_touchY");
  var _arc = dart.privateName(dial, "_arc");
  var _line$ = dart.privateName(dial, "_line");
  var _track = dart.privateName(dial, "_track");
  var _describeArc = dart.privateName(dial, "_describeArc");
  var _updateDrawing$ = dart.privateName(dial, "_updateDrawing");
  var name$ = dart.privateName(dial, "EffectsDial.name");
  var width = dart.privateName(dial, "EffectsDial.width");
  var height = dart.privateName(dial, "EffectsDial.height");
  var minValue$ = dart.privateName(dial, "EffectsDial.minValue");
  var maxValue$ = dart.privateName(dial, "EffectsDial.maxValue");
  var step$ = dart.privateName(dial, "EffectsDial.step");
  var values = dart.privateName(dial, "EffectsDial.values");
  var unit$ = dart.privateName(dial, "EffectsDial.unit");
  var onChanged$ = dart.privateName(dial, "EffectsDial.onChanged");
  var onAdjusted$ = dart.privateName(dial, "EffectsDial.onAdjusted");
  var knob = dart.privateName(dial, "EffectsDial.knob");
  dial.EffectsDial = class EffectsDial extends core.Object {
    get name() {
      return this[name$];
    }
    set name(value) {
      this[name$] = value;
    }
    get width() {
      return this[width];
    }
    set width(value) {
      this[width] = value;
    }
    get height() {
      return this[height];
    }
    set height(value) {
      this[height] = value;
    }
    get minValue() {
      return this[minValue$];
    }
    set minValue(value) {
      this[minValue$] = value;
    }
    get maxValue() {
      return this[maxValue$];
    }
    set maxValue(value) {
      this[maxValue$] = value;
    }
    get step() {
      return this[step$];
    }
    set step(value) {
      this[step$] = value;
    }
    get values() {
      return this[values];
    }
    set values(value) {
      this[values] = value;
    }
    get unit() {
      return this[unit$];
    }
    set unit(value) {
      this[unit$] = value;
    }
    get onChanged() {
      return this[onChanged$];
    }
    set onChanged(value) {
      this[onChanged$] = value;
    }
    get onAdjusted() {
      return this[onAdjusted$];
    }
    set onAdjusted(value) {
      this[onAdjusted$] = value;
    }
    get knob() {
      return this[knob];
    }
    set knob(value) {
      this[knob] = value;
    }
    get range() {
      return dart.notNull(this.maxValue) - dart.notNull(this.minValue);
    }
    get trackRadius() {
      return 37;
    }
    get knobRadius() {
      return 25;
    }
    get sweep() {
      return 3 * 3.141592653589793 / 2;
    }
    get value() {
      if (this.values != null && dart.notNull(this.values[$length]) > 0) {
        let index = ((dart.notNull(this.values[$length]) - 1) * dart.notNull(this[_value$]))[$round]();
        return this.values[$_get](index);
      }
      let v = dart.notNull(this[_value$]) * dart.notNull(this.range) + dart.notNull(this.minValue);
      if (this.step != null) {
        return (v / dart.notNull(this.step))[$round]() * dart.notNull(this.step);
      } else {
        return v;
      }
    }
    set value(v) {
      if (this.values != null && dart.test(this.values[$contains](v)) && dart.notNull(this.values[$length]) > 1) {
        v = dart.notNull(this.values[$indexOf](v)) / (dart.notNull(this.values[$length]) - 1);
      } else {
        v = (dart.notNull(v) - dart.notNull(this.minValue)) / dart.notNull(this.range);
      }
      this[_value$] = math.max(core.num, 0.0, math.min(core.num, 1.0, v));
      this[_updateDrawing$]();
    }
    get valueAsString() {
      if (this.values != null && dart.notNull(this.values[$length]) > 0) {
        return dart.toString(this.value) + dart.notNull(this.unit);
      } else {
        return this.value[$toStringAsFixed](1) + dart.notNull(this.unit);
      }
    }
    get disabled() {
      return this[_disabled$];
    }
    set disabled(d) {
      this[_disabled$] = d;
      this[_updateDrawing$]();
    }
    buildUI(container) {
      let t0, t0$, t0$0, t0$1, t0$2;
      let parent = (t0 = svg.SvgSvgElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["width", "100%", "viewBox", "0 0 " + dart.str(this.width) + " " + dart.str(this.height), "preserveAspectRatio", "none"]), t0);
      let widgetGroup = (t0$ = svg.GElement.new(), t0$[$attributes][$_set]("transform", "translate(" + dart.str(dart.notNull(this.width) / 2) + ", " + dart.str(dart.notNull(this.height) / 2) + ")"), t0$);
      let knobGroup = (t0$0 = svg.GElement.new(), t0$0[$attributes][$_set]("transform", "rotate(135, 0, 0)"), t0$0);
      widgetGroup[$nodes][$add](knobGroup);
      this.knob = (t0$1 = svg.CircleElement.new(), t0$1[$attributes] = new (IdentityMapOfStringL$StringL()).from(["cx", "0", "cy", "0", "r", dart.str(this.knobRadius), "fill", "none", "stroke", "#fff8", "stroke-opacity", "1", "stroke-width", "4"]), t0$1);
      knobGroup[$nodes][$add](this.knob);
      knobGroup[$nodes][$add](this[_track]);
      knobGroup[$nodes][$add](this[_arc]);
      knobGroup[$append](this[_line$]);
      let overlay = (t0$2 = svg.CircleElement.new(), t0$2[$attributes] = new (IdentityMapOfStringL$StringL()).from(["cx", "0", "cy", "0", "r", dart.str(this.trackRadius), "fill", "white", "fill-opacity", "0.0"]), t0$2);
      overlay.style[$cursor] = "ns-resize";
      widgetGroup[$nodes][$add](overlay);
      parent[$append](widgetGroup);
      container[$append](parent);
      overlay[$onMouseDown].listen(dart.fn(e => {
        if (dart.test(this[_disabled$])) return;
        this[_dragging$] = true;
        this[_touchY$] = e[$client].y;
        this.knob[$attributes][$_set]("fill", "#ccc");
      }, MouseEventLToNullN()));
      html.document[$onMouseUp].listen(dart.fn(e => {
        if (dart.test(this[_dragging$]) && !dart.test(this[_disabled$]) && this.onChanged != null) {
          core.Function.apply(this.onChanged, [this, this.value]);
        }
        this.knob[$attributes][$_set]("fill", "none");
        this[_dragging$] = false;
      }, MouseEventLToNullN()));
      html.document[$onMouseMove].listen(dart.fn(e => {
        if (dart.test(this[_dragging$]) && !dart.test(this[_disabled$])) {
          let deltaY = dart.notNull(this[_touchY$]) - dart.notNull(e[$client].y);
          this[_touchY$] = e[$client].y;
          this[_value$] = math.max(core.num, 0.0, math.min(core.num, 1.0, dart.notNull(this[_value$]) + deltaY / 50.0));
          this[_updateDrawing$]();
          if (this.onAdjusted != null) {
            core.Function.apply(this.onAdjusted, [this, this.value]);
          }
        }
      }, MouseEventLToNullN()));
    }
    [_describeArc](x, y, radius, startAngle, endAngle) {
      let sx = dart.notNull(radius) * math.cos(endAngle);
      let sy = dart.notNull(radius) * math.sin(endAngle);
      let ex = dart.notNull(radius) * math.cos(startAngle);
      let ey = dart.notNull(radius) * math.sin(startAngle);
      let large = dart.notNull(endAngle) >= 3.141592653589793 ? 1 : 0;
      return JSArrayOfObjectL().of(["M", ex, ey, "A", radius, radius, 0, large, 1, sx, sy])[$join](" ");
    }
    [_updateDrawing$]() {
      if (this[_line$] != null) {
        let r = dart.notNull(this.knobRadius) - 2;
        if (dart.test(this.disabled)) {
          this[_track][$setAttribute]("stroke-opacity", "0");
          this[_arc][$setAttribute]("stroke-opacity", "0");
          this[_line$][$setAttribute]("x1", dart.str(this.polarX(0.28, r)));
          this[_line$][$setAttribute]("y1", dart.str(this.polarY(0.28, r)));
          this[_line$][$setAttribute]("x2", dart.str(this.polarX(0.95, r)));
          this[_line$][$setAttribute]("y2", dart.str(this.polarY(0.95, r)));
        } else {
          this[_track][$setAttribute]("stroke-opacity", "0.5");
          this[_arc][$setAttribute]("stroke-opacity", "1.0");
          this[_line$][$setAttribute]("x1", "0");
          this[_line$][$setAttribute]("y1", "0");
          this[_line$][$setAttribute]("x2", dart.str(this.polarX(this[_value$], dart.notNull(this.knobRadius) - 2)));
          this[_line$][$setAttribute]("y2", dart.str(this.polarY(this[_value$], dart.notNull(this.knobRadius) - 2)));
        }
      }
      if (this[_arc] != null) {
        this[_arc][$setAttribute]("d", this[_describeArc](0, 0, this.trackRadius, 0, dart.notNull(this[_value$]) * 3 * 3.141592653589793 / 2));
      }
    }
    polarX(v, r) {
      return dart.notNull(r) * math.cos(dart.notNull(v) * dart.notNull(this.sweep));
    }
    polarY(v, r) {
      return dart.notNull(r) * math.sin(dart.notNull(v) * dart.notNull(this.sweep));
    }
  };
  (dial.EffectsDial.new = function(name) {
    let t0, t0$, t0$0;
    this[name$] = "LEVEL";
    this[width] = 100;
    this[height] = 80;
    this[minValue$] = 0.0;
    this[maxValue$] = 1.0;
    this[step$] = null;
    this[values] = null;
    this[unit$] = "";
    this[onChanged$] = null;
    this[onAdjusted$] = null;
    this[_dragging$] = false;
    this[_value$] = 0.0;
    this[_disabled$] = false;
    this[_touchY$] = 0.0;
    this[_arc] = null;
    this[_line$] = null;
    this[_track] = null;
    this[knob] = null;
    this[_track] = (t0 = svg.PathElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "dial-track", "d", this[_describeArc](0, 0, this.trackRadius, 0, this.sweep)]), t0);
    this[_arc] = (t0$ = svg.PathElement.new(), t0$[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "dial-track-fill", "d", this[_describeArc](0, 0, this.trackRadius, 0, dart.notNull(this[_value$]) * dart.notNull(this.sweep))]), t0$);
    this[_line$] = (t0$0 = svg.LineElement.new(), t0$0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["class", "dial-pointer", "x1", "0", "y1", "0", "x2", dart.str(this.polarX(this[_value$], this.knobRadius)), "y2", dart.str(this.polarY(this[_value$], this.knobRadius))]), t0$0);
    this.name = name;
  }).prototype = dial.EffectsDial.prototype;
  dart.addTypeTests(dial.EffectsDial);
  dart.addTypeCaches(dial.EffectsDial);
  dart.setMethodSignature(dial.EffectsDial, () => ({
    __proto__: dart.getMethods(dial.EffectsDial.__proto__),
    buildUI: dart.fnType(dart.void, [html.Element]),
    [_describeArc]: dart.fnType(core.String, [core.num, core.num, core.num, core.num, core.num]),
    [_updateDrawing$]: dart.fnType(dart.void, []),
    polarX: dart.fnType(core.num, [core.num, core.num]),
    polarY: dart.fnType(core.num, [core.num, core.num])
  }));
  dart.setGetterSignature(dial.EffectsDial, () => ({
    __proto__: dart.getGetters(dial.EffectsDial.__proto__),
    range: core.num,
    trackRadius: core.num,
    knobRadius: core.num,
    sweep: core.num,
    value: core.num,
    valueAsString: core.String,
    disabled: core.bool
  }));
  dart.setSetterSignature(dial.EffectsDial, () => ({
    __proto__: dart.getSetters(dial.EffectsDial.__proto__),
    value: core.num,
    disabled: core.bool
  }));
  dart.setLibraryUri(dial.EffectsDial, L3);
  dart.setFieldSignature(dial.EffectsDial, () => ({
    __proto__: dart.getFields(dial.EffectsDial.__proto__),
    name: dart.fieldType(core.String),
    width: dart.fieldType(core.num),
    height: dart.fieldType(core.num),
    minValue: dart.fieldType(core.num),
    maxValue: dart.fieldType(core.num),
    step: dart.fieldType(core.num),
    values: dart.fieldType(core.List$(core.num)),
    unit: dart.fieldType(core.String),
    onChanged: dart.fieldType(core.Function),
    onAdjusted: dart.fieldType(core.Function),
    [_dragging$]: dart.fieldType(core.bool),
    [_value$]: dart.fieldType(core.num),
    [_disabled$]: dart.fieldType(core.bool),
    [_touchY$]: dart.fieldType(core.num),
    [_arc]: dart.fieldType(svg.PathElement),
    [_line$]: dart.fieldType(svg.LineElement),
    [_track]: dart.fieldType(svg.PathElement),
    knob: dart.fieldType(svg.CircleElement)
  }));
  var _button = dart.privateName(dial, "_button");
  var _color = dart.privateName(dial, "_color");
  var cx$ = dart.privateName(dial, "ToggleButton.cx");
  var cy$ = dart.privateName(dial, "ToggleButton.cy");
  var radius$ = dart.privateName(dial, "ToggleButton.radius");
  var onChanged$0 = dart.privateName(dial, "ToggleButton.onChanged");
  dial.ToggleButton = class ToggleButton extends core.Object {
    get cx() {
      return this[cx$];
    }
    set cx(value) {
      this[cx$] = value;
    }
    get cy() {
      return this[cy$];
    }
    set cy(value) {
      this[cy$] = value;
    }
    get radius() {
      return this[radius$];
    }
    set radius(value) {
      this[radius$] = value;
    }
    get onChanged() {
      return this[onChanged$0];
    }
    set onChanged(value) {
      this[onChanged$0] = value;
    }
    get value() {
      return this[_value$];
    }
    set value(b) {
      this[_value$] = b;
      this[_button][$attributes][$_set]("fill", dart.test(this.value) ? this.color : "#555");
    }
    get color() {
      return this[_color];
    }
    set color(c) {
      this[_color] = c;
      this[_button][$attributes][$_set]("fill", dart.test(this.value) ? this.color : "#555");
    }
    buildUI(container) {
      let t0;
      let outline = (t0 = svg.CircleElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["cx", dart.str(this.cx), "cy", dart.str(this.cy), "r", dart.str(this.radius), "stroke", "white", "stroke-width", "2", "stroke-opacity", "0.5"]), t0);
      container[$append](outline);
      container[$append](this[_button]);
      this[_button][$onMouseEnter].listen(dart.fn(e => {
        outline[$attributes][$_set]("stroke-opacity", "1.0");
      }, MouseEventLToNullN()));
      this[_button][$onMouseLeave].listen(dart.fn(e => {
        outline[$attributes][$_set]("stroke-opacity", "0.5");
        this[_button][$attributes][$_set]("fill", dart.test(this.value) ? this.color : "#555");
      }, MouseEventLToNullN()));
      this[_button][$onMouseDown].listen(dart.fn(e => {
        this[_button][$attributes][$_set]("fill", "white");
      }, MouseEventLToNullN()));
      this[_button][$onClick].listen(dart.fn(e => {
        this.value = !dart.test(this.value);
        if (this.onChanged != null) core.Function.apply(this.onChanged, [this, this.value]);
      }, MouseEventLToNullN()));
    }
  };
  (dial.ToggleButton.new = function(cx, cy, radius) {
    let t0;
    this[_button] = null;
    this[onChanged$0] = null;
    this[_value$] = true;
    this[_color] = "cyan";
    this[cx$] = cx;
    this[cy$] = cy;
    this[radius$] = radius;
    this[_button] = (t0 = svg.CircleElement.new(), t0[$attributes] = new (IdentityMapOfStringL$StringL()).from(["cx", dart.str(this.cx), "cy", dart.str(this.cy), "r", dart.str(dart.notNull(this.radius) - 3), "fill", "cyan", "class", "mute-button"]), t0);
  }).prototype = dial.ToggleButton.prototype;
  dart.addTypeTests(dial.ToggleButton);
  dart.addTypeCaches(dial.ToggleButton);
  dart.setMethodSignature(dial.ToggleButton, () => ({
    __proto__: dart.getMethods(dial.ToggleButton.__proto__),
    buildUI: dart.fnType(dart.void, [svg.GElement])
  }));
  dart.setGetterSignature(dial.ToggleButton, () => ({
    __proto__: dart.getGetters(dial.ToggleButton.__proto__),
    value: core.bool,
    color: core.String
  }));
  dart.setSetterSignature(dial.ToggleButton, () => ({
    __proto__: dart.getSetters(dial.ToggleButton.__proto__),
    value: core.bool,
    color: core.String
  }));
  dart.setLibraryUri(dial.ToggleButton, L3);
  dart.setFieldSignature(dial.ToggleButton, () => ({
    __proto__: dart.getFields(dial.ToggleButton.__proto__),
    cx: dart.fieldType(core.num),
    cy: dart.fieldType(core.num),
    radius: dart.fieldType(core.num),
    [_button]: dart.fieldType(svg.CircleElement),
    onChanged: dart.fieldType(core.Function),
    [_value$]: dart.fieldType(core.bool),
    [_color]: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/ui/src/dial", {
    "package:ui/src/menu.dart": menu,
    "package:ui/src/slider.dart": slider,
    "package:ui/src/dialog.dart": dialog$,
    "package:ui/ui.dart": ui,
    "package:ui/src/dial.dart": dial
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["menu.dart","slider.dart","dialog.dart","dial.dart"],"names":[],"mappings":"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","file":"dial.ddc.js"}');
  // Exports:
  return {
    src__menu: menu,
    src__slider: slider,
    src__dialog: dialog$,
    ui: ui,
    src__dial: dial
  };
});

//# sourceMappingURL=dial.ddc.js.map
