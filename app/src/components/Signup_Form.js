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
import PasswordStrengthMeter from './PasswordStrengthMeter';
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
    const [isIncorrect, setIncorrect] = useState(false);
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
                setIncorrect(false);
                setLoading(false);
                handleSubmit().then(() => {
                    history.push("/login");
                });
            } else {
                setIncorrect(true);
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
                <FormLabel>First Name<p className="required">*</p></FormLabel>
                <FormControl
                    type="text"
                    values = {fields.signup_firstname}
                    onChange={handleFieldChange}
                    placeholder="Name"
                    autoComplete="name"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_lastname">
                <FormLabel>Last Name<p className="required">*</p></FormLabel>
                <FormControl
                    type="text"
                    values = {fields.signup_lastname}
                    onChange={handleFieldChange}
                    placeholder="Surname"
                    autoComplete="surname"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_email">
                <FormLabel>Email<p className="required">*</p></FormLabel>
                <FormControl
                    type="email"
                    className="mb-1"
                    values = {fields.signup_email}
                    onChange={handleFieldChange}
                    placeholder="Email"
                    autoComplete="email"
                    required
                    pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)+$"
                />
            </FormGroup>
            <PasswordStrengthMeter password={fields.signup_password} />
            <FormGroup controlId="signup_password">
                <FormLabel>Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    value={fields.signup_password}
                    onChange={handleFieldChange}
                    placeholder="Password"
                    autoComplete="password"
                    required/>
            </FormGroup>
            <FormGroup controlId="signup_confirmPassword">
                <FormLabel>Confirm Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.signup_confirmPassword}
                    placeholder="Password"
                    autoComplete="password"
                    required/>
            </FormGroup>
            {isIncorrect ? <p className="invalidResp">Incorrect details, Passwords may not be the same.</p> : null }
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
