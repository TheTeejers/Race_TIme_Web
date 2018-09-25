import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import UserSearch from './components/UserSearch.js';
import Home from './components/Home.js';
import RacerData from './components/RacerData.js';
import UsersFound from './components/UsersFound.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userDataLookup: '',
      userLocation: 'null',
      racerDataLookup: ''

    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
    // this.onSubmitQuery2 = this.onSubmitQuery2.bind(this);
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

  // onSubmitQuery2(results){
  //   this.setState({
  //     racerDataLookup: results
  //   })

  // }

  handleSubmit(event) {
    event.preventDefault();
    this.getSearch();
  }


  render() {

    return (
      <div className="App">

        <Home />
        <Router basename = {process.env.PUBLIC_URL}>
          <div className='Home'>
            <Route exact path='/' component={ () => <Home /> } />
            <Route path='/Home' component={ () => <Home /> } />
            <Route path='/Search' component={ () => <Search /> } />
            <Route path='/UserSearch' component={ () => <UserSearch action={this.handleSearchInput}/> } />
            <Route path='/RacerData' component={ () => <RacerData foundUsersList={this.state.userDataLookup} foundRacerData={this.state.racerDataLookup}/> } />
            <Route path='/UserFound' component={ () => <UsersFound foundUsersList={this.state.userDataLookup} locationState={this.state.userLocation} onSubmitQuery={this.onSubmitQuery} onSubmitQuery2={this.onSubmitQuery2} foundRacerData={this.state.racerDataLookup}/> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
