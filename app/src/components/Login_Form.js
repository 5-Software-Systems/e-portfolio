/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import '../styles/Pop-up.css';
import { validateEmail, useFormFields } from "../util/form";
import { authorize, isAuthorized } from "../util/cookies";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
    const [fields, handleFieldChange] = useFormFields({
        login_email: "",
        login_password: "",
    });

    function validateForm() {
        if (fields.login_email.length <= 0) {
            alert("No email entered");
        } else if (! validateEmail(fields.login_email)) {
            alert("Invalid email entered");
        } else if (fields.login_password.length <= 0) {
            alert("No password entered");
        } else {
            return (true);
        }
        return (false);
    }

    async function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: String(fields.login_email).toLowerCase(), password: fields.login_password})
        };
        const response = await fetch('api/auth/login', requestOptions);
        const recvd_data = await response.json();

        authorize(recvd_data);
    }

    function SubmitButton() {
        const [isLoading, setLoading] = useState(false);
        const history = useHistory();

        useEffect(() => {
            if (isLoading) {
                if (validateForm()) {
                    handleSubmit().then(() => {
                        if (isAuthorized()) {
                            history.push("/profile");
                        } else {
                            history.push("/login");
                        }
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            }
        }, [isLoading, history]);

        const handleClick = () => setLoading(true);

        return (
            <Button
                className="btn"
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                type="submit"
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        );
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <FormGroup controlId="login_email">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    values = {fields.email}
                    onChange={handleFieldChange}
                    autoComplete="email"/>
            </FormGroup>
            <FormGroup controlId="login_password">
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    values = {fields.password}
                    onChange={handleFieldChange}
                    autoComplete="password"/>
            </FormGroup>
            <SubmitButton />
        </Fragment>
    );
}

export function LoginButton() {
    return (
        <Button
            className="btn btn-info m-2"
            variant="primary"
            onClick={openFormLogin}
        >
            Log In
        </Button>
    );
}

export function openFormLogin() {
  document.getElementById("log_in_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}
