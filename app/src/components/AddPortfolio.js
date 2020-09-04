import React from 'react';
import '../styles/BasePage.css';

export default function AddPortfolio(){
    return(
        <div className="addportfolio content-wrapper">
            <h3>Add ePortfolio</h3>
            <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='' height='150'/>
        </div>
    )
}
