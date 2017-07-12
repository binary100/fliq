import React from 'react';

class Teach extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          Tell FlickPick what kinds of movies interest you
        </div>

        <div className="row">
          <div className="col-sm-10">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon3">Teach FlickPick about: </span>
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
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
