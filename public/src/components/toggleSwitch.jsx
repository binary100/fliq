import React from 'react';
import { connect } from 'react-redux';


class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.props.toggleUserReview}
            value={this.props.review} />
          <span className="slider round"></span>
          <label className="toggle-switch-label col-lg-6">Toggle Switch</label>
        </label>
      </div>
    )
  }
}

export default ToggleSwitch;
