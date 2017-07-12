import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies, selectSmallTile }) => (
  <div className="col-sm-12 results-tile-bar">
    {movies.map(movie => (
      <SmallMovieTile
        key={count += 1}
        movie={movie}
        selectSmallTile={selectSmallTile}
      />
    ))}
  </div>
);

export default ResultsTileBar;
