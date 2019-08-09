import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Attendance from './component/attendance';
import Register from './component/register';
import Admin from './component/admin';


//import {BrowserRouter as Route , Router, Switch} from 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const routing = (
    <Router>
      <Fragment>
          
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            exact
            path="/Attend"
            render={routeProps => <Attendance {...routeProps} />}
          />
          <Route
            exact
            path="/Register"
            render={routeProps => <Register {...routeProps} />}
          />
          <Route
            exact
            path="/admin"
            render={routeProps => <Admin {...routeProps} />}
          />
          
        </Switch>
      </Fragment>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
