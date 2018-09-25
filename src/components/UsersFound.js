import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

// import RacerData from '../components/RacerData.js';


class UsersFound extends Component {
  constructor(props){
    super(props);
    this.state = {
      racerURL: 'null!',
      racerDataLookup: '',
      isChecked: false
    }

    // this.updateCheckbox = this.updateCheckbox.bind(this);
    this.toggleIsChecked = this.toggleIsChecked.bind(this);
    this.handleRacerSelect = this.handleRacerSelect.bind(this);
    this.getRacerData = this.getRacerData.bind(this);
  }

  // handleCheckboxChange(event) {
  //   console.log("checkbox changed!", event);
  //   this.setState({isChecked: event.target.checked});
  // }

  toggleIsChecked() {
      console.log("toggling isChecked value!");
      this.setState({
        // isChecked: true
        isChecked: !this.state.isChecked
      });
  }

  getRacerData(){
    console.log("set racer url", this.state.racerURL)
    axios.get(this.state.racerURL)
    .then((response) => {
      console.log('axios 2 working')
      if (response.data.status === 'ERROR') {
        alert ('click again')
      } else {
        let newRacerData = response.data.racer.heats
        // console.log(response.data.racer.heats)
        this.setState({
          racerDataLookup: newRacerData
        })
        console.log('newRacerData', newRacerData)
        this.props.onSubmitQuery2(newRacerData);
      }
    })
  }


  handleRacerSelect(e){
    console.log("checkbox changed!");
    console.log('first', this.state.racerURL)
    this.setState({
      racerURL: e.target.value
    },
    this.toggleIsChecked
  );
    e.preventDefault();


    console.log(this.state.racerURL)
  }


  render() {
    console.log(this.props.foundUsersList.length)

    let uniqueUser = [];
    for (var i = 0; i < this.props.foundUsersList.length; i++){
      uniqueUser.push(

        <div key={i}><br/>
          <input type='checkbox' value={this.props.foundUsersList[i].url} onChange={this.handleRacerSelect} checked={this.state.isChecked}></input>
          <div>Racer ID: {this.props.foundUsersList[i].id}</div>
            <div className='racerName'>  Racer Name: {this.props.foundUsersList[i].racerName}  </div>
            <div className='actualName'>  Real Name: {this.props.foundUsersList[i].realFirstName} {this.props.foundUsersList[i].realLastName}  </div>



        </div>
      )

    }



    return (
      <div className="App">
        {uniqueUser}
        {/* <Link to ="/RacerData"> */}
          <button onClick={this.getRacerData}>Select</button>
        {/* </Link> */}
      </div>
    );
  }
}

export default UsersFound;
