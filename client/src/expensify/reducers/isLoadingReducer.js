import {SET_LOADING} from '../actions/types';


const isLoadingReducer = (state = false, action) => {
  switch(action.type) {
    case SET_LOADING: 
      return action.loadingState;
    default:
      return state;
  }
};

export default isLoadingReducer;

