import React from 'react';
import ResultsBody from '../components/resultsBody.jsx';
import ResultsTileBar from '../components/resultsTileBar.jsx';
import axios from 'axios';

class Results extends React.Component {
  constructor(props) {
    super(props);
    console.log('Entered Results constructor.');
    this.state = {
      movies: [],
      selectedMovie: {
        title: 'Default Title in Results.jsx',
        year: '',
        plot: '',
        rated: '',
        rating: '',
        genre: '',
        poster: '',
        director: '',
        writer: '',
        actors: ''
      }
    };
  }

  componentWillMount() {
    // Grab movies for user and set state
    /*
    axios.get('/api/results')
      .then((results) => {
        this.setState({
          selectedMovie: results.data.selectedMovie,
          movies: results.data.movies
        });
      })
      .catch(err => console.error('Error retrieving movies: ', err));
    */
  }

  render() {
    return (
      <div>
        <h3>Results Page</h3>
        <ResultsBody movie={this.props.selectedMovie} />
        <ResultsTileBar movies={this.props.movies} />
      </div>
    );
  }
}

export default Results;
