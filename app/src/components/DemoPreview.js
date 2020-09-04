import React from 'react';
import '../styles/BasePage.css';


function DemoPreview(){
    const link = "/demo";
    return(
        <a href={ link }>
            <div className="eportfoliopreview">
                <h3>{"Demo Page"}</h3>
                <p> {"this could be us but we playin"} </p>
                <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/face-with-pleading-eyes_1f97a.png"} alt='' height='100%' width='100%' />
            </div>
        </a>
    )
}

export default DemoPreview;