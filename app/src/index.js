import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import BaseTemplate from './containers/BaseTemplate';
import Landing from './containers/Landing';
import BasePage from './containers/BasePage';
import EPortfolio from './containers/EPortfolio';
import LoginForm from './components/Login_Form';
import PopupLogin from './components/Login_Popup';
import PopupSignup from './components/Signup_Popup';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/portfolio" component={PortfolioPage}/>
                <Route path="/" component={BaseTemplate}/>
            </Switch>
        </Router>
    </React.StrictMode>,
  document.getElementById('content')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function HomePage() {
    return (
        <BaseTemplate
          nav_right = { <Fragment>
                            <PopupSignup />
                            <PopupLogin />
                        </Fragment> }
          body = { <Landing /> }
          />
    );
}

function LoginPage() {
    return (
        <BaseTemplate
          body = { <LoginForm /> }
          />
    );
}

function ProfilePage() {
    return (
        <BaseTemplate
          body = { <BasePage /> }
          />
    );
}

function PortfolioPage() {
    return (
        <EPortfolio />
    );
}