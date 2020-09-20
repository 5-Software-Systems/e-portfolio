//your mum 
import React, {useEffect, useState} from "react";
//-----------dependencies------------------------
import ReactGridLayout from 'react-grid-layout';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//------------------------------------------------
import { useHistory } from "react-router-dom";
import { isAuthorized } from "../util/cookies";
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'

import MotherWidget from '../components/Widgets/MotherWidget.js'


export default function EPortfolio() {
    const history = useHistory();

    const Auth = isAuthorized();
    if (! Auth) {
        history.push("/login");
    }

    const [profile, setProfile] = useState([]);
    const [widgets, setWidget] = useState([]);

    
    const URL = window.location.href.split('/');
    const PID = URL[URL.length - 1]

        //store db
    useEffect( () =>{
        const fetchWidgets = async() => {
            const p_response = await fetch('/api/portfolio/' + PID);
            const p_data = await p_response.json();
            if (p_data.error) {
                history.push("/profile");
                return;
            }
            setProfile(p_data.portfolio);

            const w_response = await fetch('/api/portfolio/' + PID + '/widget');
            const w_data = await w_response.json();
            setWidget(w_data.widgets);
        }

        fetchWidgets();
    }, [PID, history]);

    const width = 280;
    const height = 315;
    const columns = 6;

    async function addWidget() {
        console.log("jeff");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                                    type: "about", 
                                    data:{
                                        about: "New add button on eportfolio today"
                                        }
                                })
        };
        await fetch('/api/portfolio/' + PID + '/widget', requestOptions);
        window.location.reload(false);
    }

    const Modal = () => (
        <Popup
            trigger={<button className="button"> Open Modal </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Modal Title </div>
                <div className="content">
                {' '}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </div>
                <div className="actions">
                <Popup
                    trigger={<button className="button"> Trigger </button>}
                    position="top center"
                    nested
                >
                    <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                    magni omnis delectus nemo, maxime molestiae dolorem numquam
                    mollitia, voluptate ea, accusamus excepturi deleniti ratione
                    sapiente! Laudantium, aperiam doloribus. Odit, aut.
                    </span>
                </Popup>
                <button
                    className="button"
                    onClick={() => {
                    console.log('modal closed ');
                    close();
                    }}
                >
                    close modal
                </button>
                </div>
            </div>
            )}
        </Popup>
      );

    return (
        <div className='wholePage'>
            <div className='header'>
                <div className ='left'>
                    <h1 className="impact">
                        {profile.title}
                    </h1>
                </div>
                <div className='right'> 
                    <button className='addWidgetButton' onClick={addWidget} > Add Widget </button>
                </div>
            </div>
            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType='horizontal' >
                {widgets.map(widget =>(
                    < div key={widget.public_id} data-grid={{i: widget.public_id, x: 3, y: 1, w: 1, h: 1}}> 
                        <MotherWidget widget={widget}/>
                        <div className ='overlay'>
                            <button className='button' onClick={Modal}>⚙️</button>
                        </div>
                    </ div>
                ))}
            </ReactGridLayout>
        </div>
    );
};





