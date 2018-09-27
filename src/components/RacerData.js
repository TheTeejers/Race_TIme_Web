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
      racerCurrentPoints: '',
      yearSelected: ''
    }

    this.handleYearSelect = this.handleYearSelect.bind(this);

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

handleYearSelect(e){
  console.log('yoyoyoyo')

  this.setState({
    yearSelected: e.target.value
  })
  console.log(this.state.yearSelected)
  console.log(this.refs.yearSelectInput.value);
  sessionStorage.setItem('selected year', this.refs.yearSelectInput.value)
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
    let fastestLapType0 = []
    let heatData = []
    let raceType = []
    let raceYear = []
    let raceSelection = []
    let yearSelection = []
    if (typeof this.state.racerHeatsData !== 'undefined'){
      const dataLength = this.state.racerHeatsData.length
      totalRaces.push(dataLength)
      for (var i = 0; i < dataLength; i++){

        const data = this.state.racerHeatsData[i]
        let pointsAtEnd = data.pointsImpact + data.pointsAtStart
        let dateOnly = data.heat.localDateTime.split(' ')[0]
        let timeOnly = data.heat.localDateTime.split(' ')[1]
        let monthOnly = dateOnly.split('/')[0]
        let dayOnly = dateOnly.split('/')[1]
        let yearOnly = dateOnly.split('/')[2]


        //Set the selection for race type
        raceType.indexOf(data.heat.name) === -1 ? raceType.push(data.heat.name) : ''
        raceYear.indexOf(yearOnly) === -1 ? raceYear.push(yearOnly) : ''





        //Push data to table
        if((sessionStorage.getItem('selected year') === yearOnly || sessionStorage.getItem('selected year') === 'allYears')){
          heatData.push(
            <tbody key={i}>
              <tr>
                <td>{dataLength - i}</td>
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
        }
        //Set race selection list

        //Post Top Times
        if(data.heat.name === ('.Standard' || '.Standard T1') && (sessionStorage.getItem('selected year') === yearOnly || sessionStorage.getItem('selected year') === 'allYears')){
          if(fastestLapTime0[0] > data.bestLapTime){
            fastestLapType0.shift();
            fastestLapType0.push(data.heat.name)
            fastestLapTime0.shift();
            fastestLapTime0.push(data.bestLapTime)
            fastestLapKart0.shift();
            fastestLapKart0.push(data.kartNumber)
            fastestLapDate0.shift();
            fastestLapDate0.push(dateOnly)
          }
        } else if (data.heat.name === '.Standard T2' && (sessionStorage.getItem('selected year') === yearOnly || sessionStorage.getItem('selected year') === 'allYears')){
          if(fastestLapTime1[0] > data.bestLapTime){
            fastestLapTime1.shift();
            fastestLapTime1.push(data.bestLapTime)
            fastestLapKart1.shift();
            fastestLapKart1.push(data.kartNumber)
            fastestLapDate1.shift();
            fastestLapDate1.push(dateOnly)
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
      for (var j = 0; j < raceType.length; j++){
        raceSelection.push(
            <option key={j} value={raceType[j]}>{raceType[j]}</option>
        )
      }
    }
    if (raceYear.length > 0) {
      for (var k = 0; k < raceYear.length; k++){
        yearSelection.push(
            <option key={k} value={raceYear[k]}>{raceYear[k]}</option>
        )
      }
    }

    return (
      <div className="App">

        <br/><div>{racerName}</div><br/>
        <div>Total Races: {totalRaces}</div><br/>
        <div>Current Points: {currentPoints}</div><br/>
        <div>Fastest time on T1 was {fastestLapTime0} seconds in kart {fastestLapKart0} on  {fastestLapDate0} ({fastestLapType0} heat)</div><br/>
        <div>Fastest time on T2 was {fastestLapTime1} in kart {fastestLapKart1} on  {fastestLapDate1}</div><br/>


        <form >
          <label>
            <select  >
              <option value="allRaces">All Race Types</option>
              {raceSelection}
            </select>
          </label>
        </form>

        <form >
          <label>
            <select value={this.state.yearSelected} onChange={this.handleYearSelect} ref='yearSelectInput'>
              <option value="allYears">All Years</option>
              {yearSelection}
            </select>
          </label>
        </form>





        <table>
          <thead>
            <tr>
              <th>Race</th>
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
