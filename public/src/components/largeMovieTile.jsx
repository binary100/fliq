import React from 'react';
import MovieDetails from './movieDetails.jsx';

const LargeMovieTile = props => (
  <span className="col-sm-6">
    <span
      onClick={(e, evt) => props.handleLightningTileClick(e, evt, props.movie)}
    >
      <MovieDetails movie={props.movie} />
    </span>
  </span>
);

export default LargeMovieTile;
