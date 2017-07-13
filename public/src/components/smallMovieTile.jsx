import React from 'react';
import LoadingButton from './loadingButton.jsx';
import axios from 'axios';

class SmallMovieTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButtonText: 'I like it!',
      sawButtonText: 'I saw it!',
      canClickLike: true,
      canClickSaw: true
    };
    this.likeMovie = this.likeMovie.bind(this);
    this.sawMovie = this.sawMovie.bind(this);
  }

  likeMovie(movie) {
    if (!this.state.canClickLike) return;
    this.setState({
      likeButtonText: 'Processing...',
      canClickLike: false
    });
    axios.post('/api/movie/like', {
      movie
    })
      .then(() => this.setState({ likeButtonText: 'Saved!' }))
      .catch((err) => {
        console.error('Error marking as liked: ', err);
        this.setState({ likeButtonText: 'Error :(' });
      });
  }

  sawMovie(movie) {
    if (!this.state.canClickSaw) return;
    this.setState({
      sawButtonText: 'Processing...',
      canClickSaw: false
    });
    axios.post('/api/movie/saw', {
      movie
    })
      .then(() => this.setState({ sawButtonText: 'Saved!' }))
      .catch((err) => {
        console.error('Error marking as seen: ', err);
        this.setState({ sawButtonText: 'Error :(' });
      });
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
              <LoadingButton
                buttonText={this.state.likeButtonText}
                handleClick={this.likeMovie}
              />
            </div>
            <div className="row">
              <LoadingButton
                buttonText={this.state.sawButtonText}
                handleClick={this.sawMovie}
              />
            </div>
          </span>
        </div>
      </div>
    );
  }

}

export default SmallMovieTile;
