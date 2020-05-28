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
import 'menu.dart';


/**
 * Implements various kinds of dialogs including modal and fixed
 */
class Dialog {


/**
 * Puts a message in a modal dialog, similar to an alert dialog.
 */
  static void message(String message) {
    DivElement dialog = new DivElement() .. className = "dialog";
    dialog.innerHtml = """
    <p>$message</p>
    <div class='dialog-button-row'>
      <button class="cancel-button primary">OK</button>
    </div>""";
    _showModal(dialog);
  }

/**
 * Creates and shows a modal dialog. Returns the instantiated dialog <div>
 * Any close buttons in the template will be activated. Callers are responsible
 * for listening to other events.
 */
  static DivElement openModal(String templateSelector, [ Map<String, dynamic> fieldValues = null ]) {
    TemplateElement template = querySelector(templateSelector);
    if (template != null) {
      DocumentFragment frag = template.content.clone(true);
      DivElement dialog = frag.querySelector(".dialog");
      if (dialog != null && fieldValues != null) {
        for (String selector in fieldValues.keys) {
          HtmlElement el = dialog.querySelector(selector);
          if (el != null) el.innerHtml = "${fieldValues[selector]}";
        }
      }
      _showModal(dialog);
      return dialog;
    }
    return null;
  }


  static closeModal() {
    querySelectorAll(".overlay").forEach((o) { o.remove(); });
    querySelectorAll('body').classes.remove('modal-open');
  }


  static void _showModal(DivElement dialog) {
    closeModal();
    if (dialog != null) {
      DivElement overlay = new DivElement() .. className = "overlay";
      querySelectorAll('body').classes.add('modal-open');
      dialog.querySelectorAll(".close-button").onClick.listen((e) { closeModal(); });
      dialog.querySelectorAll(".cancel-button").onClick.listen((e) { closeModal(); });
      overlay.onMouseDown.listen((e) { closeModal(); });
      dialog.onMouseDown.listen((e) {
        DropdownMenu.closeAllMenus();
        e.stopPropagation();
      });
      overlay.append(dialog);
      document.body.append(overlay);
    }
  }
}
