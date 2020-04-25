
// root of the firebase database
var root;

function firebaseRoot() {
  return root.key;
}


function firebaseInit(config) {
  firebase.initializeApp(JSON.parse(config));

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user);
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

  let datastore = firebase.database().ref();
  let hash = window.location.hash.replace(/#/g, '');

  if (hash) {
    root = datastore.child(hash);
    return false;
  } else {
    // generate unique location.
    root = datastore.push();
    // add it as a hash to the URL.
    window.location = window.location + '#' + root.key;
    return true;
  }
}


function firebaseLogin() {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}


function firebaseJoin() {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}


function firebaseGenerateChildKey(directory) {
  let ref = root.child(directory);
  ref = ref.push();
  return ref.key;
}


function firebaseCreate(directory, jsonString) {
  firebaseUpdate(directory, jsonString);
}


function firebaseUpdate(directory, jsonString) {
  let data = JSON.parse(jsonString);
  //let ref = firebase.database().ref(directory);
  let ref = root.child(directory);
  ref.set(data)
    .then(function () { })
    .catch(function(error) { console.log('error updating ' + directory); });
}


function firebaseRemove(directory) {
  let ref = root.child(directory);
  ref.remove()
    .then(function () { })
    .catch(function(error) { console.log('error deleting ' + directory); });
}


function firebaseUpdatedCallback(directory) {
  let ref = root.child(directory);
  ref.on("value", function(snapshot) {
    if (snapshot.exists()) {
      onFirebaseUpdate(directory, JSON.stringify(snapshot.val()));
    }
  });
}


function firebaseAddedCallback(directory) {
  let ref = root.child(directory);
  ref.on('child_added', function(snapshot, prevKey) {
    onFirebaseAdded(directory, snapshot.key, prevKey, JSON.stringify(snapshot.val()));
  });
}


function firebaseRemovedCallback(directory) {
  let ref = root.child(directory).parent;
  ref.on('child_removed', function(oldChild) {
    if (oldChild.ref.toString().endsWith(directory)) {
      onFirebaseRemoved(directory, JSON.stringify(oldChild.val()));
    }
  });
}
