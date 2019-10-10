import redux, { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

export default () => {
  const store = createStore(
  reducers, 
  {}, /*compose(applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )*/
  );
  
  return store;
}