import React from "react";
import { Button } from "react-bootstrap";
import { isAuthorized, deauthorize } from "../../util/cookies";
import { useHistory } from "react-router-dom";

export default function Logout() {
    const history = useHistory();
    const Auth = isAuthorized();
    if (! Auth) {
        history.push("/");
    }

    async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
    }

    return (
        <Button
            className="btn btn-info m-2"
            variant="primary"
            onClick={handleLogout}
            type="button"
        >
            Logout
        </Button>
    );
}

