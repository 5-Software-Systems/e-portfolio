import React, {useEffect, useState} from "react";
import EPortfolioPreview from "../components/EPortfolioPreview";
import AddPortfolio from "../components/AddPortfolio";
import "../styles/BasePage.css";
import { isAuthorized } from "../util/cookies";
import { useHistory } from "react-router-dom";

export default function Gallery() {
    const history = useHistory();
    const Auth = isAuthorized();

    if (! Auth) {
        history.push('/login');
    }

    //check for updates
    const [update, setUpdate] = useState(false);

    function setUpdateTrue() {
        setUpdate(!update);
    }

    //store user and portfolio
    const [user, setUser] = useState();
    const [profiles, setProfiles] = useState([]);

    //fetch user and portfolios 
    useEffect( () =>{
        
        const fetchProfiles = async() => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth }
            };
            const user_data = await fetch('/api/auth/user', requestOptions);
            const user = await user_data.json();
            setUser(user.public_id);

            const prof_data = await fetch('/api/user/' + user.public_id + '/portfolio', requestOptions);
            const profile = await prof_data.json();
            setProfiles(profile.portfolios);
        }
        fetchProfiles();
    }, [Auth, update])

    //-----------------------------------------------------------------------------------------------------
    

    return (
        <div className="container">
            <div className="basepage">
                {profiles.map(profile =>(
                    < EPortfolioPreview key={profile.public_id} name={profile.title} id={profile.public_id} user={user} img={profile.background_url}
                    onUpdate={(e) => setUpdateTrue()}/>
                ))}
                < AddPortfolio PID = {user} onUpdate={(f) => setUpdateTrue()}/>
            </div>
        </div>
    );
};