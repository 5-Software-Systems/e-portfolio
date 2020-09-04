/** Code adapted from https://serverless-stack.com/chapters/create-the-signup-form.html */

import React, { useState, useEffect, Fragment } from "react";
import { Button } from "react-bootstrap";

export default function Popup(props) {
    const name = props.name;
    const openButton = props.button;
    const content = props.children;

    function CloseButton() {
        const [isClose, setClose] = useState(false);

        useEffect(() => {
            if (isClose) {
                document.getElementById(name + "_form").style.display = "none";
                document.getElementById("cover").style.display = "none";
                setClose(false);
            }
        }, [isClose]);

        const handleClick = () => {setClose(true); };

        return (
            <Button
                className="btn cancel"
                variant="primary"
                onClick={handleClick}
                type="button"
            >
                Close
            </Button>
        );
    }

    return (
        <Fragment>
            { openButton }
            <div className="form-popup" id={name + "_form"}>
                <form action="/action_page.php" className="form-container">
                    { content }
                    <CloseButton />
                </form>
            </div>
            <div className="cover" id="cover"></div>
        </Fragment>
    );
}
