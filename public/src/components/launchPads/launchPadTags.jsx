import React from 'react';
import TagBubble from './tagBubble.jsx';
import { Link } from 'react-router-dom';
// import Anime from 'react-anime';

let bubbleCount = 0;
class LaunchPadTags extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

    this.goToNext = this.goToNext.bind(this)
    this.goToPrev = this.goToPrev.bind(this)
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
        <div className="launchPad-controls">
          <div>
            <button className="btn btn-default btn-spacing" onClick={this.goToPrev}>Prev</button>
            <button className="btn btn-primary btn-spacing" onClick={this.goToNext}>Next</button>
              { this.props.step === 3 ? 
                <Link to="/"><button
                  onClick={() => this.props.postSelectedTags(this.props.selectedTags)} 
                  className="btn btn-success btn-spacing"
                >Submit</button></Link> : null
              }
          </div>
        </div>

        <div className="pull-left">

            {this.props.tagArray.map(tagItem => 
              (<TagBubble
                key={bubbleCount += 1}
                tagItem={tagItem}
                selectedTags = {this.props.selectedTags}
                tag={this.props.tag}
                isSelected={this.props.isSelected}
                selectItem={this.props.selectItem}
              />)
            )}

        </div>
      </div>
    );
  }
}

export default LaunchPadTags

