import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import UserSearch from './components/UserSearch.js';
import Home from './components/Home.js';
import RacerData from './components/RacerData.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      userLocation: 'null',
      userIDNumber: '',
      query: '',
      racerURL: 'null!'
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
    console.log('app.js', this.state.query)
    console.log('app.js', this.state.userLocation)
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

  handleRacerSelect(e){

    this.setState({
      racerURL: e.target.value
    });
    e.preventDefault();
    this.getRacerData();
    console.log(this.state.racerURL)
  }

  render() {

    return (
      <div className="App">


        <Router basename = {process.env.PUBLIC_URL}>
          <div className='Home'>
            <Route exact path='/' component={ () => <Home /> } />
            <Route path='/Home' component={ () => <Home /> } />
            <Route path='/Search' component={ () => <Search /> } />
            <Route path='/UserSearch' component={ () => <UserSearch action={this.handleSearchInput}/> } />
            <Route path='/RacerData' component={ () => <RacerData foundUsersList={this.state.userDataLookup}/> } />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
