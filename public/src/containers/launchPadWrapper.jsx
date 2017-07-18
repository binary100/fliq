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
    this.state = {
      tagData: tagsObj,
      selectedTags: selectedObj,
    };

    this.isSelected = this.isSelected.bind(this);
    this.selectItem = this.selectItem.bind(this);
    // this.postSelectedTags = this.postSelectedTags.bind(this);
    console.log('LaunchPadWrapper', props);
  }

  componentWillMount() {
    this.getTagsData();
  }

  isSelected(tag, tagItem) {
    console.log("isSelected:", tag, tagItem)
    console.log("selected[tag]:", this.state.selectedTags)
  // handleTileClick(e, evt, tag) {
  //   this.setState({
  //     selectedTag: tags.tag
  //   });
  // }
    return ((this.state.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble-active' : 'tag-bubble-default');
  }

  selectItem(tag, tagItem) {
    console.log("selectItem:", tag, tagItem)
    if (this.state.selectedTags[tag].indexOf(tagItem) > -1) {
      var index = this.state.selectedTags[tag].indexOf(tagItem);
      // this.setState({
        let selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index)
        this.setState({selectedTags: selectedTags});
      // })
    } else {
      // this.setState({
        let selectedTags = this.state.selectedTags[tag].concat([tagItem]);
        this.setState({selectedTags: selectedTags});
      // })
    }
  }

  postSelectedTags(submittedTags) {
    console.log('submited posted tags');
    console.log(submittedTags);
  }


  getTagsData() {
    return axios.get('/api/selectedTags')
      .then((results) => {
        console.log('Tags API Call', results.data);
        this.setState({
          tagData: results.data
        });
        return results;
      })
      .catch(err => console.error('Error retrieving movies: ', err));
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
    return (<div><LaunchPad tags={this.state.tagData} selectedTags={this.state.selectedTags} isSelected={this.isSelected} selectItem={this.selectItem} postSelectedTags={this.postSelectedTags} /></div>);
  }
}

export default LaunchPadWrapper;
