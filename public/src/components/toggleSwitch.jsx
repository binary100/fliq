import React from 'react';

const toggleSwitchTrueClass = "input:checked + .slider";
const toggleSwitchFalseClass = "input:"

const ToggleSwitch = ({ changeUserReViewSetting, reViewSetting }) => {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={changeUserReViewSetting}
          value={reViewSetting} />
        <span className="slider round"></span>
        <label className="toggle-switch-label col-lg-6">Show Watched Movies</label>
      </label>
    </div>
  )
}

export default ToggleSwitch;
