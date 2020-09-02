import React, {useEffect, useState, Fragment} from "react";
import EPortfolioPreview from "../containers/EPortfolioPreview";
import AddPortfolio from "../containers/AddPortfolio";
import Logout from "../containers/Logout";
import "../styles/BasePage.css";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

export default function BasePage(){

    const cookies = new Cookies();
    var Auth;
    const history = useHistory();
    if ((Auth = cookies.get('authorization')) == null) {
        history.push("/");
    }

    //grab profiles and user
    const [user, setUser] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const fetchProfiles = async() => {
        const user_data = await fetch('/api/auth/user' , {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
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
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" className="pr-4" /></a>
                            <h1 className="pt-1">ePortfolio</h1>
                        </div>
                        <div className="navbar-menu-wrapper navbar-nav">
                            <h5 className="m-auto pr-5">Welcome {user.name_first}</h5>
                            <Logout />
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