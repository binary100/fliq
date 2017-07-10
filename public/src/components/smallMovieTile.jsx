import React from 'react';

const ResultsSmallTile = ({ movie }) => (
  <div className="col-sm-2 small-movie-tile">
    <p>{movie.title}</p>
    <img className="poster" src={movie.poster} />
  </div>
);

export default ResultsSmallTile;
