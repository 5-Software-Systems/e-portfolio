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
import { FilePopUp } from "../components/FileUpload";


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


    const [name, setName] = useState('');
    const [image, setImage] = useState('');

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
                "title": name,
                "background_url": image
              })
        };
        const portfolio = await fetch('api/user/'+ props.PID + '/portfolio', requestOptions);

        const data = await portfolio.json();
        
        const postInitialWidget = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
            body: JSON.stringify({
                        type: "about",
                        location: [3,1,0,0],
                        data:{
                            about: '{"blocks":[{"key":"fsk7q","text":"I am a widget!","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ea43","text":"Feel free to resize me from the bottom right corner.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"blk1i","text":"You can:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4uqhk","text":"drag me around to change my position","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7eg9v","text":"change what I display using the cog on the bottom left","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"qdhj","text":"delete me 🥺","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"12mk8","text":"Also, if you want more widgets, click the \'Add Widget\' button on the top right of your screen!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
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
                            <div className="content2">
                                <Form className='cunny' onSubmit={() => {close(); handleClick();}}>
                                    <FormGroup controlId="basePageTextBox">
                                        <FormLabel><h5>Portfolio Name:</h5></FormLabel>
                                        <FormControl
                                            type="text"
                                            value = {name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Untitled"
                                            required/>
                                        <br/>
                                        <br/>
                                        <FormLabel><h5>Preview Image:</h5></FormLabel>
                                        <FormControl
                                            type="text"
                                            value = {image}
                                            onChange={(e) => setImage(e.target.value)}
                                            placeholder="URL"
                                            />
                                    </FormGroup>
                                    <br/>
                                    <FilePopUp userID={props.PID} setImage={(e) => {setImage(e)}}/>
                                    <div className='actions'>
                                        <button className="button" type="submit"><b>ADD</b></button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}
