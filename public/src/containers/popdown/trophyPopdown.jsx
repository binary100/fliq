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
        <div>
          { this.props.trophies &&
            this.props.trophies.map(str => <div>You got the {str} trophy!</div>)
          }
        </div>
        <span style={{ cursor: 'pointer' }} onClick={this.props.close}>Close</span>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  show: state.trophyReducer.show,
  trophies: state.trophyReducer.trophies
});

const mapDispatchToProps = dispatch => ({
  close: () => { dispatch(closeTrophyPopdown()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrophyPopdown);
