import React from 'react';
import '../styles/BasePage.css';


function DemoPreview(){
    const link = "/demo";
    return(
        <a href={ link }>
            <div className="eportfoliopreview">
                <h3>Demo Page</h3>
                <p>Showcase of what is possible</p>
                <img src={"https://emojis.slackmojis.com/emojis/images/1464135017/461/fb-wow.gif?1464135017"} alt='' height='100%' width='100%' />
            </div>
        </a>
    )
}

export default DemoPreview;