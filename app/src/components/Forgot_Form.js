import React, { useState, useEffect, Fragment } from "react";
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

export default function LoginForm() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [isDone, setDone] = useState(false);
    let history = useHistory();

    useEffect(() => {
        async function handleSubmit() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: String(fields.email).toLowerCase()})
            };
            //util cookie/authentication implementation
            await fetch('api/auth/password_forgot', requestOptions);
            setDone(true);
        }

        function validateForm() {
            return (fields.email.length > 0 &&
                    validateEmail(fields.email));
        }

        if (isLoading) {
            if (validateForm) {
                handleSubmit().then(() => {
                    setLoading(false);
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
            <h1>Forgot Password</h1>
            {! isDone ?
                <Fragment>
                    <FormGroup controlId="email">
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
                    <Button
                        className="btn"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                </Fragment>
                :
                <p className="response">Check your email for a link to reset your password.
                               If it doesn't appear within a few minutes, check your spam folder.</p>
            }
        </Form>
    );
}
