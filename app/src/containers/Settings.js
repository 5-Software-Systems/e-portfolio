import React, { useState } from "react";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import DetailUpdate from "../components/Forms/DetailUpdate";
import { deauthorize } from "../util/cookies";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../util/form";
import Popup from "reactjs-popup";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function Settings() {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        response: "",
      });
    const [invalid, setInvalid] = useState(false);

    async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
    }

    async function handleSubmit() {
        console.log(fields.response);
        if (String(fields.response).toLowerCase() === "delete") {
            // TODO Delete user
            alert("You haven't been deleted, but I will make this work eventually")
            // handleLogout();
        } else {
          setInvalid(true);
        }
    }

  return (
    <div className="form-container m-auto">
        <DetailUpdate />
        <Popup
          trigger={<Button className="btn cancel"> Delete </Button>}
          modal
          nested
          className="ePortfolio-popup"
          closeOnDocumentClick={false}
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header2">
                {" "}
                <h1>Are you sure you want to delete your account?</h1>{" "}
              </div>
                <div className="actions">
                  <Form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
                        <FormGroup controlId="response">
                            <FormControl
                              type="text"
                              values={fields.response}
                              onChange={handleFieldChange}
                              placeholder="Delete"
                              required
                            />
                        </FormGroup>
                        <p>Confirm you wish to delete your account by typing 'delete' into the text box.<br/>
                           This action cannot be undone.</p>
                        <button
                          className="button"
                          type="submit"
                        >
                          <b className="deleteText"> Delete </b>{" "}
                        </button>
                  </Form>
                </div>
            </div>
          )}
        </Popup>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={invalid}
            onClose={() => setInvalid(false)}
            key={'topcenter'}
            autoHideDuration={2000}
        >
          <Alert severity="error">You must type 'delete' to delete your account!</Alert>
        </Snackbar>
    </div>
  );
}
