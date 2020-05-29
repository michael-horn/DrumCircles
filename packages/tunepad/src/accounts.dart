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


class UserAccounts {


/**
 * Open login dialog
 */
  static void login(Datastore datastore) {

    DivElement dialog = Dialog.openModal("#login-template");

    //-------------------------------------------------------
    // FORGOT password link
    //-------------------------------------------------------
    AnchorElement forgot = dialog.querySelector("#forgot-link");
    if (forgot != null) forgot.href = "${datastore.host}/account/reset";


    //-------------------------------------------------------
    // GOOGLE button -- ask datastore to login with google
    //-------------------------------------------------------
    dialog.querySelectorAll("#google-button").onClick.listen((e) {
      Dialog.closeModal();
      datastore.loginWithGoogle();
    });


    //-------------------------------------------------------
    // JOIN button -- redirect to the join page
    //-------------------------------------------------------
    dialog.querySelectorAll("#join-button").onClick.listen((e) {
      Dialog.closeModal();
      window.open("${datastore.host}/join", "_blank");
    });


    //-------------------------------------------------------
    // clear error messages when user types
    //-------------------------------------------------------
    dialog.querySelectorAll("input").onInput.listen((e) {
      dialog.querySelectorAll(".message").classes.add('hidden');
    });


    //-------------------------------------------------------
    // LOGIN button
    //-------------------------------------------------------
    FormElement form = dialog.querySelector("#login-form");
    if (form != null) {
      form.onSubmit.listen((e) {
        e.preventDefault(); // make sure the form doesn't submit
        _onSubmit(dialog, datastore);
        return false;
      });
    }
  }

  static void _onSubmit(DivElement dialog, Datastore datastore) async {
    bool errors = false;
    bool email = false;
    dialog.querySelectorAll(".message").classes.add('hidden');

    //-------------------------------------------------------
    // 1. validate username
    //-------------------------------------------------------
    String username = _getInputValue(dialog, "#username");
    if (username == null || username == "" ) {
      _showError(dialog, "#username-message", "Please enter your username or email.");
      errors = true;
    }

    //-------------------------------------------------------
    // 2. validate password
    //-------------------------------------------------------
    String password = _getInputValue(dialog, "#password");
    if (password == null || password == "" ) {
      _showError(dialog, "#password-message", "Please enter your password.");
      errors = true;
    }

    if (errors) return;

    //-------------------------------------------------------
    // 3. decide if this is an email address or username
    //-------------------------------------------------------
    email = datastore.isValidEmail(username);

    //-------------------------------------------------------
    // 4. ask the database to login
    //-------------------------------------------------------
    dialog.querySelectorAll(".btn").classes.add("loading");
    try {
      if (email) {
        await datastore.login(null, username, password);
      } else {
        await datastore.login(username, null, password);
      }
      Dialog.closeModal();
      Dialog.message("Sign in successful.");
    }
    on DatastoreException catch (e) {
      if (email) {
        _showError(dialog, "#general-message", "Invalid email or password.");
      } else {
        _showError(dialog, "#general-message", "Invalid username or password.");
      }
    }
    catch (e) {
      _showError(dialog, "#general-message", "There was a problem signing in.");
    }
    finally {
      dialog.querySelectorAll(".btn").classes.remove("loading");
    }
  }


  static void _showError(DivElement dialog, String selector, String message) {
    Element el = dialog.querySelector(selector);
    if (el != null) {
      el.classes.remove("hidden");
      el.innerHtml = message;
    }
  }


  static String _getInputValue(DivElement dialog, String selector) {
    InputElement el = dialog.querySelector(selector);
    return (el != null) ? el.value.trim() : "";
  }
}



  /**
  * Login as an EarSketch User
  */
  /*
  void loginEarSketch(){
  window.location.assign("https://earsketch.gatech.edu/tunepadLogin/");
}
*/




/**
 * Register a new account
 */
/*
void join(Datastore datastore) {

  bool errors = false;
  querySelectorAll(".message").classes.add("hidden");


  //-------------------------------------------------------
  // STEP 1. validate username
  //-------------------------------------------------------
  String username = _getInputValue("#username");
  if (username == null || username == "") {
    _showError("#username-message", "Please enter your username.");
    errors = true;
  }
  else if (username.length < 3) {
    _showError("#username-message", "Usernames must be at least 3 characters long.");
    errors = true;
  }
  else if (username.length > 30) {
    _showError("#username-message", "Usernames must be less than 30 characters long.");
    errors = true;
  }
  else if (!datastore.isValidUsername(username)) {
    _showError("#username-message", "Usernames can only contain letters, numbers, dashes, and periods.");
    errors = true;
  }
  else {
    bool unique = await datastore.uniqueUsername(username);
    if (!unique) {
      _showError("#username-message", "This username is already registered with TunePad.");
      errors = true;
    }
  }


  //-------------------------------------------------------
  // STEP 2. validate email
  //-------------------------------------------------------
  String email = _getInputValue("#email");
  if (!datastore.isValidEmail(email)) {
    _showError("#email-message", "Please enter a valid email address.");
    errors = true;
  }
  else {
    bool unique = await datastore.uniqueEmail(email);
    if (!unique) {
      _showError("#email-message", "This email is already registered with TunePad.");
      errors = true;
    }
  }


  //-------------------------------------------------------
  // STEP 3. validate password
  //-------------------------------------------------------
  String password = _getInputValue("#password");
  if (password == null || password == "" ) {
    _showError("#password-message", "Please enter a password.");
    errors = true;
  }
  else if (password.length < 6) {
    _showError("#password-message", "Passwords must be at least 6 characters long.");
    errors = true;
  }

  if (errors) return;


  //-------------------------------------------------------
  // STEP 4. validate confirm password
  //-------------------------------------------------------
  String confirm = _getInputValue("#password-confirm");
  if (confirm != password) {
    _showError("#password-confirm-message", "Password fields don't match.");
    errors = true;
  }


  //-------------------------------------------------------
  // STEP 5. checked the box?
  //-------------------------------------------------------
  bool checked = (querySelector("#terms-check") as InputElement).checked;
  if (!checked) {
    _showError("#terms-check-message", "You must agree to join TunePad.");
    errors = true;
  }

  if (errors) return;


  //-------------------------------------------------------
  // STEP 6. ask the database to register
  //-------------------------------------------------------
  querySelectorAll(".btn").classes.add("loading");
  try {
    if (datastore.isLoggedIn && datastore.isAnonymous) {
      await datastore.convertAnonymous(username, email, password);
    }
    else {
      await datastore.register(username, email, password);
    }
  }
  catch (e) {
    _showError("#general-message", "There was a problem creating your account.");
    return;
  }
  finally {
    querySelectorAll(".btn").classes.remove("loading");
  }


  //-------------------------------------------------------
  // STEP 7. add user to a group if need be
  //-------------------------------------------------------
  try {
    DivElement groupMessageWrapper = querySelector("#group-message-wrapper");

    if(groupMessageWrapper != null){
      String groupName = groupMessageWrapper.dataset["group-id"];

      if(groupName.trim() !="" && groupName !=null) {
        await datastore.addToGroup(datastore.uid, groupName);
      }
    }
  }
  catch (e){
    //we do not want registration to fail because of group membership
    //issues. Hence, soft fail.
    print("could not add user to group, try from the profile page.");
  }


  //-------------------------------------------------------
  // STEP 8. success! redirect to target page
  //-------------------------------------------------------
  if (datastore.isLoggedIn && !datastore.isAnonymous) {
    await datastore.sendValidationEmail();
  }
  _redirectToTarget("There was a problem creating your account.");
}
*/

/**
 * Register a new account
 */
/*
void profile() async {
  bool errors = false;
  querySelectorAll(".message").classes.add("hidden");


  //-------------------------------------------------------
  // STEP 1. validate username
  //-------------------------------------------------------
  String username = _getInputValue("#username");
  if (username == null || username == "") {
    _showError("#username-message", "Please enter your new username.");
    errors = true;
  }
  else if (username.length < 3) {
    _showError("#username-message", "Usernames must be at least 3 characters long.");
    errors = true;
  }
  else if (username.length > 30) {
    _showError("#username-message", "Usernames must be less than 30 characters long.");
    errors = true;
  }
  else if (!datastore.isValidUsername(username)) {
    _showError("#username-message", "Usernames can only contain letters, numbers, dashes, and periods.");
    errors = true;
  }
  else if (username != datastore.username) {
    bool unique = await datastore.uniqueUsername(username);
    if (!unique) {
      _showError("#username-message", "This username is already registered with TunePad.");
      errors = true;
    }
  }


  //-------------------------------------------------------
  // STEP 2. validate email
  //-------------------------------------------------------
  String email = _getInputValue("#email");
  if (!datastore.isValidEmail(email)) {
    _showError("#email-message", "Please enter a valid email address.");
    errors = true;
  }
  else if (email != datastore.email) {
    bool unique = await datastore.uniqueEmail(email);
    if (!unique) {
      _showError("#email-message", "This email is already registered with TunePad.");
      errors = true;
    }
  }


  if (errors) return;


  //-------------------------------------------------------
  // STEP 3. ask the database to update the profile
  //-------------------------------------------------------
  querySelectorAll(".btn").classes.add("loading");
  try {
    if (email != datastore.email) {
      await datastore.updateEmail(email);
    }
    if (username != datastore.username) {
      await datastore.updateUsername(username);
    }
    window.location.href = "/account/confirmation/updated";
  }
  catch (e) {
    _showError("#general-message", "There was a problem updating your profile.");
    return;
  }
  finally {
    querySelectorAll(".btn").classes.remove("loading");
  }
}
*/

/**
 * Send a password reset email
 */
/*
void reset() async {
  querySelectorAll(".message").classes.add("hidden");

  //-------------------------------------------------------
  // STEP 1. validate email or username
  //-------------------------------------------------------
  String user = _getInputValue("#user");
  if (user == null || user == "") {
    _showError("#email-message", "Please enter the username or email for your account.");
    return;
  }

  bool uniqueEmail = await datastore.uniqueEmail(user);
  bool uniqueUsername = await datastore.uniqueUsername(user);

  if (uniqueEmail && uniqueUsername) {
    _showError("#email-message", "This username or email doesn't match a TunePad account.");
    return;
  }

  //-------------------------------------------------------
  // STEP 2. ask the database to update the profile
  //-------------------------------------------------------
  querySelectorAll(".btn").classes.add("loading");
  try {
    await datastore.sendResetEmail(user, user);
    window.location.href = "/account/confirmation/password";
  }
  on DatastoreException catch(e) {
    if (e.code == 405) {
      window.location.href = "/account/confirmation/external";
    } else {
      _showError("#general-message", "There was a problem sending a password reset email.");
    }
  }
  catch (e) {
    _showError("#general-message", "There was a problem sending a password reset email.");
  }
  finally {
    querySelectorAll(".btn").classes.remove("loading");
  }
}
*/


/**
 * Change a password
 */
/*
void changePassword() async {

  bool errors = false;
  querySelectorAll(".message").classes.add("hidden");


  //-------------------------------------------------------
  // STEP 1. confirm that we're logged in first
  //-------------------------------------------------------
  if (!datastore.isLoggedIn || datastore.isAnonymous) {
    _showError("#general-message", "You must be logged in to change your password.");
    errors = true;
    return;
  }


  //-------------------------------------------------------
  // STEP 2. validate old password
  //-------------------------------------------------------
  String password = _getInputValue("#password");
  if (password == null || password == "" ) {
    _showError("#password-message", "Please enter your current password.");
    errors = true;
  }


  //-------------------------------------------------------
  // STEP 3. validate new password
  //-------------------------------------------------------
  String newPassword = _getInputValue("#new-password");
  if (newPassword == null || newPassword == "" ) {
    _showError("#new-password-message", "Please enter your new password.");
    errors = true;
  }
  else if (newPassword.length < 6) {
    _showError("#new-password-message", "Passwords must be at least 6 characters long.");
    errors = true;
  }
  else if (newPassword == password) {
    _showError("#new-password-message", "Your new password cannot be the same as your old password.");
    errors = true;
  }


  //-------------------------------------------------------
  // STEP 4. validate confirm password
  //-------------------------------------------------------
  String confirm = _getInputValue("#password-confirm");
  if (confirm != newPassword) {
    _showError("#password-confirm-message", "The new passwords don't match.");
    errors = true;
  }

  if (errors) return;


  //-------------------------------------------------------
  // STEP 5. ask the database to change the password
  //-------------------------------------------------------
  querySelectorAll(".btn").classes.add("loading");
  try {
    await datastore.updatePassword(password, newPassword);
    window.location.href = "/account/confirmation/updated";
  }
  on DatastoreException catch(e) {
    _showError("#general-message", "Your old password is not correct.");
  }
  catch (e) {
    _showError("#general-message", "There was a problem updating your password.");
    return;
  }
  finally {
    querySelectorAll(".btn").classes.remove("loading");
  }
}
*/


/**
 * Recover (create a new) a password from a reset email
 */
/*
void recover() async {

  bool errors = false;
  querySelectorAll(".message").classes.add("hidden");


  //-------------------------------------------------------
  // STEP 1. validate new password
  //-------------------------------------------------------
  String newPassword = _getInputValue("#new-password");
  if (newPassword == null || newPassword == "" ) {
    _showError("#new-password-message", "Please enter your new password.");
    errors = true;
  }
  else if (newPassword.length < 6) {
    _showError("#new-password-message", "Passwords must be at least 6 characters long.");
    errors = true;
  }

  //-------------------------------------------------------
  // STEP 2. validate confirm password
  //-------------------------------------------------------
  String confirm = _getInputValue("#password-confirm");
  if (confirm != newPassword) {
    _showError("#password-confirm-message", "The new passwords don't match.");
    errors = true;
  }

  if (errors) return;


  //-------------------------------------------------------
  // STEP 3. validate hidden fields
  //-------------------------------------------------------
  String uid = _getInputValue("#uid");
  String validation = _getInputValue("#validation");


  //-------------------------------------------------------
  // STEP 4. ask the database to change the password
  //-------------------------------------------------------
  querySelectorAll(".btn").classes.add("loading");
  try {
    await datastore.resetPassword(uid, validation, newPassword);
    window.location.href = "/account/confirmation/updated";
  }
  catch (e) {
    _showError("#general-message", "There was a problem updating your password.");
    return;
  }
  finally {
    querySelectorAll(".btn").classes.remove("loading");
  }
}
*/


/**
 * allow users to search for and add groups
 */
/*
void addGroupSearch() {
  try {
    GroupSearchResource groupSearch = new GroupSearchResource();

    List<String> searchBoxIds = new List<String>();
    searchBoxIds.add("group-search");

    groupSearch.bindEventHandlers(searchBoxIds);
    groupSearch.bindGroupBtns();
  }
  catch(e){
    print("Error adding group search");
  }
}
*/
