import React from 'react';
import MovieDetails from './movieDetails.jsx';

const LargeMovieTile = ({ movie, handleLightningTileClick }) => (
  <span className="col-sm-6 large-movie-tile">
    <span onClick={(e, evt) => handleLightningTileClick(e, evt, movie)}>
      <MovieDetails movie={movie} />
    </span>
  </span>
);

export default LargeMovieTile;
