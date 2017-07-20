import React from 'react';
import axios from 'axios';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import LightningFooter from '../components/lightningFooter.jsx';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      roundsRemaining: 5
    };
    this.getMovieData = this.getMovieData.bind(this);
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
  }

  // Get an array with two movies objects
  // from DB
  getMovieData() {
    return axios.get('/api/lightning')
      .then((results) => {
        this.setState({
          movies: results.data
        });
        return results;
      });
  }

  startNextRound() {
    console.log('Starting round. Remaining: ', this.state.roundsRemaining);
    if (this.state.roundsRemaining <= 0) {
      return;
    }
    return this.getMovieData()
      .then((results) => {
        return results;
      });
  }

  endRound() {
    this.setState({ roundsRemaining: this.state.roundsRemaining - 1 });
    clearInterval(this.state.intervalId);

    if (this.state.roundsRemaining <= 0) {
      this.setState({
        roundsRemaining: this.state.roundsRemaining - 1
      });
    } else {
      this.startNextRound();
    }
  }

  handleLightningTileClick(e, evt, selectedMovie) {
    e.preventDefault();
    this.endRound();
    const discardedMovie = this.state.movies.filter(mov => mov !== selectedMovie).pop();
    const clickedMovie = Object.assign({}, selectedMovie, { selected: true });
    discardedMovie.selected = false;
    axios.post('/api/lightning', {
      clickedMovie,
      discardedMovie,
      movies: this.state.movies
    })
      .catch(err => console.error('Error selecting movie: ', err));
  }

  render() {
    const Page = this.state.roundsRemaining < 0
      ? <Redirect push to="/results" />
      : (
        <div className="container-fluid">
          <div className="lightning-wrapper">
            <div>
              <LightningHeader />
            </div>
            <div>
              <Lightning
                handleLightningTileClick={this.handleLightningTileClick}
                movies={this.state.movies}
              />
            </div>
          </div>
          <LightningFooter />
        </div>
        );

    return (
      Page
    );
  }
}

export default LightningWrapper;