import React, { useState, Fragment } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import '../../styles/Form.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
}));

export default function CustomPopup(props) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function CloseButton() {
        return (
            <Button className="btn cancel" onClick={handleOpen}>
                Close
            </Button>
        );
    }

    return (
        <Fragment>
            <Button color="inherit" onClick={() => setOpen(o => !o)}>
                { props.name }
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
                        { props.children }
                        <CloseButton />
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
}
