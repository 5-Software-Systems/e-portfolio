import React, {useEffect, useState}from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/BasePage.css';

function AddPortfolioInfo(){
    return(
        <div className="eportfoliopreview">
            <h3>Add ePortfolio</h3>
            <h1> + </h1>
        </div>
    )
}

export default function AddPortfolio(props) {

    const [name, setName] = useState('')

    function update() {
        if (props.onUpdate) {
            props.onUpdate();
        }
    }

    async function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": name
              })
        };
        await fetch('api/user/'+ props.PID + '/portfolio', requestOptions);
    }
    

    return (
        <Popup
            trigger={<button className="addButton"> {AddPortfolioInfo()} </button>}
            modal
            closeOnDocumentClick={false}
            nested>
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
                        Portfolio Name:<br />
                        <input className='basePageTextBox' type="text" placeholder="Untitled" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </form>   
                </div>
                <div className="actions">
                <button className="button" onClick={() => {
                            handleSubmit();
                            close(); 
                            update();
                }}> Add </button>
                </div>
            </div>
            )}
        </Popup>
    )
}
