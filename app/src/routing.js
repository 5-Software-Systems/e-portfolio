import React, { Fragment } from "react";
import { isLoggedIn, deauthorize } from "./util/cookies";
import { useHistory, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

// Containers
import BaseTemplate from "./templates/BaseTemplate";
import Landing from "./containers/Landing";
import Gallery from "./containers/Gallery";
import UpdatePage from "./containers/Updates";
import ContactPage from "./containers/Contact";
import Settings from "./containers/Settings";
import EPortfolio from "./containers/EPortfolio";
import EPortfolioDemo from "./containers/DemoPages";
import Examples from "./containers/Examples";
import Share from "./containers/Share";
// Components
import Popup from "./components/RightNav/Popup";
import LoginForm from "./components/Forms/Login_Form";
import SignupForm from "./components/Forms/Signup_Form";
import ForgotForm from "./components/Forms/Forgot_Form";
import PasswordResetForm from "./components/Forms/PwordReset_Form";
import Verify from "./components/Verify";

export function HomePage() {
  return (
    <Fragment>
      <title>Home</title>
      <BaseTemplate
        nav_right={
          <Fragment>
            <RightNav />
          </Fragment>
        }
      >
        <Landing />
      </BaseTemplate>
    </Fragment>
  );
}

export function LoginPage() {
  return (
    <Fragment>
      <title>Login</title>
      <BaseTemplate
        nav_right={
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="link">
              Sign Up!
            </a>
          </p>
        }
      >
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
      <BaseTemplate
        nav_right={
          <p>
            Have an account? <a href="/login">Login.</a>
          </p>
        }
      >
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
      <BaseTemplate
        nav_right={
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="link">
              Sign Up!
            </a>
          </p>
        }
      >
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

export function VerifyPage() {
  return (
    <Fragment>
      <title>Login</title>
      <BaseTemplate>
        <div className="form-container m-auto">
          <Verify />
        </div>
      </BaseTemplate>
    </Fragment>
  );
}

export function ProfilePage() {
  return (
    <Fragment>
      <title>Portfolio Gallery</title>
      <BaseTemplate nav_right={<RightNav />}>
        <Gallery />
      </BaseTemplate>
    </Fragment>
  );
}

export function SettingsPage() {
  return (
    <Fragment>
      <title>Account Settings</title>
      <BaseTemplate nav_right={<RightNav />}>
        <Settings />
      </BaseTemplate>
    </Fragment>
  );
}

export function PortfolioPage(props) {
  return <EPortfolio preview={props.preview} />;
}

export function SharedPortfolioPage() {
  return <Share />;
}

export function UpdatesPage() {
  return (
    <Fragment>
      <title>Updates</title>
      <BaseTemplate nav_right={<RightNav />}>
        <UpdatePage />
      </BaseTemplate>
    </Fragment>
  );
}

export function ContactUsPage() {
  return (
    <Fragment>
      <title>Contact Us</title>
      <BaseTemplate nav_right={<RightNav />}>
        <ContactPage />
      </BaseTemplate>
    </Fragment>
  );
}

export function Demo() {
  return (
    <div>
      <EPortfolioDemo />
    </div>
  );
}

export function ExamplesPage() {
  return (
    <Fragment>
      <title>Help</title>
      <BaseTemplate nav_right={<RightNav />}>
        <Examples />
      </BaseTemplate>
    </Fragment>
  );
}

export function PortfolioNotFound() {
  return (
    <Fragment>
      <title>Not Found...</title>
      <BaseTemplate nav_right={<RightNav />}>
        <div className="banner first">
          <div className="container">
            <h2 className="font-weight-semibold">
              The portfolio you're looking for is no longer available.
            </h2>
            <img
              src={process.env.PUBLIC_URL + "/images/not_found.svg"}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </BaseTemplate>
    </Fragment>
  );
}

export function _404Page() {
  return (
    <Fragment>
      <title>Uh Oh...</title>
      <BaseTemplate nav_right={<RightNav />}>
        <div className="banner second">
          <div className="container">
            <h2 className="font-weight-semibold">
              Error 404:
              <br />
              We can't find the page you're looking.
            </h2>
            <img
              src={process.env.PUBLIC_URL + "/images/404v2.svg"}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </BaseTemplate>
    </Fragment>
  );
}

function RightNav() {
  const history = useHistory();
  async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
  }

  if (isLoggedIn()) {
    return (
      <Fragment>
        <Button color="inherit" component={Link} to="/profile">Gallery</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Popup name="Login" />
        <Popup name="Sign Up" />
      </Fragment>
    );
  }
}
