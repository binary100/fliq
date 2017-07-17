import React from 'react';
import TagBubble from './tagBubble.jsx';

class LaunchPadTags extends React.Component {

  constructor(props) {
    super(props)
    console.log("tagArray", this.props.tagArray)
    console.log(props)
  }

  goToNext() {
    if (this.props.step < 3) {
      this.props.setStep(this.props.step + 1);
    }
  }

  goToPrev() {
    if (this.props.step > 1) {
      console.log("set state")
      this.props.setStep(this.props.step - 1);
    }
  }

  render() {
    return (
      <div className="launchPadPage">

        <div className="launchPadControls pull-left">
          <button className="pull-right" onClick={this.goToNext.bind(this)}>Next</button>
          <button className="pull-left" onClick={this.goToPrev.bind(this)}>Prev</button>
        </div>

        <div className="pull-left">
          {this.props.tagArray.map((tagItem, index) => 
            <TagBubble key={index} tagName={tagItem} />)
          }
        </div>
      </div>
    );
  }
}

export default LaunchPadTags