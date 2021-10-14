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
export function saveComposition(compInfo, notes, setCurrCompId) {
  var compListRef = db.ref("users/" + compInfo.uid + "/compositions");
  console.log(compInfo);
  // TODO: perform update if compid exists
  // push to the end of a list
  if(compInfo.compId === undefined || compInfo.compId === "") {
    var newCompPost = compListRef.push();
    newCompPost.set({
      // ... add notes and other metadata here
      name: compInfo.name,
      published: false,
      // likes: 0,
      bpm: compInfo.bpm,
      // synth: synth,
      lowestOctave: compInfo.lowOctave,
      highestOctave: compInfo.highOctave,
      notes: notes
    });
    // set current comp id to key
    console.log(newCompPost.key);
    setCurrCompId(newCompPost.key);
  }
  // update with that key
  else {
    console.log("firebase update called!");
    console.log(compInfo.compId);
    var updateData = {
      name: compInfo.name,
      // likes: 0,
      bpm: compInfo.bpm,
      // synth: synth,
      lowestOctave: compInfo.lowOctave,
      highestOctave: compInfo.highOctave,
      notes: notes
    }
    var updates = {};
    updates['/' + compInfo.compId] = updateData;
    compListRef.update(updates);
  }
  
  // save data under the current user 
  // dbRef.child(currentUser.uid).get()
}

export const readCompositions = function(uid, onDataRead) {
  var compListRef = db.ref("/users"); 
  
  compListRef.child(uid).child('compositions').get()
  .then((snapshot) => {
    if( snapshot.exists()) {
      console.log(snapshot.val());
      onDataRead(snapshot.val());
    }
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.log(error);
  })

}

export const readComposition = function(uid, compId, onDataRead) {
  // console.log(uid, compId);
  db.ref("/users").child(uid).child("compositions").child(compId).get()
  .then((snapshot) => {
    if(snapshot.exists()) {
      console.log(snapshot.val());
      onDataRead(snapshot.val());
    }
    else {
      console.log("No Data Available");
    }
  }).catch((error) => {
    console.log(error);
  })
}

export default fire;
