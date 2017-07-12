import React from 'react';
import { InputGroup, DropdownButton, Button, MenuItem, FormControl, FormGroup } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class Teach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      searchResults: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropDownSelect = this.handleDropDownSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(e) {
    console.log(e.target.value);
    this.setState({
      inputText: e.target.value
    });
    //axios.get
  }

  handleDropDownSelect(searchType) {
    this.setState({ searchType });
  }

  handleSearch() {
    axios.post('/api/superlike', {
      movieName: this.state.inputText
    })
      .then(results => this.setState({ searchResults: results.data }))
      .catch(err => console.error('Error with superlike:', err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          Tell FlickPick what kinds of movies interest you
        </div>
          <div className="row">
            <div className="col-sm-10">
              <div className="row">
                <div>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>
                          Movie name
                        </InputGroup.Addon>
                        <AsyncTypeahead
                          onChange={this.handleInputChange}
                          placeHolder="Type in a movie you love"
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
        </div>
      </div>
    );
  }
}

export default Teach;


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
