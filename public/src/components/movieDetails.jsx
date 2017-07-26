import React from 'react';

let criticIndex = 0;
const MovieDetails = ({ movie }) => {
  console.log('Rendering MovieDetails with: ', movie);
  // const criticScores = movie.ratings === ''
  //   ? ''
  //   : JSON.parse(movie.ratings).map(critic => (
  //       <div key={criticIndex += 1}>
  //         <p>{critic.Source}: {critic.Value}</p>
  //       </div>
  //     ));

  return (
    <span className="row">
      <span className="col-sm-6">
        <img className="poster"
          src={
            movie.poster === 'N/A'
            ? '../assets/img/no-poster.png'
            : movie.poster
          }
          alt={`Poster for ${movie.poster}`}
        />
      </span>
      <span className="col-sm-6">
        <div >
          <div>
            <p>Title: {movie.title} <span>({movie.year})</span></p>
          </div>
          <div>
            <p>Synopsis: {movie.plot} </p>
          </div>
          <div>
            <p>Rated: {movie.rated} </p>
          </div>
          <div>
            <p>Genres: {movie.genre} </p>
          </div>
        </div>
        <div>
          <div>
            <p>Director: {movie.director} </p>
          </div>
          <div>
            <p>Writer: {movie.writer} </p>
          </div>
          <div>
            <p>Actors: {movie.actors} </p>
          </div>
        </div>
      </span>
    </span>
  );
};

export default MovieDetails;
