import React from 'react';
import Anime from 'react-anime';

class TagBubble extends React.Component {

  constructor(props) {
    super(props);
  }

// 
  render() {
    return (
      <Anime 
        delay={(e, i) => i * 100} 
        duration={[2000]} 
        translateX={['-50rem', '0rem']}
      >
        <div 
          className={this.props.isSelected(this.props.tag, this.props.tagItem[0])}
          onClick={() => this.props.selectItem(this.props.tagItem[0], this.props.tag)}
        >
          <div className="tag-text"> {this.props.tagItem[1]} </div> 
        </div>
      </Anime>
    )
  }

};

export default TagBubble;
