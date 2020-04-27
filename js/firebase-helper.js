
// root of the firebase database
var root;
var authProvider;

function firebaseRoot() {
  return root.key;
}


function firebaseInit(config) {
  firebase.initializeApp(JSON.parse(config));
  authProvider = new firebase.auth.GoogleAuthProvider();


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let auth_object = {
        displayName : user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid
      };
      onFirebaseLogin(JSON.stringify(auth_object));
    } else {
      onFirebaseLogout();
    }
  });

  let datastore = firebase.database().ref();
  let hash = window.location.hash.replace(/#/g, '');
  let newproj = false;

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
  firebase.auth().signInWithPopup(authProvider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}


function firebaseLogout() {
  firebase.auth().signOut();
}


function firebaseAnonymousLogin() {
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
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
