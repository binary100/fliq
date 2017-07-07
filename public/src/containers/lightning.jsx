import React from 'react';
import LightningTile from '../components/lightningTile.jsx';

let tileIndex = 0;

class Lightning extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.movies.map(movie => {
          console.log('Movie is: ', movie);
          return (<LightningTile
            key={tileIndex += 1}
            handleLightningTileClick={this.props.handleLightningTileClick}
            movie={movie}
          />)
          }
        )};
      </div>
    );
  }
}

export default Lightning;
