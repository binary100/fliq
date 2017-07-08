import React from 'react';
import LightningTile from '../components/lightningTile.jsx';

let tileIndex = 0;

class Lightning extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendering movies: ', this.props.movies);
    return (
      <div>
        {this.props.movies.map(movie =>
          (<LightningTile
            key={tileIndex += 1}
            handleLightningTileClick={this.props.handleLightningTileClick}
            movie={movie}
          />)
        )};
      </div>
    );
  }
}

export default Lightning;
