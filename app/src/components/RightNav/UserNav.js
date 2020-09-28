import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
import { deauthorize } from "../../util/cookies";
import '../../styles/usernav.css';

export default function UserNav() {
    const history = useHistory();

    async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
    }

    function toProfile() {
        history.push("/profile");
    }

    function toSettings() {
        history.push("/settings");
    }

    return (

        <Popup
            trigger={<Button className="menu_icon btn-info m-2" type="button">≡</Button>}
            position="left top"
            on="hover"
            closeOnDocumentClick
            mouseLeaveDelay={400}
            mouseEnterDelay={10}
            contentStyle={{ padding: '10px', border: 'none' }}
            arrow={false}
        >
            <div className="menu">
                <div className="menu-item" onClick={toProfile}> Portfolio Gallery</div>
                <div className="menu-item" onClick={toSettings}> Account Settings</div>
                <div className="menu-item" onClick={handleLogout}> Logout</div>
            </div>
        </Popup>
    );
};