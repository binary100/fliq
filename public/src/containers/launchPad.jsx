import React from 'react';
import LaunchPadTags from '../components/launchPads/launchPadTags.jsx';
// import anime from 'animejs';


const LaunchPad = ({ tags }) => {
    console.log('launchPad Tags: ', tags);
    return (
          <div>
            {Object.keys(tags).map((tag,index) => {

              return (
                <div key={tag.index}>
                  <h1>{tag}</h1>
                  <LaunchPadTags tagArray={tags[tag]} />
                </div>
                )
            })}
          </div>
    )
};

// <LaunchPadTags tagName={tags.director} />
// <LaunchPadTags tagName={tags.genre} />
// <LaunchPadTags tagName={tags.rated} />
// <LaunchPadTags tagName={tags.year} />



export default LaunchPad;
