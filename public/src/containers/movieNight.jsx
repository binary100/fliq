import React from 'react';
import axios from 'axios';
import { Button, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import LargeMovieTile from '../components/largeMovieTile.jsx';
import ResultsTileBar from '../components/resultsTileBar.jsx';
import { showTrophyPopdown } from '../actions/actions.js';

const subHeader = `FLIQ's recommendation engine can aggregate several people's preferences to suggest 
  movies that the group may enjoy. Enter other users' email addresses below and search for movies to watch.`;
let count = 0;

class MovieNight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmText: '',
      confirmClass: '',
      inputText: '',
      userList: [],
      searchResults: null,
      selectedMovie: null
    };
    this.searchEmail = this.searchEmail.bind(this);
    this.clearEmails = this.clearEmails.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getResults = this.getResults.bind(this);
    this.loadUserEmail = this.loadUserEmail.bind(this);
    this.selectSmallTile = this.selectSmallTile.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.loadUserEmail(this.props.user);
    }
  }

  getResults() {
    if (this.state.userList.length <= 1) {
      this.setState({
        confirmText: 'Please enter at least two e-mails.',
        confirmClass: 'movienight-email-failure'
      });
      return this.clearConfirmText();
    }

    axios.post('/api/movienight', {
      emails: this.state.userList
    })
      .then((results) => {
        this.setState({
          searchResults: results.data.movies,
          selectedMovie: results.data.movies[0]
        });
        if (results.data.userTrophyObj.trophy.length > 0) {
          this.props.showTrophyPopdown(results.data.userTrophyObj.trophy);
        }
      })
      .catch(err => console.error('Error getting results: ', err));
  }

  loadUserEmail(user, shouldFlashDialogue) {
    const { name, email, id } = user;
    const userEmailObj = { name, email, id };
    const isAlreadyAdded = this.state.userList.some(obj =>
      obj.email === userEmailObj.email
    );

    if (isAlreadyAdded) {
      return this.setState({
        confirmText: 'You already added that user! :)',
        confirmClass: 'movienight-email-failure'
      });
    }

    const newEmailsArray = this.state.userList.slice();
    newEmailsArray.unshift(userEmailObj);
    if (shouldFlashDialogue) {
      this.setState({
        userList: newEmailsArray,
        confirmText: 'User added!',
        confirmClass: 'movienight-email-success'
      });
    } else {
      this.setState({
        userList: newEmailsArray
      });
    }
  }

  searchEmail() {
    axios.post('/api/user/email/verify', {
      email: this.state.inputText
    })
      .then((results) => {
        if (results.data.success) {
          this.loadUserEmail(results.data.user, true);
        } else {
          this.setState({
            confirmText: 'Whoops! We don\'t have any users with that email.',
            confirmClass: 'movienight-email-failure'
          });
        }
        this.clearConfirmText();
      })
      .catch(err => console.error('Error searching for email: ', err));
  }

  removeEmail(e) {
    const newEmailsArray =
      this.state.userList
        .slice()
        .filter(userObj => !e.target.innerText.includes(userObj.email));
    this.setState({
      emails: newEmailsArray
    });
  }

  clearEmails() {
    this.setState({ userList: [] });
  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  clearConfirmText() {
    setTimeout(() => {
      const newClass = `${this.state.confirmClass} fadeOut`;
      this.setState({
        confirmClass: newClass
      });
    }, 3000);
  }

  selectSmallTile(e, evt, movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    const emails = this.state.userList.map(emailObj =>
      (<div
        key={count += 1}
        onDoubleClick={this.removeEmail}
      >
        {emailObj.name} ({emailObj.email})
      </div>));

    const largeTile = this.state.selectedMovie
      ? <LargeMovieTile movie={this.state.selectedMovie} />
      : null;

    const tileBar = this.state.searchResults
      ? <div className="fadeIn"><ResultsTileBar selectSmallTile={this.selectSmallTile} movies={this.state.searchResults} /></div>
      : null;

    return (
      <div className="container fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <h4>{subHeader}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <div className="row email-inputs">
              <div className="col-sm-12 email-input-box">
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>
                      Email Address
                    </InputGroup.Addon>
                    <FormControl
                      type="email"
                      onChange={this.handleInputChange}
                      placeholder="Enter a user's email address"
                    />
                    <InputGroup.Button className="email-input-button">
                      <Button onClick={this.searchEmail}>Search</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 email-box">
                <div className="email-input-list">
                  {emails}
                </div>
              </div>
            </div>
            <div className="row">
              <div >
                <button
                  className="btn btn-default btn-primary col-sm-5 pull-left fliq-button"
                  onClick={this.clearEmails}
                >
                  Clear Emails
                </button>
                <button
                  className="btn btn-default btn-primary col-sm-5 pull-right fliq-button"
                  onClick={this.getResults}
                >
                  Get Movies!
                </button>
              </div>
            </div>
            <div className="row">
              <span className="movienight-confirm-box">
                <span className={this.state.confirmClass}>
                  {this.state.confirmText}
                </span>
              </span>
            </div>
          </div>
          {largeTile}
          {tileBar}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  showTrophyPopdown: (trophies) => { dispatch(showTrophyPopdown(trophies)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieNight);
