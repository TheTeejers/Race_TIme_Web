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


    // sessionStorage.getItem()
    // console.log('session info', sessionStorage);
    console.log(sessionStorage.getItem('uniqueRacerUrl'));
    axios.get(sessionStorage.getItem('uniqueRacerUrl'))
    .then((response) => {
      // console.log("Search results should be showing");
      if (response.data.status === 'ERROR') {
        alert('No results for that email')
      } else {
        // console.log(response.data.racer)
        // racerName.push(response.data.racer.racerName)
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
    let fastestLapTime0 = [100000000]
    let fastestLapTime1 = [100000000]
    let fastestLapTime2 = [100000000]
    let fastestLapDate0 = []
    let fastestLapDate1 = []
    let fastestLapDate2 = []
    let fastestLapKart0 = []
    let fastestLapKart1 = []
    let fastestLapKart2 = []
    for (var i = 0; i < this.state.racerHeatsData.length; i++){
      const data = this.state.racerHeatsData[i]
      if(data.heat.name === '.Standard'){
        console.log(i, 'single track')
        if(fastestLapTime0[0] > data.bestLapTime){
          fastestLapTime0.shift();
          fastestLapTime0.push(data.bestLapTime)
          fastestLapKart0.shift();
          fastestLapKart0.push(data.kartNumber)
          fastestLapDate0.shift();
          fastestLapDate0.push(data.heat.localDateTime)
        }
      } else if (data.heat.name === '.Standard T1'){
        console.log(i,data.bestLapTime, fastestLapTime1, data.heat.localDateTime, 'track 1')
        if(fastestLapTime1[0] > data.bestLapTime){
          fastestLapTime1.shift();
          fastestLapTime1.push(data.bestLapTime)
          fastestLapKart1.shift();
          fastestLapKart1.push(data.kartNumber)
          fastestLapDate1.shift();
          fastestLapDate1.push(data.heat.localDateTime)
        }
      } else if (data.heat.name === '.Standard T2'){
        console.log(i, 'track 2')
        if(fastestLapTime2[0] > data.bestLapTime){
          fastestLapTime2.shift();
          fastestLapTime2.push(data.bestLapTime)
          fastestLapKart2.shift();
          fastestLapKart2.push(data.kartNumber)
          fastestLapDate2.shift();
          fastestLapDate2.push(data.heat.localDateTime)
        }
      }
    }

    return (
      <div className="App">

        <div>{racerName}</div>
        <div>Current Points: {currentPoints}</div>
        <div>Fastest time was {fastestLapTime0} in kart {fastestLapKart0} on  {fastestLapDate0}</div>
        <div>Fastest time was {fastestLapTime1} in kart {fastestLapKart1} on  {fastestLapDate1}</div>
        <div>Fastest time was {fastestLapTime2} in kart {fastestLapKart2} on  {fastestLapDate2}</div>



      </div>
    );
  }
}

export default RacerData;
