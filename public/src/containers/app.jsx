import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Welcome from './welcome.jsx';
import Results from './results.jsx';
import Header from '../components/header.jsx';
import LightningWrapper from './lightningWrapper.jsx';
import { loginUser } from '../actions/actions.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('In App ctor, props: ', props);
    axios.get('/account')
      .then((results) => {
        console.log('Received user data: ', results.data.user);
        if (results.data.user) {
          this.props.loginUser(results.data.user);
        }
      })
      .catch(err => console.error('Login failed: ', err));
  }

  render() {
    console.log('In App render, props is: ', this.props);
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Header user={this.props.auth.user}/>
            <div>
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/results" component={Results} />
                <Route path="/lightning" component={LightningWrapper} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

// {
// user: {
// id: 4,
// authId: "116146940770116254794",
// name: "Rob Cornell",
// picture: "https://lh4.googleusercontent.com/-QpbHKV1gzhM/AAAAAAAAAAI/AAAAAAAAIn4/ow5QMLq7VFI/photo.jpg?sz=50",
// email: "rob.cornell@gmail.com",
// createdAt: "2017-07-08T20:31:59.000Z",
// updatedAt: "2017-07-08T20:31:59.000Z"
// }
// }

// {
// user: {
// id: 5,
// authId: "10101691300771538",
// name: "Rob Cornell",
// picture: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13435593_10101210926206018_3474235121543587977_n.jpg?oh=af19ad5ed864562c1a09245ea5ab69fa&oe=59CC07DB",
// email: "rob.cornell@gmail.com",
// createdAt: "2017-07-08T20:40:05.000Z",
// updatedAt: "2017-07-08T20:40:05.000Z"
// }
// }

// This function means "point these state values at the props
// that this component will receive"
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => { dispatch(loginUser(user)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
