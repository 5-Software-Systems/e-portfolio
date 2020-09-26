import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Popup from 'reactjs-popup';

export default function CustomPopup(props) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const name = props.name;
    const content = props.children;

    function CloseButton() {
        return (
            <Button className="btn cancel" onClick={closeModal} type="button">
                Close
            </Button>
        );
    }

    return (
        <div>
            <Button className="btn btn-info m-2" onClick={() => setOpen(o => !o)} type="button">
                { name }
            </Button>
            <Popup className="modal" open={open} closeOnDocumentClick onClose={closeModal} modal >
                <div className="form-container">
                    { content }
                    <CloseButton />
                </div>
            </Popup>
        </div>
    );
}
