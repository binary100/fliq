import React from 'react';
import axios from 'axios';
import Lightning from './lightning.jsx';
import LightningHeader from '../components/lightningHeader.jsx';
import LightningFooter from '../components/lightningFooter.jsx';
import { showTrophyPopdown } from '../actions/actions.js';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

let canClick = true;

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.startNextRound = this.startNextRound.bind(this);
    this.handleLightningTileClick = this.handleLightningTileClick.bind(this);
  }

  componentWillMount() {
    this.startNextRound();
  }

  // Get an array with two movies objects
  // from DB
  startNextRound() {
    return axios.get('/api/lightning')
      .then((results) => {
        this.setState({
          movies: results.data
        });
        return results;
      });
  }

  // On click, prevent more clicks until server responds
  // Then build clicked/non-clicked objects to send to server
  handleLightningTileClick(e, evt, selectedMovie) {
    e.preventDefault();
    if (!canClick) return;
    canClick = false;

    const discardedMovie = this.state.movies.filter(mov => mov !== selectedMovie).pop();
    const clickedMovie = Object.assign({}, selectedMovie, { selected: true });
    discardedMovie.selected = false;

    axios.post('/api/lightning', {
      clickedMovie,
      discardedMovie,
      movies: this.state.movies
    })
      .then((results) => {
        console.log('Received results on selection: ', results.data);
        if (results.data.trophy.length) {
          this.props.showTrophyPopdown(results.data.trophy);
        }
        this.startNextRound();
        canClick = true;
      })
      .catch(err => console.error('Error selecting movie: ', err));
  }

  render() {
    return (
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
  }
}

const mapDispatchToProps = dispatch => ({
  showTrophyPopdown: (trophies) => { dispatch(showTrophyPopdown(trophies)); }
});

export default connect(
  null,
  mapDispatchToProps
)(LightningWrapper);
