import React from 'react';

const openClass = 'hamburger hamburger-open';
const closedClass = 'hamburger hamburger-closed';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      elementClass: 'hamburger'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const isOpen = !this.state.isOpen;
    const newClass = isOpen ? openClass : closedClass;
    this.setState({
      isOpen,
      elementClass: newClass
    });
    this.props.toggleSideMenu();
  }

  render() {
    return (
      <div
        className={this.state.elementClass}
        onClick={this.handleClick}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }
};

export default Hamburger;
