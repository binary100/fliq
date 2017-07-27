import React from 'react';


class BadgeList extends React.Component {

  render() {
    return (
      <div className="badgeList">
        <div className="badge-box">
          <div className="badge newbie lvl1"></div>
        </div>

         <div className="badge-box">
          <div className="badge newbie lvl2"></div>
        </div>

         <div className="badge-box">
          <div className="badge newbie lvl3"></div>
        </div>

         <div className="badge-box">
          <div className="badge newbie lvl4"></div>
        </div>
      </div>

    );
  }
}

export default BadgeList

