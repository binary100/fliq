import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

// props.movies
const ResultsTileBar = props => (
  <div>
    {props.movies.map(movie => (
      <SmallMovieTile movie={movie} />
    ))}
  </div>
);

export default ResultsTileBar;
