import React from 'react';
import LoadingButton from './loadingButton.jsx';
import axios from 'axios';
import { connect } from 'react-redux';

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
const likedFromSearch = '/api/search/movie/like';
const dislikedFromSearch = '/api/search/movie/dislike';
const seenFromResults = '/api/results/movie/seen';
const likedFromResults = '/api/results/movie/like';
const dislikedFromResults = '/api/results/movie/dislike';

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
    this.setButtonStates = this.setButtonStates.bind(this);
  }

  componentDidMount() {
    this.setButtonStates();
  }

  setButtonStates() {
    if (this.props.movie.liked === 0) {
      this.setState({
        likeButtonClass: thumbsUp,
        dislikeButtonClass: thumbsDown,
        seenButtonClass: eyeball,
        canLikeOrDislike: true,
        canClickSeen: true
      });
    } else if (this.props.movie.liked === 1) {
      this.setState({
        likeButtonClass: complete,
        dislikeButtonClass: thumbsDown,
        seenButtonClass: complete,
        canLikeOrDislike: false,
        canClickSeen: false
      });
    } else if (this.props.movie.liked === -1) {
      this.setState({
        likeButtonClass: thumbsUp,
        dislikeButtonClass: complete,
        seenButtonClass: complete,
        canLikeOrDislike: false,
        canClickSeen: false
      });
    }
  }

  likeMovie() {
    if (!this.state.canLikeOrDislike) return;
    this.setState({
      likeButtonClass: inProcess,
      canLikeOrDislike: false,
      canClickSeen: false
    });
    const postUrl = this.props.fromSearch ? likedFromSearch : likedFromResults;
    axios.post(postUrl, {
      movie: this.props.movie,
      fromSearch: this.props.fromSearch,
      isLike: true
    })
      .then(() => {
        this.setState({
          likeButtonClass: complete,
          seenButtonClass: complete
        });
      })
      .catch((err) => {
        this.setState({ likeButtonClass: failed });
      });
  }

  dislikeMovie() {
    if (!this.state.canLikeOrDislike) return;
    this.setState({
      dislikeButtonClass: inProcess,
      canLikeOrDislike: false,
      canClickSeen: false
    });
    const postUrl = this.props.fromSearch ? dislikedFromSearch : dislikedFromResults;
    axios.post(postUrl, {
      movie: this.props.movie,
      fromSearch: this.props.fromSearch,
      isLike: false
    })
      .then(() => {
        this.setState({
          dislikeButtonClass: complete,
          seenButtonClass: complete
        });
      })
      .catch((err) => {
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
        .catch(() => {
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
            src={
              this.props.movie.poster === 'N/A'
              ? '../assets/img/no-poster.png'
              : this.props.movie.poster
            }
            alt="Poster"
          />
        </div>
        <div className="like-buttons col-sm-10 col-centered">
          <div className="col-sm-4">
            <LoadingButton
              disabled={!this.props.isLoggedIn}
              buttonClass={this.state.likeButtonClass}
              handleClick={this.likeMovie}
            />
          </div>
          <div className="col-sm-4">
            <LoadingButton
              disabled={!this.props.isLoggedIn}
              buttonClass={this.state.seenButtonClass}
              handleClick={this.setMovieAsSeen}
            />
          </div>
          <div className="col-sm-4">
            <LoadingButton
              disabled={!this.props.isLoggedIn}
              buttonClass={this.state.dislikeButtonClass}
              handleClick={this.dislikeMovie}
            />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(
  mapStateToProps,
  null
)(SmallMovieTile);
