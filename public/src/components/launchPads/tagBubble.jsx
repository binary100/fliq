import React from 'react';
import Anime from 'react-anime';


// const activeBubble = "tag-bubble-active";
// const defaultBubble = "tag-bubble-default";

// let selectedTagArray = [];
// const TagBubble = () => {
class TagBubble extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props('toggle'))
    // this.toggleSelect = this.toggleSelect.bind(this);
    // this.click = this.click.bind(this);
  }

  // click(tag){
  //   this.currentSelect(tag);
  //   this.collectTags(tag);
  // }

  // currentSelect(tag) {
  //   if (this.state.selected === '') {
  //     this.setState({selected : tag});
  //   } else {
  //     this.setState({})
  //   }
  // }

  // collectTags(tag) {
  //   // if (this.state.selected)
  //   console.log('current state:', this.state)
  //   if (this.state.collectedTags.indexOf(tag) > -1) {
  //     console.log("hit IF")
  //     // let index = this.state.collectedTags.indexOf(tag);
  //       // let collectedTags = this.state.collectedTags[tag].filter((_, i) => i !== index)
  //       this.setState(this.state.collectedTags.push([tag]))
  //     // })
  //   } else {
  //     console.log("hit ELSE", [tag])
  //     this.state.collectedTags = [tag]
      
  //     this.setState({ collectedTags:   });

  //     console.log('else:', this.state)
  //   }

  //   // this.setState(this.state.collectedTags = this.state.collectedTags.push(tag))
  // }

  // <div className="tag-bubble"/>
  // toggleSelect(tag) {
  //   return 'tag-bubble '+((tag===this.state.selected) ? 'tag-bubble-active' : 'tag-bubble-default');
  //   // return (this.props.selectedTags[tag].indexOf(tagItem) > -1) ? 'tag-bubble tag-bubble-active' : 'tag-bubble tag-bubble-default';
  // }



// 
  render() {
    return (
      <Anime 
        delay={(e, i) => i * 100} 
        duration={[2000]} 
        translateX={['-50rem', '0rem']}
      >
        <div 
          className={this.props.isSelected(this.props.tag, this.props.tagItem)}
          onClick={() => this.props.selectItem(this.props.tagItem, this.props.tag)}
        >
          <div className="tag-text"> {this.props.tagItem} </div> 
        </div>
      </Anime>
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
