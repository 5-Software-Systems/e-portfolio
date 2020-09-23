import React, { Fragment } from 'react';
import { isLoggedIn } from "./util/cookies";

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
import UserNav from './components/RightNav/UserNav';

export function HomePage() {
    return (
        <BaseTemplate nav_right = { <RightNav /> } >
            <Landing />
        </BaseTemplate>
    );
}

export function LoginPage() {
    return (
        <BaseTemplate>
            <form className="form-container m-auto">
                <LoginForm />
            </form>
        </BaseTemplate>
    );
}

export function SignUpPage() {
    return (
        <BaseTemplate>
            <form className="form-container m-auto">
                <SignupForm />
            </form>
        </BaseTemplate>
    );
}

export function ProfilePage() {
    return (
        <BaseTemplate nav_right = { <RightNav /> } >
            <BasePage />
        </BaseTemplate>
    );
}

export function PortfolioPage() {
    return (
        <EPortfolio />
    );
}

export function UpdatesPage() {
    return (
        <BaseTemplate nav_right = { <RightNav /> }>
            <UpdatePage />
        </BaseTemplate>
    );
}

export function ContactUsPage() {
    return (
        <BaseTemplate nav_right = { <RightNav /> }>
            <ContactPage />
        </BaseTemplate>
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