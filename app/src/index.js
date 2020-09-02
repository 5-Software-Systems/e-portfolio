import React from 'react';
import ReactDOM from 'react-dom';
import BasePage from './containers/BasePage.js'
import LandingButtons from './components/LandingButtons.js'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EPortfolio from "./containers/EPortfolio";
import TextToHTML from "./components/Widgets/TextWidget";

ReactDOM.render(
  <React.StrictMode>
      <EPortfolio />
  </React.StrictMode>,
  document.getElementById('ePortfolio')
);

ReactDOM.render(
  <React.StrictMode>
      <BasePage />
  </React.StrictMode>,
  document.getElementById('basePage')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

