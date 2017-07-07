import React from 'react';
import LightningTile from '../components/lightningTile.jsx';

class LightningWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>LightningWrapper</h3>
        <LightningTile />
        <LightningTile />
      </div>
    );
  }
}

export default LightningWrapper;