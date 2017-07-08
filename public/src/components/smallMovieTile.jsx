import React from 'react';

const ResultsSmallTile = props => (
  <div className="small-movie-tile">
    <h3>Small Movie Tile</h3>
    <h2>{props.movie.title}</h2>
  </div>
);

export default ResultsSmallTile;
