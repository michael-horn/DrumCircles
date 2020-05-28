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



/**
 * Implements helper functions for dropdown menus
 */
class DropdownMenu {

/**
 * Activates a dropdown menu for the given target element.
 * The target is usually a div that contains a .context-menu list.
 * The onSelected function takes an HtmlElement .menu-item that gets selected by the user.
 */
  static void armMenu(Element target, Function onSelected) {
    if (target != null) {
      target.onMouseDown.listen((e) {
        _toggleMenu(target.querySelector(".context-menu"));
        e.stopPropagation();
      });

      target.querySelectorAll(".menu-item").onMouseDown.listen((e) {
        Function.apply(onSelected, [ e.currentTarget as HtmlElement ]);
      });
    }
  }


  static void closeAllMenus() {
    querySelectorAll(".context-menu").classes.add("hidden");
  }


  static void _toggleMenu(Element menu) {
    if (menu != null) {
      querySelectorAll(".context-menu").forEach((m) {
        if (menu != m) m.classes.add("hidden");
      });
      menu.classes.toggle('hidden');
    }
  }
}
