import React, { Component } from 'react';

class Donate extends Component {
  render() {
    return (
    <div className="App">
      <div>
        <p>
          I made this site/web app to help my son with his lap times.  I was putting his results into a spreadsheet but that got a little tiring.
        </p>
        <p>
          I put a good bit of time into making this (both for myself and for my kid) and if you think it is work a couple bucks, please donate!!!
        </p>
        If you think this is worth a few bucks, please
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick"/>
          <input type="hidden" name="hosted_button_id" value="3Z4NUNKMBW9NU"/>
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
        </form>
        !!!
      </div>

    </div>
    );
  }
}

export default Donate;
