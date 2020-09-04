/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment }  from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import '../styles/Pop-up.css';
import { validateEmail, useFormFields } from "../util/form";
import { useHistory } from "react-router-dom";

export default function SignupForm() {
    const [fields, handleFieldChange] = useFormFields({
        signup_firstname: "",
        signup_lastname: "",
        signup_email: "",
        signup_password: "",
        signup_confirmPassword: "",
    });
    function validateForm() {
        return (
            fields.signup_firstname.length > 0 &&
            fields.signup_lastname.length > 0 &&
            fields.signup_email.length > 0 &&
            fields.signup_password.length > 0 &&
            fields.signup_confirmPassword === fields.signup_password &&
            validateEmail(fields.signup_email)
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
            body: JSON.stringify({email: fields.signup_email, password: fields.signup_password, name_first: fields.signup_firstname, name_last: fields.signup_lastname})
        };
        const response = await fetch('api/user', requestOptions);
        const data = await response.json();
    }

    function SubmitButton() {
        const [isLoading, setLoading] = useState(false);
        const history = useHistory();

        useEffect(() => {
            if (isLoading && validateForm()) {
                handleSubmit().then(() => {
                    setLoading(false);
                    history.push("/login");
                });
            } else if (isLoading && !validateForm()) {
                setLoading(false);
            }
        }, [isLoading, history]);

        const handleClick = () => {setLoading(true); };

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
            <h1>Sign Up</h1>

            <FormGroup controlId="signup_firstname">
                <FormLabel>First Name</FormLabel>
                <FormControl
                    type="text"
                    values = {fields.firstname}
                    onChange={handleFieldChange}
                    autoComplete="name"
                />
            </FormGroup>
            <FormGroup controlId="signup_lastname">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                    type="text"
                    values = {fields.lastname}
                    onChange={handleFieldChange}
                    autoComplete="surname"
                />
            </FormGroup>

            <FormGroup controlId="signup_email">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    values = {fields.email}
                    onChange={handleFieldChange}
                    autoComplete="email"
                />
            </FormGroup>
            <FormGroup controlId="signup_password">
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                    autoComplete="password"
            />
            </FormGroup>
            <FormGroup controlId="signup_confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.confirmPassword}
                    autoComplete="password"
                />
            </FormGroup>
            <SubmitButton />
        </Fragment>
    );
}

export function SignupButton() {
    return (
        <Button
            className="btn btn-info m-2"
            variant="primary"
            onClick={openFormSignUp}
        >
            Sign Up
        </Button>
       );
}

function openFormSignUp() {
  document.getElementById("sign_up_form").style.display = "block"
  document.getElementById("cover").style.display = "block";
}
