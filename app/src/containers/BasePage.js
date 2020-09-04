import React, {useEffect, useState } from "react";
import EPortfolioPreview from "../components/EPortfolioPreview";
import AddPortfolio from "../components/AddPortfolio";
import "../styles/BasePage.css";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

export default function BasePage(){

    var Auth;
    const history = useHistory();
    if ((Auth = new Cookies().get('authorization')) == null) {
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
    })

    return (
        <div>
            <div className ="title banner">
                 <h1>{user.name_first}'s Base Page</h1>
            </div>
            <div className="basepage container">
                {profiles.map(profile =>(
                    < EPortfolioPreview name={profile.title} date={profile.public_id}/>
                ))}
                < AddPortfolio />
            </div>
        </div>
    );
};