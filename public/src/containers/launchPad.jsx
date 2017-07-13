import React from 'react';
import LaunchPadGenres from '../components/launchPads/launchPadGenres.jsx';
import LaunchPadActors from '../components/launchPads/launchPadActors.jsx';

class LaunchPad extends React.Component {
  constructor(props) {
    super(props)
    console.log('launchPad props: ', props)
  };
  render() {
    return (
      <div>
        <h1>LaunchPad</h1>
        <LaunchPadActors tags={this.props.tags.actors} />
        <LaunchPadGenres tags={this.props.tags.genre} />
      </div>
    );
  };
};

export default LaunchPad;
