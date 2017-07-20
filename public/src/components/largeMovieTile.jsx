import React from 'react';
import MovieDetails from './movieDetails.jsx';

const baseClass = `col-sm-6 large-movie-tile`;

const LargeMovieTile = ({ movie, handleLightningTileClick, isLightning }) => (
  <span className={baseClass + (isLightning ? ' lightning-tile' : '')}>
    <span onClick={(e, evt) => handleLightningTileClick(e, evt, movie)}>
      <MovieDetails movie={movie} />
    </span>
  </span>
);

export default LargeMovieTile;
