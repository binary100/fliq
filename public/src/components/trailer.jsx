import React from 'react';

const youtubeUrl = 'https://www.youtube.com/embed/';
 
const Trailer = ({ trailer }) => (
  <div className="col-sm-6">
    <div className="embed-responsive embed-responsive-16by9 trailer">
      <iframe
        className="embed-responsive-item"
        src={trailer ? youtubeUrl + trailer.id.videoId : ''}
        allowFullScreen
      />
    </div>
  </div>
);

export default Trailer;