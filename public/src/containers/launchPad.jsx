import React from 'react';
import LaunchPadTags from '../components/launchPads/launchPadTags.jsx';

const LaunchPad = ({ tags }) => {
    // console.log('launchPad Tags: ', tags);
    return (
      <div>
        <h1>LaunchPad</h1>
        <LaunchPadTags tagName={tags.actor} />
        <LaunchPadTags tagName={tags.director} />
        <LaunchPadTags tagName={tags.genre} />
        <LaunchPadTags tagName={tags.rated} />
        <LaunchPadTags tagName={tags.year} />
      </div>
    );
};

// { Object.keys(tags).map(tag => <LaunchPadTags key={tags}  /> )}


export default LaunchPad;
