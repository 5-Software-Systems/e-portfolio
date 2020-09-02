/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { Fragment } from "react";
import LoginForm, { LoginButton, CloseButton } from "./Login_Form";
import './Pop-up.css'

export default function Login() {

    return (
        <Fragment>
            <LoginButton />
            <div className="form-popup" id="log_in_form">
                <form action="/action_page.php" className="form-container">
                    <LoginForm />
                    <CloseButton />
                </form>
            </div>
            <div className="cover" id="cover"></div>
        </Fragment>
    );
}
