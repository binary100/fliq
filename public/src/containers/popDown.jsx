import React from 'react';


class PopDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationClass: 'popdown-slideDown'
    };
  }

  // This can only be used if the popDown is specific
  // to the subcomponent, since this method can't be passed down
  // With an unknown component
  hidePopDown() {
    this.setState({
      animationClass: 'popdown-slideUp'
    });
  }

  render() {

    return (
      <div className="container">
        <div className={`popdown ${this.state.animationClass}`}>
          {this.props.component}
        </div>
      </div>
    );
  }
}

export default PopDown;
