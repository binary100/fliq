import React from 'react';


const ToggleSwitch = ({ toggleUserReview, review }) => {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleUserReview}
          value={review} />
        <span className="slider round"></span>
        <label className="toggle-switch-label col-lg-6">Toggle Switch</label>
      </label>
    </div>
  )
}

export default ToggleSwitch;
