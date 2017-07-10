import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies }) => (
  <div className="col-sm-12">
    {movies.map(movie => (
      <SmallMovieTile key={count += 1} movie={movie} />
    ))}
  </div>
);

export default ResultsTileBar;
