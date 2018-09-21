import React, { Component } from 'react';
import axios from 'axios'

// import RacerData from '../components/RacerData.js';


class UsersFound extends Component {
  constructor(props){
    super(props);
    this.state = {
      racerURL: 'null!'
    }

    this.handleRacerSelect = this.handleRacerSelect.bind(this);
    this.getRacerData = this.getRacerData.bind(this);

  }


  getRacerData(){

    console.log("yo", this.state.racerURL)
    axios.get(this.state.racerURL)
    .then((response) => {
      console.log('axios 2 working')
      if (response.data.status === 'ERROR') {
        alert ('click again')
      } else {
        let newRacerData = response.data.racer
        this.setState({
          racerDataLookup: newRacerData
        })
        console.log(newRacerData)
        // this.props.onSubmitQuery(newRacerData);
      }
    })
  }


  handleRacerSelect(e){

    this.setState({
      racerURL: e.target.value
    });
    e.preventDefault();
    this.getRacerData();

    console.log(this.state.racerURL)
  }


  render() {
    // console.log(this.props.foundUsersList)

    let uniqueUser = [];
    for (var i = 0; i < this.props.foundUsersList.length; i++){
      uniqueUser.push(

        <div key={i}><br/>

            <div className='racerID'>Racer ID: {this.props.foundUsersList[i].id}  </div>
            <div className='racerName'>  Racer Name: {this.props.foundUsersList[i].racerName}  </div>
            <div className='actualName'>  Real Name: {this.props.foundUsersList[i].realFirstName} {this.props.foundUsersList[i].realLastName}  </div>


          <button onClick={this.handleRacerSelect} value={this.props.foundUsersList[i].url}>Select</button>
        </div>
      )

    }



    return (
      <div className="App">
        {uniqueUser}
        {this.state.racerURL}
      </div>
    );
  }
}

export default UsersFound;
