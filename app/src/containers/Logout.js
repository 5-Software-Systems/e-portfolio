import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import './Pop-up.css';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

export default function Logout() {
    const cookies = new Cookies();
    var Auth;
    const history = useHistory();
    if ((Auth = cookies.get('authorization')) == null) {
        history.push("/");
    }

    async function handleLogout() {
        // register logout with backend
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth }
        };
        const response = await fetch('api/auth/logout', requestOptions);
        const data = await response.json();
        console.log(data.message)
        // clear cookies
        cookies.remove('authorization');
        // logout redirect to home
        history.push("/");
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

