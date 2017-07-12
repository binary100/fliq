import React from 'react';

const SmallMovieTile = ({ movie, selectSmallTile }) => (
  <div
    className="col-sm-2 small-movie-tile"
    onClick={(e, evt) => selectSmallTile(e, evt, movie)}
  >
    <p>{movie.title} ({movie.year})</p>
    <img className="poster-small" src={movie.poster} alt="Poster" />
  </div>
);

export default SmallMovieTile;
