import React from 'react';
import TagBubble from './tagBubble.jsx';

const LaunchPadTags = ({tagArray}) => {
  console.log("tagArray", tagArray)

  return (
    <div className="launchPadPage">

      <div>
        <button>Next</button>
        <button>Prev</button>
      </div>

      <div>
        {tagArray.map((tagItem, index) => <TagBubble key={tagItem.index} tagName={tagItem} />)}
      </div>
    </div>
  );
}

export default LaunchPadTags