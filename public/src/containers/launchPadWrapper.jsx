import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

// DATA OBJECTS
<<<<<<< HEAD
<<<<<<< HEAD
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

||||||| merged common ancestors
  const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s','00s']
  const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];
  const directors = ['Steven Spielberg', 'Christopher Nolan'];
  const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
  const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];
||||||| merged common ancestors
  const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s','00s']
  const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];
  const directors = ['Steven Spielberg', 'Christopher Nolan'];
  const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
  const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];
=======
  // const decades = ['Silent Era', '30s', '40s', '50s', '60s', '70s', '80s', '90s','00s']
  // const actors = ['Christian Bale', 'Al Capino', 'Clint Eastwood'];
  // const directors = ['Steven Spielberg', 'Christopher Nolan'];
  // const genres = ['Action', 'Advenure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
  // const rated = ['G', 'PG', 'PG13', 'R', 'NC-17'];  
  const decades = []
  const actors = [];
  const directors = [];
  const genres = [];
  const rated = [];
>>>>>>> fix($launchpad): fix animation
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


// MESSAGES 

=======
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


// MESSAGES 
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: tagsObj,
      selectedTags: selectedObj
    };
    this.isSelected = this.isSelected.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }


  componentWillMount() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    // this.getUserInfo();
||||||| merged common ancestors
    // this.getUserInfo();
=======
>>>>>>> fix($launchpad): fix merge code and cleaned up console logs
    this.getTagsData();
||||||| merged common ancestors
    this.getTagsData();
=======
    // this.getTagsData();
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
    this.getTagsData();
=======
    // this.getTagsData();
>>>>>>> feat($launchpad): add route for new users
  }

  isSelected(tag, tagItem) {
     return (this.state.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble tag-bubble-active' : 'tag-bubble tag-bubble-default';
  }

  selectItem(tagItem, tag) {

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('check index', this.state.selectedTags[tag]);
    if (this.state.selectedTags[tag].includes(tagItem)) {
      // const index = this.state.selectedTags[tag].includes(tagItem);
      // const selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index);    
      console.log('if', this.state.selectedTags);
      this.setState({ selectedTags });
||||||| merged common ancestors
  console.log('check index', this.state.selectedTags[tag])
    const clickedArray = this.state.selectedTags[tag];

||||||| merged common ancestors
  console.log('check index', this.state.selectedTags[tag])
    const clickedArray = this.state.selectedTags[tag];

=======
  // console.log('check index', this.state.selectedTags[tag])
    // const clickedArray = this.state.selectedTags[tag];
    
    
||||||| merged common ancestors
  // console.log('check index', this.state.selectedTags[tag])
    // const clickedArray = this.state.selectedTags[tag];
    
    
=======
>>>>>>> fix($launchpad): fix merge code and cleaned up console logs
    const clickedArray = Object.assign({}, this.state.selectedTags);
    console.log('clickedArray', clickedArray)
>>>>>>> feat($launchpad $server): add api routes to update view and picks count

    if ( clickedArray[tag].indexOf(tagItem) > -1 ) {
      const index = clickedArray[tag].indexOf(tagItem);
      const selectTagsFilter = clickedArray[tag].filter((i) => i !== index);
      
<<<<<<< HEAD
      console.log('if', this.state.selectedTags)
<<<<<<< HEAD
<<<<<<< HEAD
      this.setState({ selectedTags });
=======
  console.log('check index', this.state.selectedTags[tag])
    const clickedArray = this.state.selectedTags[tag];


    if (clickedArray.indexOf(tagItem) > -1) {
      const index = clickedArray.includes(tagItem);
      const selectedTags = clickedArray.filter((_, i) => i !== index);
||||||| merged common ancestors
  console.log('check index', this.state.selectedTags[tag])
<<<<<<< HEAD
    if (this.state.selectedTags[tag].includes(tagItem) ) {
      // const index = this.state.selectedTags[tag].includes(tagItem);
      // const selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index);
=======
  console.log('check index', this.state.selectedTags[tag])
    const clickedArray = this.state.selectedTags[tag];


    if (clickedArray.indexOf(tagItem) > -1) {
      const index = clickedArray.includes(tagItem);
      const selectedTags = clickedArray.filter((_, i) => i !== index);
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
    if (this.state.selectedTags[tag].includes(tagItem) ) {
      // const index = this.state.selectedTags[tag].includes(tagItem);
      // const selectedTags = this.state.selectedTags[tag].filter((_, i) => i !== index);
=======
    const clickedArray = this.state.selectedTags[tag];


    if (clickedArray.indexOf(tagItem) > -1) {
      const index = clickedArray.includes(tagItem);
      const selectedTags = clickedArray.filter((_, i) => i !== index);
>>>>>>> feat($launchpad): add route for new users
      
      console.log('if', this.state.selectedTags)
<<<<<<< HEAD
<<<<<<< HEAD
      this.setState({ selectedTags: selectedTags });
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
      this.setState({ selectedTags });
=======
      this.setState({ selectedTags: selectedTags });
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
      this.setState({ selectedTags: selectedTags });
=======
||||||| merged common ancestors
      console.log('if', this.state.selectedTags)
=======
>>>>>>> fix($launchpad): fix merge code and cleaned up console logs
      this.setState({ selectedTags: selectTagsFilter });
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
||||||| merged common ancestors
      this.setState({ selectedTags });
=======
      this.setState({ selectedTags: selectedTags });
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
      this.setState({ selectedTags });
=======
      this.setState({ selectedTags: selectedTags });
>>>>>>> feat($launchpad): add route for new users
    } else {
<<<<<<< HEAD
      const newSelectedTagObj = Object.assign({}, this.state.selectedTags);
      newSelectedTagObj[tag].push(tagItem);
      this.setState({ selectedTags: newSelectedTagObj });

<<<<<<< HEAD
<<<<<<< HEAD
      // console
      console.log('else', this.state.selectedTags);
||||||| merged common ancestors
      // console
||||||| merged common ancestors
      const newSelectedTagObj = Object.assign({}, this.state.selectedTags);
      newSelectedTagObj[tag].push(tagItem);
      this.setState({ selectedTags: newSelectedTagObj });

<<<<<<< HEAD
<<<<<<< HEAD
=======
      clickedArray[tag].push(tagItem);
      this.setState({ selectedTags: clickedArray });
<<<<<<< HEAD
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
      console.log('else', this.state.selectedTags)
=======
||||||| merged common ancestors
      // console
=======
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
      // console
=======
>>>>>>> feat($launchpad): add route for new users
      console.log('else', this.state.selectedTags)
>>>>>>> feat($launchpad): add route for new users
||||||| merged common ancestors
||||||| merged common ancestors
      // console
=======
>>>>>>> feat($launchpad): add route for new users
      console.log('else', this.state.selectedTags)
=======
>>>>>>> fix($launchpad): fix merge code and cleaned up console logs
    }
  }

  getTagsData() {
    return axios.get('/api/tags')
      .then((results) => {
        this.setState({
          tagData: results.data
        });
        return results;
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

<<<<<<< HEAD
  postSelectedTags(submittedTags) {
    console.log('submited posted tags', submittedTags);
    return axios.post('/api/selectedTags', submittedTags)
      .then(res => console.log('submited posted tags', submittedTags))
      .then(() => alert('We got your results! Thanks'))
      .catch(error => console.error('error posting submitted tags'));
||||||| merged common ancestors
  postSelectedTags(submittedTags) {
    console.log('submited posted tags', submittedTags)
    return axios.post('/api/selectedTags', submittedTags)
      .then(res => console.log('submited posted tags', submittedTags))
      .then(alert("We got your results! Thanks"))
      .catch(error => console.error('error posting submitted tags'))
=======
  getSubmittedLaunchPadTags(submittedTags) {
    return axios.get('/api/selectedData')
      .then((results) => {
        this.setState({
          tagData: results.data
        });
        return results;
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

  postSelectedTags(submitTags, currentUser) {

    let flattenedTags = [];
    for (let tag in submitTags) {
      flattenedTags.push(submitTags[tag])
    }
    submitTags = flattenedTags.reduce((a,b) => a.concat(b));

    const submitData = Object.assign({ submitTags, currentUser });
    console.log('SUBMIT TAG', submitData)

    return axios.post('/api/selectedTags', submitData)
      .then(res => console.log('submitted posted tags', submitData))
      .then(alert("We got your results! Thanks"))
      .catch(error => console.error('error posting submitted tags'))
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <LaunchPad
          tags={this.state.tagData}
          selectedTags={this.state.selectedTags}
||||||| merged common ancestors
        <LaunchPad 
          tags={this.state.tagData} 
          selectedTags={this.state.selectedTags} 
=======
        <LaunchPad 
          user={this.props.auth.user} 
          tags={this.state.tagData} 
          selectedTags={this.state.selectedTags} 
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
          isSelected={this.isSelected}
          selectItem={this.selectItem}
          postSelectedTags={this.postSelectedTags}
        /></div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(LaunchPadWrapper);
