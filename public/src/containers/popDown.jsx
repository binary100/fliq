import React from 'react';


class PopDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="popdown">
          {this.props.component}
        </div>
      </div>
    );
  }
}

export default PopDown;
