import React, { useState }from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/BasePage.css';
import { isAuthorized } from "../util/cookies";


function AddPortfolioInfo(){
    return(
        <div className="eportfoliopreview">
            <h3>Add ePortfolio</h3>
            <h1> + </h1>
        </div>
    )
}

export default function AddPortfolio(props) {
    const Auth = isAuthorized();    


    const [name, setName] = useState('')

    function update() {
        if (props.onUpdate) {
            props.onUpdate();
        }
    }

    async function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
            body: JSON.stringify({
                "title": name
              })
        };
        const portfolio = await fetch('api/user/'+ props.PID + '/portfolio', requestOptions);

        const data = await portfolio.json();

        console.log(data);
        
        const postInitialWidget = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
            body: JSON.stringify({
                        type: "about",
                        location: [1,1,0,0],
                        data:{
                            about: "I am a widget! \n\n Feel free to resize me from the bottom right corner. \n You can also drag me around to change my position. \n\n You can also change what I display using the cog on the bottom left. \n You can also delete me 🥺 \n\n Also, if you want more widgets, click the 'Add Widget' button on the top right of your screen!"
                            }
                        
                    })
        };
        await fetch('/api/portfolio/' + data.portfolio.public_id + '/widget', postInitialWidget);
    }
    

    

    return (
        <Popup
            trigger={<button className="addButton"> {AddPortfolioInfo()} </button>}
            modal
            className="ePortfolio-popup"
            closeOnDocumentClick={false}
            nested>
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header2"> <h1>Add Portfolio</h1> </div>
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
