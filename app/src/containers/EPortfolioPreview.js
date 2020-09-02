import React from 'react';
import '../styles/BasePage.css';


function EPortfolioPreview({name, date, img}){
    return(
        <div className="eportfoliopreview">
            <h3>{name}</h3>
            <p> {date} </p>
            <img src={img} alt='image' height='150'/>
        </div>
    )
}

export default EPortfolioPreview;