import React from 'react';
import { Button } from 'react-bootstrap';

const SmallMovieTile = ({ movie, selectSmallTile }) => (
  <div
    className="col-sm-3 small-movie-tile"
    onClick={(e, evt) => selectSmallTile(e, evt, movie)}
  >

    <p>{movie.title} ({movie.year})</p>
    <div>
      <img className="poster-small col-sm-6" src={movie.poster} alt="Poster" />
      <span className="col-sm-6">
      <div className="row">
        <Button className="col-sm-10 small-tile-button">Like It</Button>
      </div>
      <div className="row">
        <Button className="col-sm-10 small-tile-button">Seen It</Button>
      </div>
      </span>
    </div>
  </div>
);

export default SmallMovieTile;
