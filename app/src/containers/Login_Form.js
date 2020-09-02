/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import './Pop-up.css'
import Cookies from 'universal-cookie';


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
        return (
            fields.login_email.length > 0 &&
            fields.login_password.length > 0 &&
            validateEmail(fields.login_email)
        );
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
        console.log(data.message);


        //test cookie/authentication implemenetation (seems quite insecure rn though?)
        if (data.message.toLowerCase() == 'successfully logged in.') {
            const auth64 = data.Authorization.split('.');
            const auth64Payload = JSON.parse(atob(auth64[1]));

            //get profile ID
            const ProfileIDrequestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            const ProfileIDresponse = await fetch('api/user', ProfileIDrequestOptions);
            const users = await ProfileIDresponse.json();
            const profile = users.users[auth64Payload.sub-1];
            const cookies = new Cookies();

            cookies.set('public_id', auth64Payload.sub, {path:'/', maxAge:600}); //temp 5 minute expiry for cookie

            // TODO: Store token instead of id

        }
    }

    function renderForm() {
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

    function SubmitButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            if (isLoading && validateForm()) {
                handleSubmit().then(() => {
                    setLoading(false);
                });
            } else if (isLoading && !validateForm()) {
                setLoading(false);
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
