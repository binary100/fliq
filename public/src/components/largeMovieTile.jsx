import React from 'react';
import MovieDetails from './movieDetails.jsx';

const LargeMovieTile = props => (
  <span
    className="large-movie-tile"
    onClick={(e, evt) => props.handleLightningTileClick(e, evt, props.movie)}
  >
    <MovieDetails movie={props.movie} />
  </span>
);

export default LargeMovieTile;
