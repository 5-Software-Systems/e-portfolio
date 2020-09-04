/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import { Button } from "react-bootstrap";
import LoginForm, { LoginButton } from "./Login_Form";
import SignupForm, { SignupButton } from "./Signup_Form";

export default function Popup(props) {
    const name = props.name;
    var button;
    var form;

    if (name == "log_in") {
        button = <LoginButton />;
        form = <LoginForm />;
    } else if (name == "sign_up") {
        button = <SignupButton />;
        form = <SignupForm />;
    }

    function CloseButton() {
        const [isClose, setClose] = useState(false);

        useEffect(() => {
            if (isClose) {
                document.getElementById(name + "_form").style.display = "none";
                document.getElementById("cover").style.display = "none";
                setClose(false);
            }
        });

        const handleClick = () => {setClose(true); };

        return (
            <Button
                className="btn cancel"
                variant="primary"
                onClick={handleClick}
                type="button"
            >
                Close
            </Button>
        );
    }

    return (
        <Fragment>
            { button }
            <div className="form-popup" id={name + "_form"}>
                <form action="/action_page.php" className="form-container">
                    { form }
                    <CloseButton />
                </form>
            </div>
            <div className="cover" id="cover"></div>
        </Fragment>
    );
}
