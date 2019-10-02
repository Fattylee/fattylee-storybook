import React, {ReactDOM} from 'react';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';

const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD':
      return {
        ...state,
      };
    default:
      return state;
  }
}

const cr = combineReducers({
  auth: authReducer,
})
const store = createStore(cr, {}, applyMiddleware());

// components
// reducers -> authReducer, index
/*
componentDidMount() {
  this.props.fetchUser();
  const mstp = (state) => {
    return {auth: state.auth};
  }
  export default connect(mstp, {})(Header);
}


*/

const Landing = () => <h1>Welcome to my app </h1>;
const Header = () => <div>Header comp </div>;
const Dashboard = () => <h2>Dashboard comp</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


const Router = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={Landing} />
      <Route exact path='/surveys' component={Dashboard} />
      <Route path='/surveys/new' component={SurveyNew} />
    </div>
  </BrowserRouter>
);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('root'));
