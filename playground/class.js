import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'
import Social from './components/Social'

const template = <h1>Hello React </h1>;


const App = () => {
  return (
    <div className='container'>
    {template}
    <p>This is awesome!!</p>
    <Social />
    </div>
  );
};


ReactDOM.render(<App></App>, document.getElementById('loadMe'));

console.log('Hello react console');