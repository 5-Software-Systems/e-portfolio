import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { isLoggedIn } from "./util/cookies";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
    HomePage,
    LoginPage,
    SignUpPage,
    ProfilePage,
    SettingsPage,
    PortfolioPage,
    UpdatesPage,
    ContactUsPage,
    Demo,
    _404Page
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
                    render={() => {
                        return (isLoggedIn() ? <Redirect to="/profile" /> : <LoginPage />)
                    }}
                />
                <Route
                    exact
                    path="/signup"
                    render={() => {
                        return (isLoggedIn() ? <Redirect to="/profile" /> : <SignUpPage />)
                    }}
                />
                <Route
                    exact
                    path="/profile"
                    render={() => {
                        return (isLoggedIn() ? <ProfilePage /> : <Redirect to="/" />)
                    }}
                />
                <Route
                    exact
                    path="/settings"
                    render={() => {
                        return (isLoggedIn() ? <SettingsPage /> : <Redirect to="/" />)
                    }}
                />
                <Route
                    path="/portfolio/"
                    render={() => {
                        return (isLoggedIn() ? <PortfolioPage /> : <Redirect to="/" />)
                    }}
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
                <Route
                    path="/"
                    component={_404Page}
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