import React from 'react';


class PopDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container">
        <div className="popdown popdown-slideDown">
          {this.props.component}
        </div>
      </div>
    );
  }
}

export default PopDown;
