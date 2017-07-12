import React from 'react';
import axios from 'axios';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import { Redirect } from 'react-router-dom';

const timerMax = 5;

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      timer: timerMax,
      roundsRemaining: 2,
      intervalId: ''
    };
    this.getMovieData = this.getMovieData.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.startNextRound = this.startNextRound.bind(this);
    this.endRound = this.endRound.bind(this);
    this.handleLightningTileClick = this.handleLightningTileClick.bind(this);
  }

  componentWillMount() {
    this.startNextRound()
      .then((results) => {
        console.log('Mounting lightningWrapper with data', results.data);
      });
  }

  componentWillUnmount() {
    console.log('Unmounting lightningWrapper.');
    clearInterval(this.state.intervalId);
  }

  // Get an array with two movies objects
  // from DB
  getMovieData() {
    // Return this promise in order to
    // allow for then-able logic
    return axios.get('/api/lightning')
      .then((results) => {
        this.setState({
          movies: results.data
        });
        return results;
      });
  }

  postMovieData() {
    // Posts tags
    return axios.post('/api/tags')
      .then((tag) => {
        console.log(tag)
      });
  }

  startTimer() {
    const intervalId = setInterval(function () {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1
        });
      } else {
        console.log('Interval is ending round!');
        this.endRound();
      }
    }.bind(this), 1000);
    console.log('Created interval #', intervalId);

    this.setState({
      intervalId
    });
  }

  startNextRound() {
    console.log('Starting round. Remaining: ', this.state.roundsRemaining);
    if (this.state.roundsRemaining <= 0) {
      return;
    }

    return this.getMovieData()
      .then((results) => {
        //this.startTimer();
        return results;
      });
  }

  endRound() {
    this.setState({ roundsRemaining: this.state.roundsRemaining - 1 });
    clearInterval(this.state.intervalId);

    if (this.state.roundsRemaining <= 0) {
      // This forces rounds below 0, which triggers redirect to results
      this.setState({
        roundsRemaining: this.state.roundsRemaining - 1
      });
    } else {
      this.setState({
        timer: timerMax
      });
      this.startNextRound();
    }
  }

  handleLightningTileClick(e, evt, movie) {
    e.preventDefault();
    console.log('Click handler is ending round!');
    this.endRound();
    axios
      .post('/api/lightning', {
        movie
      })
      .catch((err) => console.error('Error selecting movie: ', err));

    axios
      .get('/api/tags', {tag})
      .post('/api/userTags', {
        movie
      })
      // .then(console.log('clicked movie: ', movie))
      .catch((err) => console.error('Error selecting movie: ', err));
  }

  render() {
    const Page = this.state.roundsRemaining < 0
      ? <Redirect push to="/results" />
      : (
        <div>
          <LightningHeader timer={this.state.timer} />
          <Lightning
            handleLightningTileClick={this.handleLightningTileClick}
            movies={this.state.movies}
          />
        </div>
        );
    return (
      Page
    );
  }
}

export default LightningWrapper;
