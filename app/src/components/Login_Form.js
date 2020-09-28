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
import { authorize, isLoggedIn } from "../util/cookies";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
    const [fields, handleFieldChange] = useFormFields({
        login_email: "",
        login_password: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [isIncorrect, setIncorrect] = useState(false);
    let history = useHistory();

    useEffect(() => {
        async function handleSubmit() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: String(fields.login_email).toLowerCase(), password: fields.login_password})
            };
            await authorize(requestOptions);
        }

        function validateForm() {
            return (fields.login_email.length > 0 &&
                    fields.login_password.length > 0 &&
                    validateEmail(fields.login_email));
        }

        if (isLoading) {
            if (validateForm) {
                handleSubmit().then(() => {
                    setLoading(false);
                    if (isLoggedIn()) {
                        setIncorrect(false);
                        history.push("/profile");
                    } else {
                        setIncorrect(true);
                    }
                });
            } else {
                setLoading(false);
                setIncorrect(true);
            }
        }
    }, [isLoading, history, fields]);

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    return (
        <Form onSubmit={handleClick}>
            <h1>Login</h1>
            <FormGroup controlId="login_email">
                <FormLabel>Email<p className="required">*</p></FormLabel>
                <FormControl
                    type="email"
                    values = {fields.email}
                    onChange={handleFieldChange}
                    placeholder="Email"
                    autoComplete="email"
                    required
                    pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)+$"
                />
            </FormGroup>
            <FormGroup controlId="login_password">
                <FormLabel>Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    values = {fields.password}
                    onChange={handleFieldChange}
                    placeholder="Password"
                    autoComplete="password"
                    required/>
            </FormGroup>
            {isIncorrect ? <p className="response invalidResp">Incorrect username or password, please try again.</p> : null }
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
