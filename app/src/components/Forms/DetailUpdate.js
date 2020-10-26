/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "../../styles/Form.css";
import { useFormFields } from "../../util/form";
import { isAuthorized } from "../../util/cookies";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function DetailUpdate() {
  const [isLoading, setLoading] = useState(true);
  const [isComplete, setComplete] = useState(false);
  const [user, setUser] = useState([]);

  const [fields, handleFieldChange] = useFormFields({
    new_Email: "",
    new_Firstname: "",
    new_Lastname: "",
  });

  useEffect(() => {
    const Auth = isAuthorized();

    async function getUser() {
      //get user id
      const requestOptions_id = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
      };
      const user_data = await fetch("api/auth/user", requestOptions_id);
      const returned_user = await user_data.json();
      setUser(returned_user);
    }

    async function handleSubmit() {
      //format patch body
      if (fields.new_Email.length !== 0) {
        await handlePatch(JSON.stringify({ email: fields.new_Email }));
        fields.new_Email = "";
      }
      if (fields.new_Firstname.length !== 0) {
        await handlePatch(JSON.stringify({ name_first: fields.new_Firstname }));
        fields.new_Firstname = "";
      }
      if (fields.new_Lastname.length !== 0) {
        await handlePatch(JSON.stringify({ name_last: fields.new_Lastname }));
        fields.new_Lastname = "";
      }
    }

    async function handlePatch(patch) {
      //patch
      const requestOptions_patch = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
        body: patch,
      };
      await fetch("/api/user/" + user.public_id, requestOptions_patch);
    }

    function validateForm() {
      return (
        fields.new_Email.length > 0 ||
        fields.new_Firstname.length > 0 ||
        fields.new_Lastname.length > 0
      );
    }

    if (isLoading) {
      if (validateForm()) {
        handleSubmit().then(() => {
          getUser();
          setLoading(false);
          setComplete(true);
        });
      } else {
        getUser();
        setLoading(false);
      }
    }
  }, [isLoading, fields, user]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Form onSubmit={handleClick}>
      <h1>Update Details</h1>
      <FormGroup controlId="new_Email">
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          onChange={handleFieldChange}
          value={fields.new_Email}
          placeholder={`${user.email}`}
          autoComplete="email"
        />
      </FormGroup>
      <FormGroup controlId="new_Firstname">
        <FormLabel>First name</FormLabel>
        <FormControl
          type="text"
          onChange={handleFieldChange}
          value={fields.new_Firstname}
          placeholder={`${user.name_first}`}
          autoComplete="given-name"
        />
      </FormGroup>
      <FormGroup controlId="new_Lastname">
        <FormLabel>Last name</FormLabel>
        <FormControl
          type="text"
          onChange={handleFieldChange}
          value={fields.new_Lastname}
          placeholder={`${user.name_last}`}
          autoComplete="family-name"
        />
      </FormGroup>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isComplete}
        onClose={() => setComplete(false)}
        key={'topcenter'}
        autoHideDuration={3000}
      >
        <Alert severity="success">Your details have been updated.</Alert>
      </Snackbar>
      <Button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Update"}
      </Button>
    </Form>
  );
}
