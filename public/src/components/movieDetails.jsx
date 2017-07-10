import React from 'react';

let criticIndex = 0;
const MovieDetails = props => {
  const criticScores = props.movie.ratings === ''
    ? ''
    : JSON.parse(props.movie.ratings).map(critic => (
        <div key={criticIndex += 1}>
          <p>{critic.Source}: {critic.Value}</p>
        </div>
      ));

  return (
    <span className="row">
      <span className="col-sm-6">
        <img className="poster" src={props.movie.poster} alt={`Poster for ${props.movie.poster}`} />
      </span>
      <span className="col-sm-6">
        <div >
          <div>
            <p>Title: {props.movie.title} <span>({props.movie.year})</span></p>
          </div>
          <div>
            <p>Synopsis: {props.movie.plot} </p>
          </div>
          <div>
            <p>Rated: {props.movie.rated} </p>
          </div>
          <div>
            <p>Genres: {props.movie.genre} </p>
          </div>
          <div>
              Critics: {criticScores}
          </div>
        </div>
        <div>
          <div>
            <p>Director: {props.movie.director} </p>
          </div>
          <div>
            <p>Writer: {props.movie.writer} </p>
          </div>
          <div>
            <p>Actors: {props.movie.actors} </p>
          </div>
        </div>
      </span>
    </span>
  );
};

export default MovieDetails;
