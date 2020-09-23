import React, { Fragment } from 'react';
import { isLoggedIn } from "./util/cookies";
import { useHistory } from "react-router-dom";

// Containers
import BaseTemplate from './containers/BaseTemplate';
import Landing from './containers/Landing';
import BasePage from './containers/BasePage';
import UpdatePage from './containers/Updates';
import ContactPage from './containers/Contact';
import EPortfolio from './containers/EPortfolio';
import EPortfolioDemo from './containers/EPortfolioDemo';
// Components
import Popup from './components/RightNav/Popup';
import LoginForm from './components/Login_Form';
import SignupForm from './components/Signup_Form';
import Logout from './components/RightNav/Logout';
import UserNav from './components/RightNav/UserNav';

export function HomePage() {
    return (
        <BaseTemplate
          nav_right = { <RightNav /> }
          body = { <Landing /> }
          />
    );
}

export function LoginPage() {
    const history = useHistory();
    if (isLoggedIn()) {
        history.push("/profile");
    }
    return (
        <BaseTemplate
            body = { <form className="form-container m-auto">
                        <LoginForm />
                   </form>
                   }
        />
    );
}

export function SignUpPage() {
    const history = useHistory();
    if (isLoggedIn()) {
        history.push("/profile");
    }
    return (
        <BaseTemplate
          body = { <form className="form-container m-auto">
                        <SignupForm />
                   </form>
                 }
        />
    );
}

export function ProfilePage() {
    return (
        <BaseTemplate
          nav_right = { <RightNav /> }
          body = { <BasePage /> }
        />
    );
}

export function PortfolioPage() {
    return (
        <EPortfolio />
    );
}

export function UpdatesPage() {
    return (
        <BaseTemplate
          nav_right = { <RightNav /> }
          body = { <UpdatePage /> }
        />
    );
}

export function ContactUsPage() {
    return (
        <BaseTemplate
          nav_right = { <RightNav /> }
          body = { <ContactPage /> }
        />
    );
}

export function Demo() {
    return (
        <BaseTemplate
          nav_right = { <RightNav /> }
          body = { <div className="container">
                       <EPortfolioDemo />
                   </div>
                 }
        />
    );
}

function RightNav() {
    if (isLoggedIn()) {
        return (
            <Fragment>
                <UserNav />
                <Logout />
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Popup name="Login"> <LoginForm /> </Popup>
                <Popup name="Sign Up"> <SignupForm /> </Popup>
            </Fragment>
        );
    }
}