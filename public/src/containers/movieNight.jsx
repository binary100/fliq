import React from 'react';
import axios from 'axios';
import { Button, FieldGroup, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

const subHeader = `FLIQ's recommendation engine can aggregate several people's preferences to suggest 
  movies that the group may enjoy. Enter other users' email addresses below and search for movies to watch.`;
let count = 0;

class MovieNight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmText: '',
      inputText: '',
      emails: ['rob.cornell@gmail.com', 'jac@gmail.com', 'doctor@gmail.com']
    };
    this.searchEmail = this.searchEmail.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  searchEmail() {
    axios.post('/api/user/email/verify', {
      email: this.state.inputText
    })
      .then((results) => {
        console.log('Received: ', results.data)
        if(results.data.success) {
          const newEmailsArray = this.state.emails.slice();
          newEmailsArray.push(results.data.email);
          this.setState({
            emails: newEmailsArray,
            confirmText: ''
          });

        } else  {
          this.setState({
            confirmText: `Whoops! We don't have any users with that email.`
          })
        }
      })
      .catch(err => console.error('Error searching for email: ', err));
  }

  handleInputChange(e) {
    console.log(e.target.value);
    this.setState({
      inputText: e.target.value
    });
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
          <div className="col-sm-6 email-input-box">
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  Email Address
                </InputGroup.Addon>
                <FormControl type="email" onChange={this.handleInputChange} />
                <InputGroup.Button className="email-input-button">
                  <Button onClick={this.searchEmail}>Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 email-box">
            <ul>
              {this.state.emails.map(email => <li key={count += 1}>{email}</li>)}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default MovieNight;
