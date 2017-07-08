import React from 'react';
import LargeMovieTile from './largeMovieTile.jsx';

const ResultsBody = props => {
  console.log('Creating results body with props: ', props);
  return (
    <div>
      <h3>Results Body!</h3>
      <LargeMovieTile className="results-large-tile" movie={props.movie} />
    </div>
  );
};


export default ResultsBody;
