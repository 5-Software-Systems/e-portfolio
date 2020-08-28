import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';
import Signup from './containers/Signup';
import SignupButton from './containers/Signup';
import Login from './containers/Login';
import LoginButton from './containers/Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('left_info')
);

ReactDOM.render(
  <React.StrictMode>
      <Signup />
      <Login />
  </React.StrictMode>,
  document.getElementById('pop_ups')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

