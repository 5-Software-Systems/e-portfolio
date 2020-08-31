import React from 'react';
import '../BasePage.css';


function AddPortfolio(){
    return(
        <div className="addportfolio">
            <h3>Add ePortfolio</h3>
            <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='image' height='150'/>
        </div>
    )
}

export default AddPortfolio;