/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import './Pop-up.css'


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

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });
    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            validateEmail(fields.email)
        );
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: fields.email, password: fields.password})
        };
        const response = await fetch('api/auth/login', requestOptions);
        const data = await response.json();
        console.log(data);
    }

    function openFormLogin() {
      document.getElementById("log_in_form").style.display = "block"
      document.getElementById("cover").style.display = "block";
    }

    function closeFormLogin() {
      document.getElementById("log_in_form").style.display = "none";
      document.getElementById("cover").style.display = "none";
    }

    function renderForm() {
        return (
            <div className="form-popup" id="log_in_form">
                <form action="/action_page.php" className="form-container">
                    <h1>Login</h1>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            values = {fields.email}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            values = {fields.password}
                            onChange={handleFieldChange}
                    />
                    </FormGroup>

                    <SubmitButton />

                    <Button
                        className="btn cancel"
                        variant="primary"
                        onClick={closeFormLogin}
                        type="button"
                    >Close</Button>
                </form>
            </div>
        );
    }

    function SubmitButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            if (isLoading && validateForm()) {
                handleSubmit().then(() => {
                    setLoading(false);
                });
            }
        }, [isLoading]);

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

    function LoginButton() {
        return (
            <Button
                className="btn btn-info mx-2"
                variant="primary"
                onClick={openFormLogin}
                type="button"
            >
                Log In
            </Button>
        );
    }

    return (
        <Fragment>
            <LoginButton />
            {renderForm()}
            <div className="cover" id="cover"></div>
        </Fragment>
    );
}
