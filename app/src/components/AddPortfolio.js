import React, { useState, Fragment } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/BasePage.css';
import { isAuthorized } from "../util/cookies";


function AddPortfolioInfo(){
    return(
        <Fragment>
            <h3>Add ePortfolio</h3>
            <h1> + </h1>
        </Fragment>
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
        await fetch('/api/user/' + props.PID + '/portfolio/' + data.portfolio.public_id + '/widget', postInitialWidget);
    }
    
    const handleClick = (e) => {
        handleSubmit();
        update();
    };
    

    return (
        <div className="eportfoliopreview">
            <div className="eportfolioinfo">
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
                                <Form className='actions' onSubmit={() => {close(); handleClick();}}>
                                    <FormGroup controlId="basePageTextBox">
                                        <FormLabel>Portfolio Name:</FormLabel>
                                        <FormControl
                                            type="text"
                                            values = {name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Untitled"
                                            required/>
                                    </FormGroup>
                                    <Button className="button" type="submit">Add</Button>
                                </Form>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}
