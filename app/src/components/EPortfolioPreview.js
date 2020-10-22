import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import '../styles/BasePage.css';
import '../styles/ePortfolio-popup.css';
import { isAuthorized } from "../util/cookies";
import { FileUpload, FilePopUp } from "./FileUpload"



function EPortfolioPreview(props){
    const Auth = isAuthorized();
    const link = "user/" + props.user + "/portfolio/" + props.id;

    //delete function 
    async function handleDelete() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
        };
        await fetch('api/'+ link, requestOptions);
    }

    //edit funciton 
    const [newName, setNewName] = useState(props.name)

    async function handleEdit() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
            body: JSON.stringify({
                "title": newName
              })
        };
        await fetch('api/'+ link, requestOptions);
    }
    

    function editButton() {
        
        return (
            <Popup
                trigger={<button className="menu-item" > Edit </button>}
                modal
                nested
                className="ePortfolio-popup"
                closeOnDocumentClick={false}>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header2"> <h1>Edit Portfolio</h1> </div>
                    <div className="content2">
                    {' '}
                    <div>
                        <label>
                            Portfolio Name:<br />
                            <input className='basePageTextBox'
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </label>
                    </div>
                        <FileUpload userID={props.user}/>
                        <FilePopUp user={props.user}/>
                    </div>
                    <div className="actions">
                    <button className="button" onClick={() => {
                                handleEdit();
                                close();
                                update();
                    }}> Apply </button>

                    </div>
                </div>
                )}
            </Popup>
        )
    }

    function deletePopup() {
        
        return (
            <Popup
                trigger={<button className="menu-item" > Delete  </button>}
                modal
                nested
                className="ePortfolio-popup"
                closeOnDocumentClick={false}>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header2"> <h1>Are you sure you want to delete this portfolio?</h1> </div>
                    <div className="actions">
                    {' '}
                    <div>
                        <p> 
                            This action cannot be undone.  
                        </p>
                    </div>
                    </div>
                    <div className="actions">
                    <button className="button" onClick={() => {
                                handleDelete();
                                close();
                                update();
                    }}> <b className='deleteText'> Delete </b> </button>

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
                trigger={<button className="menu-item"><span role="img">⚙</span></button>}
                position="right bottom"
                on={['hover', 'focus']}
                mouseLeaveDelay={100}
                mouseEnterDelay={0}
                contentStyle={{ padding: '0px', border: 'none' ,width: '80px'}}
                arrow={false}
                nested
                className="basepage"
                >
                {close => (
                    <div className="menu">
                        <button className="menu-item" onClick={() => {
                            copyToClipboard(window.location.host + "/portfolio/" + props.id);
                            close();
                            alert("Copied to clipboard");
                        }}> Share </button>
                        {editButton()}
                        {deletePopup()}
                    </div>
                )}
                
            </Popup>
        )
    }

    //https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    function update() {
        if (props.onUpdate) {
            props.onUpdate();
        }
    }

    return(
        <div className="eportfoliopreview">
            <a href={ "/portfolio/" + props.id } className="eportfolioinfo">
                <h3>{props.name}</h3>
                <p> {props.id} </p>
                <img src={props.img ? props.img : "/images/placeholder.jpg"} alt="" height='150'/>
            </a>
            <div className="button_container" >
                {settingsButton()}
            </div>
            
        </div>
        
    )
}

export default EPortfolioPreview;