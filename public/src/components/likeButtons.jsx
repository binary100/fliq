import React from 'react';

const LikeButtons = ({ likeButtonClass, dislikeButtonClass, likeMovie, dislikeMovie}) => (
  <div className="like-buttons">
    <div className="col-sm-6">
      <LoadingButton
        buttonClass={likeButtonClass}
        handleClick={likeMovie}
      />
    </div>
    <div className="col-sm-6">
      <LoadingButton
        buttonClass={dislikeButtonClass}
        handleClick={dislikeMovie}
      />
    </div>
  </div>
);

export default LikeButtons;
