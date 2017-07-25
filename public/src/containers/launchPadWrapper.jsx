import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

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
  }

  componentWillMount() {
    // this.getUserInfo();
    this.getTagsData();
  }

  isSelected(tag, tagItem) {
     return (this.state.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble tag-bubble-active' : 'tag-bubble tag-bubble-default';
  }
 
  selectItem(tagItem, tag) {
    const clickedTagItemObject = this.state.selectedTags;
    console.log('clickedTagItemObject', clickedTagItemObject)

    if ( clickedTagItemObject[tag].indexOf(tagItem) > -1 ) {
      // TURN OFF CLICK
      const index = clickedTagItemObject[tag].indexOf(tagItem);
      
      let selectTagsFilter = clickedTagItemObject[tag];
      selectTagsFilter.splice(index, 1);
      console.log('After: ', selectTagsFilter);
      let newSelectedTags = this.state.selectedTags;
      newSelectedTags[tag] = selectTagsFilter;
      
      this.setState({ selectedTags: newSelectedTags });
    } else {
      // TURN ON CLICK
      clickedTagItemObject[tag].push(tagItem);

      this.setState({ selectedTags: clickedTagItemObject });
      console.log('Turning ON click state for:', this.state.selectedTags)
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

  getSubmittedLaunchPadTags(submittedTags) {
    return axios.get('/api/selectedData')
      .then((results) => {
        console.log('Tags API Call', results.data);
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
  }

  render() {
    return (
      <div>
        <LaunchPad 
          user={this.props.auth.user} 
          tags={this.state.tagData} 
          selectedTags={this.state.selectedTags} 
          isSelected={this.isSelected}
          selectItem={this.selectItem} 
          postSelectedTags={this.postSelectedTags} 
        /></div>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null
)(LaunchPadWrapper);
