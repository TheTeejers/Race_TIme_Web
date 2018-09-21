import React, { Component } from 'react';
import UserSearch from '../components/UserSearch.js';
import UsersFound from '../components/UsersFound.js';
import RacerData from '../components/RacerData.js';
// import Home from './components/Home.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      userLocation: '',
      userIDNumber: '',
      query: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchInput(e){
    this.setState({
      userLocation: e.target.value,
      query: e.target.value
    });

  }


  onSubmitQuery(results){
    this.setState({
      userDataLookup: results
    })

  }

  handleSubmit(event) {
    event.preventDefault();
    this.getSearch();
  }


  render() {

    return (
      <div className="Search">
        <UserSearch query={this.state.query}  onSubmitQuery={this.onSubmitQuery}/>
        <UsersFound foundUsersList={this.state.userDataLookup} locationState={this.state.userLocation} />
        <RacerData foundUsersList={this.state.userDataLookup} />
      </div>
    );
  }
}

export default Search;
