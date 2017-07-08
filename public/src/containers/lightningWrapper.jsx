import React from 'react';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      timer: 10,
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
    this.getMovieData()
      .then(() => {
        console.log('Got movie data');
      });
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    console.log('Unmounting lightningWrapper. Clear interval: ', this.state.intervalId);
    clearInterval(this.state.intervalId);
  }

  // Get an array with two movies objects
  // from DB
  getMovieData() {
    console.log('Entering getMovieData');

    // Return this promise in order to
    // control flow at the start of each
    // round (see startNextRound)
    return axios.get('/api/lightning')
      .then((results) => {
        this.setState({
          movies: results.data
        });
      });
  }

  startTimer() {
    const intervalId = setInterval(function () {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1
        });
      } else {
        this.endRound();
      }
    }.bind(this), 1000);
    console.log('intervalId is: ', intervalId);
    this.setState({
      intervalId
    });
  }

  startNextRound() {
    this.getMovieData()
      .then(() => {
        this.setState({
          timer: 10
        });
      });
  }

  endRound() {
    if (this.state.roundsRemaining === 0) {
      clearInterval(this.state.intervalId);
      // proceed to Results component
    } else {
      this.startNextRound();
    }
  }

  handleLightningTileClick(e, evt, movie) {
    console.log('Clicked tile: ', movie);
    this.endRound();
    clearInterval(this.state.timer);
    e.preventDefault();
    /*
      axios.post(/api/lightning, {
        //movie data goes here
      })
        .then(() => this.startNextRound());
    */
  }

  render() {
    return (
      <div>
        <LightningHeader timer={this.state.timer}/>
        <Lightning
          handleLightningTileClick={this.handleLightningTileClick}
          movies={this.state.movies}
        />
      </div>
    );
  }
}

export default LightningWrapper;
