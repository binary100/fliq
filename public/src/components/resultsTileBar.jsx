import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies, selectSmallTile }) => (
  <div className="row">
    <div className="col-sm-12 results-tile-bar col-centered">
      {movies && movies.map(movie => (
        <span key={count += 1} className="col-sm-2">
          <SmallMovieTile
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
