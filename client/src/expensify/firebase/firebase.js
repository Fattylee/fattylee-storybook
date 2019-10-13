import * as firebase from 'firebase';


// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAtG6X5XRpkRj-oX81ml9puX2Ij6esAFmE",
    authDomain: "expensify-c1d46.firebaseapp.com",
    databaseURL: "https://expensify-c1d46.firebaseio.com",
    projectId: "expensify-c1d46",
    storageBucket: "expensify-c1d46.appspot.com",
    messagingSenderId: "1022525835511",
    appId: "1:1022525835511:web:08ec011a884a137e0f6bf2",
    measurementId: "G-VCZB1HRWV5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
const database =  firebase.database()

 /*ref.set({name: 'Abu adnaan',
   age: 32,
   //gender: 'male'
 })/
 ref.update({
   'dev/name': null,
   job: 'software engineer',
   name: 'Abu adnaan ibn Balogun'
 })
// ref.set({name: 'Abu lulu', salary: 34555})
.then(() => {
   console.log('data persisted!');
 })
 .catch(err => {
   console.log('something went wrong!', err);
 });
*/
export { firebase, database as default};