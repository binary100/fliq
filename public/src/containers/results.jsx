import React from 'react';
import ResultsBody from '../components/resultsBody.jsx';
import ResultsTileBar from '../components/resultsTileBar.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3>Results Page</h3>
      <ResultsBody movie={this.props.selectedMovie} />
      <ResultsTileBar movies={this.props.movies} />
    );
  }
}

export default Results;
