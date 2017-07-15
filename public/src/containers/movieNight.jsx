import React from 'react';
import { Button } from 'react-bootstrap';

const subHeader = `FLIQ's recommendation engine can aggregate several people's preferences to suggest 
  movies that the group may enjoy. Enter other users' email addresses below and search for movies to watch.`;

class MovieNight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmText: '',
      inputText: '',
      emails: ['rob.cornell@gmail.com', 'jac@gmail.com', 'doctor@gmail.com']
    };
  }

  render() {
    return (
      <div className="container fadeIn">

        <div className="row">
          <div className="col-sm-12">
            <h2>Movie Night</h2>
            <h4>{subHeader}</h4>
          </div>
        </div>

        <div className="row email-inputs">
          <div className="col-sm-3 email-input-box">
            input goes here
          </div>
          <Button className="col-sm-1 email-input-button">
            button
          </Button>
        </div>

        <div className="row">
          <div className="col-sm-6 email-box">
            <ul>
              {this.state.emails.map(email => <li>{email}</li>)}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default MovieNight;
