import React from 'react';
import { connect } from 'react-redux';
import LoginSplash from '../components/loginSlash.jsx';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Welcome Component</h3>
        <button onClick={}>
          Log In With Google
        </button>
        <button onClick={}>
          Log In With Facebook
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

const Welcome = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSplash);

export default Welcome;
