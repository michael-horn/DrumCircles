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
import 'dart:js' as js;
import 'dart:convert';
import 'dart:math';

import 'package:tunepad/tunepad.dart';


/**
 * TODO: Do a rollcall every time the project is saved. Or put it on a timer.
 */
class UserList {

  User me;

  Datastore datastore;

  WebSocket socket;

  List<User> visitors = new List<User>();


  UserList(this.socket) {
    socket.onMessage.listen(_handleMessage);

    socket.onError.listen((e) { print("Socket error: ${e}"); });

    socket.onOpen.listen((e) {
      if (me != null) {
        _sendAction("userlist-join");
        _sendAction("userlist-rollcall");
      }
    });

    window.onBeforeUnload.listen((e) => _sendAction("userlist-leave"));
  }


  void rollcall() {
    if (me != null && socket != null && socket.readyState == WebSocket.OPEN) {
      print("rollcall");
      visitors.clear();
      _sendAction("userlist-rollcall");
    }
  }


  void login(User user) {
    if (me == null) _sendAction("userlist-rollcall");
    this.me = user;
    _sendAction("userlist-join");
    ButtonElement button = querySelector("#profile-button");
    if (button != null) {
      button.title = me.displayName;
      if (!me.anonymous && me.photo != null) {
        button.classes.add("photo");
        button.style.backgroundImage = "url('${me.photo}')";
      } else {
        button.classes.remove("photo");
        button.style.backgroundImage = "none";
      }
    }
    if (user.anonymous) {
      querySelectorAll("#login-button").classes.remove('hidden');
      querySelectorAll("#logout-button").classes.add('hidden');
      querySelectorAll("main").classes.clear();
      querySelectorAll("main").classes.add('anonymous');
    } else {
      querySelectorAll("#login-button").classes.add('hidden');
      querySelectorAll("#logout-button").classes.remove('hidden');
      querySelectorAll("main").classes.clear();
      querySelectorAll("main").classes.add('authenticated');
    }
  }


  void logout(User user) {
    print("userlist logout");
    _sendAction("userlist-leave");
    this.me = user;
    ButtonElement button = querySelector("#profile-button");
    if (button != null) {
      button.classes.remove("photo");
      button.style.backgroundImage = "none";
    }
    querySelectorAll("#login-button").classes.remove('hidden');
    querySelectorAll("#logout-button").classes.add('hidden');
    querySelectorAll("main").classes.clear();
  }


  void _sendAction(String action) {
    if (me != null && socket != null && socket.readyState == WebSocket.OPEN) {
      Map userData = me.save();
      String path = window.location.pathname + window.location.hash;
      socket.send(
        jsonEncode(
          {
            "action" : action,
            "path" : path,
            "user" : userData
          }
        )
      );
    }
  }


  void _handleMessage(message) {
    try {
      print(message.data);
      Map data = jsonDecode(message.data);
      Map userData = data["user"];
      String action = data["action"];
      String path = data["path"];
      String mypath = window.location.pathname + window.location.hash;

      // invalid message or messages from other projects
      if (action == null || path != mypath) return;

      // only process userlist messages
      if (!action.startsWith("userlist")) return;

      // rollcall doesn't require valid user data
      if (action == "userlist-rollcall" && me != null) {
        _sendAction("userlist-present");
        return;
      }

      // other messages require valid user
      if (userData == null) return;

      // ignore messages from me
      if (me != null && userData['id'] == me.id) return;

      // create visitor object
      User visitor = new User(userData['id']);
      visitor.load(userData);

      if (action == "userlist-join" || action == "userlist-present") {
        if (!visitors.contains(visitor)) {
          visitors.add(visitor);
          _buildUserList();
        }
      }

      else if (action == "userlist-leave") {
        if (visitors.contains(visitor)) {
          visitors.remove(visitor);
          _buildUserList();
        }
      }
    }
    catch(e) {
      print("Invalid websocket message ${message.data}");
      return;
    }
  }


  void _buildUserList() {
    UListElement list = querySelector("#userlist");
    if (list != null) {
      list.children.clear();
      visitors.sort((a, b) => a.uid.compareTo(b.uid));
      for (User visitor in visitors) {
        if (visitor != me) list.append(_buildVisitor(visitor));
      }
    }
  }


  LIElement _buildVisitor(User visitor) {
    LIElement item = new LIElement()
      .. id = "user-${visitor.uid}"
      .. title = visitor.name;

    Element i = new Element.html("<i></i>")
      .. className = "fas ${visitor.icon}"
      .. style.color = visitor.color;
    item.append(i);

    if (!visitor.anonymous && visitor.photo != null && visitor.photo != "null") {
      item.classes.add("known");
      item.style.backgroundImage = "url('${visitor.photo}')";
    }
    return item;
  }
}
