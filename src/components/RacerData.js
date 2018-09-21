import React, { Component } from 'react';
// import UsersFound from './UsersFound.js';

import axios from 'axios'


class RaceData extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      // userLocation: 'null',
      userLastName: '',
      userFirstName: '',
      userIDNumber: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }

  getSearch(){

    // axios.get(`https://kartlaps.info/v2/${this.state.userLocation}/search/${this.refs.emailInput.value}`)
    axios.get(`https://kartlaps.info/v2/k1austin/search/tjloughry@gmail.com`)
    .then((response) => {
      console.log("Search results should be showing");
      if (response.data.status === 'ERROR') {
        alert('no results for that email')
      } else {
        let newUserLookup = response.data.search.results
        console.log(response.data.search.results)
        this.setState({
          userDataLookup: newUserLookup
        })
        console.log(newUserLookup)
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
    e.preventDefault();
    this.getSearch();
  }

  render() {
    // console.log(this.props.foundUsersList)
    return (
      <div className="App">




      </div>
    );
  }
}

export default RaceData;
