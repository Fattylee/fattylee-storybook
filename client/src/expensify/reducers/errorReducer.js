import * as types from '../actions/types';


const errorReducer = (state = false, action) => {
  switch(action.type) {
    case types.SET_ERROR:
      return action.globalError || false;
    default: 
      return state;
  }
};

export default errorReducer;
