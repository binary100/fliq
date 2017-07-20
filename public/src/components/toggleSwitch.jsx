import React from 'react';


const ToggleSwitch = ({ changeUserReViewSetting, reViewSetting }) => {
  return (
    <div>
      {reViewSetting ?
        <label className="switch">
          <input
            type="checkbox"
            onChange={changeUserReViewSetting}
            checked
          />
            <span className="slider round"></span>
          <label className="toggle-switch-label col-lg-6">Show Watched Movies</label>
        </label> :
        <label className="switch">
          <input
            type="checkbox"
            onChange={changeUserReViewSetting}
          />
            <span className="slider round"></span>
          <label className="toggle-switch-label col-lg-6">Show Watched Movies</label>
        </label>
      }
    </div>
  )
}

export default ToggleSwitch;
