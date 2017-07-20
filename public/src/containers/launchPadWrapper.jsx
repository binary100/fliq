import React from 'react';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

// DATA OBJECTS
const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '00s'];
const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];
const directors = ['Steven Spielberg', 'Christopher Nolan'];
const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];
const tagsObj = {
  actor: actors,
  director: directors,
  genre: genres,
  rated,
  year: decades
};
const selectedObj = {
  actor: [],
  director: [],
  genre: [],
  rated: [],
  year: []
};


// MESSAGES

class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: tagsObj,
      selectedTags: selectedObj
    };

    this.isSelected = this.isSelected.bind(this);
    this.selectItem = this.selectItem.bind(this);

    console.log('LaunchPadWrapper', props);
  }


  componentWillMount() {
    // this.getTagsData();
  }

  isSelected(tag, tagItem) {
    return (this.state.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble tag-bubble-active' : 'tag-bubble';
  }

  selectItem(tagItem, tag) {

<<<<<<< HEAD
    console.log('check index', this.state.selectedTags[tag]);
    if (this.state.selectedTags[tag].includes(tagItem)) {
      // const index = this.state.selectedTags[tag].includes(tagItem);
      // const selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index);    
      console.log('if', this.state.selectedTags);
      this.setState({ selectedTags });
||||||| merged common ancestors
  console.log('check index', this.state.selectedTags[tag])
    if (this.state.selectedTags[tag].includes(tagItem) ) {
      // const index = this.state.selectedTags[tag].includes(tagItem);
      // const selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index);
      
      console.log('if', this.state.selectedTags)
      this.setState({ selectedTags });
=======
  console.log('check index', this.state.selectedTags[tag])
    const clickedArray = this.state.selectedTags[tag];


    if (clickedArray.indexOf(tagItem) > -1) {
      const index = clickedArray.includes(tagItem);
      const selectedTags = clickedArray.filter((_, i) => i !== index);
      
      console.log('if', this.state.selectedTags)
      this.setState({ selectedTags: selectedTags });
>>>>>>> feat($launchpad): add route for new users
    } else {
      const newSelectedTagObj = Object.assign({}, this.state.selectedTags);
      newSelectedTagObj[tag].push(tagItem);
      this.setState({ selectedTags: newSelectedTagObj });

<<<<<<< HEAD
      // console
      console.log('else', this.state.selectedTags);
||||||| merged common ancestors
      // console
      console.log('else', this.state.selectedTags)
=======
      console.log('else', this.state.selectedTags)
>>>>>>> feat($launchpad): add route for new users
    }
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

  postSelectedTags(submittedTags) {
    console.log('submited posted tags', submittedTags);
    return axios.post('/api/selectedTags', submittedTags)
      .then(res => console.log('submited posted tags', submittedTags))
      .then(() => alert('We got your results! Thanks'))
      .catch(error => console.error('error posting submitted tags'));
  }

  render() {
    return (
      <div>
        <LaunchPad
          tags={this.state.tagData}
          selectedTags={this.state.selectedTags}
          isSelected={this.isSelected}
          selectItem={this.selectItem}
          postSelectedTags={this.postSelectedTags}
        /></div>
    );
  }
}

export default LaunchPadWrapper;
