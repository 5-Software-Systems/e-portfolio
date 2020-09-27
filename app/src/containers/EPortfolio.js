import React, {useEffect, useState} from "react";
import ReactGridLayout from 'react-grid-layout';
import { useHistory } from "react-router-dom";
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'
import { isAuthorized } from "../util/cookies";

import MotherWidget from '../components/Widgets/MotherWidget.js'


export default function EPortfolio() {
    const Auth = isAuthorized();
    const history = useHistory();

    const [profile, setProfile] = useState([]);
    const [widgets, setWidget] = useState([]);

    const URL = window.location.href.split('/');
    const PID = URL[URL.length - 1]

    //store db
    useEffect( () =>{
        const fetchWidgets = async() => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth }
            };
            const p_response = await fetch('/api/portfolio/' + PID, requestOptions);
            const p_data = await p_response.json();
            if (p_data.error) {
                history.push("/profile");
                return;
            }
            setProfile(p_data.portfolio);

            const w_response = await fetch('/api/portfolio/' + PID + '/widget', requestOptions);
            const w_data = await w_response.json();
            setWidget(w_data.widgets);
        }

        fetchWidgets();
    }, [PID, history]);

    const width = 280;
    const height = 315;
    const columns = 6;

    return (
        <div className='wholePage'>
            <div>
                <h1 className="impact">
                    {profile.title}
                </h1>
            </div>
            <ReactGridLayout
                className="layout"
                cols={columns}
                rowHeight={height}
                width={columns * width}
                margin={[10,10]}
                compactType='horizontal'
            >
                {widgets.map(widget =>(
                    < div key={widget.public_id} data-grid={{i: widget.public_id, x: 3, y: 1, w: 1, h: 1}}> 
                        <MotherWidget widget={widget}/>
                    </ div>
                ))}
            </ReactGridLayout>
        </div>
    );
};

