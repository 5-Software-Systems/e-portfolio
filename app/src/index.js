import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';
import Signup from './containers/Signup';
import Login from './containers/Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('left_info')
);

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('login_pop_up')
);

ReactDOM.render(
  <React.StrictMode>
    <Signup />
  </React.StrictMode>,
  document.getElementById('signup_pop_up')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

