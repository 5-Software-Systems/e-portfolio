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
        old_Password: "",
        new_Password: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [isComplete, setComplete] = useState(false);
    const [isIncorrect, setIncorrect] = useState(false);
    const Auth = isAuthorized();

    useEffect(() => {
        async function handleSubmit() {
            //verify password
            const requestOptions_ver = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: String(fields.email).toLowerCase(), password: fields.old_Password})
                };
            const ver_data = await fetch('/api/auth/login', requestOptions_ver);
            const data = await ver_data.json();
            const auth64 = data.Authorization
            if (data.message === 'Login details incorrect, check and try again') {
                setIncorrect(true);
                return;
            }

            //get user id
            const requestOptions_id = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + auth64}
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
            setComplete(true);
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
                });
            } else {
                setLoading(false);
                setIncorrect(true);
            }
        }
    }, [isLoading, fields, Auth]);

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    return (
        <Form onSubmit={handleClick}>
            <h1>Password Reset</h1>
            <FormGroup controlId="email">
                <FormLabel>Email<p className="required">*</p></FormLabel>
                <FormControl
                    type="email"
                    onChange={handleFieldChange}
                    value={fields.email}
                    placeholder="Email"
                    autoComplete="email"
                    required/>
            </FormGroup>
            <FormGroup controlId="old_Password">
                <FormLabel>Old Password<p className="required">*</p></FormLabel>
                <FormControl
                    type="password"
                    onChange={handleFieldChange}
                    value={fields.old_Password}
                    placeholder="Old Password"
                    autoComplete="current-password"
                    required/>
            </FormGroup>
            {isIncorrect ?
                <p className="response invalidResp">Incorrect email or password, please try again.</p>
                :
                null
            }
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
