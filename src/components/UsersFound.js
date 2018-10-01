import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


class UsersFound extends Component {
  constructor(props){
    super(props);
    this.state = {
      racerURL: 'no data returned',
      racerDataLookup: '',
      isChecked: false
    }


    // this.updateCheckbox = this.updateCheckbox.bind(this);
    this.toggleIsChecked = this.toggleIsChecked.bind(this);
    // this.handleRacerSelect = this.handleRacerSelect.bind(this);
    // this.getRacerData = this.getRacerData.bind(this);

    sessionStorage.setItem('selected year', 'allYears')
    sessionStorage.setItem('selected kart', 'allKarts')
    sessionStorage.setItem('selected race type', 'allRaces')
    sessionStorage.setItem('selected race track', 'allTracks')
    sessionStorage.setItem('racerLocationSearchURL', `https://kartlaps.info/v2/${sessionStorage.getItem('trackLocation')}/search/${sessionStorage.getItem('racerLookupInput')}`)



    console.log("set racer url", sessionStorage.getItem('racerLocationSearchURL'))
    axios.get(sessionStorage.getItem('racerLocationSearchURL'))
    .then((response) => {
      if (response.data.status === 'ERROR'){
        alert('No data for that Racer')
      } else {

        console.log("WORKS!!!", response.data.search.results)
        let respondedData = response.data.search.results
        this.setState({
          racerDataLookup: respondedData
        })
      }
    })
  }






  toggleIsChecked() {
      console.log("toggling isChecked value!");
      this.setState({
        // isChecked: true
        isChecked: !this.state.isChecked
      });
  }

  // handleRacerSelect(e){
  //   console.log("checkbox changed!");
  //   this.setState({
  //     racerURL: e.target.value
  //     },
  //     this.toggleIsChecked
  //   );
  //   sessionStorage.setItem('uniqueRacerUrl', this.state.racerURL)
  //   e.preventDefault();
  //
  //
  //   console.log(sessionStorage)
  // }


  render() {
    let returnedData = []
    console.log(returnedData.length)
    let racerDataArray = this.state.racerDataLookup
    sessionStorage.setItem('racerLocationSearchURL', `https://kartlaps.info/v2/${sessionStorage.getItem('trackLocation')}/search/${sessionStorage.getItem('racerLookupInput')}`)
    console.log('location search', sessionStorage.getItem('trackLocation'))
    console.log('user search', sessionStorage.getItem('racerLookupInput'))
    console.log('URL search', sessionStorage.getItem('racerLocationSearchURL'))
    console.log('data logging', racerDataArray)
    if (racerDataArray.length ===0){
      returnedData.push('Searching for Racers')
    } else {
      returnedData.shift()
    }
    let uniqueUser = [];
    console.log(uniqueUser.length)
    for (var i = 0; i < racerDataArray.length; i++){

      function doTheClick(url){
          let onClick = function(){
          sessionStorage.setItem('uniqueRacerUrl', url)
        }
        return onClick
      }
      uniqueUser.push(
        <div key={i}><br/>
            <Link to ="/RacerData">
              <button onClick={doTheClick(racerDataArray[i].url)}>
                <div>Racer ID: {racerDataArray[i].id}</div>
                <div className='racerName'>  Racer Name: {racerDataArray[i].racerName}  </div>
                <div className='actualName'>  Real Name: {racerDataArray[i].realFirstName} {racerDataArray[i].realLastName}  </div>
              </button>
            </Link>

        </div>
      )
      console.log(racerDataArray[i]);
    }



    return (
      <div className="App">
        {returnedData}
        {uniqueUser}
      </div>
    );
  }
}

export default UsersFound;
