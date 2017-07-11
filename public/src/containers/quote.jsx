import React from 'react';
import axios from 'axios';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: null,
      author: null
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
        <div>
          <div className="quote">
            <h3>{this.state.quote ? `"${this.state.quote}"` : ''}</h3>
          </div>
          <div className="author">{this.state.author ? `-${this.state.author}` : ''}</div>
        </div>
      </div>
    );
  }
}

export default Quote;
