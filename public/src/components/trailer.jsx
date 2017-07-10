import React from 'react';

const youtubeUrl = 'https://www.youtube.com/embed/';

const Trailer = ({ trailer }) => (
  <div>
    <iframe
      className="embed-responsive-item"
      src={trailer ? youtubeUrl + trailer.id.videoId : ''}
      allowFullScreen
    />
  </div>
);

export default Trailer;