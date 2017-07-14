import React from 'react';
import ResultsBody from '../components/resultsBody.jsx';
import ResultsTileBar from '../components/resultsTileBar.jsx';
import axios from 'axios';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null,
      tileMovies: []
    };

    this.getUserMovies();
    this.selectSmallTile = this.selectSmallTile.bind(this);
  }

  getUserMovies() {
    axios.get('/api/results')
      .then((results) => {
        this.setState({
          selectedMovie: results.data[0],
          tileMovies: results.data
        });
        this.loadTrailer(results.data[0]);
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

  selectSmallTile(e, evt, movie) {
    this.loadTrailer(movie);
    this.setState({
      selectedMovie: movie
    });
  }

  loadTrailer(movie) {
    axios.post('/api/trailer', { movie })
      .then((results) => {
        this.setState({
          trailer: results.data
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          <ResultsBody
            trailer={this.state.trailer}
            movie={this.state.selectedMovie}
          />
        </div>
        <ResultsTileBar
          movies={this.state.tileMovies}
          selectSmallTile={this.selectSmallTile}
        />
      </div>
    );
  }
}

export default Results;
