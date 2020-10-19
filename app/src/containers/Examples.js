import React from "react";
import DemoPreview from "../components/DemoPreview";
import "../styles/BasePage.css";


export default function Examples() {
    

    return (
        <div className="container">
            <div className="basepage">
                < DemoPreview name={'Tutorial'} id={'tutorial'} />
                < DemoPreview name={'Echidna'} id={'echidna'} />
                < DemoPreview name={'From humble beginnings...'} id={'demo'} />
                < DemoPreview name={"Calvin's Portfolio"} id={'calvin'} />
            </div>
        </div>
    );
};