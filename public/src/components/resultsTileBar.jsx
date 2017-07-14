import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

let count = 0;

const ResultsTileBar = ({ movies, selectSmallTile }) => (
  <div className="row">
    <div className="col-sm-12 results-tile-bar">
      {movies.map(movie => (
        <span className="col-sm-3">
          <SmallMovieTile
            key={count += 1}
            movie={movie}
            selectSmallTile={selectSmallTile}
          />
        </span>
      ))}
    </div>
  </div>
);

export default ResultsTileBar;
