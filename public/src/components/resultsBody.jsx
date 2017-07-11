import React from 'react';
import LargeMovieTile from './largeMovieTile.jsx';
import Trailer from './trailer.jsx';

const ResultsBody = ({ movie, trailer }) => {
  return (
    <div className="results-body">
      <LargeMovieTile className="results-large-tile" movie={movie} />
      <Trailer trailer={trailer} />
    </div>
  );
};

export default ResultsBody;
