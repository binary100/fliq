import React from 'react';
import ResultsBody from '../components/resultsBody.jsx';
import ResultsTileBar from '../components/resultsTileBar.jsx';
import axios from 'axios';

const movieObj = {
  title: '',
  plot: '',
  poster: '',
  year: '',
  rated: '',
  ratings: '',
  genre: '',
  director: '',
  writer: '',
  actors: ''
};
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: movieObj,
      tileMovies: [movieObj]
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
      <div className="results">
        <div className="row">
          <ResultsBody
            trailer={this.state.trailer}
            movie={this.state.selectedMovie}
          />
        </div>
        <div className="row">
          <ResultsTileBar
            movies={this.state.tileMovies}
            selectSmallTile={this.selectSmallTile}
          />
        </div>
      </div>
    );
  }
}

export default Results;
