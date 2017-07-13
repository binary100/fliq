import React from 'react';

const DashboardUserProfile = ({ user }) => {
  return (
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
  )
}

export default DashboardUserProfile;
