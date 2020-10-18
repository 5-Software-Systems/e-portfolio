import React from "react";
import EPortfolioPreview from "../components/EPortfolioPreview";
import "../styles/BasePage.css";


export default function Examples() {
    

    return (
        <div className="container">
            <div className="basepage">
                < EPortfolioPreview name={'Tutorial'} id={'tutorial'} />
                < EPortfolioPreview name={'Echidna'} id={'echidna'} />
                < EPortfolioPreview name={'From humble beginnings...'} id={'demo'} />
                < EPortfolioPreview name={"Calvin's Portfolio"} id={'calvin'} />
            </div>
        </div>
    );
};