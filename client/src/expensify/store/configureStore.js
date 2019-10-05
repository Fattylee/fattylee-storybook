import redux, { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

export default () => {
  const store = createStore(reducers);
  
  return store
}