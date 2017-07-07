import React from 'react';
import LightningTile from '../components/lightningTile.jsx';

class Lightning extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Lightning Round</h3>
        <LightningTile movie={this.props.movies[0]} />
        <LightningTile movie={this.props.movies[1]} />
      </div>
    );
  }
}

export default Lightning;
