import React from 'react'
import { Route } from 'react-router-dom';
// import Search from './Search.js';
import UserSearch1 from './UserSearch1.js';
import Home from './Home.js';
import RacerData from './RacerData.js';
import UsersFound from './UsersFound.js';
import Heat from './Heat.js';
import SavedRacers from './SavedRacers.js';
import Footer from './Footer.js';
import Donate from './Donate.js';

const Routes = () => (
  <main>
    <div className='Home'>
      <Route exact path='/' component={ () => <Home /> } />
      <Route path='/Home' component={ () => <Home /> } />
      {/* <Route path='/Search' component={ () => <Search /> } /> */}
      <Route path='/UserSearch1' component={ () => <UserSearch1 /> } />
      <Route path='/RacerData' component={ () => <RacerData /> } />
      <Route path='/UsersFound' component={ () => <UsersFound /> }/>
      <Route path='/Heat' component={ () => <Heat /> }/>
      <Route path='/SavedRacers' component={ () => <SavedRacers /> }/>
      <Route path='/Footer' component={ () => <Footer /> }/>
      <Route path='/Donate' component={ () => <Donate /> }/>

    </div>
    <Footer />
  </main>
)

export default Routes
