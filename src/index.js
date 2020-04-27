import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

const rootElement = document.getElementById('root');


ReactDOM.render(
  <Provider store ={store}>
    <App />
    </Provider>,
 rootElement
);

=======
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Router>
      <App />
  </Router>
  , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
>>>>>>> aaf1ee7d95f5bab84d46052c9e2c06f513fde0a6
