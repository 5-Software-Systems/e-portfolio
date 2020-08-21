import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';
import Signup from './containers/Signup';
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
  </React.StrictMode>,
  document.getElementById('pop_up')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.getElementById("sign_up_button").addEventListener("click", openForm);
document.getElementById("pop_up_close").addEventListener("click", closeForm);

function openForm() {
  document.getElementById("pop_up_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}

function closeForm() {
  document.getElementById("pop_up_form").style.display = "none";
  document.getElementById("cover").style.display = "none";
}
