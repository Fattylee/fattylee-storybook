import * as types from '../actions/types';


const authUserReducer = (state = false, action) => {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      return action.currentUser || false;
    default: 
      return state;
  }
};

export default authUserReducer;

