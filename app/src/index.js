import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
    HomePage,
    LoginPage,
    SignUpPage,
    ProfilePage,
    PortfolioPage,
    UpdatesPage,
    ContactUsPage,
    Demo
} from './routing.js';

//Routing
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={HomePage}
                />
                <Route
                    exact
                    path="/login"
                    component={LoginPage}
                />
                <Route
                    exact
                    path="/signup"
                    component={SignUpPage}
                />
                <Route
                    path="/profile"
                    component={ProfilePage}
                />
                <Route
                    path="/portfolio/"
                    component={PortfolioPage}
                />
                <Route
                    exact
                    path="/demo"
                    component={Demo}
                />
                <Route
                    exact
                    path="/updates"
                    component={UpdatesPage}
                />
                <Route
                    exact
                    path="/contact"
                    component={ContactUsPage}
                />
            </Switch>
        </Router>
    </React.StrictMode>,
  document.getElementById('content')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();