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


/**
 * Abstract data model class. Anything saved in the datastore must implement
 */
abstract class DataModel {

  /// unique datastore identifier for this object
  dynamic id = null;

  /// name of the model
  String name = "";

  /// date time of creation
  DateTime created = new DateTime.now();
  String get createdString => formatDateTime(created);

  /// time of the recording (last modified date)
  DateTime modified = new DateTime.now();
  String get modifiedString => formatDateTime(modified);


  DataModel(this.id);


/**
 * serialize this object to a JSON-like map for the datastore
 */
  Map save();


/**
 * restore this object from a JSON-like map from the datastore
 */
  void load(Map settings);


/**
 * Equality is defined as matching keys
 */
  bool operator==(User other) => (this.id == other.id);


/**
 * format a date-time object to be human-readable
 */
  String formatDateTime(DateTime d) {
    var m = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return "${m[d.month - 1]} ${d.day}, ${d.year}";
  }


  String createCloneName() {
    if (name == null) {
      return "New Item";
    }
    else if (name.indexOf(" Copy") < 0) {
      return name + " Copy";
    }
    else if (name.endsWith(" Copy")) {
      return name + " 2";
    }
    else {
      for (int i=2; i<50; i++) {
        if (name.endsWith(" $i")) {
          String result = name.substring(0, name.length - 2);
          return result + " ${i + 1}";
        }
      }
    }
    return "${name} Copy";
  }
}


/**
 * Interface to firebase
 */
class Datastore {

  /// Username must:
  /// 1. consist of letters, numbers, dashes, periods, underscores
  /// 2. Must start and end with a letter or number
  static final String REGEXP_USERNAME =
  //r"\w*[a-zA-Z]\w*";
  //r"^[/\p{L}/u0-9.-_]$";
  r"^[a-zA-Z0-9]*[a-zA-Z0-9._-]*[a-zA-Z0-9]$";  /// FIXME breaks on non-ascii laniña

  /// Standard email regular expression
  static final String REGEXP_EMAIL =
  r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$";


  /// database host URL
  String host;

  // initialize firebase
  final Map _credentials = {
    "apiKey" : "AIzaSyBccCx1WaXXMqf8tq-_1dwO2qr76f6RHFo",
    "authDomain" : "tunepadbeta.firebaseapp.com",
    "databaseURL" : "https://tunepadbeta.firebaseio.com",
    "projectId" : "tunepadbeta",
    "storageBucket" : "tunepadbeta.appspot.com",
    "messagingSenderId" : "803854221469",
    "appId" : "1:803854221469:web:59b8d6beedab219d7bd474"
  };


  /// unique datastore identifier for this project
  dynamic root = null;

  /// is this a freshly created project?
  bool isEmpty = true;

  /// this user account
  User user = new User.anonymous();

  /// active update callback functions
  Map<String, List<Function>> _updates = new Map<String, List<Function>>();
  Map<String, List<Function>> _adds = new Map<String, List<Function>>();
  Map<String, List<Function>> _removes = new Map<String, List<Function>>();

  /// authentication callbacks
  List<Function> _logins = new List<Function>();
  List<Function> _logouts = new List<Function>();


  Datastore(this.host) {
    js.context['onFirebaseUpdate'] = _onUpdated;
    js.context['onFirebaseAdded'] = _onAdded;
    js.context['onFirebaseRemoved'] = _onRemoved;
    js.context['onFirebaseLogin'] = _onConnect;
    js.context['onFirebaseLogout'] = _onLogout;
    this.isEmpty = js.context.callMethod('firebaseInit', [ jsonEncode(_credentials) ]);
    this.root = js.context.callMethod('firebaseRoot', [ ]);
  }


/**
 * Check the database session to see if the user is already logged in
 */
  void connect() async {
    try {
      var data = await _sendJSON("/api/login/");
      if (data is Map && data.containsKey('id')) {
        user = new User(data['id']);
        user.load(data);
      }
    }
    on DatastoreException catch (e) {
      print("No existing user session");
    }
    for (Function f in _logins) Function.apply(f, [ user ]);
  }


/**
 * Login with username and password values. At least one of username and email
 * must be non-empty.
 */
  void login(String username, String email, String password) async {
    assert(password != null);
    assert(username != null || email != null);

    var jsonData = { "username" : username, "email" : email, "password" : password };
    var result = await _sendJSON("/api/login/", "POST", jsonData);
    if (result is Map && result.containsKey('id')) {
      for (Function f in _logouts) Function.apply(f, [ user ]);
      user = new User(result['id']);
      user.load(result);
      for (Function f in _logins) Function.apply(f, [ user ]);
    } else {
      throw new DatastoreException(401);
    }
  }


/**
 * Login with Google oauth provider
 */
  void loginWithGoogle() {
    js.context['onFirebaseLogin'] = (jsonUserData) async {

      // reset callback so this only happens once ...
      js.context['onFirebaseLogin'] = _onLogin;

      Map userData = jsonDecode(jsonUserData);
      try {
        await login("", userData['email'], "g00gl3");
        user.photo = userData['photoURL'];
        user.displayName = userData['displayName'];
        user.email = userData['email'];
        for (Function f in _logins) Function.apply(f, [ user ]);
      }
      catch (e) {
        // login fails if this isn't a registered google account
        try {
          user = await register(null, userData['email'], "g00gl3");
          user.photo = userData['photoURL'];
          user.displayName = userData['displayName'];
          user.email = userData['email'];
          for (Function f in _logins) Function.apply(f, [ user ]);
        }
        catch (e) {
          Dialog.message("Failed to login with Google account.");
          js.context.callMethod('firebaseLogout');
        }
      }
    };
    js.context.callMethod('firebaseLogin');
  }


/**
 * Logout
 */
  Future<User> logout() async {
    js.context.callMethod('firebaseLogout');
    var result = await _sendJSON("/api/logout/");
    for (Function f in _logouts) Function.apply(f, [ user ]);
    this.user = new User.anonymous();
    for (Function f in _logins) Function.apply(f, [ user ]);
    return user;
  }


/**
 * Create a new user account with the given email, password, and username.
 * If username is null, use the email address for both username and email.
 * If successful, log the user in...
 */
  Future<User> register(String username, String email, String password) async {
    assert(password != null && password != "");
    assert(email != null && email != "");
    if (username == null) username = email;

    var data = { "username" : username, "email" : email, "password" : password };
    var result = await _sendJSON("/api/register/", "POST", data);

    // populate fields returned from database
    this.user = new User(result['id']);
    user.load(result);
    for (Function f in _logins) Function.apply(f, [ user ]);
    return user;
  }


  void anonymousLogin() {
    js.context.callMethod('firebaseAnonymousLogin');
  }


/**
 * Returns true iff this is a unique username
 */
  Future uniqueUsername(String username) async {
    return await _sendJSON("/api/unique-username/", "POST", { "username" : username });
  }


/**
 * Returns true iff this is a unique email
 */
  Future uniqueEmail(String email) async {
    return await _sendJSON("/api/unique-email/", "POST", { "email" : email });
  }


/**
 * Returns true iff the string is a valid email address
 */
  bool isValidEmail(String email) {
    RegExp regx = new RegExp(REGEXP_EMAIL);
    return regx.hasMatch(email);
  }


/**
 * Returns true iff the string is a valid username
 */
  bool isValidUsername(String username) {
    RegExp regx = new RegExp(REGEXP_USERNAME);
    return regx.hasMatch(username);
  }


/**
 * This is an auth state change event from firebase. Convert to TunePad user
 */
  void _onLogin(String jsonUserData) async {  }

  void _onConnect(String jsonUserData) async {  }

  void _onLogout() {  }


  bool get isAnonymous => user.anonymous;


/**
 * Firebase callback whenever an object is updated
 */
  void _onUpdated(String directory, String jsonString) {
    if (_updates.containsKey(directory)) {
      for (Function f in _updates[directory]) {
        Function.apply(f, [ jsonDecode(jsonString) ]);
      }
    }
  }


/**
 * Firebase callback whenever a child is added to a directory
 */
  void _onAdded(String directory, String key, String prevKey, String jsonString) {
    if (_adds.containsKey(directory)) {
      for (Function f in _adds[directory]) {
        Function.apply(f, [ key, prevKey, jsonDecode(jsonString) ]);
      }
    }
  }


/**
 * Firebase callback whenever a child is removed from a directory
 */
  void _onRemoved(String directory, String jsonString) {
    if (_removes.containsKey(directory)) {
      for (Function f in _removes[directory]) {
        Function.apply(f, [ jsonDecode(jsonString) ]);
      }
    }
  }


/**
 * Registers an authentication change callback
 */
  void addLoginCallback(Function callback) { _logins.add(callback); }
  void addLogoutCallback(Function callback) { _logouts.add(callback); }


/**
 * Register an update callback for the given model
 */
  void addUpdateCallback(DataModel model, Function callback, [ String directory = null ]) {
    if (directory == null) {
      if (model is PythonCell) {
        directory = "/$root/cells/${model.id}/settings";
      } else if (model is Project) {
        directory = "/$root/project";
      }
    }
    if (directory != null) {
      _updates.putIfAbsent(directory, () => new List<Function>());
      _updates[directory].add(callback);
      js.context.callMethod('firebaseUpdatedCallback', [ directory ]);
    }
  }


/**
 * Register a callback for a child remove event
 */
 void addRemovedCallback(DataModel model, Function callback, [ String directory = null ]) {
   if (directory == null) {
     if (model is PythonCell) {
       directory = "/$root/cells/${model.id}/settings";
     } else if (model is Project) {
       directory = "/$root/project";
     }
   }
   if (directory != null) {
     _removes.putIfAbsent(directory, () => new List<Function>());
     _removes[directory].add(callback);
     js.context.callMethod('firebaseRemovedCallback', [ directory ]);
   }
 }


/**
 * Register a callback for child added to the given directory
 */
  void addAddedCallback(String directory, Function callback) {
    _adds.putIfAbsent(directory, () => new List<Function>());
    _adds[directory].add(callback);
    js.context.callMethod('firebaseAddedCallback', [ directory ]);
  }


/**
 * Fetch a specific object from the datastore
 */
  void select(String directory, Function callback) {
    _adds.putIfAbsent(directory, () => new List<Function>());
    _adds[directory].clear();
    _adds[directory].add(callback);
    js.context.callMethod('firebaseAddedCallback', [ directory ]);
  }


/**
 * Save an object to the given directory
 */
  void save(DataModel item) {
    item.modified = new DateTime.now();
    if (item is Project) {
      _saveProject(item);
    } else if (item is PythonCell) {
      _saveCell(item);
    }
  }


  void _saveProject(DataModel project) {
    js.context.callMethod('firebaseUpdate', [ "/$root/project", jsonEncode(project.save())]);
  }


  void _saveCell(PythonCell cell) async {
    Map data = cell.save();
    String directory = "/$root/cells/${cell.id}/settings";
    js.context.callMethod('firebaseUpdate', [ directory, jsonEncode(data) ]);
  }


/**
 * Publish a track in the TunePad library... might throw exception
 */
  Future<Map> publishTrack(PythonCell cell, String preview) async {

    if (!cell.isPublic || preview == null) return null;

    //------------------------------------------------------
    // for now generate a gadget_id based on the Google base64
    // encoded identifier string
    //------------------------------------------------------
    int gadget_id = 0;
    Uint8List cid = base64Decode(cell.id);
    for (int i=0; i<cid.length && i<3; i++) {
      gadget_id += (cid[cid.length - i - 1] << (i * 8));
    }
    Map data = cell.save();
    Map track = new Map.from(data);
    track['username'] = user.displayName;
    track['gadget_id'] = gadget_id;
    track['preview'] = preview;
    track['line_count'] = data['lines'];
    track['public'] = true;  // auto-publish tracks for now

    //------------------------------------------------------
    // lookup the track by gadget id
    //------------------------------------------------------
    try {
      Map result = await _sendJSON("/api/library/lookup/$gadget_id", "GET");
      track['id'] = result['id'];
      track['user_id'] = result['user_id'];
      track['like_count'] = result['like_count'];
      track['star_count'] = result['star_count'];
      track['remix_count'] = result['remix_count'];
      return await _sendJSON("/api/library/${result['id']}", "PUT", track);
    }
    // track not found
    catch(e) {
      track['user_id'] = user.uid;
      return await _sendJSON("/api/library", "POST", track);
    }
  }


  /**
   * Update track coutners: (un)like, (un)star, remix tracks in the library
   */
    Future likeTrack(int id) async { return await _sendJSON("/api/library/like/$id"); }
    Future unlikeTrack(int id) async { return await _sendJSON("/api/library/unlike/$id"); }
    Future starTrack(int id) async { return await _sendJSON("/api/library/star/$id"); }
    Future unstarTrack(int id) async { return await _sendJSON("/api/library/unstar/$id"); }
    Future remixTrack(int id) async { return await _sendJSON("/api/library/remix/$id"); }


  /**
   * Search tunepad track library
   */
    Future<List> searchLibrary(List filter, String sort) async {
      String url = "/api/library/search?filter=${filter.join(',')}&sort=$sort";
      return await _sendJSON(url);
    }


/**
 * Remove an object from the datastore
 */
  void remove(DataModel item) {
    String directory = (item is Project) ? "/$root/project" : "/$root/cells/${item.id}";
    item.modified = new DateTime.now();
    js.context.callMethod('firebaseRemove', [ directory ]);
  }


/**
 * Create a new python cell entry
 */
  void createPythonCell() {
    String key = generateKey("/$root/cells");
    String directory = "/$root/cells/$key/settings";
    Map settings = Map.from(PythonCell.DEFAULT_SETTINGS);
    settings['id'] = key;
    js.context.callMethod('firebaseUpdate', [ directory, jsonEncode(settings) ]);
  }


/**
 * Clone a python cell
 */
  void clonePythonCell(Map cellData) {
    String key = generateKey("/$root/cells");
    String directory = "/$root/cells/$key/settings";
    Map settings = Map.from(cellData);
    settings['id'] = key;
    settings['cloned'] = true;
    settings.remove('preview');
    settings['public'] = false;
    settings['show-editor'] = true;
    settings['show-instrument'] = true;
    settings['show-output'] = false;
    settings['show-timeline'] = true;
    settings['midi-output'] = false;
    settings['midi-input'] = false;
    settings['original-id'] = cellData['id'];
    settings['original-uid'] = cellData['uid'];
    settings['original-author'] = cellData['author'];
    js.context.callMethod('firebaseUpdate', [ directory, jsonEncode(settings) ]);
  }


/**
 * Generate a new unique key in the given directory
 */
  String generateKey(String directory) {
    String key = js.context.callMethod('firebaseGenerateChildKey', [ directory ]);
    return key;
  }


/**
 * Used for REST api calls to TunePad server
 */
  Future _sendJSON(String url, [ String method = "GET", dynamic data = null ]) async {
    try {
      HttpRequest request = await HttpRequest.request(
        "$host$url",
        method : method,
        withCredentials : true,
        sendData : jsonEncode(data));
      return jsonDecode(request.responseText);
    }
    on ProgressEvent catch(e) {
      throw new DatastoreException((e.target as HttpRequest).status);
    }
  }
}



class DatastoreException implements Exception {

  static const int DEFAULT_ERROR = 0;
  static const int UNAUTHORIZED = 401;
  static const int OBJECT_NOT_FOUND = 404;
  static const int REQUEST_TOO_LARGE = 413;
  static const int UNIQUE_EMAIL = 1010;
  static const int UNIQUE_USERNAME = 1020;

  int code = -1;

  DatastoreException(this.code);


  DatastoreException.Unauthorized() {
    this.code = UNAUTHORIZED;
  }
}
