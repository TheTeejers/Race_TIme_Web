import React, { Component } from 'react';
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

    let heatResults = []
    // let heatInformation = []
    console.log(racersInHeat);
    // console.log(racersInHeat);
    for (var i = 0; i < racersInHeat.length; i++){
      console.log(racersInHeat[i].racerName)
      heatResults.push(
        <tbody key={i}><br/>
          <tr>
            <td>{racersInHeat[i].racerName}</td>
            <td></td>
          </tr>
        </tbody>
      )
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
            <th>Kart</th>
            <th>Date</th>
            <th>Points Earned</th>
            <th>Total Points</th>
            <th>Best Time</th>
            <th>Position</th>
          </tr>
        </thead>
        {heatResults}

      </table>
    </div>
    );
  }
}

export default Heat;
