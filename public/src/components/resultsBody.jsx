import React from 'react';
import ResultsLargeTile from './resultsLargeTile.jsx';
import MovieDetails from './movieDetails.jsx';

const ResultsBody = props => (
  <div>
    <h3>Results Body!</h3>
    <ResultsLargeTile className="results-large-tile" movie={props.movie} />
    <MovieDetails movie={props.movie} />
  </div>
);

export default ResultsBody;