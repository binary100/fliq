import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies, selectSmallTile }) => (
  <div className="row">
    <div className="col-sm-12 results-tile-bar">
      {movies.map(movie => (
        <span className="col-sm-2">
          <SmallMovieTile
            key={count += 1}
            movie={movie}
            selectSmallTile={selectSmallTile}
            isResults
          />
        </span>
      ))}
    </div>
  </div>
);

export default ResultsTileBar;
