import React, {useEffect, useState} from "react";
import ReactGridLayout from 'react-grid-layout';
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

    return (
        <div className='wholePage'>
            <div>
                <h1 className="impact">
                    {profile.title}
                </h1>
            </div>
            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType='horizontal' >
                {widgets.map(widget =>(
                    < div key={widget.public_id} data-grid={{i: widget.public_id, x: 3, y: 1, w: 1, h: 1}}> 
                        <MotherWidget widget={widget}/>
                    </ div>
                ))}
            </ReactGridLayout>
        </div>
    );
};

