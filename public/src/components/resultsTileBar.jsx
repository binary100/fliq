import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies, handleTileClick }) => (
  <div className="col-sm-12 results-tile-bar">
    {movies.map(movie => (
      <SmallMovieTile
        key={count += 1}
        movie={movie}
        handleTileClick={handleTileClick}
      />
    ))}
  </div>
);

export default ResultsTileBar;
