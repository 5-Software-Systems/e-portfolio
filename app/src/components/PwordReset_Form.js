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
import { useFormFields } from "../util/form";
import { isAuthorized, isLoggedIn } from "../util/cookies";

export default function PasswordResetForm() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        old_Password: "",
        new_Password: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [isComplete, setComplete] = useState(false);

    useEffect(() => {
        async function handleSubmit(auth) {
            //get user id
            const requestOptions_id = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + auth}
            };
            const user_data = await fetch('/api/auth/user', requestOptions_id);
            const user = await user_data.json();
            //reset
            const requestOptions_reset = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + auth},
                body: JSON.stringify({public_id: user.public_id,
                                      password: fields.new_Password})
            };
            await fetch('api/auth/password_reset', requestOptions_reset);
            setComplete(true);
        }

        function validateForm() {
            return (
                fields.new_Password.length > 0
            );
        }

        if (isLoading) {
            if (validateForm) {
                var Auth;
                if (isLoggedIn()) {
                    Auth = isAuthorized();
                } else {
                    const urlParams = window.location.search;
                    Auth = new URLSearchParams(urlParams).get('auth')
                }
                console.log(Auth)
                handleSubmit(Auth).then(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }
    }, [isLoading, fields]);

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    return (
        <Form onSubmit={handleClick}>
            <h1>Password Reset</h1>
            <FormGroup controlId="email">
            <FormControl
                type="email"
                values = "..."
                className="hidden"
                autoComplete="username email"/>
            </FormGroup>
            <PasswordStrengthMeter password={fields.new_Password} />
            <FormGroup controlId="new_Password">
                <FormLabel>New Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.new_Password}
                    placeholder="New Password"
                    autoComplete="new-password"
                    required/>
            </FormGroup>
            {isComplete ?
                <p className="response validResp">Your new password has been set.</p>
                :
                <Button
                    className="btn"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Reset'}
                </Button>
            }
        </Form>
    );
}
