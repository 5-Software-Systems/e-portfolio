import React, {useEffect, useState} from "react";
import ReactGridLayout from 'react-grid-layout';
import EPortfolioPreview from '../components/EPortfolioPreview';
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

    const [user, setUser] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [widgets, setWidget] = useState([]);

    console.log(widgets) ;
    console.log('bruhmoment');
    console.log(window.location.href);
    const URL = window.location.href.split('/');
    const PID = URL[URL.length - 1]
    console.log(PID);
    
    const fetchWidgets = async() => {
        const user_data = await fetch('/api/auth/user', {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
        const user = await user_data.json();
        setUser(user);

        const prof_data = await fetch('/api/user/' + user.public_id + '/portfolio');
        const profile = await prof_data.json();
        setProfiles(profile.portfolios);

        const widget_data = await fetch('/api/portfolio/' + PID + '/widget');
        const widgets = await widget_data.json();
        setWidget(widgets.widgets);
        
        
    }

    //store db
    useEffect( () =>{
        fetchWidgets();
    }, [])

    const width = 280;
    const height = 315;
    const columns = 6;

    return (
        <div className='wholePage'>
            <div>
                <h1 className="impact">
                    ePOO PAGE
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

