import React from 'react';

const LightningTile = props => (
  <span className="lightning-tile">
    <span className="lightning-poster">
      <img src={props.movie.Poster} alt={`Poster for ${props.movie.poster}`} />
    </span>
    <span className="lightning-details">
      <div className="film-details">
        <div>
          <h2>Title: {props.movie.Title} </h2>
        </div>
        <div>
          <h4>Rating: {props.movie.Rating} </h4>
        </div>
        <div>
          <h4>Genres: {props.movie.Genres} </h4>
        </div>
        <div>
          <h4>Runtime: {props.movie.Runtime} </h4>
        </div>
      </div>
      <div className="cast-details">
        <div>
          <h3>Director: {props.movie.Director} </h3>
        </div>
        <div>
          <h3>Writer: {props.movie.Writer} </h3>
        </div>
        <div>
          <h3>Actors: {props.movie.Actors} </h3>
        </div>
      </div>
    </span>
  </span>
);

export default LightningTile;