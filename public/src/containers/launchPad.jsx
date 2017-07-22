import React from 'react';
import LaunchPadTags from '../components/launchPads/launchPadTags.jsx';

class LaunchPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
    this.setStep = this.setStep.bind(this);
    console.log('LaunchPad Props: ', props);
  }

  setStep(step) {
    this.setState({ step });
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
        tag = 'genre';
    }

    return (
      <div>
        <div className="container container-fluid text-center">
          <h1>{tag}</h1>
<<<<<<< HEAD
          <LaunchPadTags
||||||| merged common ancestors
          <LaunchPadTags 
=======
          <LaunchPadTags 
            user={this.props.user}
>>>>>>> feat($launchpad $server): add api routes to update view and picks count
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
    );
  }
}

export default LaunchPad;
