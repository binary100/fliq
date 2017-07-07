import React from 'react';

const LightningHeader = props => (
  <div className="lightning-header">
    <h3>Lightning Header</h3>
    <h2>Time remaining: {props.timer}</h2>
  </div>
);

export default LightningHeader;
