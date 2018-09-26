import React, { Component } from 'react';
import UserSearch1 from '../components/UserSearch1.js';
import UsersFound from '../components/UsersFound.js';
// import RacerData from '../components/RacerData.js';
// import Home from './components/Home.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      racerDataLookup: '',
      userLocation: '',
      userIDNumber: '',
      query: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
    this.onSubmitQuery2 = this.onSubmitQuery2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchInput(e){
    this.setState({
      userLocation: e.target.value,
      query: e.target.value
    });
    console.log('app.js', this.state.query)
    console.log('app.js', this.state.userLocation)
  }


  onSubmitQuery(results){
    this.setState({
      userDataLookup: results
    })
  }

  onSubmitQuery2(results){
    this.setState({
      racerDataLookup: results
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getSearch();
  }


  render() {

    return (
      <div className="Search">
        <UserSearch1 query={this.state.query}  onSubmitQuery={this.onSubmitQuery}/>
        <UsersFound foundUsersList={this.state.userDataLookup} locationState={this.state.userLocation} onSubmitQuery={this.onSubmitQuery} onSubmitQuery2={this.onSubmitQuery2} foundRacerData={this.state.racerDataLookup}/>
        {/* <RacerData foundUsersList={this.state.userDataLookup} foundRacerData={this.state.racerDataLookup}/> */}
      </div>
    );
  }
}

export default Search;
