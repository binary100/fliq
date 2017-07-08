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
  }

  getUserMovies() {
    axios.get('/api/results')
      .then((results) => {
        this.setState({
          selectedMovie: results.data[0],
          tileMovies: results.data.slice(1)
        });
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

  render() {
    return (
      <div>
        <ResultsBody movie={this.state.selectedMovie} />
      </div>
    );
  }
}

// <ResultsTileBar movies={this.state.movies.slice(1)} />
export default Results;
