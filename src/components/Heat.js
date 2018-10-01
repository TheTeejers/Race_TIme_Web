import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios'

class Heat extends Component {
  constructor(props){
    super(props);
    this.state = {
      heatData: '',
      heatId: '',
      heatLocation: '',
      heatName: '',
      heatDate: '',
      heatWinBy: '',
      heatRacers: '',
      heatLaps: ''
    }
  console.log(sessionStorage.getItem('selected heat'))
  axios.get(sessionStorage.getItem('selected heat'))
  .then((response) => {
    if (response.data.status === 'ERROR') {
      alert('No results for that email')
    } else {
      let fullHeatData = response.data.heat
      let fullHeatId = response.data.heat.id
      let fullHeatLocation = response.data.heat.location.id
      let fullHeatName = response.data.heat.name
      let fullHeatDate = response.data.heat.localDateTime
      let fullHeatWinBy = response.data.heat.winBy
      let fullHeatRacers = response.data.heat.participants
      let fullHeatLaps = response.data.heat.laps
      this.setState({
        heatData: fullHeatData,
        heatId: fullHeatId,
        heatLocation: fullHeatLocation,
        heatName: fullHeatName,
        heatDate: fullHeatDate,
        heatWinBy: fullHeatWinBy,
        heatRacers: fullHeatRacers,
        heatLaps: fullHeatLaps
      })
    }
  })
}

  render() {
    const thisHeat = this.state.heatData
    let heatId  = thisHeat.id
    let heatLocation = this.state.heatLocation
    let heatName = thisHeat.name
    let heatDate = thisHeat.localDateTime
    let heatWinType = thisHeat.winBy
    let racersInHeat = this.state.heatRacers
    let racerLaps = this.state.heatLaps
    let heatResults = []

    // let heatInformation = []
    console.log('racers', racersInHeat);
    console.log('laps', racerLaps);

    for (var i = 0; i < racersInHeat.length; i++){
      function doTheClick(url){
          let onClick = function(){
          sessionStorage.setItem('uniqueRacerUrl', url)
        }
        return onClick
      }
      for (var j = 0; j < this.state.heatLaps.length; j++){
        if(racersInHeat[i].id ===racerLaps[j].racerId){
          console.log(racersInHeat[i].racerName)
          console.log(racersInHeat[i])
          console.log(racerLaps[j].racerLaps.length);

          let lapData = racerLaps[j].racerLaps
                  console.log(lapData);
          let fastestLap =[1000000]
          let fastestLapString = ''
          for (var k = 0; k < lapData.length; k++){
            if(lapData[k].seconds < fastestLap[0]){
              fastestLap.shift()
              fastestLap.push(lapData[k].seconds)
              fastestLapString = fastestLap[0].toString().padEnd(6,0)
              console.log(fastestLapString)
            }
          }
          fastestLap.shift()
          fastestLap.push(fastestLapString)
          heatResults.push(
            <tbody key={i}>
              <tr>
                <td>{lapData[lapData.length-1].position}</td>
                <td>
                  <Link to='/RacerData'>
                    <button onClick={doTheClick(racersInHeat[i].url)}>
                      {racersInHeat[i].racerName}
                    </button>
                  </Link>
                </td>
                <td>{fastestLap}</td>
                <td>{lapData.length}</td>
              </tr>
            </tbody>
          )
        }
      }


    }


    return (
    <div className="App">
      <div>{sessionStorage.getItem('selected heat')}</div>
      <div>{heatId}</div>
      <div>{heatLocation}</div>
      <div>{heatName}</div>
      <div>{heatDate}</div>
      <div>{heatWinType}</div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Racer Name</th>
            <th>Fastest Time</th>
            <th>Number of Laps</th>
          </tr>
        </thead>
        {heatResults}

      </table>
    </div>
    );
  }
}

export default Heat;
