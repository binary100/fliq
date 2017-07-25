import React from 'react';

let count = 0;
const DashboardTrophies = props => (
  <div className="trophies-box badgeList">
    <div >
      {props.trophies.sort((a,b) => a - b).map(trophyString =>
        (<div className="trophy">
          <div key={count+=1} id={trophyString} className="sprite"></div>
        </div>)
      )}
    </div>
  </div>
);

export default DashboardTrophies;

/*
<div className="test-badge-box">
  <div id="noob-2" className="sprite"></div>
</div>

*/