import React, { useState, useEffect, Fragment } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "../../styles/Form.css";
import { validateEmail, useFormFields } from "../../util/form";
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(fields.email).toLowerCase() }),
      };
      //util cookie/authentication implementation
      await fetch("/api/auth/password_forgot", requestOptions);
      setDone(true);
    }

    function validateForm() {
      return fields.email.length > 0 && validateEmail(fields.email);
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
  }, [isLoading, fields]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Form onSubmit={handleClick}>
      <h1>Forgot Password</h1>
        <Fragment>
          <FormGroup controlId="email">
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
          <Button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isDone}
            onClose={() => {setDone(false); history.push('/login')}}
            key={'topcenter'}
            autoHideDuration={15000}
          >
            <Alert severity="info">A password reset email has been sent to your email address, please follow the link to reset your password.
            If it doesn't appear within a few minutes, check your spam folder.</Alert>
          </Snackbar>
        </Fragment>
    </Form>
  );
}
