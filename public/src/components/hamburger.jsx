import React from 'react';
import { connect } from 'react-redux';

const Hamburger = props => (
  <div
    className={props.hamburgerClass}
    onClick={props.toggleSideMenu}
  >
    <div />
    <div />
    <div />
  </div>
);

const mapStateToProps = state => ({
  isOpen: state.sideMenuReducer.showSideMenu,
  hamburgerClass: state.sideMenuReducer.hamburgerClass
});

export default connect(
  mapStateToProps,
  null
)(Hamburger);
