import React from 'react';
import axios from 'axios';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: null,
      author: null,
      intervalId: null
    };
  }

  componentWillMount() {
    this.getQuote();
    // this.createQuoteInterval();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getQuote() {
    axios.get('/api/quote')
      .then((results) => {
        this.setState({
          quote: results.data.quote,
          author: results.data.author
        });
      })
      .catch(err => console.err('Error getting quote: ', err));
  }

  createQuoteInterval() {
    const intervalId = setInterval(() => {
      this.setState({
        quote: null,
        author: null
      });
      this.getQuote();
    }, 5000);
    this.setState({ intervalId });
  }

  render() {
    return (
      <div>
        <div className={this.state.quote ? 'quote-box-visible' : 'quote-box-invisible' }>
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
