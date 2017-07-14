import React from 'react';
import TagBubble from './tagBubble.jsx';

const LaunchPadTags = ({tagName}) => {
  // console.log('LaunchPadTagNames:', tagName)
  return (
    <div className="launchPadPage">
      <h1>Tag</h1>
      {tagName.map(tagItem => <TagBubble key={tagItem} tagName={tagItem} />)}
    </div>
  );
}

export default LaunchPadTags