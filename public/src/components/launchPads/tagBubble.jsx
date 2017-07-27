import React from 'react';
import PropTypes from 'prop-types';
// import Anime from 'react-anime';
import classNames from 'classnames';

// TagBubble.propTypes = {
//   user: PropTypes.object.isRequired
// }

class TagBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const genre = this.props.tag;
    const tagId = this.props.tagItem.id;
    const tagClassNames = classNames({
      'tag-bubble': true,
      'tag-bubble-active': this.props.selectedTags[genre].includes(tagId),
      'tag-bubble-default': !this.props.selectedTags[genre].includes(tagId)
    });
    return (
      // <Anime
      //   delay={(e, i) => i * 100}
      //   duration={[2000]}
      //   translateX={['-50rem', '0rem']}
      // >
      <div
        className={tagClassNames}
        onClick={() => this.props.selectItem(this.props.tagItem.id, this.props.tag)}
      >
        <div className="tag-text"> {this.props.tagItem.tagName} </div>
      </div>


      // </Anime>
    );
  }

}

export default TagBubble;
