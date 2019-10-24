import * as types from './types';
import database, {firebase} from '../firebase/firebase';
import {getInit} from './expensesAction';

export const getCurrentUser = () => dispatch => {
  return new Promise((resolve, reject) => { 
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const {displayName, email, photoURL, emailVerified, uid} = user;
    const currentUser = {displayName, email, photoURL, emailVerified, uid};
    
    dispatch({
      type: types.SET_CURRENT_USER,
      currentUser,
    });
   
   dispatch(getInit(currentUser))
   .then(() => {  
    resolve();
   })
   .catch(err => {
    console.log('getInit something went wrong 1', err);
    resolve(); 
   });
 
    } 
  
    else {
      dispatch({
      type: types.SET_CURRENT_USER, 
    });
    reject('No signed in user'); 
    }
  
  }); // end onAuthStateChanged
  }); // end Promise
}
