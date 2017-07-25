import React from 'react';

const DashboardTrophies = props => (
  <div className="col-lg-6">
    {props.trophies.map(trophyString => <div id={trophyString}>{trophyString}</div>)}
  </div>

);

export default DashboardTrophies;
