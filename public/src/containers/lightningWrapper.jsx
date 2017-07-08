import React from 'react';
import axios from 'axios';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import { Redirect } from 'react-router-dom';

const timerMax = 10;

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      timer: timerMax,
      roundsRemaining: 4,
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

  startTimer() {
    const intervalId = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1
        });
      } else {
        this.endRound();
      }
    }.bind(this), 1000);

    this.setState({
      intervalId
    });
  }

  startNextRound() {
    if (this.state.roundsRemaining <= 0) {
      return;
    }

    return this.getMovieData()
      .then((results) => {
        this.startTimer();
        return results;
      });
  }

  endRound() {
    if (this.state.roundsRemaining <= 0) {
      clearInterval(this.state.intervalId);
    } else {
      console.log('Clearing interval#', this.state.intervalId);
      clearInterval(this.state.intervalId);
      this.setState({
        timer: timerMax,
        roundsRemaining: this.state.roundsRemaining - 1
      });
      this.startNextRound();
    }
  }

  handleLightningTileClick(e, evt, movie) {
    e.preventDefault();
    this.endRound();
    console.log('Clicked tile: ', movie);
    /*
      axios.post(/api/lightning, {
        movie
      })
        .then(() => this.startNextRound())
        .catch((err) => console.error('Error selecting movie: ', err);
    */
  }

  render() {
    const Page = this.state.roundsRemaining <= 0
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
