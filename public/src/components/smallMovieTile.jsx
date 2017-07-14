import React from 'react';
import LoadingButton from './loadingButton.jsx';
import axios from 'axios';

const thumbsUp = 'glyphicon glyphicon-thumbs-up';
const thumbsDown = 'glyphicon glyphicon-thumbs-down';
const complete = 'glyphicon glyphicon-ok';
const inProcess = 'glyphicon glyphicon-refresh';
const failed ='glyphicon glyphicon-remove';

class SmallMovieTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButtonClass: thumbsUp,
      dislikeButtonClass: thumbsDown,
      canClickLike: true,
      canClickDislike: true
    };
    this.likeMovie = this.likeMovie.bind(this);
    this.dislikeMovie = this.dislikeMovie.bind(this);
  }

  likeMovie() {
    if (!this.state.canClickLike) return;
    this.setState({
      likeButtonClass: inProcess,
      canClickLike: false
    });
    axios.post('/api/movie/like', {
      movie: this.props.movie
    })
      .then(() => {
        this.setState({ likeButtonClass: complete });
        console.log('Liked: ', this.props.movie);
      })
      .catch((err) => {
        console.error('Error marking as liked: ', err);
        this.setState({ likeButtonClass: failed });
      });
  }

  dislikeMovie() {
    if (!this.state.canClickDislike) return;
    this.setState({
      dislikeButtonClass: inProcess,
      canClickDislike: false
    });
    axios.post('/api/movie/dislike', {
      movie: this.props.movie
    })
      .then(() => {
        this.setState({ dislikeButtonClass: complete });
        console.log('Disliked: ', this.props.movie);
      })
      .catch((err) => {
        console.error('Error marking as disliked: ', err);
        this.setState({ dislikeButtonClass: failed });
      });
  }

  render() {
    return (
      <div
        className="small-movie-tile"
      >
        <div className="row">
          <p
            className="col-sm-12 small-movie-tile-title">
              {this.props.movie.title} ({this.props.movie.year})
          </p>
        </div>
        <div 
          onClick={(e, evt) => this.props.selectSmallTile(e, evt, this.props.movie)}
          className="row"
        >
          <img
            className="col-sm-12 poster-small"
            src={this.props.movie.poster}
            alt="Poster"
          />
        </div>
        <div className="row">
          <span className="col-sm-12">
            <div className="col-sm-6">
              <LoadingButton
                buttonClass={this.state.likeButtonClass}
                handleClick={this.likeMovie}
              />
            </div>
            <div className="col-sm-6">
              <LoadingButton
                buttonClass={this.state.dislikeButtonClass}
                handleClick={this.dislikeMovie}
              />
            </div>
          </span>
        </div>
      </div>
    );
  }

}

export default SmallMovieTile;
