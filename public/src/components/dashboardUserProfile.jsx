import React from 'react';
import ToggleSwitch from './toggleSwitch.jsx';

const DashboardUserProfile = ({ user, changeUserReViewSetting, reViewSetting }) => (
  <div className="row">
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12">
          <h3>Profile</h3>
        </div>
      </div>
      <div className="user-profile-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="media">
              <div className="media-left">
                <img className="media-object"
                  src={user ? user.picture : ''}
                />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{user ? user.name : ''}</h4>
                <p>{user ? user.email : ''}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ToggleSwitch
              changeUserReViewSetting={changeUserReViewSetting}
              reViewSetting={reViewSetting}
            />
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default DashboardUserProfile;
