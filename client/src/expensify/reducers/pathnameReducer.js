import {SET_PATHNAME} from '../actions/types';


const pathnameReducer = (state = '', action) => {
  switch(action.type) {
    case SET_PATHNAME:
      return action.pathname;
    default:
      return state;
  }
};

export default pathnameReducer;