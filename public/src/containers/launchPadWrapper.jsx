import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: {},
      selectedTags: {
        actor: [],
        director: [],
        genre: []
        // rated: [],
        // year: []
      }
    };
    this.isSelected = this.isSelected.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentWillMount() {
    this.getTagsData();
  }

  getTagsData() {
    return axios.get('/api/tags')
      .then((results) => {
        console.log('Returned Tags: ', results.data);
        this.setState({
          tagData: results.data
        });
      })
      .catch(err => console.error('Error retrieving movies: ', err));
  }

  isSelected(tag, tagItem) {
    return (this.state.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble tag-bubble-active' : 'tag-bubble tag-bubble-default';
  }

  selectItem(tagItem, tag) {
    const clickedTagItemObject = this.state.selectedTags;
    console.log('clickedTagItemObject', clickedTagItemObject);

    if (clickedTagItemObject[tag].indexOf(tagItem) > -1) {
      // TURN OFF CLICK
      const index = clickedTagItemObject[tag].indexOf(tagItem);

      const selectTagsFilter = clickedTagItemObject[tag];
      selectTagsFilter.splice(index, 1);
      console.log('After: ', selectTagsFilter);
      const newSelectedTags = this.state.selectedTags;
      newSelectedTags[tag] = selectTagsFilter;

      this.setState({ selectedTags: newSelectedTags });
    } else {
      // TURN ON CLICK
      clickedTagItemObject[tag].push(tagItem);

      this.setState({ selectedTags: clickedTagItemObject });
      console.log('Turning ON click state for:', this.state.selectedTags);
    }
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
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(LaunchPadWrapper);
