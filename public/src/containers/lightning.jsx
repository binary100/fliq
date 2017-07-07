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
        {this.props.movies.map(movie =>
          (<LightningTile
            handleLightningTileClick={this.props.handleLightningTileClick}
            movie={movie}
          />)
        )};
      </div>
    );
  }
}

export default Lightning;
