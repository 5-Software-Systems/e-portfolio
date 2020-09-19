import React from 'react';
import '../styles/BasePage.css';


function EPortfolioPreview(props){
    const link = "/portfolio/" + props.id;
    const options = ["Edit", "Delete"]
    return(
        <div className="eportfoliopreview"> 
            <button type="button" class="button">
                ···
            </button>
            <div> 
                <a href={ link }>
                    <div>
                        <h3>{props.name}</h3>
                        <p> {props.id} </p>
                        <img src={props.img} alt='' height='150'/>
                    </div>
                </a>
            </div>
            
        </div>
        
    )
}

export default EPortfolioPreview;