import 'dart:js' as js;
import 'dart:html';
import 'dart:convert';
import 'package:ui/ui.dart';
import 'package:tunepad/tunepad.dart';


/**
 * MP3 has distortion on high hats
 * Drumkits aren't showing up
 * Add button
 * Remix counter
 * Sort menu with "My tracks" option
 */

class TrackLibrary {

  Datastore datastore;

  List filter = [
    "bass", "drums", "guitar", "piano", "marimba", "sequencer", "definitions"
  ];

/**
 * Sort by: modified, popular, remixed, duration-up, duration-dn, name
 */
  String sort = "modified";

  int _searchId = 0;

  DivElement _dialog = null;


  TrackLibrary(this.datastore);


  void show() {
    _dialog = Dialog.openModal("#library-template");
    _search(filter, sort);

    _dialog.querySelectorAll(".filter-option").forEach((el) {
      String f = el.dataset['filter'];
      _setFilterOption(f, !filter.contains(f));
      el.onClick.listen((e) {
        _setFilterOption(f, !el.classes.contains('off'));
        _search(filter, sort);
      });
    });

    DropdownMenu.armMenu(_dialog.querySelector(".sort-menu"), (item) {
      SpanElement criteria = _dialog.querySelector(".sort-criteria");
      if (criteria != null) criteria.innerHtml = item.innerHtml;
      this.sort = item.dataset['sort'];
      _search(filter, sort);
    });
  }



  void _setFilterOption(String f, bool off) {
    Element el = _dialog.querySelector(".filter-option[data-filter='$f']");
    filter.remove(f);
    if (off) {
      el.querySelectorAll("i").classes.add("far");
      el.querySelectorAll("i").classes.add("fa-square");
      el.querySelectorAll("i").classes.remove("fas");
      el.querySelectorAll("i").classes.remove("fa-check-square");
      el.classes.add("off");
    } else {
      el.querySelectorAll("i").classes.remove("far");
      el.querySelectorAll("i").classes.remove("fa-square");
      el.querySelectorAll("i").classes.add("fas");
      el.querySelectorAll("i").classes.add("fa-check-square");
      el.classes.remove("off");
      filter.add(f);
    }
  }


  void _search(List filter, String sort) async {
    Element status = _dialog.querySelector(".track-count");
    DivElement results = _dialog.querySelector(".search-results");
    results.children.clear();

    if (status != null && results != null) {
      status.innerHtml = "Loading tracks...";
      _searchId++;
      List tracks = await datastore.searchLibrary(filter, sort);
      UListElement trackList = new UListElement() .. className = "track-list";
      for (Map data in tracks) {
        LIElement track = _buildTrack(data);
        if (track != null) trackList.append(track);
      }
      status.innerHtml = "Showing ${tracks.length} Tracks";
      results.append(trackList);
    }
  }


  LIElement _buildTrack(Map data) {
    void _toggleStar(LIElement track, int id) {
      _isStarred(id) ? _unstarTrack(track, id) : _starTrack(track, id);
    }

    TemplateElement template = querySelector("#library-track-template");
    DocumentFragment frag = template.content.clone(true);
    LIElement track = frag.querySelector("li.track-item");
    if (track == null) return null;

    // track id
    track.dataset['id'] = "${data['id']}";

    // gadget icon type
    track.querySelectorAll(".gadget-icon").classes.add(data['instrument']);

    // audio source
    AudioElement audio = track.querySelector("audio");
    if (audio != null) {
      SourceElement source = new SourceElement()
        .. src = "${datastore.host}/api/library/audio/${data['id']}";
      audio.append(source);
    }

    // track name
    HtmlElement el = track.querySelector(".track-title");
    if (el != null) el.innerHtml = data['name'];
    el.onClick.listen((e) { _playPauseTrackPreview(track); });

    // track duration
    el = track.querySelector(".track-duration");
    if (el != null) el.innerHtml = "${data['beats']} beats";

    // track author
    el = track.querySelector(".track-details .author");
    AnchorElement alink = new AnchorElement();
    alink.dataset['uid'] = data['uid'];
    alink.innerHtml = "${data['username']}";
    alink.href = "#";
    alink.onClick.listen((e) {
      e.preventDefault();
    });
    if (el != null) {
      el.innerHtml = "by ";
      el.append(alink);
    }

    // track code line count
    el = track.querySelector(".track-details .code");
    if (el != null) el.innerHtml = "${data['line_count']} lines of Python code";

    // music details
    el = track.querySelector(".track-details .music");
    if (el != null) el.innerHtml = "${data['tempo']} bpm | ${data['meter']} time | ${data['key']}";

    // track description
    el = track.querySelector(".track-details .description");
    if (el != null) el.innerHtml = "${data['description']}";

    // track modified date
    el = track.querySelector(".track-details .modified");
    List<String> mod = data['modified'].split('.');
    if (el != null && mod.length > 1) el.innerHtml = "Modified: ${mod[0]}";

    // play button
    track.querySelectorAll(".gadget-icon").onClick.listen((e) { _playPauseTrackPreview(track); });

    // expand button
    track.querySelectorAll(".expand-button").onClick.listen((e) {
      track.querySelectorAll(".expand-button i.fas").classes.toggle("fa-chevron-down");
      track.querySelectorAll(".expand-button i.fas").classes.toggle("fa-chevron-up");
      track.querySelectorAll(".track-details").classes.toggle("hidden");
    });

    // star button
    if (_isStarred(data['id'])) {
      track.querySelectorAll(".star-button i").classes.remove("far");
      track.querySelectorAll(".star-button i").classes.add("fas");
    }
    el = track.querySelector(".star-count");
    if (el != null && data['star_count'] > 0) { el.innerHtml = "${data['star_count']}"; }

    track.querySelectorAll(".star-button").onClick.listen((e) {
      _toggleStar(track, data['id']);
    });

    // add button
    track.querySelectorAll(".add-button").onClick.listen((e) {
      _addTrack(data);
      Dialog.closeModal();
    });

    return track;
  }


  void _addTrack(Map track) {
    datastore.remixTrack(track['id']);
    datastore.clonePythonCell(track);
  }


  String _starKey(int id) {
    return "/library/${datastore.user.uid}/stars/$id";
  }

  bool _isStarred(int id) {
    String key = _starKey(id);
    return window.localStorage[key] == "true";
  }

  void _starTrack(LIElement track, int id) async {
    String key = _starKey(id);
    track.querySelectorAll(".star-button i").classes.remove("far");
    track.querySelectorAll(".star-button i").classes.add("fas");
    window.localStorage[key] = "true";
    Map stats = await datastore.starTrack(id);
    Element el = track.querySelector(".star-count");
    if (el != null) { el.innerHtml = "${stats['star_count']}"; }
  }

  void _unstarTrack(LIElement track, int id) async {
    String key = _starKey(id);
    track.querySelectorAll(".star-button i").classes.add("far");
    track.querySelectorAll(".star-button i").classes.remove("fas");
    window.localStorage.remove(key);
    Map stats = await datastore.unstarTrack(id);
    Element el = track.querySelector(".star-count");
    if (el != null) { el.innerHtml = "${stats['star_count']}"; }
  }


  void _playPauseTrackPreview(track) {
    if (track.querySelectorAll(".gadget-icon").classes.contains("playing")) {
      _pauseTrackPreview(track);
    } else {
      _playTrackPreview(track);
    }
  }


  void _pauseTrackPreview(track) {
    AudioElement audio = (track.querySelector("audio") as AudioElement);
    if (audio != null) audio.pause();
  }


  void _playTrackPreview(track) {
    AudioElement audio = track.querySelector("audio");
    if (audio == null) return;
    audio.play();

    String id = track.dataset['id'];

    // show loading spinner
    track.querySelectorAll(".gadget-icon i").classes.remove("fa-play");
    track.querySelectorAll(".gadget-icon i").classes.remove("fa-pause");
    track.querySelectorAll(".gadget-icon i").classes.add("fa-headphones");
    track.querySelectorAll(".gadget-icon").classes.add("loading");
    track.querySelectorAll(".gadget-icon").classes.remove("playing");

    // show the pause button
    audio.onPlay.listen((e) {
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-play");
      track.querySelectorAll(".gadget-icon i").classes.add("fa-pause");
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-headphones");
      track.querySelectorAll(".gadget-icon").classes.remove("loading");
      track.querySelectorAll(".gadget-icon").classes.add("playing");
    });

    // when the audio is complete, show the play button again
    audio.onEnded.listen((e) {
      track.querySelectorAll(".gadget-icon i").classes.add("fa-play");
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-pause");
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-headphones");
      track.querySelectorAll(".gadget-icon").classes.remove("loading");
      track.querySelectorAll(".gadget-icon").classes.remove("playing");
    });

    // when the audio is paused, show the play button again
    audio.onPause.listen((e) {
      track.querySelectorAll(".gadget-icon i").classes.add("fa-play");
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-pause");
      track.querySelectorAll(".gadget-icon i").classes.remove("fa-headphones");
      track.querySelectorAll(".gadget-icon").classes.remove("loading");
      track.querySelectorAll(".gadget-icon").classes.remove("playing");
    });
  }
}
