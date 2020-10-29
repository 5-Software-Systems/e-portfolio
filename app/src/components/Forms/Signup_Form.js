import React, { useState, useEffect, Fragment } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "../../styles/Form.css";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { validateEmail, hashPassword, useFormFields } from "../../util/form";
import { useHistory } from "react-router-dom";

export default function SignupForm(close_outer=(() => {})) {
  const [fields, handleFieldChange] = useFormFields({
    signup_firstname: "",
    signup_lastname: "",
    signup_email: "",
    signup_password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function handleSubmit() {
      // signup
      const requestOptions_signup = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fields.signup_email).toLowerCase(),
          password: hashPassword(fields.signup_password),
          name_first: fields.signup_firstname,
          name_last: fields.signup_lastname,
        }),
      };
      await fetch("/api/user", requestOptions_signup);
    }

    function validateForm() {
      return (
        fields.signup_firstname.length > 0 &&
        fields.signup_lastname.length > 0 &&
        fields.signup_email.length > 0 &&
        fields.signup_password.length > 0 &&
        validateEmail(fields.signup_email)
      );
    }

    if (isLoading) {
      if (validateForm()) {
        handleSubmit().then(() => {
          close_outer();
        });
      } else {
      }
    }
  }, [isLoading, history, fields, close_outer]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Form onSubmit={handleClick}>
      <h1>Sign Up</h1>
      <Fragment>
        <FormGroup controlId="signup_email">
          <FormLabel>
            Email<p className="required">*</p>
          </FormLabel>
          <FormControl
            type="email"
            values={fields.signup_email}
            onChange={handleFieldChange}
            placeholder="Email"
            autoComplete="email"
            required
            pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)+$"
          />
        </FormGroup>
        <FormGroup controlId="signup_firstname">
          <FormLabel>
            First Name<p className="required">*</p>
          </FormLabel>
          <FormControl
            type="text"
            values={fields.signup_firstname}
            onChange={handleFieldChange}
            placeholder="First Name"
            autoComplete="given-name"
            required
          />
        </FormGroup>
        <FormGroup controlId="signup_lastname">
          <FormLabel>
            Last Name<p className="required">*</p>
          </FormLabel>
          <FormControl
            type="text"
            values={fields.signup_lastname}
            onChange={handleFieldChange}
            placeholder="Surname"
            autoComplete="family-name"
            required
          />
        </FormGroup>
        <PasswordStrengthMeter password={fields.signup_password} />
        <FormGroup controlId="signup_password">
          <FormLabel>
            Password<p className="required">*</p>
          </FormLabel>
          <FormControl
            type="password"
            value={fields.signup_password}
            onChange={handleFieldChange}
            placeholder="Password"
            autoComplete="current-password"
            minLength="5"
            required
          />
        </FormGroup>
        <Button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Fragment>
    </Form>
  );
}
