import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (

      <div className="Footer">
        <p>Designed and Developed with &hearts; by <a className='mailLink' href="mailto:tjcancode@gmail.com?subject=My%20Lap%20Times">TJ Loughry</a> &#9400; 2018</p>
        <p> If you would like to donate to the page, Click <Link to="/Donate">Here!</Link> </p>
      </div>

    );
  }
}

export default Footer;
