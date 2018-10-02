import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
      yearSelected: '',
      kartSelected: '',
      raceTypeSelected: '',
      raceTrackSelected: ''
    }

    this.handleYearSelect = this.handleYearSelect.bind(this);
    this.handleKartSelect = this.handleKartSelect.bind(this);
    this.handleRaceTypeSelect = this.handleRaceTypeSelect.bind(this);
    this.handleRaceTrackSelect = this.handleRaceTrackSelect.bind(this);
    this.handleHeatSelect = this.handleHeatSelect.bind(this);
    this.handleReload = this.handleReload.bind(this);


    sessionStorage.setItem('selected year', 'allYears')
    sessionStorage.setItem('selected kart', 'allKarts')
    sessionStorage.setItem('selected race type', 'allRaces')
    sessionStorage.setItem('selected race track', 'allTracks')
    // console.log('unique url', sessionStorage.getItem('uniqueRacerUrl'));
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
        sessionStorage.setItem('Racer Name', populatedRacerDataName)
        console.log(sessionStorage.getItem('Racer Name'));
        // sessionStorage.setItem('selected race track', populatedFullRacerData.location.id)

        // console.log(populatedFullRacerData.location.id)
        // console.log(populatedRacerDataHeats)
      }
    })
  }

handleYearSelect(e){
  this.setState({
    yearSelected: e.target.value
  })
  console.log(this.state.yearSelected)
  console.log(this.refs.yearSelectInput.value);
  sessionStorage.setItem('selected year', this.refs.yearSelectInput.value)
}

handleKartSelect(e){
  this.setState({
    kartSelected: e.target.value
  })
  console.log(this.state.kartSelected)
  console.log(this.refs.kartSelectInput.value);
  sessionStorage.setItem('selected kart', this.refs.kartSelectInput.value)
}

handleRaceTypeSelect(e){
  this.setState({
    raceTypeSelected: e.target.value
  })
  console.log(this.state.raceTypeSelected)
  console.log(this.refs.raceTypeSelectInput.value);
  sessionStorage.setItem('selected race type', this.refs.raceTypeSelectInput.value)
}

handleRaceTrackSelect(e){
  this.setState({
    raceTrackSelected: e.target.value
  })
  console.log(this.state.raceTrackSelected)
  console.log(this.refs.raceTrackSelectInput.value);
  sessionStorage.setItem('selected race track', this.refs.raceTrackSelectInput.value)
}

handleHeatSelect(e){
  sessionStorage.setItem('selected heat', this.refs.heatSelectLink.value)
}

handleSaveRacer(e){
  localStorage.setItem(sessionStorage.getItem('Racer Name') + ' at ' + sessionStorage.getItem('trackLocation'), sessionStorage.getItem('uniqueRacerUrl'))
  console.log(localStorage)
  window.location.reload()
  // localStorage.clear()
}

handleReload(e){
  window.location.reload()
  // localStorage.clear()
}


  render() {
    console.log(sessionStorage.getItem('Racer Name'));

sessionStorage.setItem('Racer Name', sessionStorage.getItem('Racer Name'))

console.log(sessionStorage.getItem('Racer Name'));


    let count = 1
    let racerName = this.state.racerDataName
    let currentPoints = this.state.racerCurrentPoints
//TODO put in location to show on screen
    let totalRaces = []
    let fastestLapTime0 = [100000000]
    // let fastestLapTime1 = [100000000]
    let fastestLapDate0 = []
    // let fastestLapDate1 = []
    let fastestLapKart0 = []
    // let fastestLapKart1 = []
    let fastestLapType0 = []
    let heatData = []
    let raceType = []
    let raceKart = []
    let raceYear = []
    let trackNumber = []
    let raceSelection = []
    let kartSelection = []
    let yearSelection = []
    let trackSelection = []
    let rememberButton = [<button key = {0} className='button inputButton searchButton' onClick={this.handleSaveRacer} ref='racerSave' value='2'>Remember Racer at {sessionStorage.getItem('trackLocation')}</button>]
    let alreadySavedRacer = []

    for (var z = 0; z < localStorage.length; z++){
      if (localStorage.key(z) === sessionStorage.getItem('Racer Name') + ' at ' + sessionStorage.getItem('trackLocation')){
        rememberButton.shift()
        alreadySavedRacer.push(
          <div key={0}>[  Racer Is In Saved List  ]</div>
        )
      }
    }


    if (typeof this.state.racerHeatsData !== 'undefined'){
      const dataLength = this.state.racerHeatsData.length
      totalRaces.push(dataLength)
      for (var i = 0; i < dataLength; i++){

        const data = this.state.racerHeatsData[i]
        let pointsAtEnd = data.pointsImpact + data.pointsAtStart
        let dateOnly = data.heat.localDateTime.split(' ')[0]
        // let timeOnly = data.heat.localDateTime.split(' ')[1]
        // let monthOnly = dateOnly.split('/')[0]
        // let dayOnly = dateOnly.split('/')[1]
        let yearOnly = dateOnly.split('/')[2]
        let kartNumberNumber = parseInt(sessionStorage.getItem('selected kart'),0)
        let trackNumberAll = data.heat.name.split(' ')
        let trackNumberOnly = trackNumberAll[trackNumberAll.length-1]


        //Set the selection for race type
        // raceKart.indexOf(data.kartNumber) === -1 ? raceKart.push(data.kartNumber) : '';
        // raceType.indexOf(data.heat.name) === -1 ? raceType.push(data.heat.name): '';
        // raceYear.indexOf(yearOnly) === -1 ? raceYear.push(yearOnly) : '';
        // trackNumber.indexOf(trackNumberOnly) === -1 ? trackNumber.push(trackNumberOnly) : '';



        //Push data to table
        if((sessionStorage.getItem('selected year') === yearOnly
        || sessionStorage.getItem('selected year') === 'allYears')
        && (kartNumberNumber === data.kartNumber
        || sessionStorage.getItem('selected kart') === 'allKarts')
        && (sessionStorage.getItem('selected race type') === data.heat.name
        || sessionStorage.getItem('selected race type') === 'allRaces')
        && (sessionStorage.getItem('selected race track') === trackNumberOnly
        || sessionStorage.getItem('selected race track') === 'allTracks')){
          raceType.indexOf(data.heat.name) === -1 ? raceType.push(data.heat.name): count +=1;
          raceKart.indexOf(data.kartNumber) === -1 ? raceKart.push(data.kartNumber) : count +=1;
          raceYear.indexOf(yearOnly) === -1 ? raceYear.push(yearOnly) : count +=1;
          trackNumber.indexOf(trackNumberOnly) === -1 ? trackNumber.push(trackNumberOnly) : count +=1;
          // console.log(count)
          let heatUrl = []
          heatUrl.push(data.heat.id)
          sessionStorage.setItem(heatUrl[i], data.heat.url)
          function doTheClick(url){
              let onClick = function(){
              sessionStorage.setItem('selected heat', url)
            }
            return onClick
          }
          heatData.push(

            <tbody key={i}>
              <tr>
                <td>{dataLength - i}</td>
                <td>
                  <Link  to='/Heat'>
                    <button className='heatLink' onClick={doTheClick(sessionStorage.getItem(heatUrl[i]))} ref='heatSelectLink' value={sessionStorage.getItem(heatUrl[i])}>
                      {data.heat.name}
                    </button>
                  </Link>
                </td>

                {/* <td>{heatUrl}</td> */}
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
        if(
            // (data.heat.name === ('.Standard' || '.Standard T1')) &&
            (sessionStorage.getItem('selected year') === yearOnly || sessionStorage.getItem('selected year') === 'allYears') &&
            (kartNumberNumber === data.kartNumber || sessionStorage.getItem('selected kart') === 'allKarts') &&
            (sessionStorage.getItem('selected race type') === data.heat.name || sessionStorage.getItem('selected race type') === 'allRaces')
            && (sessionStorage.getItem('selected race track') === trackNumberOnly
            || sessionStorage.getItem('selected race track') === 'allTracks')
          ){
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
        // } else if (data.heat.name === '.Standard T2' ){
        //   if(fastestLapTime1[0] > data.bestLapTime){
        //     fastestLapTime1.shift();
        //     fastestLapTime1.push(data.bestLapTime)
        //     fastestLapKart1.shift();
        //     fastestLapKart1.push(data.kartNumber)
        //     fastestLapDate1.shift();
        //     fastestLapDate1.push(dateOnly)
        //   }
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
    if (raceKart.length > 0) {
      for (var k = 0; k < raceKart.length; k++){
        if (raceKart[k] < 10){
          raceKart.splice(k, 1, '0'+raceKart[k])
        }
      }
    }
    raceKart.sort()
    if (raceKart.length > 0) {
      for (var l = 0; l < raceKart.length; l++){

        kartSelection.push(
            <option key={l} value={raceKart[l]}>{raceKart[l]}</option>
        )
      }
    }
    if (raceYear.length > 0) {
      for (var m = 0; m < raceYear.length; m++){
        yearSelection.push(
            <option key={m} value={raceYear[m]}>{raceYear[m]}</option>
        )
      }
    }
    if (trackNumber.length > 0) {
      for (var n = 0; n < trackNumber.length; n++){
        trackSelection.push(
            <option key={n} value={trackNumber[n]}>{trackNumber[n]}</option>
        )
      }
    }
    return (
      <div className="App">


        <div>
          {rememberButton}
          <button className='button inputButton searchButton' onClick={this.handleReload}>Refresh Data</button>
        </div>
        <div className='racerName'>{racerName}</div>
        <div className='savedInfo'>{alreadySavedRacer}</div><br/>
        <div  className='racerInfo'>Total Races: <span className='numberOutput'>{totalRaces}</span></div><br/>
        <div className='racerInfo'>Current Points: <span className='numberOutput'>{currentPoints}</span></div><br/>
        <div className='racerInfo'>Fastest time was <span className='numberOutput'>{fastestLapTime0}</span> seconds in kart <span className='numberOutput'>{fastestLapKart0}</span> on  <span className='numberOutput'>{fastestLapDate0}</span></div> <div  className='racerInfo'>(<span className='numberOutput'>{fastestLapType0} heat</span>)</div><br/>
        {/* <div>Fastest time on T2 was {fastestLapTime1} in kart {fastestLapKart1} on  {fastestLapDate1}</div><br/> */}



        <form >
          <label>
            <select value={sessionStorage.getItem('selected race track')} onChange={this.handleRaceTrackSelect} ref='raceTrackSelectInput'>
              <option value="allTracks">All Tracks</option>
              {trackSelection}
            </select>
          </label>
        </form><br/>

        <form >
          <label>
            <select value={sessionStorage.getItem('selected race type')} onChange={this.handleRaceTypeSelect} ref='raceTypeSelectInput'>
              <option value="allRaces">All Race Types</option>
              {raceSelection}
            </select>
          </label>
        </form><br/>

        <form >
          <label>
            <select value={sessionStorage.getItem('selected kart')} onChange={this.handleKartSelect} ref='kartSelectInput'>
              <option value= 'allKarts'>All Karts</option>
              {kartSelection}
            </select>
          </label>
        </form><br/>

        <form >
          <label>
            <select value={sessionStorage.getItem('selected year')} onChange={this.handleYearSelect} ref='yearSelectInput'>
              <option value="allYears">All Years</option>
              {yearSelection}
            </select>
          </label>
        </form><br/>




        <div className='tableContainer'>
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


      </div>
    );
  }
}

export default RacerData;
