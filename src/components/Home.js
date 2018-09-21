import React, { Component } from 'react';



class Home extends Component {


  render() {

    return (
      <div className="Home">
        <form action='/Search'>
          <input className='searchButton' type="submit" value='Get Profile' />
        </form>
      </div>
    );
  }
}

export default Home;
