const redux = require('redux');

console.log('redux', redux);

const store = redux.createStore((state = { counts: 0}, action) => {
 // console.log(action)
  switch(action.type) {
    case 'ADD':
      return {
        counts: state.counts + action.increaseBy,
      };
    case 'REMOVE':
      return {
        counts: state.counts - action.decreaseBy,
      };
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log('state:', store.getState());
});
const addAction = ({increaseBy = 1} = {}) => {
  return {type: 'ADD', increaseBy}
}

const removeAction = ({decreaseBy = 1} = {}) => ({type: 'REMOVE', decreaseBy});

//store.dispatch({type: 'ADD'});
//store.dispatch({type: 'ADD'});
store.dispatch(removeAction());
store.dispatch(addAction())
store.dispatch(addAction({increaseBy: 5}))
store.dispatch(removeAction({decreaseBy: 2}));