import React, {useEffect, useState} from "react";
import { isAuthorized } from "../util/cookies";

export default function Welcome() {
    const Auth = isAuthorized();

    //grab user
    const [user, setUser] = useState([]);

    //store db
    useEffect( () =>{
        const fetchUser = async() => {
            const user_data = await fetch('/api/auth/user', {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
            const user = await user_data.json();
            setUser(user);
        }

        fetchUser();
    }, [Auth])

    return (
        <h5 className="m-auto pr-4">
            Welcome {user.name_first}
        </h5>
    );
};