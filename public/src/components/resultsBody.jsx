import React from 'react';
import LargeMovieTile from './largeMovieTile.jsx';

const youtubeUrl = 'https://www.youtube.com/embed/';
const hrefBase = `https://www.google.com/search?q=where+can+I+stream+MOVIE+YEAR`;
const regex = /[^a-zA-Z0-9]+/g;

const ResultsBody = ({ movie, trailer, handleSeeMovieClick }) => {
  const Tile = movie
    ? <LargeMovieTile movie={movie} />
    : null;

  const nameString = movie ? movie.title.replace(regex, '+') : '';
  const hrefString = movie ? hrefBase
                    .replace('MOVIE', nameString)
                    .replace('YEAR', movie.year) : '';

  return (
    <div className="container results-body">
      <div className="row">
        {Tile}
        <div className="col-sm-6">
          <div className="row">
            <div className="embed-responsive embed-responsive-16by9 trailer">
              <iframe
                title={trailer ? movie.title : null}
                className="embed-responsive-item"
                src={trailer ? youtubeUrl + trailer.id.videoId : ''}
                allowFullScreen
              />
            </div>
          </div>
          <div className="row">
            <a href={hrefString}>
              {
                movie &&
                <button
                  className="btn btn-primary fliq-button go-see-button pull-right"
                  onClick={handleSeeMovieClick}
                >
                  Find Streaming Sources
                </button>
              }
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsBody;
