import React from 'react';
import { InputGroup, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import SearchResultsTable from '../components/searchResultsTable.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      allowNew: false,
      multiple: false,
      options: [],
      searchResults: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropDownSelect = this.handleDropDownSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(e) {
    console.log('Entering input change');
    console.log(e.target.value);
    this.setState({
      inputText: e.target.value
    });
    axios.get('/api/autocomplete')
      .then((results) => {
        console.log('Autocomplete: ', results);
      })
      .catch(err => console.error('Error in autocomplete', err));
  }

  handleDropDownSelect(searchType) {
    this.setState({ searchType });
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
      })
      .catch(err => console.error('Error with search:', err));
  }

  renderMenuItemChildren(option) {
    return (
      <span>{option}</span>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>
            Search
          </h3>
        </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>
                          Movie name
                        </InputGroup.Addon>
                        <AsyncTypeahead
                          options={this.state.options}
                          onSearch={this.handleSearch}
                          placeHolder="Type in a movie you love"
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
        <div className="row">
          <div>
            <SearchResultsTable movies={this.state.searchResults} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;


/*

<InputGroup.Button>
  <DropdownButton
    title="Dropdown"
    id="bg-vertical-dropdown-1"
    onSelect={this.handleDropDownSelect}
  >
    <MenuItem eventKey="Movie">Movie</MenuItem>
    <MenuItem eventKey="Genre">Genre</MenuItem>
    <MenuItem eventKey="Director">Director</MenuItem>
    <MenuItem eventKey="Actor">Actor</MenuItem>
  </DropdownButton>
</InputGroup.Button>

*/
