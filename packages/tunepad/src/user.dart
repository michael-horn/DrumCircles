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
part of TunePad;


class User extends DataModel {

  /// uid
  String get uid => id.toString();

  /// logged in username string
  String displayName = null;

  /// logged in email
  String email = null;

  /// is this an anonymous user?
  bool anonymous = false;

  /// random color for an anonymous user
  String color;

  /// random icon for an anonymous user
  String icon;

  /// photograph URL for non-anonymous user
  String photo;

  Random _rand = new Random();


  User(dynamic id) : super(id);


/**
 * Create an anonymous user
 */
  User.anonymous() : super(null) {
    Uuid generator = new Uuid();
    this.id = generator.v1();
    this.name = "Anonymous";
    this.displayName = "Anonymous User";
    this.email = null;
    this.anonymous = true;
    this.color = _randomColor();
    this.icon = _randomIcon();
    this.photo = null;
  }


  Map save() {
    window.localStorage["$uid-color"] = this.color;
    window.localStorage["$uid-icon"] = this.icon;
    window.localStorage["$uid-display-name"] = this.displayName;
    window.localStorage.remove("$uid-photo");
    if (photo != null && photo.trim() != "" && photo != "null") {
      window.localStorage["$uid-photo"] = this.photo;
    }

    return {
      "id" : uid,
      "username" : name,
      "displayName" : displayName,
      "email" : email,
      "anonymous" : anonymous,
      "color" : color,
      "icon" : icon,
      "photo" : photo,
      "created" : created.toString(),
      "modified" : modified.toString()
    };
  }


  void load(Map userData) {
    this.id = toStr(userData['id'], null);
    this.name = toStr(userData['username'], null);
    this.email = toStr(userData['email'], null);
    this.anonymous = toBool(userData['anonymous'], true);
    this.color = toStr(userData['color'], _loadColor());
    this.icon = toStr(userData['icon'], _loadIcon());
    this.photo = toStr(userData['photo'], _loadPhoto());
    this.displayName = toStr(userData['displayName'], _loadDisplayName());
    this.created = toDateTime(userData['created']);
    this.modified = toDateTime(userData['modified']);
  }


  String _loadColor() {
    if (window.localStorage["$uid-color"] != null) {
      return window.localStorage["$uid-color"];
    } else {
      return _randomColor();
    }
  }


  String _loadPhoto() {
    if (window.localStorage["$uid-photo"] != null) {
      return window.localStorage["$uid-photo"];
    } else {
      return null;
    }
  }


  String _loadIcon() {
    if (window.localStorage["$uid-icon"] != null) {
      return window.localStorage["$uid-icon"];
    } else {
      return _randomIcon();
    }
  }


  String _loadDisplayName() {
    if (window.localStorage["$uid-display-name"] != null) {
      return window.localStorage["$uid-display-name"];
    } else if (name != null && name.trim() != "") {
      return name;
    } else if (email != null && email.trim() != "") {
      return email;
    } else {
      return "Anonymous User";
    }
  }


  String _randomColor() {
    String r = (127 + _rand.nextInt(128)).toRadixString(16);
    String g = (127 + _rand.nextInt(128)).toRadixString(16);
    String b = (127 + _rand.nextInt(128)).toRadixString(16);
    return "#$r$g$b";
  }


  String _randomIcon() {
    var icons = [
      "fa-user-astronaut",
      "fa-user-secret",
      "fa-user-ninja",
      "fa-dragon",
      "fa-cat",
      "fa-crow",
      "fa-dove",
      "fa-fish",
      "fa-frog",
      "fa-hippo",
      "fa-horse",
      "fa-spider"
    ];
    return icons[_rand.nextInt(icons.length)];
  }
}
