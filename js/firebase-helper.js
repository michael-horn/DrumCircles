
// root of the firebase database
var root;

function firebaseRoot() {
  return root.key;
}


function firebaseInit(config) {
  firebase.initializeApp(JSON.parse(config));
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
    .then(function () { console.log('updated ' + directory); })
    .catch(function(error) { console.log('error updating ' + directory); });
}


function firebaseUpdateCallback(directory) {
  let ref = root.child(directory);
  ref.on("value", function(snapshot) {
    if (snapshot.exists()) {
      onFirebaseUpdate(directory, JSON.stringify(snapshot.val()));
    }
  });
}


function firebaseAddedCallback(directory) {
  let ref = root.child(directory);
  ref.on('child_added', function(snapshot, prevChildKey) {
    onFirebaseAdded(directory, snapshot.key, JSON.stringify(snapshot.val()));
  });
}
