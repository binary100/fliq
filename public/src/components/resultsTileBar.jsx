import React from 'react';
import ResultsSmallTile from './resultsSmallTile.jsx';

// props.movies
const ResultsTileBar = props => (
  <div>
    {props.movies.map(movie => (
      <ResultsSmallTile movie={movie} />
    ))}
  </div>
);

export default ResultsTileBar;
