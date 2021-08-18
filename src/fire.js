import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHoSg5Mfx6bIGZMglwZSRilzSNdCxFGbk",
    authDomain: "login-ad741.firebaseapp.com",
    projectId: "login-ad741",
    storageBucket: "login-ad741.appspot.com",
    messagingSenderId: "102518574995",
    appId: "1:102518574995:web:a88717520820e3589fa266"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

var db = firebase.database();
export function saveComposition(uid, bpm, highestOctave, notes) {
  var compListRef = db.ref("users/" + uid + "/compositions");
  console.log(uid);
  // push to the end of a list
  var newCompPost = compListRef.push();
  newCompPost.set({
    // ... add notes and other metadata here
    bpm: bpm,
    // synth: synth,
    highestOctave: highestOctave,
    notes: notes
  });
  // save data under the current user 
  // dbRef.child(currentUser.uid).get()
}

export function readCompositions(uid) {
  var compListRef = db.ref("users/" + uid + "/compositions");
  compListRef.get().then((snapshot) => {
    if( snapshot.exists()) {
      console.log(snapshot.val());
    }
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.log(error);
  })
}

export default fire;
