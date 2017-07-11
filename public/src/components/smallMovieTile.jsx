import React from 'react';

const ResultsSmallTile = ({ movie, handleTileClick }) => (
  <div
    className="col-sm-2 small-movie-tile"
    onClick={(e, evt) => handleTileClick(e, evt, movie)}
  >
    <p>{movie.title}</p>
    <img className="poster" src={movie.poster} alt="Poster" />
  </div>
);

export default ResultsSmallTile;
