import React from 'react';
import LikeButton from './likeButton.jsx';
import SeenButton from './seenButton.jsx';
import axios from 'axios';

class SmallMovieTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButtonText: 'Like!',
      sawButtonText: 'Saw it!'
    };
    this.likeMovie = this.likeMovie.bind(this);
    this.sawMovie = this.sawMovie.bind(this);
  }

  likeMovie(movie) {
    this.setState({ likeButtonText: 'Processing...' });
    axios.post('/api/movie/like', {
      movie
    })
      .then(() => this.setState({ likeButtonText: 'Saved!' }))
      .catch(err => console.error('Error marking as seen: ', err));
  }

  sawMovie(movie) {
    this.setState({ sawButtonText: 'Processing...' });
    axios.post('/api/movie/saw', {
      movie
    })
      .then(() => this.setState({ sawButtonText: 'Saved!' }))
      .catch(err => console.error('Error marking as seen: ', err));
  }

  render() {
    return (
      <div
        className="col-sm-3 small-movie-tile"
        onClick={(e, evt) => this.props.selectSmallTile(e, evt, this.props.movie)}
      >
        <p
          className="small-movie-tile-title">
            {this.props.movie.title} ({this.props.movie.year})
        </p>
        <div>
          <img
            className="poster-small col-sm-6"
            src={this.props.movie.poster}
            alt="Poster"
          />
          <span className="col-sm-6">
            <div className="row">
              <LikeButton
                buttonText={this.state.likeButtonText}
                likeMovie={this.likeMovie}
              />
            </div>
            <div className="row">
              <SeenButton
                buttonText={this.state.sawButtonText}
                sawMovie={this.sawMovie}
              />
            </div>
          </span>
        </div>
      </div>
    );
  }

}

export default SmallMovieTile;
