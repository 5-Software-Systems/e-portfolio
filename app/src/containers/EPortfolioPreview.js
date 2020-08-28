import React from 'react';
import '../BasePage.css';


function EPortfolioPreview({name, date, img}){
    return(
        <div className="eportfoliopreview">
            <h3>{name}</h3>
            <p> {date} </p>
            <img src={img} alt='foggers' height='150'/>
        </div>
    )
}

export default EPortfolioPreview;