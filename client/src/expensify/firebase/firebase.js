import * as firebase from 'firebase';
import firebaseConfig from '../config/keys';


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
const database =  firebase.database()

 
export { firebase, database as default};