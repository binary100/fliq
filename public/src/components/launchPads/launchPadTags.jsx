import React from 'react';
import TagBubble from './tagBubble.jsx';
import { Link } from 'react-router-dom';
// import Anime from 'react-anime';

let bubbleCount = 0;
class LaunchPadTags extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}

    // this.parallax = this.parallax.bind(this.scene)
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
        <div className="launchPad-Controls">
          <div className="launchPad-description">
            { (this.props.step === 1) ?
              <p>Let us know which genres you prefer. Choose as many as you like!</p> 
              : null
            }
            { (this.props.step === 2) ?
              <p>Select some directors you're a fan of. Choose as many as you like! Feel free to skip this portion by clicking next.</p> 
              : null
            }
            { (this.props.step === 3) ?
              <p>Select some actors you're a fan of. Choose as many as you like! Feel free to skip this portion by clicking next.</p> 
              : null
            }
          </div>

          <div>
            <div>
              { this.props.step === 1 ? 
                <button className="btn btn-default btn-spacing disabled" >Prev</button> :
                <button className="btn btn-default btn-spacing" onClick={this.goToPrev}>Prev</button>
              }

              { this.props.step === 3 ? 
                null :
                <button className="btn btn-default btn-spacing" onClick={this.goToNext}>Next</button>
              }

              { this.props.step === 3 ? 
                <Link to="/">
                  <button
                    onClick={() => this.props.postSelectedTags(this.props.selectedTags, this.props.user)}
                    className="btn btn-success btn-spacing"
                  >
                    Submit
                  </button>
                </Link> 
                : null
              }

            </div>

          </div>
          </div>
        <div className="tag-bubble-box pull-left">



          <div>
            {this.props.tagArray.map(tagItem => 
              (<TagBubble
                user={this.props.user}
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
      </div>
    );
  }
}

export default LaunchPadTags

