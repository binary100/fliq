import React from 'react';
import { InputGroup, DropdownButton, Button, MenuItem, FormControl, FormGroup } from 'react-bootstrap';

class Teach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'Movies',
      inputText: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    });
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
                        <InputGroup.Button>
                          <DropdownButton title="Dropdown" id="bg-vertical-dropdown-1">
                            <MenuItem eventKey="1">Movies</MenuItem>
                            <MenuItem eventKey="2">Genres</MenuItem>
                          </DropdownButton>
                        </InputGroup.Button>
                        <FormControl type="text" />
                        <InputGroup.Button>
                          <Button>Go</Button>
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
