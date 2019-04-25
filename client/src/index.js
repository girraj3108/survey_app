//render root component from this file
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// development onnly axios helpers
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//ReactDOM
// takes two arguement
// first - the root component
//second -- where we attempting to render that component
// to inside   of our dom  'or' we have  to provide a reference
// to the existing DOM node inside ofour html document
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('environment is', process.env.NODE_ENV);
