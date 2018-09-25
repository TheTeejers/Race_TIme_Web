import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import UsersFound from './UsersFound.js';

// import axios from 'axios'


class RacerData extends Component {


  render() {
    console.log(this.props.foundRacerData.length);
    console.log(this.props.foundRacerData);
    // console.log(this.props.foundRacerData.heats.length);
    console.log(this.props.foundUsersList.length)
    // console.log(this.props.foundRacerData.length);
    let uniqueRacerFastestTime = [10000000]
    let uniqueRacerFastestDate = []
    let racerName = [this.props.foundRacerData.racerName]
    for (var i = 0; i < this.props.foundRacerData.length; i++){
      // if()
      if (uniqueRacerFastestTime[0] > this.props.foundRacerData[i].bestLapTime){
        uniqueRacerFastestTime.shift();
        uniqueRacerFastestTime.push('Fastest Time: ' + this.props.foundRacerData[i].bestLapTime);
        uniqueRacerFastestDate.shift();
        uniqueRacerFastestDate.push('Occurred on: ' + this.props.foundRacerData[i].heat.localDateTime)
      }
    }

    return (
      <div className="App">

        <div>{racerName}</div>
        <div>{uniqueRacerFastestTime}</div>
        <div>{uniqueRacerFastestDate}</div>

      </div>
    );
  }
}

export default RacerData;
