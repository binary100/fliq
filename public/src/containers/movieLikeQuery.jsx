import React from 'react';
import LoadingButton from '../components/loadingButton.jsx';
import axios from 'axios';
import { clearMovie } from '../actions/actions.js';
import { connect } from 'react-redux';

const thumbsUp = 'glyphicon glyphicon-thumbs-up';
const thumbsDown = 'glyphicon glyphicon-thumbs-down';
const complete = 'glyphicon glyphicon-ok';
const inProcess = 'glyphicon glyphicon-refresh';
const failed = 'glyphicon glyphicon-remove';

const likedFromResults = '/api/results/movie/like';
const dislikedFromResults = '/api/results/movie/dislike';

class UserLikeQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButtonClass: thumbsUp,
      dislikeButtonClass: thumbsDown,
      canLikeOrDislike: true
    };
    this.likeMovie = this.likeMovie.bind(this);
    this.dislikeMovie = this.dislikeMovie.bind(this);
    this.clearWatchedMovie = this.clearWatchedMovie.bind(this);
  }

  clearWatchedMovie() {
    setTimeout(() => {
      this.props.clearMovie();
    }, 1000);
  }

  likeMovie() {
    if (!this.state.canLikeOrDislike) return;
    this.setState({
      likeButtonClass: inProcess,
      canLikeOrDislike: false
    });
    axios.post(likedFromResults, {
      movie: this.props.movie,
      fromSearch: true,
      isLike: true
    })
      .then(() => {
        this.clearWatchedMovie();
        this.setState({
          likeButtonClass: complete
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
      canLikeOrDislike: false
    });
    axios.post(dislikedFromResults, {
      movie: this.props.movie,
      fromSearch: true,
      isLike: false
    })
      .then(() => {
        this.clearWatchedMovie();
        this.setState({
          dislikeButtonClass: complete
        });
      })
      .catch((err) => {
        this.setState({ dislikeButtonClass: failed });
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 .col-centered">
            Did you like {this.props.movie.title}?
          </div>
        </div>
        <div className="row">
          <div className="like-buttons col-sm-12 popdown-buttons">
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
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  clearMovie: () => { dispatch(clearMovie()); }
});

export default connect(
  null,
  mapDispatchToProps
)(UserLikeQuery);
