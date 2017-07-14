import React from 'react';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';

// DATA OBJECTS

const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s','00s']
const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];
const directors = ['Steven Spielberg', 'Christopher Nolan'];
const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];

const tagsObj = {
  actor: actors,
  director: directors,
  genre: genres,
  rated: rated,
  year: decades,
};

class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    console.log('LaunchPadWrapper', props);
    this.state = {
      tagData: tagsObj
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

  // handleTileClick(e, evt, tag) {
  //   this.setState({
  //     selectedTag: tags.tag
  //   });
  // }


  render() {
    return (<div><LaunchPad tags={this.state.tagData} /></div>);
  }
}

export default LaunchPadWrapper;
