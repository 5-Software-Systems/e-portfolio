import React, {useEffect, useState} from "react";
import EPortfolioPreview from "./containers/EPortfolioPreview";
import AddPortfolio from "./containers/AddPortfolio";

function BasePage(){

    //test user
    var userID = "1a933523-99e9-4ebb-86f9-aff4e920763e"

    const [user, setUser] = useState([]);

    useEffect( () =>{
        fetchUser();
    }, [])

    const fetchUser = async () => {
        const data = await fetch('/api/user/'.concat(userID));
        const user = await data.json();
        console.log(user.user);
        setUser(user.user);
    }

    return(
        <div>
            <div className ="title">
                 <h1>{user.name_first}'s Base Page</h1>
            </div>
            <div className="basepage">
                < AddPortfolio /> 
                < EPortfolioPreview name={"du ma"} date={"today 24:01 XD"} img={process.env.PUBLIC_URL + '/images/foggers.png'}/>
                < EPortfolioPreview name={"Mày chửi thế cái con cặc du nói chuyện vô văn hóa,mày coi chừng mày chết với tao nha mậy"} date={"30/10/1999"} img={process.env.PUBLIC_URL + '/images/labtime.png'}/>
            </div>
        </div>

    );
}

export default BasePage;