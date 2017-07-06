import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

ReactDOM.render(
  <Provider>
    <App store={createStore(rootReducer)} />
  </Provider>,
  document.getElementById('app')
);