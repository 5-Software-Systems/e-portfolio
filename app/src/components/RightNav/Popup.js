import React, { useState, Fragment } from "react";
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import '../../styles/Form.css';

export default function CustomPopup(props) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    function CloseButton() {
        return (
            <Button className="btn cancel" onClick={closeModal}>
                Close
            </Button>
        );
    }

    return (
        <Fragment>
            <Button color="inherit" onClick={() => setOpen(o => !o)}>
                { props.name }
            </Button>
            <Popup className="form modal" open={open} closeOnDocumentClick onClose={closeModal} modal >
                <div className="form-container">
                    { props.children }
                    <CloseButton />
                </div>
            </Popup>
        </Fragment>
    );
}
