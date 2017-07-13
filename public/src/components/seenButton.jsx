import React from 'react';
import { Button } from 'react-bootstrap';

class SeenButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Saw It',
      isLiked: false,
      isProcessing: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // Handle the state with the promise returned by upper level method
    this.setState({ text: 'Processing...' });
    setTimeout(() => {
      this.setState({ text: 'Saved!' });
    }, 1500);
  }


  // handle click and transmit
  // receive method from higher up?
  // use a binding to establish input?

  render() {
    return (
      <Button
        className="col-sm-10 small-tile-button"
        onClick={this.handleClick}
      >
        { this.state.text }
      </Button>
    );
  }
}

export default SeenButton;
