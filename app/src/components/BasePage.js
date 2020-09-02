import React, {useEffect, useState, Fragment} from "react";
import EPortfolioPreview from "../containers/EPortfolioPreview";
import AddPortfolio from "../containers/AddPortfolio";
import "../styles/BasePage.css";

export default function BasePage(){

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

    function renderPage() {
        return (
            <div>
                <div className ="title">
                     <h1>{user.name_first}'s Base Page</h1>
                </div>
                <div className="basepage">
                    {profiles.map(profile =>(
                        < EPortfolioPreview name={profile.title} date={profile.public_id}/>
                    ))}
                    < AddPortfolio />
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex w-50">
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" class="pr-4" /></a>
                            <h1 className="pt-1">E-portfolio</h1>
                        </div>
                    </div>
                </nav>
            </header>
            {renderPage()}
            <footer className="border-top ">
                <p className="text-center text-muted pt-4"><a href="/" className="px-1">FiveCent Software Systems.</a></p>
            </footer>
        </Fragment>
    );
};