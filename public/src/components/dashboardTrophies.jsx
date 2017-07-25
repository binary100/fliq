import React from 'react';

const DashboardTrophies = props => (
  <div className="trophies-box">
    {props.trophies.map(trophyString => <div className="trophy" id={trophyString}>{trophyString}</div>)}
  </div>
);

export default DashboardTrophies;
