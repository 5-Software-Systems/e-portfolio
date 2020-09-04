import React from 'react';
import '../styles/BasePage.css';


function EPortfolioPreview({name, date, img}){
    return(
        <a href="/portfolio">
            <div className="eportfoliopreview content-wrapper">
                <h3>{name}</h3>
                <p> {date} </p>
                <img src={img} alt='' height='150'/>
            </div>
        </a>
    )
}

export default EPortfolioPreview;