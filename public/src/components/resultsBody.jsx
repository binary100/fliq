import React from 'react';
import LargeMovieTile from './largeMovieTile.jsx';
import Trailer from './trailer.jsx';

const ResultsBody = ({ movie, trailer }) => {
  let Tile = movie
    ? <LargeMovieTile
        className="results-large-tile"
        movie={movie}
      />
    : null;
  return (
    <div className="results-body">
      {Tile}
      <Trailer trailer={trailer} />
    </div>
  );
};

export default ResultsBody;
