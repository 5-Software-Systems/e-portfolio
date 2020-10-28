import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "../../styles/Form.css";
import { validateEmail, hashPassword, useFormFields } from "../../util/form";
import { authorize, isLoggedIn, isVerified } from "../../util/cookies";
import { useHistory } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function LoginForm(close_outer=(() =>{})) {
  const [fields, handleFieldChange] = useFormFields({
    login_email: "",
    login_password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [isIncorrect, setIncorrect] = useState(false);
  const [verified, setVerified] = useState(true);
  let history = useHistory();

  useEffect(() => {
    async function handleSubmit() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fields.login_email).toLowerCase(),
          password: hashPassword(fields.login_password),
        }),
      };
      await authorize(requestOptions);
    }

    function validateForm() {
      return (
        fields.login_email.length > 0 &&
        fields.login_password.length > 0 &&
        validateEmail(fields.login_email)
      );
    }

    if (isLoading) {
      setIncorrect(false);
      setVerified(true);
      if (validateForm) {
        handleSubmit().then(() => {
          if (isLoggedIn()) {
            history.push("/profile");
          }
          if (isVerified()) {
            setIncorrect(true);
          } else {
            setVerified(false);
          }
          setLoading(false);
        });
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
        <FormLabel>
          Email<p className="required">*</p>
        </FormLabel>
        <FormControl
          type="email"
          values={fields.email}
          onChange={handleFieldChange}
          placeholder="Email"
          autoComplete="email"
          required
          pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)+$"
        />
      </FormGroup>
      <FormGroup controlId="login_password">
        <FormLabel>
          Password<p className="required">*</p>
        </FormLabel>
        <FormControl
          type="password"
          values={fields.password}
          onChange={handleFieldChange}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
      </FormGroup>
      <a href="/forgot" className="forgot">
        Forgot Password?
      </a>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isIncorrect}
        onClose={() => setIncorrect(false)}
        key={'topcenter'}
        autoHideDuration={4000}
      >
        <Alert severity="error">Incorrect email or password! Please try again.</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={! verified}
        onClose={() => setVerified(false)}
        key={'topcenter'}
        autoHideDuration={4000}
      >
        <Alert severity="error">User not verified! A new verification email has been sent, please check your emails.</Alert>
      </Snackbar>
      <Button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
}
