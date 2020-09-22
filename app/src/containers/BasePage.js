import React, {useEffect, useState} from "react";
import EPortfolioPreview from "../components/EPortfolioPreview";
import AddPortfolio from "../components/AddPortfolio";
import DemoPreview from "../components/DemoPreview";
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
    const [user, setUser] = useState();
    const [profiles, setProfiles] = useState([]);

    //store db
    useEffect( () =>{
        
        const fetchProfiles = async() => {
            const user_data = await fetch('/api/auth/user', {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
            const user = await user_data.json();
            setUser(user.public_id);

            const prof_data = await fetch('/api/user/' + user.public_id + '/portfolio');
            const profile = await prof_data.json();
            setProfiles(profile.portfolios);
        }
        fetchProfiles();
    }, [Auth])

    return (
        <div>
            <div className="basepage">
                {profiles.map(profile =>(
                    < EPortfolioPreview key={profile.public_id} name={profile.title} id={profile.public_id}/>
                ))}
                < DemoPreview />
                < AddPortfolio PID = {user}/>
                
            </div>
        </div>
    );
};