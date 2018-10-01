import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes.js';
// import Search from './components/Search.js';
// import UserSearch1 from './components/UserSearch1.js';
// import Home from './components/Home.js';
// import RacerData from './components/RacerData.js';
// import UsersFound from './components/UsersFound.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    let data = [];
    // let data = JSON.parse(localStorage);
    console.log('local storage', localStorage)
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      data.push(localStorage.key( i ))
      console.log(localStorage.getItem(localStorage.key(i)));

    }

    console.log(data);

    return (
      <div className="App">
        {data}
        <form action='/UserSearch1'>
          <input className='searchButton' type="submit" value='Get Profile' />
        </form>
        <Routes />
      </div>
    );
  }
}

export default App;
