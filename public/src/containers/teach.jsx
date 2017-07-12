import React from 'react';

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
                <div className="col-lg-6">
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button
                        type="button"
                        className="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                          Action
                          <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </div>
                    <input type="text" className="form-control" aria-label="..." />
                  </div>
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
