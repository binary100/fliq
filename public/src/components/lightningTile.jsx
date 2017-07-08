import React from 'react';

const LightningTile = props => (
  <span className="lightning-tile" onClick={(e, evt) => props.handleLightningTileClick(e, evt, props.movie)}>
    <span className="lightning-poster">
      <img src={props.movie.poster} alt={`Poster for ${props.movie.poster}`} />
    </span>
    <span className="lightning-details">
      <div className="film-details">
        <div>
          <h2>Title: {props.movie.title} <span>({props.movie.year})</span></h2>
        </div>
        <div>
          <h3>Synopsis: {props.movie.plot} </h3>
        </div>
        <div>
          <h3>Rated: {props.movie.rated} </h3>
        </div>
        <div>
          <h3>Genres: {props.movie.genre} </h3>
        </div>
        <div>
          <h3>
            Critics:
            {JSON.parse(props.movie.ratings).map(critic => (
              <div>
                <p>{critic.Source}: {critic.Value} </p>
              </div>
            ))}
          </h3>
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
