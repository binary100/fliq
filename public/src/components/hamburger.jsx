import React from 'react';
import { connect } from 'react-redux';

const openClass = 'hamburger hamburger-open';
const closedClass = 'hamburger hamburger-closed';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementClass: 'hamburger'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const newClass = this.props.isOpen ? openClass : closedClass;
    this.setState({
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
}

const mapStateToProps = state => ({
  isOpen: state.sideMenuReducer.showSideMenu
});

export default connect(
  mapStateToProps,
  null
)(Hamburger);
