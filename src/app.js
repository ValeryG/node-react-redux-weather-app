import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import rootReducer from './reducers';


class MyAppRoot extends React.Component {
  render() {
    return(
      <div className="my-app-root">
        <p>Hello world!</p>
      </div>
    );
  }
};

const store = createStore(rootReducer);

const rootElement = document.getElementById('react-root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={MyAppRoot} />
    </Router>
  </Provider>,
  rootElement);
