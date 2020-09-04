import React, {useEffect, useState} from "react";
import EPortfolioPreview from "../components/EPortfolioPreview";
import AddPortfolio from "../components/AddPortfolio";
import "../styles/BasePage.css";
import { useHistory } from "react-router-dom";
import { isAuthorized } from "../util/cookies";

export default function BasePage() {
    const history = useHistory();
    const Auth = isAuthorized();
    if (! Auth) {
        history.push("/login");
    }

    //grab profiles and user
    const [user, setUser] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const fetchProfiles = async() => {
        const user_data = await fetch('/api/auth/user', {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
        const user = await user_data.json();
        setUser(user);

        const prof_data = await fetch('/api/user/' + user.public_id + '/portfolio');
        const profile = await prof_data.json();
        setProfiles(profile.portfolios);
    }

    //store db
    useEffect( () =>{
        fetchProfiles();
    }, [])

    console.log(profiles)

    return (
        <div>
            <div className ="title banner">
                 <h1>{user.name_first}'s Base Page</h1>
            </div>
            <div className="basepage container">
                {profiles.map(profile =>(
                    < EPortfolioPreview name={profile.title} id={profile.public_id}/>
                ))}
                < AddPortfolio />
            </div>
        </div>
    );
};