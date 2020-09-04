import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// Containers
import BaseTemplate from './containers/BaseTemplate';
import Landing from './containers/Landing';
import BasePage from './containers/BasePage';
import EPortfolio from './containers/EPortfolio';
import EPortfolioDemo from './containers/EPortfolioDemo';
// Components
import Popup from './components/Popup';
import LoginForm, { LoginButton } from './components/Login_Form';
import SignupForm, { SignupButton } from './components/Signup_Form';
import Logout from './components/Logout';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignUpPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/portfolio/" component={PortfolioPage}/>
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
                            <Popup name="log_in" button={<LoginButton />}>
                                <LoginForm />
                            </Popup>
                            <Popup name="sign_up" button={<SignupButton />}>
                                <SignupForm />
                            </Popup>
                        </Fragment> }
          body = { <Landing /> }
          />
    );
}

function LoginPage() {
    return (
        <BaseTemplate
          body = { <form action="/action_page.php" className="form-container m-auto">
                        <LoginForm />
                   </form>
                 }
          />
    );
}

function SignUpPage() {
    return (
        <BaseTemplate
          body = { <form action="/action_page.php" className="form-container m-auto">
                        <SignupForm />
                   </form>
                 }
          />
    );
}

function ProfilePage() {
    return (
        <BaseTemplate
          nav_right = { <Fragment>
                            <Logout />
                        </Fragment> }
          body = { <BasePage /> }
          />
    );
}

function PortfolioPage() {
    return (
        <EPortfolio />
    );
}