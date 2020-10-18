import React, { Fragment } from 'react';
import { isLoggedIn } from "./util/cookies";

// Containers
import BaseTemplate from './containers/BaseTemplate';
import Landing from './containers/Landing';
import Gallery from './containers/Gallery';
import UpdatePage from './containers/Updates';
import ContactPage from './containers/Contact';
import Settings from './containers/Settings';
import EPortfolio from './containers/EPortfolio';
import EPortfolioDemo from './containers/EPortfolioDemo';
import Examples from './containers/Examples'
// Components
import Popup from './components/RightNav/Popup';
import LoginForm from './components/Login_Form';
import SignupForm from './components/Signup_Form';
import ForgotForm from './components/Forgot_Form';
import PasswordResetForm from './components/PwordReset_Form';
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
            <BaseTemplate nav_right = {<p>Don't have an account? <a href="/signup" className="link">Sign Up!</a></p>} >
                <div className="form-container m-auto">
                    <LoginForm />
                </div>
            </BaseTemplate>
        </Fragment>
    );
}

export function SignUpPage() {
    return (
        <Fragment>
            <title>Sign Up</title>
            <BaseTemplate nav_right = {<p>Have an account? <a href="/login">Login.</a></p>}>
                <div className="form-container m-auto">
                    <SignupForm />
                </div>
            </BaseTemplate>
        </Fragment>
    );
}

export function ForgotPage() {
    return (
        <Fragment>
            <title>Forgot Password</title>
            <BaseTemplate nav_right = {<p>Don't have an account? <a href="/signup" className="link">Sign Up!</a></p>} >
                <div className="form-container m-auto">
                    <ForgotForm />
                </div>
            </BaseTemplate>
        </Fragment>
    );
}

export function ResetPage() {
    return (
        <Fragment>
            <title>Password Reset</title>
            <BaseTemplate>
                <div className="form-container m-auto">
                    <PasswordResetForm />
                </div>
            </BaseTemplate>
        </Fragment>
    );
}

export function ProfilePage() {
    return (
        <Fragment>
            <title>Portfolio Gallery</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <Gallery />
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

export function PortfolioPage(props) {
    return (
        <EPortfolio preview = {props.preview}/>
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

export function ExamplesPage() {
    return (
        <Fragment>
            <title>Portfolio Gallery</title>
            <BaseTemplate nav_right = { <RightNav /> } >
                <Examples />
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