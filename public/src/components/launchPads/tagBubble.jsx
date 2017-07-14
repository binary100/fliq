import React from 'react';

const TagBubble = ({tagName}) => {
  // console.log('tagbubble:', tagName);
  return (
      <div className="tag">{tagName}</div>
  );
};

export default TagBubble;