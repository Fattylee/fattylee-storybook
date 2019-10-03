const usersDefaultState = [
  {
    id: 1,
    name: 'abu adnaan',
    age: 32,
    isMarried: true
  },
  {
    id: 2,
    name: 'ummu abdillah',
    age: 25,
    isMarried: true
  },
  {
    id: 3,
    name: 'miftahudeen salaam',
    age: 15,
    isMarried: false
  }
];

const usersReducer = (state = usersDefaultState, action)=> {
  switch(action.type) {
    case 'ADD':
     return [
       ...state,
       action.payload, 
     ];
    default:
      return state;
  }
};

export default usersReducer;

