import React from 'react';
import { connect } from 'react-redux';


class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
          <label className="toggle-switch-label col-lg-6">Toggle Switch</label>
        </label>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(ToggleSwitch);
