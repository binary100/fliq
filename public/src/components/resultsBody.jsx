import React from 'react';
import LargeMovieTile from './largeMovieTile.jsx';

const ResultsBody = props => {
  return (
    <div className="results-body">
      <LargeMovieTile className="results-large-tile" movie={props.movie} />
    </div>
  );
};


export default ResultsBody;
