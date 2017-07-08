import React from 'react';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import axios from 'axios';

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      timer: 10,
      roundsRemaining: 4,
      timeoutId: ''
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
        this.startTimer();
      });
  }

  componentDidMount() {
  }

  componentWillUnMount() {
    clearInterval(this.state.timer);
  }

  // Get an array with two movies objects
  // from server, which calls OMDB API
  getMovieData() {
    console.log('Entering getMovieData');

    // Return this promise in order to
    // control flow at the start of each
    // round (see startNextRound)
    return axios.get('/api/lightning')
      .then((results) => {
        console.log(results.data);
        this.setState({
          movies: results.data
        });
      });
  }

  startTimer() {
    const timerId = setInterval(function () {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1
        });
      } else {
        this.endRound();
      }
    }.bind(this), 1000);

    this.setState({
      timerId
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
      clearInterval(this.state.timerId);
      // proceed to Results component
    } else {
      this.startNextRound();
    }
  }

  handleLightningTileClick(e) {
    console.log('Clicked tile: ', e.target);
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
