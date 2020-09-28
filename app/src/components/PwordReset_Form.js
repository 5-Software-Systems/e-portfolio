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
import { isAuthorized } from "../util/cookies";

export default function PasswordResetForm() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        old_password: "",
        new_Password: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [isComplete, setComplete] = useState(false);
    const Auth = isAuthorized();

    useEffect(() => {
        async function handleSubmit() {
            //get user id
            const requestOptions_id = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}
            };
            const user_data = await fetch('/api/auth/user', requestOptions_id);
            const user = await user_data.json();

            //reset
            const requestOptions_reset = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth},
                body: JSON.stringify({public_id: user.public_id,
                                      password: fields.new_Password})
            };
            await fetch('api/auth/reset', requestOptions_reset);
        }

        function validateForm() {
            return (
                fields.new_Password.length > 0
            );
        }

        if (isLoading) {
            if (validateForm) {
                handleSubmit().then(() => {
                    setLoading(false);
                    setComplete(true);
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
            <PasswordStrengthMeter password={fields.new_Password} />
            <FormGroup controlId="new_Password">
                <FormLabel>New Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.new_Password}
                    placeholder="Password"
                    autoComplete="password"
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
