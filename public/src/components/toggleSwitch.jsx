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
          Include Viewed Movies
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(ToggleSwitch);
