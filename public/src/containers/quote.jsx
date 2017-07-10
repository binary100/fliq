import React from 'react';
import axios from 'axios';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    };
  }

  componentWillMount() {
    axios.get('/api/quote')
      .then((results) => {
        console.log
        this.setState({
          quote: results.data.quote,
          author: results.data.author
        });
      })
      .catch(err => console.err('Error getting quote: ', err));
  }

  render() {
    return (
      <div>
        <div>{this.state.quote}</div>
        <div>{this.state.author}</div>
      </div>
    );
  }
}

export default Quote;
