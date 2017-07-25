import React from 'react';
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
        <div className="container container-fluid text-center">
          <h1>{tag}</h1>

          <div className="test-scale">
            <div className="test-badge-box">
              <div id="launchPad-1" className="sprite"></div>
            </div>

            <div className="test-badge-box">
              <div id="launchPad-2" className="sprite"></div>
            </div>

            <div className="test-badge-box">
              <div id="launchPad-3" className="sprite"></div>
            </div>

            <div className="test-badge-box">
              <div id="launchPad-4" className="sprite"></div>
            </div>
          </div>

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
