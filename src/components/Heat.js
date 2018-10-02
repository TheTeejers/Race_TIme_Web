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
          let allLaps = []
          let averageLap = []
          for (var k = 0; k < lapData.length; k++){
            allLaps.push(lapData[k].seconds)

            if(lapData[k].seconds < fastestLap[0]){
              fastestLap.shift()
              fastestLap.push(lapData[k].seconds)
              fastestLapString = fastestLap[0].toString().padEnd(6,0)
              console.log(fastestLapString)

            }
          }
          console.log(allLaps)
          function add(a, b) {
              return a + b;
          }
          averageLap.push((allLaps.reduce(add,0)/allLaps.length).toFixed(3))

          fastestLap.shift()
          fastestLap.push(fastestLapString)
          heatResults.push(
            <tbody key={i}>
              <tr>
                <td>{lapData[lapData.length-1].position}</td>
                <td>
                  <Link to='/RacerData'>
                    <button className='heatLink' onClick={doTheClick(racersInHeat[i].url)}>
                      {racersInHeat[i].racerName}
                    </button>
                  </Link>
                </td>
                <td>{fastestLap}</td>
                <td>{lapData.length}</td>
                <td>{averageLap}</td>
              </tr>
            </tbody>
          )
        }
      }


    }


    return (
    <div className="App">
      {/* <div>{sessionStorage.getItem('selected heat')}</div> */}
      <div className='racerInfo'>Heat ID: <span className='numberOutput'>{heatId}</span></div>
      <div className='racerInfo'>Location: <span className='numberOutput'>{heatLocation}</span></div>
      <div className='racerInfo'>Race Type: <span className='numberOutput'>{heatName}</span></div>
      <div className='racerInfo'>Date and TIme: <span className='numberOutput'>{heatDate}</span></div>
      <div className='racerInfo'>Win By: <span className='numberOutput'>{heatWinType}</span></div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Racer Name</th>
            <th>Fastest Time</th>
            <th>Number of Laps</th>
            <th>Average Lap Time</th>
          </tr>
        </thead>
        {heatResults}

      </table>
    </div>
    );
  }
}

export default Heat;
