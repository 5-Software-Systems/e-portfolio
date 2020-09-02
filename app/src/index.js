import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        {Content_Routing()}
    </React.StrictMode>,
  document.getElementById('content')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function Content_Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/profile">
                </Route>
                <Route path="/">
                </Route>
            </Switch>
        </Router>
    );
}
