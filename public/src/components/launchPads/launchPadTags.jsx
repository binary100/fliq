import React from 'react';
import TagBubble from './tagBubble.jsx';


class LaunchPadTags extends React.Component {

  constructor(props) {
    super(props)
    console.log("LaunchPadTags Props:", this.props)
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
            <button className="btn btn-default btn-spacing" onClick={this.goToPrev.bind(this)}>Prev</button>
            <button className="btn btn-primary btn-spacing" onClick={this.goToNext.bind(this)}>Next</button>
            { this.props.step === 3 ? <button onClick={this.props.postSelectedTags(this.props.selectedTags)} className="btn btn-success btn-spacing">Submit</button> : '' }
          </div>
        </div>

        <div className="pull-left">
          {this.props.tagArray.map((tagItem, index) => 
            <TagBubble key={index} tagName={tagItem} />)
            // <TagBubble className={this.props.isSelected(this.props.tag, tagItem)} key={index} tagName={tagItem} onClick={this.props.selectItem(this.props.tag, tagItem)} />)
          }
        </div>
      </div>
    );
  }
}






export default LaunchPadTags

