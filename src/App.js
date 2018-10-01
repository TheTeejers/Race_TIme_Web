import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes.js';
// import Search from './components/Search.js';
// import UserSearch1 from './components/UserSearch1.js';
// import Home from './components/Home.js';
// import RacerData from './components/RacerData.js';
// import UsersFound from './components/UsersFound.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    let saveButton = []

      if (localStorage.length > 0){
        saveButton.push(
          <Link  key = {1} to='/SavedRacers'>
            <input className='searchButton' type="submit" value='Saved Racers' />
          </Link>
        )
      } else {
        saveButton.shift()
      }


    return (
      <div className="App">

        <Link to='/UserSearch1'>
          <input className='searchButton' type="submit" value='Get Profile' />
        </Link>
        {saveButton}
        <Routes />
      </div>
    );
  }
}

export default App;
