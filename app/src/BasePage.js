import React from "react";
import EPortfolioPreview from "./containers/EPortfolioPreview";

function BasePage(){
    return(
        <div>
            <div>
                <h1>Base Page</h1>
            </div>
            <div className="basepage">
                < EPortfolioPreview name={"du ma"} date={"today 24:01 XD"} img={process.env.PUBLIC_URL + '/images/foggers.png'}/>
                < EPortfolioPreview name={"Mày chửi thế cái con cặc du nói chuyện vô văn hóa,mày coi chừng mày chết với tao nha mậy"} date={"30/10/1999"} img={process.env.PUBLIC_URL + '/images/labtime.png'}/>
                < EPortfolioPreview name={"banh mi"} date={"23/10/1999"} img={process.env.PUBLIC_URL + '/images/lofi.jpg'}/>
                < EPortfolioPreview name={"pho"} date={"25/10/1999"} img={process.env.PUBLIC_URL + '/images/toothbruh.jpg'}/>
            </div>
        </div>

    );
}

export default BasePage;