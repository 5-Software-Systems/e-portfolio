/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect } from "react";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import './Signup.css'


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

    function renderForm() {
        return (
            <div class="form-popup" id="log_in_form">
                <form action="/action_page.php" class="form-container">
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
                            value={fields.password}
                            onChange={handleFieldChange}
                    />
                    </FormGroup>

                    <SubmitButton />

                    <button type="button" class="btn cancel" id="login_pop_up_close">Close</button>
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
                class="btn"
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
        <div>
            {renderForm()}
            <div class="cover" id="cover"></div>
        </div>
    );
}
