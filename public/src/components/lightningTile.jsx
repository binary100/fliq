import React from 'react';

const LightningTile = props => (
  <span className="lightning-tile" onClick={(e, evt) => props.handleLightningTileClick(e, evt, props.movie)}>
    <span className="lightning-poster">
      <img src={props.movie.poster} alt={`Poster for ${props.movie.poster}`} />
    </span>
    <span className="lightning-details">
      <div className="film-details">
        <div>
          <h2>Title: {props.movie.title} </h2>
        </div>
        <div>
          <h4>Rating: {props.movie.rating} </h4>
        </div>
        <div>
          <h4>Genres: {props.movie.genres} </h4>
        </div>
        <div>
          <h4>Runtime: {props.movie.runtime} </h4>
        </div>
      </div>
      <div className="cast-details">
        <div>
          <h3>Director: {props.movie.director} </h3>
        </div>
        <div>
          <h3>Writer: {props.movie.writer} </h3>
        </div>
        <div>
          <h3>Actors: {props.movie.actors} </h3>
        </div>
      </div>
    </span>
  </span>
);

export default LightningTile;