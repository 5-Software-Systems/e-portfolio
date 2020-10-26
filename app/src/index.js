import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SnackbarProvider from "notistack"
import { isLoggedIn } from "./util/cookies";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  ForgotPage,
  ResetPage,
  VerifyPage,
  ProfilePage,
  SettingsPage,
  PortfolioPage,
  SharedPortfolioPage,
  UpdatesPage,
  ContactUsPage,
  Demo,
  ExamplesPage,
  PortfolioNotFound,
  _404Page,
} from "./routing.js";

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3F3D56",
    },
    secondary: {
      main: "#F95858",
    },
  },
  overrides: {
    MuiToolbar: {
      gutters: {
        [defaultTheme.breakpoints.up("sm")]: {
          paddingLeft: defaultTheme.spacing(5),
          paddingRight: defaultTheme.spacing(5),
        },
      },
    },
  },
});

//Routing
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() => {
              return isLoggedIn() ? <Redirect to="/profile" /> : <LoginPage />;
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return isLoggedIn() ? <Redirect to="/profile" /> : <SignUpPage />;
            }}
          />
          <Route
            exact
            path="/forgot"
            render={() => {
              return isLoggedIn() ? <Redirect to="/profile" /> : <ForgotPage />;
            }}
          />
          <Route
            exact
            path="/password_reset"
            render={() => {
              return isLoggedIn() ? <Redirect to="/profile" /> : <ResetPage />;
            }}
          />
          <Route
            exact
            path="/verify"
            render={() => {
              return isLoggedIn() ? <Redirect to="/profile" /> : <VerifyPage />;
            }}
          />
          <Route
            exact
            path="/profile"
            render={() => {
              return isLoggedIn() ? <ProfilePage /> : <Redirect to="/" />;
            }}
          />
          <Route
            exact
            path="/settings"
            render={() => {
              return isLoggedIn() ? <SettingsPage /> : <Redirect to="/" />;
            }}
          />
          <Route
            path="/portfolio/"
            render={() => {
              return <PortfolioPage preview={!isLoggedIn()} />;
            }}
          />
          <Route
            path="/share/"
            render={() => {
              return <SharedPortfolioPage />;
            }}
          />
          <Route
            path="/not_found"
            render={() => {
              return <PortfolioNotFound />;
            }}
          />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/updates" component={UpdatesPage} />
          <Route exact path="/contact" component={ContactUsPage} />
          <Route exact path="/help" component={ExamplesPage} />
          <Route exact path="/help/:name" component={Demo} />
          <Route path="/" component={_404Page} />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
