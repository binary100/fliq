import React from 'react';
import Anime from 'react-anime';

const randTime = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
const randMove = Math.floor(Math.random() * (100 + (-100)) + (-100));

const TagBubble = ({tagName}) => {
  
    <div className="tag-bubble"/>
  

  return (
      <Anime delay={(e, i) => i * 100} duration={[2000]} translateX={['-50rem', '0rem']} >
         <div className="tag-bubble">
          <div className="tag-text">{tagName}</div> 
         </div>
      </Anime>
  );
};

export default TagBubble;

 // targets= ['.tag-bubble']
 // translateX={['13rem']}
 // rotate={[180]}
 // borderRadius={'8px'}
 // duration={2000}
 // loop={true} >

// var myAnimation = anime({
//   targets: ['.blue', '.green'],
//   translateX: '13rem',
//   rotate: 180,
//   borderRadius: '8px',
//   duration: 2000,
//   loop: true
// });
