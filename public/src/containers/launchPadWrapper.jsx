import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import LaunchPad from './launchPad.jsx';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { showTrophyPopdown } from '../actions/actions.js';

class LaunchPadWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: null,
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
    this.postSelectedTags = this.postSelectedTags.bind(this);
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

  postSelectedTags(submitTags, currentUser) {
    const flattenedTags = [];
    for (let tag in submitTags) {
      flattenedTags.push(submitTags[tag]);
    }
    submitTags = flattenedTags.reduce((a, b) => a.concat(b));
    console.log('SUBMIT TAG', submitTags);
    return axios.post('/api/selectedTags', submitTags)
      .then((res) => {
        if (res.data.trophy.length > 0) {
          console.log('trophy is: ', res.data.trophy);
          this.props.showTrophyPopdown(res.data.trophy);
        }
      })
      .catch(error => console.error('error posting submitted tags: ', error));
  }

  render() {
    return (
      <div>
        {this.state.tagData && <LaunchPad
          user={this.props.auth.user}
          tags={this.state.tagData}
          selectedTags={this.state.selectedTags}
          isSelected={this.isSelected}
          selectItem={this.selectItem}
          postSelectedTags={this.postSelectedTags}
        />}</div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  showTrophyPopdown: (trophies) => { dispatch(showTrophyPopdown(trophies)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchPadWrapper);
