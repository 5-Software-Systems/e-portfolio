import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import "../../styles/Form.css";

import LoginForm from "../Forms/Login_Form";
import SignupForm from "../Forms/Signup_Form";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
}));

export default function CustomPopup(props) {
  const [open, setOpen] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const classes = useStyles();

  const handleSubmit = () => {
    handleClose();
    setComplete(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  var content;
  var alert;

  if (props.name === "Login") {
    content = LoginForm(() => handleSubmit());
    alert = null;
  } else if (props.name === "Sign Up") {
    content = SignupForm(() => handleSubmit());
    alert = <Alert severity="info">A verification email has been sent to your email address, please follow the link to verify your account before logging in.
          If it doesn't appear within a few minutes, check your spam folder.</Alert>
  }

  return (
    <Fragment>
      <Button color="inherit" onClick={() => setOpen((o) => !o)}>
        {props.name}
      </Button>
      <Modal
        className={classes.modal}
        aria-labelledby={props.name}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className="form-container">
            {content}
            <Button className="btn cancel" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isComplete}
        onClose={() => setComplete(false)}
        key={'topcenter'}
        autoHideDuration={15000}
      >
        {alert}
      </Snackbar>
    </Fragment>
  );
}
