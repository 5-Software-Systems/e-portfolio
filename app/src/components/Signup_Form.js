/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect }  from "react";
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import '../styles/Form.css';
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
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function handleSubmit() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: String(fields.signup_email).toLowerCase(),
                password: fields.signup_password, name_first: fields.signup_firstname, name_last: fields.signup_lastname})
            };
            await fetch('api/user', requestOptions);
        }

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

        if (isLoading) {
            if (validateForm()) {
                handleSubmit().then(() => {
                    history.push("/login");
                });
            } else {
                setLoading(false);
            }
        }
    }, [isLoading, history, fields]);

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    return (
        <Form onSubmit={handleClick}>
            <h1>Sign Up</h1>
            <FormGroup controlId="signup_firstname">
                <FormLabel>First Name</FormLabel>
                <FormControl
                    type="text"
                    values = {fields.firstname}
                    onChange={handleFieldChange}
                    placeholder="Name"
                    autoComplete="name"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_lastname">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                    type="text"
                    values = {fields.lastname}
                    onChange={handleFieldChange}
                    placeholder="Surname"
                    autoComplete="surname"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_email">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    values = {fields.email}
                    onChange={handleFieldChange}
                    placeholder="Email"
                    autoComplete="email"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_password">
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                    placeholder="Password"
                    autoComplete="password"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.confirmPassword}
                    placeholder="Password"
                    autoComplete="password"
                    required/>
            </FormGroup>
            <Button
                className="btn"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    );
}
