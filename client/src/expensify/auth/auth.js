import {firebase} from '../firebase/firebase';


const provider = new firebase.auth.GoogleAuthProvider();


export const login = () => firebase.auth().signInWithPopup(provider);


/*.then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
console.log(token, user, 'success');
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});*/

export const logout = () => firebase.auth().signOut();

/*.then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});*/

/*

{ displayName: "Fatai Balogun", email: "fattylee.remod@gmail.com", photoUrl: undefined, emailVerified: true, uid: "iUA5VwXq3sR76jeeNzmf28N7HSk1" }

{ displayName: "Fatai Balogun", email: "anonymoushackme12@gmail.com", photoUrl: undefined, emailVerified: true, uid: "nn96RaGkbcPtcXF75GtaXWdgIKF2" } 

const user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
   console.log(user, 'User is signed in. currentUser',)
} else {
  // No user is signed in.
  console.log('No user is signed in. currentUser');
}
*/

/*
const user = firebase.auth().currentUser;
const name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
*/