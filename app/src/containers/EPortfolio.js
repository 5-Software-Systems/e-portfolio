//your mum and dad
import React, {useEffect, useState} from "react";
//-----------dependencies------------------------
import ReactGridLayout from 'react-grid-layout';
import '../styles/ePortfolioIndex.css';
//------------------------------------------------
import { useHistory } from "react-router-dom";
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf';

import MotherWidget from '../components/Widgets/MotherWidget.js';
import EditBox from '../components/EditBox.js';

export default function EPortfolio() {


    // authorise and fetch eportfolio data -----------------------------------
    const history = useHistory();

    const [profile, setProfile] = useState([]);
    const [widgets, setWidget] = useState([]);

    const [movable, setMovable] = useState(true);

    const URL = window.location.href.split('/');
    const PID = URL[URL.length - 1]

    async function fetchWidgets() {
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
        setMovable(true);
    }

    
    useEffect( () => {
        fetchWidgets();
    }, [PID, history]);

    //------------------------------------------------------------------------

    const width = 280;
    const height = 315;
    const columns = 6;

    async function addWidget() {
        const locationA = [1,1,0,0];
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                                    type: "about",
                                    location: locationA,
                                    data:{
                                        about: "Je suis un nouveau widget. 私は新しいウィジェットです。我是一個新的小部件。Tôi là một widget mới"
                                        }
                                    
                                })
        };
        await fetch('/api/portfolio/' + PID + '/widget', requestOptions);
    }

    async function onLayoutChange(layout, layouts) {

        var i;
        for (i=0; i<layout.length; i++) {
            const id = layout[i].i;
            const location = [layout[i].w, layout[i].h, layout[i].x, layout[i].y];

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({  
                                        location: location
                                    })
            };
            await fetch('/api/widget/' + id, requestOptions);

        }

      }

      async function switchFalse() {
        console.log("bruh moment *******************************************************************")
        setMovable(false);
      }

    return (
        <div className='eportfolioBody'>
            <div className='eportfolioPage'>
                <header className='header'>
                    <div className ='left'>
                        <h1 className="impact" >
                            <a href="/profile">
                                {profile.title}
                            </a>
                        </h1>
                    </div>
                    <div className='right'> 
                        <button className='addWidgetButton'
                            onClick={
                                () => {
                                    addWidget();
                                    fetchWidgets();
                                }
                            } 
                        > Add Widget </button>
                    </div>
                </header>
                {console.log('movable? :' + movable)}
                <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} verticalCompact={false} onLayoutChange={onLayoutChange} isDraggable={movable} isResizable={movable}>
                    {widgets.map(widget =>(
                        < div key={widget.public_id} data-grid={{i: widget.public_id, w: widget.location[0], h: widget.location[1], x: widget.location[2], y: widget.location[3]}}> 
                            <MotherWidget widget={widget}/>
                            <div className ='overlay'>
                            <EditBox PID={widget.public_id} onChange={(e) => fetchWidgets()} onOpenSettings={(e) => switchFalse()} widgetLocation={widget.location} portfolioID ={PID}/>
                            </div>
                        </ div>
                    ))}
                </ReactGridLayout>
            </div>
        </div>
    );
};





