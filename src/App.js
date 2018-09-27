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
    return (
      <div className="App">
        <form action='/UserSearch1'>
          <input className='searchButton' type="submit" value='Get Profile' />
        </form>
        <Routes />
      </div>
    );
  }
}

export default App;
