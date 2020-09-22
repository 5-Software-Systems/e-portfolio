import React, {useRef, useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/BasePage.css';


function EPortfolioPreview(props){
    
    const link = "/portfolio/" + props.id;


    //delete function 
    async function handleDelete() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch('api/'+ link, requestOptions);
        console.log("daddy deleted");
    }

    //edit funciton 
    const [newName, setNewName] = useState(props.name)

    async function handleEdit() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": newName
              })
        };
        await fetch('api/'+ link, requestOptions);
        console.log("edited");
    }

    function editButton() {
        return (
            <Popup
                trigger={<button className="button"> Edit </button>}
                modal
                nested
                closeOnDocumentClick>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> Add Portfolio </div>
                    <div className="content">
                    {' '}
                    <form>
                        <label>
                            Portfolio Name:
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </label>
                    </form>   
                    </div>
                    <div className="actions">
                    <button className="button" onClick={() => {
                                handleEdit();
                                window.location.reload(false);
                    }}> Apply </button>

                    </div>
                </div>
                )}
            </Popup> 
        )
    }

    //settings button 
    function settingsButton() {
        return (
            <Popup
                trigger={<button className="menu-item">  ⚙️  </button>}
                position="right bottom"
                on="click"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: '0px', border: 'none' }}
                arrow={false}
                nested
                >
                <div className="menu">
                    <div className="menu-item"> {editButton()} </div>
                    <button className="menu-item" onClick={() => {
                        handleDelete();
                        window.location.reload(false);
                        }
                    }> Delete </button>
                </div>
            </Popup>
        )
    }


    return(
        <div className="eportfoliopreview"> 
            <div class="eportfolioinfo"> 
                <a href={ link }>
                    <div>
                        <h3>{props.name}</h3>
                        <p> {props.id} </p>
                        <img src={props.img} alt='' height='150'/>
                    </div>
                </a>
            </div>
            <div class="button_container" > 
                {settingsButton()}
            </div>
            
        </div>
        
    )
}

export default EPortfolioPreview;