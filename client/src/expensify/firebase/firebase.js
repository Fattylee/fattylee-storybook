import * as firebase from 'firebase/app';
import firebaseConfig from '../config/keys';
import 'firebase/database';
import 'firebase/auth';

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
const database =  firebase.database()

 
export { firebase, database as default};