define(['dart_sdk', 'packages/ui/src/dial', 'packages/tunepad/tunepad'], function(dart_sdk, packages__ui__src__dial, packages__tunepad__tunepad) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const math = dart_sdk.math;
  const _js_helper = dart_sdk._js_helper;
  const convert = dart_sdk.convert;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const dialog = packages__ui__src__dial.src__dialog;
  const menu = packages__ui__src__dial.src__menu;
  const dial$ = packages__ui__src__dial.src__dial;
  const slider$ = packages__ui__src__dial.src__slider;
  const tunepad = packages__tunepad__tunepad.tunepad;
  var library = Object.create(dart.library);
  var main = Object.create(dart.library);
  var userlist = Object.create(dart.library);
  var $querySelectorAll = dartx.querySelectorAll;
  var $dataset = dartx.dataset;
  var $_get = dartx._get;
  var $contains = dartx.contains;
  var $onClick = dartx.onClick;
  var $classes = dartx.classes;
  var $forEach = dartx.forEach;
  var $innerHtml = dartx.innerHtml;
  var $remove = dartx.remove;
  var $add = dartx.add;
  var $children = dartx.children;
  var $clear = dartx.clear;
  var $append = dartx.append;
  var $length = dartx.length;
  var $clone = dartx.clone;
  var $_set = dartx._set;
  var $play = dartx.play;
  var $onPlay = dartx.onPlay;
  var $onEnded = dartx.onEnded;
  var $onPause = dartx.onPause;
  var $onMouseDown = dartx.onMouseDown;
  var $insertAdjacentElement = dartx.insertAdjacentElement;
  var $abs = dartx.abs;
  var $round = dartx.round;
  var $toStringAsFixed = dartx.toStringAsFixed;
  var $clamp = dartx.clamp;
  var $scrollIntoView = dartx.scrollIntoView;
  var $scrollBy = dartx.scrollBy;
  var $onMessage = dartx.onMessage;
  var $onError = dartx.onError;
  var $onOpen = dartx.onOpen;
  var $onBeforeUnload = dartx.onBeforeUnload;
  var $backgroundImage = dartx.backgroundImage;
  var $location = dartx.location;
  var $startsWith = dartx.startsWith;
  var $compareTo = dartx.compareTo;
  var $sort = dartx.sort;
  var $color = dartx.color;
  var MouseEventLToNullN = () => (MouseEventLToNullN = dart.constFn(dart.fnType(core.Null, [html.MouseEvent])))();
  var ElementLToNullN = () => (ElementLToNullN = dart.constFn(dart.fnType(core.Null, [html.Element])))();
  var dynamicToNullN = () => (dynamicToNullN = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  var LIElementLAndintLTovoid = () => (LIElementLAndintLTovoid = dart.constFn(dart.fnType(dart.void, [html.LIElement, core.int])))();
  var ListOfStringL = () => (ListOfStringL = dart.constFn(core.List$(core.String)))();
  var EventLToNullN = () => (EventLToNullN = dart.constFn(dart.fnType(core.Null, [html.Event])))();
  var dynamicAnddynamicAnddynamicToNullN = () => (dynamicAnddynamicAnddynamicToNullN = dart.constFn(dart.fnType(core.Null, [dart.dynamic, dart.dynamic, dart.dynamic])))();
  var UserLToNullN = () => (UserLToNullN = dart.constFn(dart.fnType(core.Null, [tunepad.User])))();
  var EffectsDialLAndnumLToNullN = () => (EffectsDialLAndnumLToNullN = dart.constFn(dart.fnType(core.Null, [dial$.EffectsDial, core.num])))();
  var JSArrayOfintL = () => (JSArrayOfintL = dart.constFn(_interceptors.JSArray$(core.int)))();
  var intLToNullN = () => (intLToNullN = dart.constFn(dart.fnType(core.Null, [core.int])))();
  var MixSliderLAndnumLToNullN = () => (MixSliderLAndnumLToNullN = dart.constFn(dart.fnType(core.Null, [slider$.MixSlider, core.num])))();
  var StringLToboolL = () => (StringLToboolL = dart.constFn(dart.fnType(core.bool, [core.String])))();
  var IdentityMapOfStringL$ObjectL = () => (IdentityMapOfStringL$ObjectL = dart.constFn(_js_helper.IdentityMap$(core.String, core.Object)))();
  var JSArrayOfUserL = () => (JSArrayOfUserL = dart.constFn(_interceptors.JSArray$(tunepad.User)))();
  var EventLTovoid = () => (EventLTovoid = dart.constFn(dart.fnType(dart.void, [html.Event])))();
  var UserLAndUserLTointL = () => (UserLAndUserLTointL = dart.constFn(dart.fnType(core.int, [tunepad.User, tunepad.User])))();
  const CT = Object.create(null);
  var L1 = "org-dartlang-app:///web/dart/userlist.dart";
  var L0 = "org-dartlang-app:///web/dart/library.dart";
  var _searchId = dart.privateName(library, "_searchId");
  var _dialog = dart.privateName(library, "_dialog");
  var _search = dart.privateName(library, "_search");
  var _setFilterOption = dart.privateName(library, "_setFilterOption");
  var _buildTrack = dart.privateName(library, "_buildTrack");
  var _isStarred = dart.privateName(library, "_isStarred");
  var _unstarTrack = dart.privateName(library, "_unstarTrack");
  var _starTrack = dart.privateName(library, "_starTrack");
  var _playPauseTrackPreview = dart.privateName(library, "_playPauseTrackPreview");
  var _addTrack = dart.privateName(library, "_addTrack");
  var _starKey = dart.privateName(library, "_starKey");
  var _pauseTrackPreview = dart.privateName(library, "_pauseTrackPreview");
  var _playTrackPreview = dart.privateName(library, "_playTrackPreview");
  var datastore$ = dart.privateName(library, "TrackLibrary.datastore");
  var filter = dart.privateName(library, "TrackLibrary.filter");
  var sort = dart.privateName(library, "TrackLibrary.sort");
  library.TrackLibrary = class TrackLibrary extends core.Object {
    get datastore() {
      return this[datastore$];
    }
    set datastore(value) {
      this[datastore$] = value;
    }
    get filter() {
      return this[filter];
    }
    set filter(value) {
      this[filter] = value;
    }
    get sort() {
      return this[sort];
    }
    set sort(value) {
      this[sort] = value;
    }
    show() {
      this[_dialog] = dialog.Dialog.openModal("#library-template");
      this[_search](this.filter, this.sort);
      this[_dialog][$querySelectorAll](html.Element, ".filter-option")[$forEach](dart.fn(el => {
        let f = el[$dataset][$_get]("filter");
        this[_setFilterOption](f, !dart.test(this.filter[$contains](f)));
        el[$onClick].listen(dart.fn(e => {
          this[_setFilterOption](f, !dart.test(el[$classes].contains("off")));
          this[_search](this.filter, this.sort);
        }, MouseEventLToNullN()));
      }, ElementLToNullN()));
      menu.DropdownMenu.armMenu(this[_dialog].querySelector(".sort-menu"), dart.fn(item => {
        let criteria = html.SpanElement.as(this[_dialog].querySelector(".sort-criteria"));
        if (criteria != null) criteria[$innerHtml] = core.String.as(dart.dload(item, 'innerHtml'));
        this.sort = core.String.as(dart.dsend(dart.dload(item, 'dataset'), '_get', ["sort"]));
        this[_search](this.filter, this.sort);
      }, dynamicToNullN()));
    }
    [_setFilterOption](f, off) {
      let el = this[_dialog].querySelector(".filter-option[data-filter='" + dart.str(f) + "']");
      this.filter[$remove](f);
      if (dart.test(off)) {
        el[$querySelectorAll](html.Element, "i").classes.add("far");
        el[$querySelectorAll](html.Element, "i").classes.add("fa-square");
        el[$querySelectorAll](html.Element, "i").classes.remove("fas");
        el[$querySelectorAll](html.Element, "i").classes.remove("fa-check-square");
        el[$classes].add("off");
      } else {
        el[$querySelectorAll](html.Element, "i").classes.remove("far");
        el[$querySelectorAll](html.Element, "i").classes.remove("fa-square");
        el[$querySelectorAll](html.Element, "i").classes.add("fas");
        el[$querySelectorAll](html.Element, "i").classes.add("fa-check-square");
        el[$classes].remove("off");
        this.filter[$add](f);
      }
    }
    [_search](filter, sort) {
      return async.async(dart.void, (function* _search() {
        let t0;
        let status = this[_dialog].querySelector(".track-count");
        let results = html.DivElement.as(this[_dialog].querySelector(".search-results"));
        results[$children][$clear]();
        if (status != null && results != null) {
          status[$innerHtml] = "Loading tracks...";
          this[_searchId] = dart.notNull(this[_searchId]) + 1;
          let tracks = (yield this.datastore.searchLibrary(filter, sort));
          let trackList = (t0 = html.UListElement.new(), t0.className = "track-list", t0);
          for (let t0$ of tracks) {
            let data = core.Map.as(t0$);
            let track = this[_buildTrack](data);
            if (track != null) trackList[$append](track);
          }
          status[$innerHtml] = "Showing " + dart.str(tracks[$length]) + " Tracks";
          results[$append](trackList);
        }
      }).bind(this));
    }
    [_buildTrack](data) {
      let t1;
      const _toggleStar = (track, id) => {
        dart.test(this[_isStarred](id)) ? this[_unstarTrack](track, id) : this[_starTrack](track, id);
      };
      dart.fn(_toggleStar, LIElementLAndintLTovoid());
      let template = html.TemplateElement.as(html.querySelector("#library-track-template"));
      let frag = html.DocumentFragment.as(template.content[$clone](true));
      let track = html.LIElement.as(frag.querySelector("li.track-item"));
      if (track == null) return null;
      track[$dataset][$_set]("id", dart.str(data[$_get]("id")));
      track[$querySelectorAll](html.Element, ".gadget-icon").classes.add(core.String.as(data[$_get]("instrument")));
      let audio = html.AudioElement.as(track.querySelector("audio"));
      if (audio != null) {
        let source = (t1 = html.SourceElement.new(), t1.src = dart.str(this.datastore.host) + "/api/library/audio/" + dart.str(data[$_get]("id")), t1);
        audio[$append](source);
      }
      let el = html.HtmlElement.as(track.querySelector(".track-title"));
      if (el != null) el[$innerHtml] = core.String.as(data[$_get]("name"));
      el[$onClick].listen(dart.fn(e => {
        this[_playPauseTrackPreview](track);
      }, MouseEventLToNullN()));
      el = html.HtmlElement.as(track.querySelector(".track-duration"));
      if (el != null) el[$innerHtml] = dart.str(data[$_get]("beats")) + " beats";
      el = html.HtmlElement.as(track.querySelector(".track-details .author"));
      let alink = html.AnchorElement.new();
      alink[$dataset][$_set]("uid", core.String.as(data[$_get]("uid")));
      alink[$innerHtml] = dart.str(data[$_get]("username"));
      alink.href = "#";
      alink[$onClick].listen(dart.fn(e => {
        e.preventDefault();
      }, MouseEventLToNullN()));
      if (el != null) {
        el[$innerHtml] = "by ";
        el[$append](alink);
      }
      el = html.HtmlElement.as(track.querySelector(".track-details .code"));
      if (el != null) el[$innerHtml] = dart.str(data[$_get]("line_count")) + " lines of Python code";
      el = html.HtmlElement.as(track.querySelector(".track-details .music"));
      if (el != null) el[$innerHtml] = dart.str(data[$_get]("tempo")) + " bpm | " + dart.str(data[$_get]("meter")) + " time | " + dart.str(data[$_get]("key"));
      el = html.HtmlElement.as(track.querySelector(".track-details .description"));
      if (el != null) el[$innerHtml] = dart.str(data[$_get]("description"));
      el = html.HtmlElement.as(track.querySelector(".track-details .modified"));
      let mod = ListOfStringL().as(dart.dsend(data[$_get]("modified"), 'split', ["."]));
      if (el != null && dart.notNull(mod[$length]) > 1) el[$innerHtml] = "Modified: " + dart.str(mod[$_get](0));
      track[$querySelectorAll](html.Element, ".gadget-icon").onClick.listen(dart.fn(e => {
        this[_playPauseTrackPreview](track);
      }, MouseEventLToNullN()));
      track[$querySelectorAll](html.Element, ".expand-button").onClick.listen(dart.fn(e => {
        track[$querySelectorAll](html.Element, ".expand-button i.fas").classes.toggle("fa-chevron-down");
        track[$querySelectorAll](html.Element, ".expand-button i.fas").classes.toggle("fa-chevron-up");
        track[$querySelectorAll](html.Element, ".track-details").classes.toggle("hidden");
      }, MouseEventLToNullN()));
      if (dart.test(this[_isStarred](core.int.as(data[$_get]("id"))))) {
        track[$querySelectorAll](html.Element, ".star-button i").classes.remove("far");
        track[$querySelectorAll](html.Element, ".star-button i").classes.add("fas");
      }
      el = html.HtmlElement.as(track.querySelector(".star-count"));
      if (el != null && dart.dtest(dart.dsend(data[$_get]("star_count"), '>', [0]))) {
        el[$innerHtml] = dart.str(data[$_get]("star_count"));
      }
      track[$querySelectorAll](html.Element, ".star-button").onClick.listen(dart.fn(e => {
        _toggleStar(track, core.int.as(data[$_get]("id")));
      }, MouseEventLToNullN()));
      track[$querySelectorAll](html.Element, ".add-button").onClick.listen(dart.fn(e => {
        this[_addTrack](data);
        dialog.Dialog.closeModal();
      }, MouseEventLToNullN()));
      return track;
    }
    [_addTrack](track) {
      this.datastore.remixTrack(core.int.as(track[$_get]("id")));
      this.datastore.clonePythonCell(track);
    }
    [_starKey](id) {
      return "/library/" + dart.str(this.datastore.user.uid) + "/stars/" + dart.str(id);
    }
    [_isStarred](id) {
      let key = this[_starKey](id);
      return html.window.localStorage[$_get](key) === "true";
    }
    [_starTrack](track, id) {
      return async.async(dart.void, (function* _starTrack() {
        let key = this[_starKey](id);
        track[$querySelectorAll](html.Element, ".star-button i").classes.remove("far");
        track[$querySelectorAll](html.Element, ".star-button i").classes.add("fas");
        html.window.localStorage[$_set](key, "true");
        let stats = core.Map.as(yield this.datastore.starTrack(id));
        let el = track.querySelector(".star-count");
        if (el != null) {
          el[$innerHtml] = dart.str(stats[$_get]("star_count"));
        }
      }).bind(this));
    }
    [_unstarTrack](track, id) {
      return async.async(dart.void, (function* _unstarTrack() {
        let key = this[_starKey](id);
        track[$querySelectorAll](html.Element, ".star-button i").classes.add("far");
        track[$querySelectorAll](html.Element, ".star-button i").classes.remove("fas");
        html.window.localStorage[$remove](key);
        let stats = core.Map.as(yield this.datastore.unstarTrack(id));
        let el = track.querySelector(".star-count");
        if (el != null) {
          el[$innerHtml] = dart.str(stats[$_get]("star_count"));
        }
      }).bind(this));
    }
    [_playPauseTrackPreview](track) {
      if (dart.dtest(dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'contains', ["playing"]))) {
        this[_pauseTrackPreview](track);
      } else {
        this[_playTrackPreview](track);
      }
    }
    [_pauseTrackPreview](track) {
      let audio = html.AudioElement.as(dart.dsend(track, 'querySelector', ["audio"]));
      if (audio != null) audio.pause();
    }
    [_playTrackPreview](track) {
      let audio = html.AudioElement.as(dart.dsend(track, 'querySelector', ["audio"]));
      if (audio == null) return;
      audio[$play]();
      let id = core.String.as(dart.dsend(dart.dload(track, 'dataset'), '_get', ["id"]));
      dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-play"]);
      dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-pause"]);
      dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'add', ["fa-headphones"]);
      dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'add', ["loading"]);
      dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["playing"]);
      audio[$onPlay].listen(dart.fn(e => {
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-play"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'add', ["fa-pause"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-headphones"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["loading"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'add', ["playing"]);
      }, EventLToNullN()));
      audio[$onEnded].listen(dart.fn(e => {
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'add', ["fa-play"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-pause"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-headphones"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["loading"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["playing"]);
      }, EventLToNullN()));
      audio[$onPause].listen(dart.fn(e => {
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'add', ["fa-play"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-pause"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon i"]), 'classes'), 'remove', ["fa-headphones"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["loading"]);
        dart.dsend(dart.dload(dart.dsend(track, 'querySelectorAll', [".gadget-icon"]), 'classes'), 'remove', ["playing"]);
      }, EventLToNullN()));
    }
  };
  (library.TrackLibrary.new = function(datastore) {
    this[filter] = ["bass", "drums", "guitar", "piano", "marimba", "sequencer", "definitions"];
    this[sort] = "modified";
    this[_searchId] = 0;
    this[_dialog] = null;
    this[datastore$] = datastore;
    ;
  }).prototype = library.TrackLibrary.prototype;
  dart.addTypeTests(library.TrackLibrary);
  dart.addTypeCaches(library.TrackLibrary);
  dart.setMethodSignature(library.TrackLibrary, () => ({
    __proto__: dart.getMethods(library.TrackLibrary.__proto__),
    show: dart.fnType(dart.void, []),
    [_setFilterOption]: dart.fnType(dart.void, [core.String, core.bool]),
    [_search]: dart.fnType(dart.void, [core.List, core.String]),
    [_buildTrack]: dart.fnType(html.LIElement, [core.Map]),
    [_addTrack]: dart.fnType(dart.void, [core.Map]),
    [_starKey]: dart.fnType(core.String, [core.int]),
    [_isStarred]: dart.fnType(core.bool, [core.int]),
    [_starTrack]: dart.fnType(dart.void, [html.LIElement, core.int]),
    [_unstarTrack]: dart.fnType(dart.void, [html.LIElement, core.int]),
    [_playPauseTrackPreview]: dart.fnType(dart.void, [dart.dynamic]),
    [_pauseTrackPreview]: dart.fnType(dart.void, [dart.dynamic]),
    [_playTrackPreview]: dart.fnType(dart.void, [dart.dynamic])
  }));
  dart.setLibraryUri(library.TrackLibrary, L0);
  dart.setFieldSignature(library.TrackLibrary, () => ({
    __proto__: dart.getFields(library.TrackLibrary.__proto__),
    datastore: dart.fieldType(tunepad.Datastore),
    filter: dart.fieldType(core.List),
    sort: dart.fieldType(core.String),
    [_searchId]: dart.fieldType(core.int),
    [_dialog]: dart.fieldType(html.DivElement)
  }));
  main.main = function main$() {
    return async.async(dart.void, function* main$() {
      main.datastore = new tunepad.Datastore.new("https://tunepad.club");
      main.socket = html.WebSocket.new("wss://tunepad.club:8765");
      main.project = new tunepad.Project.new(main.datastore.root, main.datastore);
      main.userlist = new userlist.UserList.new(main.socket);
      main.library = new library.TrackLibrary.new(main.datastore);
      if (dart.test(main.datastore.isEmpty)) {
        main.datastore.save(main.project);
        main.datastore.createPythonCell();
        main.datastore.isEmpty = false;
      }
      main.datastore.addAddedCallback("/" + dart.str(main.datastore.root) + "/cells", dart.fn((key, prevKey, data) => {
        let cell = new tunepad.PythonCell.new(key, main.datastore, main.project.clock, html.HtmlElement.as(html.querySelector("#code-tab")));
        main.project.addCell(cell, core.String.as(prevKey));
        main._addCellMenu(cell, core.String.as(prevKey));
        main._addMixTrack(cell, core.String.as(prevKey));
        main.datastore.addUpdateCallback(cell, dart.fn(data => {
          main._updateCellMenu(cell);
        }, dynamicToNullN()));
        main.datastore.addRemovedCallback(cell, dart.fn(data => {
          main._removeCellMenu(cell);
          main._removeMixTrack(cell);
        }, dynamicToNullN()));
      }, dynamicAnddynamicAnddynamicToNullN()));
      html.querySelectorAll(html.Element, "#add-cell-button").onClick.listen(dart.fn(e => {
        main.datastore.createPythonCell();
      }, MouseEventLToNullN()));
      main.datastore.addLoginCallback(dart.fn(user => {
        main.userlist.login(user);
      }, UserLToNullN()));
      main.datastore.addLogoutCallback(dart.fn(user => {
        main.userlist.logout(user);
      }, UserLToNullN()));
      html.querySelectorAll(html.Element, "#login-button").onClick.listen(dart.fn(e => {
        tunepad.UserAccounts.login(main.datastore);
      }, MouseEventLToNullN()));
      html.querySelectorAll(html.Element, "#logout-button").onClick.listen(dart.fn(e => {
        main.datastore.logout();
      }, MouseEventLToNullN()));
      html.querySelectorAll(html.Element, "#help-button").onClick.listen(dart.fn(e => {
        dialog.Dialog.openModal("#help-template");
      }, MouseEventLToNullN()));
      html.querySelectorAll(html.Element, "#library-button").onClick.listen(dart.fn(e => {
        main.library.show();
      }, MouseEventLToNullN()));
      html.document[$onMouseDown].listen(dart.fn(e => {
        menu.DropdownMenu.closeAllMenus();
      }, MouseEventLToNullN()));
      main.datastore.connect();
    });
  };
  main._addMixTrack = function _addMixTrack(cell, prevKey) {
    let container = html.DivElement.as(html.querySelector("#mixer-container"));
    let template = html.TemplateElement.as(html.querySelector("#mixer-template"));
    if (container != null && template != null) {
      let frag = html.DocumentFragment.as(template.content[$clone](true));
      let track = html.DivElement.as(frag.querySelector(".mixer-track"));
      if (track != null) {
        track.id = "mixer-" + dart.str(cell.id);
        let prev = html.DivElement.as(container.querySelector("#mixer-" + dart.str(prevKey)));
        if (prev != null) {
          prev[$insertAdjacentElement]("afterEnd", track);
        } else {
          container[$insertAdjacentElement]("afterBegin", track);
        }
        let dial = new dial$.EffectsDial.new("PAN: 0.0");
        dial.minValue = -1.0;
        dial.maxValue = 1.0;
        dial.value = cell.pan;
        dial.step = 0.05;
        dial.onAdjusted = dart.fn((d, value) => {
          let label = html.DivElement.as(track.querySelector(".mixer-dial-label"));
          if (label != null) {
            let v = (dart.notNull(value) * 100)[$abs]()[$round]();
            let d = dart.notNull(value) > 0 ? "R" : "L";
            label[$innerHtml] = v === 0 ? "PAN" : "PAN: " + dart.str(v) + "% " + d;
            cell.pan = value;
          }
        }, EffectsDialLAndnumLToNullN());
        dial.onChanged = dart.fn((d, value) => {
          main.datastore.save(cell);
        }, EffectsDialLAndnumLToNullN());
        let dialContainer = html.DivElement.as(track.querySelector(".mixer-dial"));
        if (dialContainer != null) {
          dial.buildUI(dialContainer);
        }
        let slider = new slider$.MixSlider.new(100, 300);
        slider.minValue = 0.0;
        slider.maxValue = 1.0;
        slider.value = main.gainToValue(cell.gain);
        let dbs = JSArrayOfintL().of([10, 5, 0, -5, -10, -20, -30]);
        dbs[$forEach](dart.fn(db => {
          slider.addTickLabel(dart.str(db) + " —", main.dBToValue(db));
        }, intLToNullN()));
        slider.addTickLabel("-INF —", 0.0);
        slider.onAdjusted = dart.fn((s, value) => {
          let db = main.valueTodB(value);
          let gain = main.dBToGain(db);
          cell.gain = gain;
          let label = html.DivElement.as(track.querySelector(".mixer-slider-label"));
          if (label != null) {
            label[$innerHtml] = "GAIN: " + main.gainTodB(cell.gain)[$toStringAsFixed](1) + " Db";
          }
        }, MixSliderLAndnumLToNullN());
        slider.onChanged = dart.fn((s, value) => {
          main.datastore.save(cell);
        }, MixSliderLAndnumLToNullN());
        let slideContainer = html.DivElement.as(track.querySelector(".mixer-slider"));
        if (slideContainer != null) {
          slider.buildUI(slideContainer);
        }
        track[$querySelectorAll](html.Element, ".mixer-play-button").onClick.listen(dart.fn(e => {
          cell.play();
        }, MouseEventLToNullN()));
        track[$querySelectorAll](html.Element, ".mixer-pause-button").onClick.listen(dart.fn(e => {
          cell.pause();
        }, MouseEventLToNullN()));
        track[$querySelectorAll](html.Element, ".mixer-solo-button").onClick.listen(dart.fn(e => {
          main.project.solo(cell);
        }, MouseEventLToNullN()));
        main.datastore.addUpdateCallback(cell, dart.fn(data => {
          track[$classes].removeWhere(dart.fn(cname => cname !== "mixer-track", StringLToboolL()));
          track[$classes].add(core.String.as(cell.settings[$_get]("instrument")));
          let name = html.DivElement.as(track.querySelector(".mixer-cell-name"));
          if (name != null) {
            name[$innerHtml] = cell.name;
          }
          let beats = html.DivElement.as(track.querySelector(".mixer-beats"));
          if (beats != null) {
            if (dart.test(cell.hasError)) {
              track[$classes].add("error");
              beats[$innerHtml] = "ERROR";
            } else {
              track[$classes].remove("error");
              beats[$innerHtml] = dart.str(cell.beats) + " BEATS";
            }
          }
          dial.value = cell.pan;
          slider.value = main.gainToValue(cell.gain);
          slider.setKnobImage("images/instruments/" + dart.str(cell.settings[$_get]("instrument")) + ".svg");
        }, dynamicToNullN()));
      }
    }
  };
  main.dBToGain = function dBToGain(dB) {
    return math.pow(10, dart.notNull(dB) / 20)[$clamp](0.0, 3.5);
  };
  main.gainTodB = function gainTodB(gain) {
    return 20 * math.log(gain) / 2.302585092994046;
  };
  main.dBToValue = function dBToValue(dB) {
    return math.pow(10, dart.notNull(dB) / 40) / 1.78;
  };
  main.gainToValue = function gainToValue(gain) {
    return main.dBToValue(main.gainTodB(gain));
  };
  main.valueTodB = function valueTodB(value) {
    return 40 * math.log(1.78 * dart.notNull(value)) / 2.302585092994046;
  };
  main._removeMixTrack = function _removeMixTrack(cell) {
    let track = html.DivElement.as(html.querySelector("#mixer-" + dart.str(cell.id)));
    if (track != null) track[$remove]();
  };
  main._addCellMenu = function _addCellMenu(cell, prevKey) {
    let list = html.UListElement.as(html.querySelector(".cell-nav .cell-list"));
    let template = html.TemplateElement.as(html.querySelector("#cell-nav-template"));
    if (list != null && template != null) {
      let frag = html.DocumentFragment.as(template.content[$clone](true));
      let item = frag.querySelector("li");
      if (item != null) {
        item.id = "cell-nav-" + dart.str(cell.id);
        item[$querySelectorAll](html.Element, ".shortcut-play-button").onClick.listen(dart.fn(e => {
          if (cell != null) cell.play();
        }, MouseEventLToNullN()));
        item[$querySelectorAll](html.Element, ".shortcut-pause-button").onClick.listen(dart.fn(e => {
          if (cell != null) cell.pause();
        }, MouseEventLToNullN()));
        item[$querySelectorAll](html.Element, ".shortcut-cell-name").onClick.listen(dart.fn(e => {
          cell.root[$scrollIntoView]();
          html.window[$scrollBy](new (IdentityMapOfStringL$ObjectL()).from(["top", -50, "left", 0, "behavior", "smooth"]));
        }, MouseEventLToNullN()));
        let prev = list.querySelector("#cell-nav-" + dart.str(prevKey));
        if (prev != null) {
          prev[$insertAdjacentElement]("afterEnd", item);
        } else {
          list[$insertAdjacentElement]("afterBegin", item);
        }
      }
    }
  };
  main._removeCellMenu = function _removeCellMenu(cell) {
    let item = html.querySelector("#cell-nav-" + dart.str(cell.id));
    if (item != null) item[$remove]();
  };
  main._updateCellMenu = function _updateCellMenu(cell) {
    let item = html.querySelector("#cell-nav-" + dart.str(cell.id));
    if (item != null) {
      let cellName = html.DivElement.as(item.querySelector(".shortcut-cell-name"));
      if (cellName != null) {
        cellName[$innerHtml] = cell.name;
        cellName[$classes].removeWhere(dart.fn(cname => cname !== "shortcut-cell-name", StringLToboolL()));
        cellName[$classes].add(core.String.as(cell.settings[$_get]("instrument")));
      }
    }
  };
  dart.defineLazy(main, {
    /*main.datastore*/get datastore() {
      return null;
    },
    set datastore(_) {},
    /*main.project*/get project() {
      return null;
    },
    set project(_) {},
    /*main.userlist*/get userlist() {
      return null;
    },
    set userlist(_) {},
    /*main.library*/get library() {
      return null;
    },
    set library(_) {},
    /*main.socket*/get socket() {
      return null;
    },
    set socket(_) {}
  }, true);
  var _handleMessage = dart.privateName(userlist, "_handleMessage");
  var _sendAction = dart.privateName(userlist, "_sendAction");
  var _buildUserList = dart.privateName(userlist, "_buildUserList");
  var _buildVisitor = dart.privateName(userlist, "_buildVisitor");
  var me = dart.privateName(userlist, "UserList.me");
  var datastore = dart.privateName(userlist, "UserList.datastore");
  var socket$ = dart.privateName(userlist, "UserList.socket");
  var visitors = dart.privateName(userlist, "UserList.visitors");
  userlist.UserList = class UserList extends core.Object {
    get me() {
      return this[me];
    }
    set me(value) {
      this[me] = value;
    }
    get datastore() {
      return this[datastore];
    }
    set datastore(value) {
      this[datastore] = value;
    }
    get socket() {
      return this[socket$];
    }
    set socket(value) {
      this[socket$] = value;
    }
    get visitors() {
      return this[visitors];
    }
    set visitors(value) {
      this[visitors] = value;
    }
    rollcall() {
      if (this.me != null && this.socket != null && this.socket.readyState === 1) {
        core.print("rollcall");
        this.visitors[$clear]();
        this[_sendAction]("userlist-rollcall");
      }
    }
    login(user) {
      if (this.me == null) this[_sendAction]("userlist-rollcall");
      this.me = user;
      this[_sendAction]("userlist-join");
      let button = html.ButtonElement.as(html.querySelector("#profile-button"));
      if (button != null) {
        button.title = this.me.displayName;
        if (!dart.test(this.me.anonymous) && this.me.photo != null) {
          button[$classes].add("photo");
          button.style[$backgroundImage] = "url('" + dart.str(this.me.photo) + "')";
        } else {
          button[$classes].remove("photo");
          button.style[$backgroundImage] = "none";
        }
      }
      if (dart.test(user.anonymous)) {
        html.querySelectorAll(html.Element, "#login-button").classes.remove("hidden");
        html.querySelectorAll(html.Element, "#logout-button").classes.add("hidden");
        html.querySelectorAll(html.Element, "main").classes.clear();
        html.querySelectorAll(html.Element, "main").classes.add("anonymous");
      } else {
        html.querySelectorAll(html.Element, "#login-button").classes.add("hidden");
        html.querySelectorAll(html.Element, "#logout-button").classes.remove("hidden");
        html.querySelectorAll(html.Element, "main").classes.clear();
        html.querySelectorAll(html.Element, "main").classes.add("authenticated");
      }
    }
    logout(user) {
      core.print("userlist logout");
      this[_sendAction]("userlist-leave");
      this.me = user;
      let button = html.ButtonElement.as(html.querySelector("#profile-button"));
      if (button != null) {
        button[$classes].remove("photo");
        button.style[$backgroundImage] = "none";
      }
      html.querySelectorAll(html.Element, "#login-button").classes.remove("hidden");
      html.querySelectorAll(html.Element, "#logout-button").classes.add("hidden");
      html.querySelectorAll(html.Element, "main").classes.clear();
    }
    [_sendAction](action) {
      if (this.me != null && this.socket != null && this.socket.readyState === 1) {
        let userData = this.me.save();
        let path = dart.notNull(html.window[$location].pathname) + dart.notNull(html.window[$location].hash);
        this.socket.send(convert.jsonEncode(new (IdentityMapOfStringL$ObjectL()).from(["action", action, "path", path, "user", userData])));
      }
    }
    [_handleMessage](message) {
      try {
        core.print(dart.dload(message, 'data'));
        let data = core.Map.as(convert.jsonDecode(core.String.as(dart.dload(message, 'data'))));
        let userData = core.Map.as(data[$_get]("user"));
        let action = core.String.as(data[$_get]("action"));
        let path = core.String.as(data[$_get]("path"));
        let mypath = dart.notNull(html.window[$location].pathname) + dart.notNull(html.window[$location].hash);
        if (action == null || path !== mypath) return;
        if (!action[$startsWith]("userlist")) return;
        if (action === "userlist-rollcall" && this.me != null) {
          this[_sendAction]("userlist-present");
          return;
        }
        if (userData == null) return;
        if (this.me != null && dart.equals(userData[$_get]("id"), this.me.id)) return;
        let visitor = new tunepad.User.new(userData[$_get]("id"));
        visitor.load(userData);
        if (action === "userlist-join" || action === "userlist-present") {
          if (!dart.test(this.visitors[$contains](visitor))) {
            this.visitors[$add](visitor);
            this[_buildUserList]();
          }
        } else if (action === "userlist-leave") {
          if (dart.test(this.visitors[$contains](visitor))) {
            this.visitors[$remove](visitor);
            this[_buildUserList]();
          }
        }
      } catch (e$) {
        let e = dart.getThrown(e$);
        core.print("Invalid websocket message " + dart.str(dart.dload(message, 'data')));
        return;
      }
    }
    [_buildUserList]() {
      let list = html.UListElement.as(html.querySelector("#userlist"));
      if (list != null) {
        list[$children][$clear]();
        this.visitors[$sort](dart.fn((a, b) => a.uid[$compareTo](b.uid), UserLAndUserLTointL()));
        for (let visitor of this.visitors) {
          if (!dart.equals(visitor, this.me)) list[$append](this[_buildVisitor](visitor));
        }
      }
    }
    [_buildVisitor](visitor) {
      let t2, t2$;
      let item = (t2 = html.LIElement.new(), t2.id = "user-" + dart.str(visitor.uid), t2.title = visitor.name, t2);
      let i = (t2$ = html.Element.html("<i></i>"), t2$.className = "fas " + dart.str(visitor.icon), t2$.style[$color] = visitor.color, t2$);
      item[$append](i);
      if (!dart.test(visitor.anonymous) && visitor.photo != null && visitor.photo !== "null") {
        item[$classes].add("known");
        item.style[$backgroundImage] = "url('" + dart.str(visitor.photo) + "')";
      }
      return item;
    }
  };
  (userlist.UserList.new = function(socket) {
    this[me] = null;
    this[datastore] = null;
    this[visitors] = JSArrayOfUserL().of([]);
    this[socket$] = socket;
    this.socket[$onMessage].listen(dart.bind(this, _handleMessage));
    this.socket[$onError].listen(dart.fn(e => {
      core.print("Socket error: " + dart.str(e));
    }, EventLToNullN()));
    this.socket[$onOpen].listen(dart.fn(e => {
      if (this.me != null) {
        this[_sendAction]("userlist-join");
        this[_sendAction]("userlist-rollcall");
      }
    }, EventLToNullN()));
    html.window[$onBeforeUnload].listen(dart.fn(e => this[_sendAction]("userlist-leave"), EventLTovoid()));
  }).prototype = userlist.UserList.prototype;
  dart.addTypeTests(userlist.UserList);
  dart.addTypeCaches(userlist.UserList);
  dart.setMethodSignature(userlist.UserList, () => ({
    __proto__: dart.getMethods(userlist.UserList.__proto__),
    rollcall: dart.fnType(dart.void, []),
    login: dart.fnType(dart.void, [tunepad.User]),
    logout: dart.fnType(dart.void, [tunepad.User]),
    [_sendAction]: dart.fnType(dart.void, [core.String]),
    [_handleMessage]: dart.fnType(dart.void, [dart.dynamic]),
    [_buildUserList]: dart.fnType(dart.void, []),
    [_buildVisitor]: dart.fnType(html.LIElement, [tunepad.User])
  }));
  dart.setLibraryUri(userlist.UserList, L1);
  dart.setFieldSignature(userlist.UserList, () => ({
    __proto__: dart.getFields(userlist.UserList.__proto__),
    me: dart.fieldType(tunepad.User),
    datastore: dart.fieldType(tunepad.Datastore),
    socket: dart.fieldType(html.WebSocket),
    visitors: dart.fieldType(core.List$(tunepad.User))
  }));
  dart.trackLibraries("web/dart/library", {
    "org-dartlang-app:///web/dart/library.dart": library,
    "org-dartlang-app:///web/dart/main.dart": main,
    "org-dartlang-app:///web/dart/userlist.dart": userlist
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["library.dart","main.dart","userlist.dart"],"names":[],"mappings":"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","file":"library.ddc.js"}');
  // Exports:
  return {
    web__dart__library: library,
    web__dart__main: main,
    web__dart__userlist: userlist
  };
});

//# sourceMappingURL=library.ddc.js.map
