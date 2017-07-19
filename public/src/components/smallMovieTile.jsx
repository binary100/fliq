import React from 'react';
import LoadingButton from './loadingButton.jsx';
import axios from 'axios';

const thumbsUp = 'glyphicon glyphicon-thumbs-up';
const thumbsDown = 'glyphicon glyphicon-thumbs-down';
const complete = 'glyphicon glyphicon-ok';
const inProcess = 'glyphicon glyphicon-refresh';
const failed = 'glyphicon glyphicon-remove';
const eyeball = 'glyphicon glyphicon-eye-open';
const searchPosterDivClass = 'row poster-small';
const searchPosterImgClass = 'col-sm-12 poster-small';
const resultsPosterDivClass = 'row poster-small results-tile-bar-poster';
const resultsPosterImgClass = 'col-sm-12 poster-small results-tile-bar-poster';
const seenFromSearch = '/api/search/movie/seen';
const seenFromResults = '/api/results/movie/seen'

class SmallMovieTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButtonClass: thumbsUp,
      dislikeButtonClass: thumbsDown,
      seenButtonClass: eyeball,
      canLikeOrDislike: true,
      canClickSeen: true
    };
    this.likeMovie = this.likeMovie.bind(this);
    this.dislikeMovie = this.dislikeMovie.bind(this);
    this.setMovieAsSeen = this.setMovieAsSeen.bind(this);
  }

  likeMovie() {
    if (!this.state.canLikeOrDislike) return;
    this.setState({
      likeButtonClass: inProcess,
      canLikeOrDislike: false,
      canClickSeen: false
    });
    axios.post('/api/movie/like', {
      movie: this.props.movie,
      fromSearch: this.props.fromSearch
    })
      .then(() => {
        this.setState({
          likeButtonClass: complete,
          seenButtonClass: complete
        });
        console.log('Liked: ', this.props.movie);
      })
      .catch((err) => {
        console.error('Error marking as liked: ', err);
        this.setState({ likeButtonClass: failed });
      });
  }

  dislikeMovie() {
    // SET THE POST URL BASED ON this.props.fromSearch
    // make two const strings outside class to use
    if (!this.state.canLikeOrDislike) return;
    this.setState({
      dislikeButtonClass: inProcess,
      canLikeOrDislike: false,
      canClickSeen: false
    });
    axios.post('/api/movie/dislike', {
      movie: this.props.movie,
      fromSearch: this.props.fromSearch
    })
      .then(() => {
        this.setState({
          dislikeButtonClass: complete,
          seenButtonClass: complete
        });
        console.log('Disliked: ', this.props.movie);
      })
      .catch((err) => {
        console.error('Error marking as disliked: ', err);
        this.setState({ dislikeButtonClass: failed });
      });
  }

  setMovieAsSeen() {
    if (this.state.canClickSeen) {
      const postUrl = this.props.fromSearch ? seenFromSearch : seenFromResults;
      axios.post(postUrl, {
        movie: this.props.movie
      })
        .then(() => {
          this.setState({
            seenButtonClass: complete,
            canClickSeen: false
          });
        })
        .catch((err) => {
          console.error('Error marking seen: ', err);
          this.setState({
            seenButtonClass: failed,
            canClickSeen: false
          });
        });
    }
  }

  render() {
    return (
      <div
        className="small-movie-tile"
      >
        <div className="row">
          <p className="col-sm-12 small-movie-tile-title">
            {this.props.movie.title} ({this.props.movie.year})
          </p>
        </div>
        <div
          onClick={(e, evt) => this.props.selectSmallTile(e, evt, this.props.movie)}
          className={this.props.isResults ? resultsPosterDivClass : searchPosterDivClass}
        >
          <img
            className={this.props.isResults ? resultsPosterImgClass : searchPosterImgClass}
            src={this.props.movie.poster}
            alt="Poster"
          />
        </div>
        <div className="like-buttons col-sm-10 col-centered">
          <div className="col-sm-4">
            <LoadingButton
              buttonClass={this.state.likeButtonClass}
              handleClick={this.likeMovie}
            />
          </div>
          <div className="col-sm-4">
            <LoadingButton
              buttonClass={this.state.seenButtonClass}
              handleClick={this.setMovieAsSeen}
            />
          </div>
          <div className="col-sm-4">
            <LoadingButton
              buttonClass={this.state.dislikeButtonClass}
              handleClick={this.dislikeMovie}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default SmallMovieTile;
