import React from 'react';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';

// DATA OBJECTS
  const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s','00s']
  const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];
  const directors = ['Steven Spielberg', 'Christopher Nolan'];
  const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
  const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];
  const tagsObj = {
    actor: actors,
    director: directors,
    genre: genres,
    rated: rated,
    year: decades,
  };
  const selectedObj = {
    actor: [],
    director: [],
    genre: [],
    rated: [],
    year: [],
  }

class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    console.log('LaunchPadWrapper', props);
    this.state = {
      tagData: tagsObj,
      selectedTags: selectedObj,
    };
    // this.getTagsData();
  }



  componentWillMount() {
    this.getTagsData();
  }

  getTagsData() {
    return axios.get('/api/tags')
      .then((results) => {
        console.log('Tags API Call', results.data);
        this.setState({
          tagData: results.data
        });
        return results;
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

  render() {
    return (<div><LaunchPad tags={this.state.tagData} /></div>);
  }
}

export default LaunchPadWrapper;
