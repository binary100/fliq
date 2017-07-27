import React from 'react';
import BadgeList from '../components/launchPads/badgelist.jsx';
import LaunchPadTags from '../components/launchPads/launchPadTags.jsx';

class LaunchPad extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
    this.setStep = this.setStep.bind(this);
  }

  setStep (step) {
    this.setState({step: step})
  }

  render() {

    let tag = '';
    switch (this.state.step) {
      case 1:
        tag = 'genre';
        break;
      case 2:
        tag = 'director';
        break;
      case 3:
        tag = 'actor';
        break;
      default:
        tag = 'genre'
    }

    return (
      <div>
        <div>
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
        </div>


        
        <BadgeList />

        <div className="container container-fluid text-center">
          <h1>{tag}</h1>
          <LaunchPadTags 
            user={this.props.user}
            tag={tag}
            tagArray={this.props.tags[tag]}
            step={this.state.step}
            setStep={this.setStep}
            selectedTagArray={this.props.selectedTags[tag]}
            selectedTags={this.props.selectedTags}
            postSelectedTags={this.props.postSelectedTags}
            isSelected={this.props.isSelected}
            selectItem={this.props.selectItem}
          />
        </div>
      </div>
    )
  }
};



export default LaunchPad;
