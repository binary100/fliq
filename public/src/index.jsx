import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app.jsx';

ReactDOM.render(
  <Provider store={createStore()}>
    <App />
  </Provider>, document.getElementById('app'));