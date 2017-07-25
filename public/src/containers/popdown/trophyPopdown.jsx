import React from 'react';
import { connect } from 'react-redux';
import { closeTrophyPopdown } from '../../actions/actions.js';

class TrophyPopdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div className={`popdown ${this.props.show ? 'popdown-slideDown' : 'popdown-slideUp'}`}>
        { this.props.trophies &&
          this.props.trophies.map(str => <div>You got the {str} trophy!</div>)
        }
      </div>
    );
  }

}

const mapStateToProps = props => ({
  show: state.trophyReducer.showPopdown,
  trophies: state.trophyReducer.trophy
});

const mapDispatchToProps = dispatch => ({
  close: () => { dispatch(closeTrophyPopdown()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrophyPopdown);
