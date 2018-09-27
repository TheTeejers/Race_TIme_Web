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
    this.handleRacerSelect = this.handleRacerSelect.bind(this);
    // this.getRacerData = this.getRacerData.bind(this);
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

  handleRacerSelect(e){
    console.log("checkbox changed!");
    this.setState({
      racerURL: e.target.value
      },
      this.toggleIsChecked
    );
    sessionStorage.setItem('uniqueRacerUrl', this.state.racerURL)
    e.preventDefault();


    console.log(sessionStorage)
  }


  render() {
    let racerDataArray = this.state.racerDataLookup
    sessionStorage.setItem('racerLocationSearchURL', `https://kartlaps.info/v2/${sessionStorage.getItem('trackLocation')}/search/${sessionStorage.getItem('racerLookupInput')}`)
    console.log('location search', sessionStorage.getItem('trackLocation'))
    console.log('user search', sessionStorage.getItem('racerLookupInput'))
    console.log('URL search', sessionStorage.getItem('racerLocationSearchURL'))
    console.log('data logging', racerDataArray)
    let uniqueUser = [];
    for (var i = 0; i < racerDataArray.length; i++){
      uniqueUser.push(

        <div key={i}><br/>
          <input type='checkbox' value={racerDataArray[i].url} onChange={this.handleRacerSelect} checked={this.state.isChecked}></input>
          <div>Racer ID: {racerDataArray[i].id}</div>
            <div className='racerName'>  Racer Name: {racerDataArray[i].racerName}  </div>
            <div className='actualName'>  Real Name: {racerDataArray[i].realFirstName} {racerDataArray[i].realLastName}  </div>



        </div>
      )

    }



    return (
      <div className="App">
        {uniqueUser}
        <Link to ="/RacerData">
          <button onClick={this.getRacerData}>Select</button>
        </Link>
      </div>
    );
  }
}

export default UsersFound;
