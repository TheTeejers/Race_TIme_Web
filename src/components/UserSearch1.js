import React, { Component } from 'react';

import { Link } from 'react-router-dom'


class UserSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: 'no input',
      userLocation: 'no input'

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    // this.getSearch = this.getSearch.bind(this);
  }

  // getSearch(){
  //     console.log("Search results should be showing for ", sessionStorage.getItem('trackLocation'));
  // }

  handleLocationInput(e){
    this.setState({
      userLocation: e.target.value
    });
    sessionStorage.setItem('trackLocation', this.refs.trackLocationInput.value)
  }

  handleUserInput(e){
    sessionStorage.setItem('racerLookupInput', this.refs.emailInput.value)
    console.log(sessionStorage.getItem('racerLookupInput'))
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log('location search', sessionStorage.getItem('trackLocation'))
    console.log('user search', sessionStorage.getItem('racerLookupInput'))

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} action ='/UsersFound'>
          <label>
            <select value={this.state.userLocation} onChange={this.handleLocationInput} ref='trackLocationInput'>
              <option value="">Select Location</option>
              <option value="k1austin">Austin</option>
              <option value="k1addison">Addison</option>
              <option value="k1atlanta">Atlanta</option>
              <option value="k1sanantonio">San Antonio</option>
              <option value="k1irvine">Irvine</option>
            </select>
          </label>
          <input className='inputText' type='text' placeholder='Email' ref = 'emailInput'  onChange={this.handleUserInput}/>
          <Link to ="/UsersFound">
            <input className='searchButton' type="submit" value="Submit"  />
          </Link>
        </form>
      </div>
    );
  }
}

export default UserSearch;
