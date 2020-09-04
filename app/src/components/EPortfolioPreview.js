import React from 'react';
import '../styles/BasePage.css';


function EPortfolioPreview(props){
    const link = "/portfolio/" + props.id;
    return(
        <a href={ link }>
            <div className="eportfoliopreview content-wrapper">
                <h3>{props.name}</h3>
                <p> {props.id} </p>
                <img src={props.img} alt='' height='150'/>
            </div>
        </a>
    )
}

export default EPortfolioPreview;