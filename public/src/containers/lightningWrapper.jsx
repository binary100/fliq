import React from 'react';
import Lightning from '../containers/lightning.jsx';
import axios from 'axios';

const movieOne = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"92/100"}],"Metascore":"92","imdbRating":"8.7","imdbVotes":"982,688","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"http://www.starwars.com/episode-iv/","Response":"True"};
const movieTwo = {"Title":"Terminator 2: Judgment Day","Year":"1991","Rated":"R","Released":"03 Jul 1991","Runtime":"137 min","Genre":"Action, Sci-Fi, Thriller","Director":"James Cameron","Writer":"James Cameron, William Wisher Jr.","Actors":"Arnold Schwarzenegger, Linda Hamilton, Edward Furlong, Robert Patrick","Plot":"A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son, John Connor, from a more advanced cyborg.","Language":"English, Spanish","Country":"USA, France","Awards":"Won 4 Oscars. Another 24 wins & 24 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"8.5","imdbVotes":"798,971","imdbID":"tt0103064","Type":"movie","DVD":"31 Mar 1998","BoxOffice":"$198,116,802","Production":"TriStar Pictures","Website":"N/A","Response":"True"};

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      timer: 10,
      roundsRemaining: 5,
      timeoutId: ''
    };
    this.getMovieData = this.getMovieData.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.startNextRound = this.startNextRound.bind(this);
    this.endRound = this.endRound.bind(this);
  }

  componentWillMount() {
    this.getMovieData()
      .then(() => {
        this.startTimer();
      });
  }

  // Get an array with two movies objects
  // from server, which calls OMDB API
  getMovieData() {
    console.log('Entering getMovieData');
    /* ENDPOINT DOES NOT EXIST YET

    // Return this promise in order to
    // control flow at the start of each
    // round (see startNextRound)
    return axios.get(/api/lightning)
      .then((results) => {
        this.setState({
          movies: results.data
        });
      });
    */
    this.setState({
      movies: [movieOne, movieTwo]
    });
  }

  startTimer() {
    const timerId = setTimeout(function () {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1
        });
      } else {
        this.endRound();
      }
    }.bind(this), 1000);

    this.setState({
      timerId
    });
  }

  startNextRound() {
    this.getMovieData()
      .then(() => {
        this.setState({
          timer: 10
        });
        this.startTimer();
      });
  }

  endRound() {
    if (this.state.roundsRemaining === 0) {
      clearTimeout(this.state.timerId);
      // proceed to Results component
    } else {
      this.startNextRound();
    }
  }

  render() {
    return (
      <div>
        <h3>LightningWrapper</h3>
        <Lightning movies={this.state.movies} />
      </div>
    );
  }
}

export default LightningWrapper;
