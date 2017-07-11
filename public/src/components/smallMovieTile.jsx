import React from 'react';

const ResultsSmallTile = ({ movie, handleTileClick }) => (
  <div
    className="col-sm-2 small-movie-tile"
    onClick={(e, evt) => handleTileClick(e, evt, movie)}
  >

    <p>{movie.title} ({movie.year})</p>
    <img className="poster-small" src={movie.poster} alt="Poster" />

  </div>
);

export default ResultsSmallTile;

// <span className="col-sm-6">
    //   <p>{movie.director}</p>
    //   <p>{movie.writer}</p>
    //   <p>{movie.rated}</p>
    // </span>
