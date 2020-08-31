import React, {useEffect, useState} from "react";
import EPortfolioPreview from "./containers/EPortfolioPreview";
import AddPortfolio from "./containers/AddPortfolio";

function BasePage(){

    //grab user
    var userID = "737bad35-39f8-4ae1-978a-6f60bd32ae56"

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
                < EPortfolioPreview name={"du ma"} date={"today 24:01 XD"} img={process.env.PUBLIC_URL + '/images/foggers.png'}/>
                < EPortfolioPreview name={"Mày chửi thế cái con cặc du nói chuyện vô văn hóa,mày coi chừng mày chết với tao nha mậy"} date={"30/10/1999"} img={process.env.PUBLIC_URL + '/images/labtime.png'}/>
            </div>
        </div>

    );
}

export default BasePage;