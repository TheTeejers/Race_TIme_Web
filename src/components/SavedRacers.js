import React, { Component } from 'react';
// import Routes from './Routes.js';
// import Search from './components/Search.js';
// import UserSearch1 from './components/UserSearch1.js';
// import Home from './components/Home.js';
// import RacerData from './components/RacerData.js';
// import UsersFound from './components/UsersFound.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

class SavedRacers extends Component {
  render() {
    let savedRacerData = [];

    console.log('local storage', localStorage)
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      // data.push(localStorage.key( i ))
      console.log(localStorage.getItem(localStorage.key(i)));
      console.log(localStorage.key(i));
      let strorageKeySplit = localStorage.key(i).split(' ')
      let location = strorageKeySplit[strorageKeySplit.length-1]
      // console.log(location);
      function doTheClick(url){
          let onClick = function(){
          sessionStorage.setItem('uniqueRacerUrl', url)

          sessionStorage.setItem('trackLocation', location)

        }
        return onClick
      }
      function removeRacer(url){
          let onClick1 = function(){
            console.log('clicked remove');
          localStorage.removeItem(url)
          window.location.reload()
          console.log(url)
        }
        return onClick1
      }

      savedRacerData.push(

        <div key={i}><br/>
          <Link to ="/RacerData">
            <button onClick={doTheClick(localStorage.getItem(localStorage.key(i)))}>
              <div>{localStorage.key(i)}</div>
            </button>
          </Link>
          <button onClick={removeRacer(localStorage.key(i))}>
            <div>Remove</div>
          </button>
        </div>
      )

console.log(localStorage.getItem(localStorage.key(i)));


    }



    return (
      <div className="App">
        {savedRacerData}

      </div>
    );
  }
}

export default SavedRacers;
