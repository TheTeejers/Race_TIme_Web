import React, { Component } from 'react';
// import UsersFound from './UsersFound.js';
// import { Link } from 'react-router-dom'

import axios from 'axios'


class UserSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      userLocation: 'null'
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }

  getSearch(){
    axios.get(`https://kartlaps.info/v2/${this.state.userLocation}/search/${this.refs.emailInput.value}`)
    // axios.get(`https://kartlaps.info/v2/k1sanantonio/search/stey`)
    .then((response) => {
      console.log("Search results should be showing");
      if (response.data.status === 'ERROR') {
        alert('No results for that email')
      } else {
        let newUserLookup = response.data.search.results
        this.setState({
          userDataLookup: newUserLookup
        })
        // console.log(this.state.userLocation, "here we are")
        console.log(newUserLookup)
        sessionStorage.setItem('searchedRacerData', `https://kartlaps.info/v2/${this.state.userLocation}/search/${this.refs.emailInput.value}`)
        console.log('testing', sessionStorage)
        this.props.onSubmitQuery(newUserLookup);
      }
    })
  }

  handleSearchInput(e){
    this.setState({
      userLocation: e.target.value
    });
  }

  handleSubmit(e) {
    this.setState({
      userLocation: e.target.value
    });
    // sessionStorage.setItem('searchedRacerData', `https://kartlaps.info/v2/${this.state.userLocation}/search/${this.refs.emailInput.value}`)
    e.preventDefault();
    this.getSearch();

    console.log('usersearch', this.state.userLocation)
  }

  render() {

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            <select value={this.state.userLocation} onChange={this.handleSearchInput}>
              <option value="">Select Location</option>
              <option value="k1austin">Austin</option>
              <option value="k1addison">Addison</option>
              <option value="k1atlanta">Atlanta</option>
              <option value="k1sanantonio">San Antonio</option>
              <option value="k1irvine">Irvine</option>
            </select>
          </label>
          <input className='inputText' type='text' placeholder='Email' ref = 'emailInput' />
          {/* <Link to ="/UsersFound"> */}

            <input className='searchButton' type="submit" value="Submit"  />
          {/* </Link> */}
          </form>



      </div>
    );
  }
}

export default UserSearch;
