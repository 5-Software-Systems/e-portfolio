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
  document.getElementById('left_info')
);

ReactDOM.render(
  <React.StrictMode>
        <Signup />
  </React.StrictMode>,
  document.getElementById('pop_up')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//login button
document.getElementById("login_button").addEventListener("click", openFormLogin);
document.getElementById("login_pop_up_close").addEventListener("click", closeFormLogin);


function openFormLogin() {
  document.getElementById("log_in_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}

function closeFormLogin() {
  document.getElementById("log_in_form").style.display = "none";
  document.getElementById("cover").style.display = "none";
}


//sign up button
document.getElementById("sign_up_button").addEventListener("click", openFormSignUp);
document.getElementById("pop_up_close").addEventListener("click", closeForm);

function openFormSignUp() {
  document.getElementById("sign_up_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}

function closeForm() {
  document.getElementById("sign_up_form").style.display = "none";
  document.getElementById("cover").style.display = "none";
}
