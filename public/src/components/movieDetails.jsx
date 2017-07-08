import React from 'react';

const MovieDetails = props => (
  <span>
    <span className="details-poster">
      <img src={props.movie.poster} alt={`Poster for ${props.movie.poster}`} />
    </span>
    <span className="details-content">
      <div className="details-film-attributes">
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
      <div className="details-film-cast">
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

export default MovieDetails;
