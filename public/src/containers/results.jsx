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
    console.log('Entered Results constructor.');
    this.state = {
      selectedMovie: movieObj,
      tileMovies: [movieObj]
    };

    this.getUserMovies();
  }

  getUserMovies() {
    axios.get('/api/results')
      .then((results) => {
        console.log('Received Results data: ', results.data);
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
        <h3>Results Page</h3>
        <ResultsBody movie={this.state.selectedMovie} />
      </div>
    );
  }
}

// <ResultsTileBar movies={this.state.movies.slice(1)} />
export default Results;
