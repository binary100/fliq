import React from 'react';
import { InputGroup, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import SearchResultsTable from '../components/searchResultsTable.jsx';
import LargeMovieTile from '../components/largeMovieTile.jsx';
import ReactDOM from 'react-dom'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      allowNew: false,
      multiple: false,
      options: [],
      searchResults: [],
      selectedMovie: null
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.selectSmallTile = this.selectSmallTile.bind(this);
  }

  componentDidMount() {
    this.handleSearch('transformers');
  }

  handleSearch(query) {
    axios.post('/api/search', {
      movieName: query
    })
      .then(results => {
        console.log('Received: ', results.data);
        const autoCompleteStrings =
          results.data.map(movie =>
            `${movie.title} (${movie.year})`
          );
        this.setState({
          searchResults: results.data,
          options: autoCompleteStrings
        });
        this.selectSmallTile(null, null, results.data[0]);
      })
      .catch(err => console.error('Error with search:', err));
  }

  selectSmallTile(e, evt, movie) {
    console.log('Selecting: ', movie);
    axios.post('/api/movie/select', {
      movie
    })
    .then((results) => {
      console.log('selectSmallTile receied: ', results.data);
      this.setState({ selectedMovie: results.data });
      // const node = ReactDOM.findDOMNode(this.mainTile);
      // node.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(err => console.error(err));
  }

  renderMenuItemChildren(option) {
    return (
      <span>{option}</span>
    );
  }

  render() {
    const largeTile = this.state.selectedMovie
      ? <LargeMovieTile movie={this.state.selectedMovie} />
      : null;

    return (
      <div ref={(el) => { this.mainTile = el; }} className="container">
        <div>
          <h3>
            Search
          </h3>
        </div>
        <div>
            <div>
              <div>
                <div>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>
                          Movie name
                        </InputGroup.Addon>
                        <AsyncTypeahead
                          options={this.state.options}
                          onSearch={this.handleSearch}
                          placeholder="Type in a movie you love"
                          renderMenuItemChildren={this.renderMenuItemChildren}
                        />
                        <InputGroup.Button>
                          <Button onClick={this.handleSearch}>Go</Button>
                        </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
                </div>
              </div>
            </div>
        </div>
        <div>
          <SearchResultsTable
            selectSmallTile={this.selectSmallTile}
            movies={this.state.searchResults}
          />
          {largeTile}
        </div>
      </div>
    );
  }
}

export default Search;


/*
    <div>
            <SearchResultsTable
              selectSmallTile={this.selectSmallTile}
              movies={this.state.searchResults}
            />
          {largeTile}
        </div>
*/
