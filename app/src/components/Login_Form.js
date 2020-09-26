import React, { useState, useEffect } from "react";
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import '../styles/Form.css';
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
            return (false);
        } else if (! validateEmail(fields.login_email)) {
            return (false);
        } else if (fields.login_password.length <= 0) {
            return (false);
        }
        return (true);
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
        <Form>
            <h1>Login</h1>
            <FormGroup controlId="login_email">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    values = {fields.email}
                    onChange={handleFieldChange}
                    autoComplete="email"
                    required/>
            </FormGroup>
            <FormGroup controlId="login_password">
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    values = {fields.password}
                    onChange={handleFieldChange}
                    autoComplete="password"
                    required/>
            </FormGroup>
            <SubmitButton />
        </Form>
    );
}
