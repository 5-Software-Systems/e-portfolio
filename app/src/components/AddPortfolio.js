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

export default function AddPortfolio() {

    const [name, setName] = useState()

    console.log(name);

    return (
        <Popup
            trigger={<button className="button"> {AddPortfolioInfo()} </button>}
            modal
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
                        Portfolio Name:
                        <input type="text" name="name" value={name} onChange={setName} />
                    </label>
                </form>   
                </div>
                <div className="actions">
                <button className="button"> Trigger </button>

                </div>
            </div>
            )}
        </Popup>
    )
}
