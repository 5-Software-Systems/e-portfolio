import React, {useEffect, useState} from "react";
import EPortfolioPreview from "./EPortfolioPreview";
import AddPortfolio from "./AddPortfolio";
import "../styles/BasePage.css";

function BasePage(){

    //enter user id here 
    var userID = "c0e6aa7b-db70-4675-88d9-699bee38f154"

    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        const data = await fetch('/api/user/'+ userID);
        const user = await data.json();
        console.log(user.user);
        setUser(user.user);
    }

    //grab profiles
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = async() => {
        const data = await fetch('/api/user/' + userID + '/portfolio');
        const profile = await data.json();
        console.log(profile.portfolios);
        setProfiles(profile.portfolios);
    }

    //store db
    useEffect( () =>{
        fetchUser();
        fetchProfiles();
    }, [])

    return(
        <div>
            <div className ="title">
                 <h1>{user.name_first}'s Base Page</h1>
            </div>
            <div className="basepage">
                < AddPortfolio /> 
                {profiles.map(profile =>(
                    < EPortfolioPreview name={profile.title} date={profile.public_id}/>
                ))}
            </div>
        </div>

    );
}

export default BasePage;