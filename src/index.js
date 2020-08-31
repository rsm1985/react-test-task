import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import Admin from 'components/Admin';
import Blank from 'components/Blank';
import Marketer from 'components/Marketer';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./redux/reducers";

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route path="/admin">
              <Admin/>
            </Route>
            <Route path="/marketer">
              <Marketer/>
            </Route>
            <Route path="/blank">
              <Blank/>
            </Route>
          </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
