import React from 'react';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';

// DATA OBJECTS

const genres = ['Action', 'Advenure'];
const decades = ['80s','90s','00s','10s']
const rated = ['PG13', 'R'];
const directors = ['Steven Spielberg', 'Christopher Nolan'];

const tagsObj = {
  year: decades,
  rated: rated,
  genre: genres,
  director: directors,
};


class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    console.log('LaunchPadWrapper', props);
    this.state = {
      selectedTag: tagsObj
      // tags: [],
      // genres: ['Action', 'Advenure'],
      // directors: ['Steven Spielberg', 'Christopher Nolan']
    };
    // this.getTagsData = this.getTagsData.bind(this);
  }

  // getTagsData() {
  //   return axios.get('/api/tags')
  //     .then((results) => {
  //       this.setState({
  //         tags: tags.data
  //       });
  //       return results;
  //     });
  // }

  // handleTileClick(e, evt, tag) {
  //   this.setState({
  //     selectedTag: tags.tag
  //   });
  // }


  render() {
    return (<div><LaunchPad tags={this.state.selectedTag} /></div>);
  }
}

export default LaunchPadWrapper;
