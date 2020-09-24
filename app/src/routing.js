import React, { Fragment } from 'react';
import { isLoggedIn } from "./util/cookies";

// Containers
import BaseTemplate from './containers/BaseTemplate';
import Landing from './containers/Landing';
import BasePage from './containers/BasePage';
import UpdatePage from './containers/Updates';
import ContactPage from './containers/Contact';
import Settings from './containers/Settings';
import EPortfolio from './containers/EPortfolio';
import EPortfolioDemo from './containers/EPortfolioDemo';
// Components
import Popup from './components/RightNav/Popup';
import LoginForm from './components/Login_Form';
import SignupForm from './components/Signup_Form';
import UserNav from './components/RightNav/UserNav';

export function HomePage() {
    return (
        <Fragment>
            <title>Home</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <Landing />
            </BaseTemplate>
        </Fragment>
    );
}

export function LoginPage() {
    return (
        <Fragment>
            <title>Login</title>
            <BaseTemplate>
                <form className="form-container m-auto">
                    <LoginForm />
                </form>
            </BaseTemplate>
        </Fragment>
    );
}

export function SignUpPage() {
    return (
        <Fragment>
            <title>Sign Up</title>
            <BaseTemplate>
                <form className="form-container m-auto">
                    <SignupForm />
                </form>
            </BaseTemplate>
        </Fragment>
    );
}

export function ProfilePage() {
    return (
        <Fragment>
            <title>Portfolio Gallery</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <BasePage />
            </BaseTemplate>
        </Fragment>
    );
}

export function SettingsPage() {
    return (
        <Fragment>
            <title>Account Settings</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <Settings />
            </BaseTemplate>
        </Fragment>
    );
}

export function PortfolioPage() {
    return (
        <EPortfolio />
    );
}

export function UpdatesPage() {
    return (
        <Fragment>
            <title>Updates</title>
            <BaseTemplate nav_right = { <RightNav /> }>
                <UpdatePage />
            </BaseTemplate>
        </Fragment>
    );
}

export function ContactUsPage() {
    return (
        <Fragment>
            <title>Contact Us</title>
            <BaseTemplate nav_right = { <RightNav /> }>
                <ContactPage />
            </BaseTemplate>
        </Fragment>
    );
}

export function Demo() {
    return (
        <Fragment>
            <title>Demo</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <div className="container">
                    <EPortfolioDemo />
                </div>
            </BaseTemplate>
        </Fragment>
    );
}

export function _404Page() {
    return (
        <Fragment>
            <title>Uh Oh...</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <div className="container banner">
                    <h1 className="font-weight-semibold">The page you're looking for doesn't seem to match any page we know of.</h1>
                    <img src={process.env.PUBLIC_URL + "/images/not_found.png"} alt="" className="img-fluid pt-5" />
                </div>
            </BaseTemplate>
        </Fragment>
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