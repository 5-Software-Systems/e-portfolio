import React, {useEffect, useState} from "react";
//-----------dependencies------------------------
import { Responsive, WidthProvider } from 'react-grid-layout';
import ArrowBack from '@material-ui/icons/ArrowBack';
import '../styles/ePortfolio-popup.css';
//------------------------------------------------
import { useHistory } from "react-router-dom";
import '../styles/ePortfolio-widgets.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'

import MotherWidget from '../components/Widgets/MotherWidget.js';

const ReactGridLayout = WidthProvider(Responsive);

export default function EPortfolio(props) {
    const history = useHistory();

    const [profile, setProfile] = useState([]);
    const [widgets, setWidget] = useState([]);

    //store db
    useEffect( () =>{
        async function initFetch() {
            const url = new URLSearchParams(window.location.search);
            const Auth = url.get('auth');
            const URL = window.location.href.split('/');
            const PID = URL[URL.length - 1]

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth }
            };
            const p_response = await fetch('/api/portfolio_share/' + PID, requestOptions);
            const p_data = await p_response.json();
            if (p_data.error) {
                history.push("/not_found");
                return;
            }
            setProfile(p_data.portfolio);
            setWidget(p_data.portfolio.widget);
        }

        initFetch();
    }, [history]);
    
    const width = 300;
    const height = 300;
    const columns = 5;

    return (
        <div className='eportfolioBody'>
            <header className='header'>
                <button className='addWidgetButton' onClick={ () => {window.location.href='/profile'}}>
                    <a href = '/'> <ArrowBack /> </a>
                </button>
                <h1 className='impact'>
                    {profile.title}
                </h1>
                <p className="impact">Created by:<br/>Firstname Lastname</p>
            </header>
            <div className="container">
                <ReactGridLayout
                    className="layout"
                    rowHeight={height}
                    width={columns * width}
                    margin={[10,10]}
                    compactType={null}
                    isDraggable={false}
                    isResizable={false}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 5, md: 5, sm: 5, xs: 5, xxs: 5}}
                >
                    {widgets.map(widget =>(
                        < div key={widget.public_id} data-grid={{i: widget.public_id, w: widget.location[0], h: widget.location[1], x: widget.location[2], y: widget.location[3]}}>
                            <MotherWidget widget={widget}/>
                            <div className ='overlay'></div>
                        </div>
                    ))}
                </ReactGridLayout>
            </div>
        </div>
    );
};





