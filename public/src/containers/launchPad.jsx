import React from 'react';
import LaunchPadTags from '../components/launchPads/launchPadTags.jsx';
// import anime from 'animejs';


class LaunchPad extends React.Component{

  constructor(props) {
    super(props);
    console.log('LaunchPadWrapper', props);
    this.state = {
      step: 1,
      dummy: "dummy text"
    };
    console.log(this)
    // this.getTagsData();
  }

  setStep (step) {
    console.log(step);
    console.log(this)
    this.setState({step: step})
  }

  render() {

    console.log('launchPad Tags: ', this.props.tags);
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
          <h1>{tag}</h1>
          <LaunchPadTags tagArray={this.props.tags[tag]} 
            step={this.state.step} setStep={this.setStep.bind(this)}/>
          {this.state.step === 3 ? <button>Submit</button> : '' }
            

        </div>
      </div>
    )
  }
};

// <LaunchPadTags tagName={tags.director} />
// <LaunchPadTags tagName={tags.genre} />
// <LaunchPadTags tagName={tags.rated} />
// <LaunchPadTags tagName={tags.year} />



export default LaunchPad;
