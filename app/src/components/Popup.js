/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

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
            <Button className="btn cancel" variant="primary" onClick={closeModal} type="button">
                Close
            </Button>
        );
    }

    return (
        <div>
            <button type="button" className="btn btn-info m-2" onClick={() => setOpen(o => !o)}>
                { name }
            </button>
            <Popup className="modal" open={open} closeOnDocumentClick onClose={closeModal} modal >
                <form action="/action_page.php" className="form-container">
                    { content }
                    <CloseButton />
                </form>
            </Popup>
        </div>
    );
}
