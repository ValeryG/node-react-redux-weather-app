import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import thunk from 'redux-thunk';

import HomeContainer from './components/HomeContainer';

import rootReducer from './reducers';
import './styles/styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));
const rootElement = document.getElementById('react-root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={HomeContainer} />
    </Router>
  </Provider>,
  rootElement);
