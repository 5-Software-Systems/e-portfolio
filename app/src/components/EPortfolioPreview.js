import React, {useRef, useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/BasePage.css';


function EPortfolioPreview(props){
    
    const link = "/portfolio/" + props.id;
    
    async function handleDelete() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch('api/'+ link, requestOptions);
        console.log("daddy deleted");
    }

    return(
        <div className="eportfoliopreview"> 
            <div class="button_container" > 
                <Popup
                    trigger={<button className="menu-item">  ⚙️  </button>}
                    position="right bottom"
                    on="click"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                    >
                    <div className="menu">
                        <div className="menu-item"> Edit</div>
                        <button className="menu-item" onClick={() => {
                            handleDelete();
                            window.location.reload(false);
                            }
                        }> Deleting </button>
                    </div>
                </Popup>
            </div>
           
            <div class="eportfolioinfo"> 
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