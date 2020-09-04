/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import '../styles/Pop-up.css';


function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function(event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}

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

    function validateEmail(email) {
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: fields.login_email, password: fields.login_password})
        };
        const response = await fetch('api/auth/login', requestOptions);
        const data = await response.json();

        //test cookie/authentication implementation
        if (data.message.toLowerCase() === 'successfully logged in.') {
            const auth64 = data.Authorization;
            new Cookies().set('authorization', auth64, {path:'/', maxAge:600}); //temp 5 minute expiry for cookie
        }
    }

    function renderForm() {
        return (
            <form action="/action_page.php" className="form-container m-auto">
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
            </form>
        );
    }

    function SubmitButton() {
        const [isLoading, setLoading] = useState(false);
        const history = useHistory();

        useEffect(() => {
            if (isLoading) {
                if (validateForm()) {
                    handleSubmit().then(() => {
                        if (new Cookies().get('authorization') !== null) {
                            history.push("/profile");
                        } else {
                            alert("Error loading Profile");
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
            {renderForm()}
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

export function CloseButton() {
    return (
        <Button
            className="btn cancel"
            variant="primary"
            onClick={closeFormLogin}
            type="button"
        >
            Close
        </Button>
    );
}

export function closeFormLogin() {
  document.getElementById("log_in_form").style.display = "none";
  document.getElementById("cover").style.display = "none";
}

export function openFormLogin() {
  document.getElementById("log_in_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}
