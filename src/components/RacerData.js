import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import UsersFound from './UsersFound.js';

import axios from 'axios'


class RacerData extends Component {
  constructor(props){
    super(props);
    this.state = {
      racerFullData: '',
      racerHeatsData: '',
      racerDataName: '',
      racerCurrentPoints: ''
    }


    console.log(sessionStorage.getItem('uniqueRacerUrl'));
    axios.get(sessionStorage.getItem('uniqueRacerUrl'))
    .then((response) => {

      if (response.data.status === 'ERROR') {
        alert('No results for that email')
      } else {

        let populatedFullRacerData = response.data.racer
        let populatedRacerDataName = response.data.racer.racerName
        let populatedRacerDataPoints = response.data.racer.points
        let populatedRacerDataHeats = response.data.racer.heats

        this.setState({
          racerFullData: populatedFullRacerData,
          racerHeatsData: populatedRacerDataHeats,
          racerCurrentPoints: populatedRacerDataPoints,
          racerDataName: populatedRacerDataName
        })
        console.log(populatedFullRacerData)
        console.log(populatedRacerDataHeats)
      }
    })
  }
  render() {
    let racerName = this.state.racerDataName
    let currentPoints = this.state.racerCurrentPoints
    let totalRaces = []
    let fastestLapTime0 = [100000000]
    let fastestLapTime1 = [100000000]
    let fastestLapDate0 = []
    let fastestLapDate1 = []
    let fastestLapKart0 = []
    let fastestLapKart1 = []
    let heatData = []
    let raceType = []
    let raceSelection = []
    if (typeof this.state.racerHeatsData !== 'undefined'){
      totalRaces.push(this.state.racerHeatsData.length)
      for (var i = 0; i < this.state.racerHeatsData.length; i++){

        const data = this.state.racerHeatsData[i]
        //Set the selection for race type
        raceType.indexOf(data.heat.name) === -1 ? raceType.push(data.heat.name) : ''




        let pointsAtEnd = data.pointsImpact + data.pointsAtStart
        let dateOnly = data.heat.localDateTime.split(' ')[0]
        let timeOnly = data.heat.localDateTime.split(' ')[1]
        let monthOnly = dateOnly.split('/')[0]
        let dayOnly = dateOnly.split('/')[1]
        let yearOnly = dateOnly.split('/')[2]
        //Push data to table
        heatData.push(
          <tbody key={i}>
            <tr>
              <td>{data.heat.name}</td>
              <td>{data.kartNumber}</td>
              <td>{dateOnly}</td>
              <td>{data.pointsImpact}</td>
              <td>{pointsAtEnd}</td>
              <td>{data.bestLapTime}</td>
              <td>{data.finalPosition}</td>
            </tr>
          </tbody>
        )
        //Set race selection list

        //Post Top Times
        if(data.heat.name === '.Standard' || '.Standard T1'){
          if(fastestLapTime0[0] > data.bestLapTime){
            fastestLapTime0.shift();
            fastestLapTime0.push(data.bestLapTime)
            fastestLapKart0.shift();
            fastestLapKart0.push(data.kartNumber)
            fastestLapDate0.shift();
            fastestLapDate0.push(data.heat.localDateTime)
          }
        } else if (data.heat.name === '.Standard T2'){
          if(fastestLapTime1[0] > data.bestLapTime){
            fastestLapTime1.shift();
            fastestLapTime1.push(data.bestLapTime)
            fastestLapKart1.shift();
            fastestLapKart1.push(data.kartNumber)
            fastestLapDate1.shift();
            fastestLapDate1.push(data.heat.localDateTime)
          }
        }
      }
    } else {
      //If no data at location, pop up alert
      alert(racerName + 'has never raced at ' + sessionStorage.getItem('trackLocation'))
      heatData.push(
        <tbody key='0'>
          <tr>
            <td>No</td>
            <td>Race</td>
            <td>Data</td>
            <td>For</td>
            <td>This</td>
            <td>K1 Speed</td>
            <td>Location</td>
          </tr>
        </tbody>
      )
    }
    if (raceType.length > 0) {
      for (var j = 0; raceType.length; j++){
        console.log(raceType);
        // raceSelection.push(
        //   <select key={j} >
        //     <option value={raceType[j]}>{raceType[j]}</option>
        //   </select>
        // )
      }

    }

    return (
      <div className="App">

        <br/><div>{racerName}</div><br/>
        <div>Total Races: {totalRaces}</div><br/>
        <div>Current Points: {currentPoints}</div><br/>
        <div>Fastest time on T1 was {fastestLapTime0} in kart {fastestLapKart0} on  {fastestLapDate0}</div><br/>
        <div>Fastest time on T2 was {fastestLapTime1} in kart {fastestLapKart1} on  {fastestLapDate1}</div><br/>


        <form >
          <label>

          </label>
        </form>






        <table>
          <thead>
            <tr>
              <th>Heat Type</th>
              <th>Kart</th>
              <th>Date</th>
              <th>Points Earned</th>
              <th>Total Points</th>
              <th>Best Time</th>
              <th>Position</th>
            </tr>
          </thead>
          {heatData}

        </table>


      </div>
    );
  }
}

export default RacerData;
