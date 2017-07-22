import React from 'react';
import Anime from 'react-anime';

class TagBubble extends React.Component {

  constructor(props) {
    super(props);
  }

// 
  render() {
    return (
      // <Anime 
      //   delay={(e, i) => i * 100} 
      //   duration={[2000]} 
      //   translateX={['-50rem', '0rem']}
      // >
        <div 
          className={this.props.isSelected(this.props.tag, this.props.tagItem[0])}
          onClick={() => this.props.selectItem(this.props.tagItem[0], this.props.tag)}
        >
          <div className="tag-text"> {this.props.tagItem[1]} </div> 
        </div>
      // </Anime>
    )
  }


// <div 
//   className={this.currentSelect(this.props.tagItem)} 
//   onClick={this.click.bind(this, this.props.tagItem)}
// >

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
