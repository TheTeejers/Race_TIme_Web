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
        <form onSubmit={this.handleSubmit} action ='/UsersFound' required>
          <label><br/>
            <select value={this.state.userLocation} onChange={this.handleLocationInput} ref='trackLocationInput' required>
              <option>Select Location</option>

              <option value="k1addison">Addison</option>
              <option value="k1anaheim">Anaheim</option>
              <option value="k1arlington">Arlington</option>
              <option value="k1atlanta">Atlanta</option>
              <option value="k1austin">Austin</option>
              <option value="k1boston">Boston</option>
              <option value="k1buffalogrove">Buffalo Grove</option>
              <option value="k1austin">Carlsbad</option>
              <option value="k1concord">Concord</option>
              <option value="k1dallas">Dallas</option>
              <option value="k1denver">Denver</option>
              <option value="k1dublin">Dublin</option>
              <option value="k1ftlauderdale">Fort Lauderdale</option>
              <option value="k1houston">Houston</option>
              <option value="k1indianapolis">Indianapolis</option>
              <option value="k1irvine">Irvine</option>
              <option value="k1kapolei">Kapolei</option>
              <option value="k1kingston">Kingston</option>
              <option value="k1miami">Miami</option>
              <option value="k1ontario">Ontario</option>
              <option value="k1orlando">Orlando</option>
              <option value="k1phx">Phoenix</option>
              <option value="k1poughkeepsie">Poughkeepsie</option>
              <option value="k1sacramento">Sacramento</option>
              <option value="k1saltlakecity">Salt Lake City</option>
              <option value="k1sanantonio">San Antonio</option>
              <option value="k1sandiego">San Diego</option>
              <option value="k1sanfrancisco">San Francisco</option>
              <option value="k1santaclara">Santa Clara</option>
              <option value="k1redmond">Seattle</option>
              <option value="k1torrance">Torrance</option>
            </select><br/>
          </label>
          <br/><div>
            <input className='inputText' type='text' placeholder='Email' ref = 'emailInput'  onChange={this.handleUserInput} required />
          </div><br/>

          <Link to ="/UsersFound">
            <input className='searchButton' type="submit" value="Submit"  />
          </Link>

        </form>
      </div>
    );
  }
}

export default UserSearch;
