//your mum 
import React, {useEffect, useState} from "react";
//-----------dependencies------------------------
import ReactGridLayout from 'react-grid-layout';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../styles/ePortfolioIndex.css';
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
                        {editBox(widget.public_id)}
                        </div>
                    </ div>
                ))}
            </ReactGridLayout>
        </div>
    );
};


function editBox(PID) {
    

    return (
        <Popup
            trigger={<button className="settingsButton">⚙</button>}
            modal
            nested
        >
        {close => (
        <div className="modal">
            <button className="close" onClick={close}>
            &times;
            </button>
        <div className="header2"> <h1 className="impact">Hello Ozbargainer #{PID}</h1> </div>
            <div className="content2">
            {' '}
                {MyEditor(PID)}
            </div>
            <div className="actions">
            <Popup
                trigger={<button className="button"> DELETE 🥵 </button>}
                position="top center"
                nested
            >
                <span>
                :what:
                </span>
            </Popup>
            </div>
        </div>
        )}
        </Popup>
    )
}

function MyEditor(PID) {
    async function updateWidget(content) {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                                    type: "about", 
                                    data:{
                                        about: {content}
                                        }
                                })
        };
        await fetch('/api/widget/' + PID, requestOptions);
    }


    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
    );

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          return 'handled';
        }
    
        return 'not-handled';
      }

    const onBoldClick = () => {
        (RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      }
      
      console.log(editorState.getCurrentContent().getPlainText())
      updateWidget(editorState.getCurrentContent().getPlainText())
    return (
        <div> 
            <button className='popUpFormatButtonPoggers' onClick={onBoldClick.bind(setEditorState)}><h6>Bold</h6></button>
            <Editor editorState={editorState} onChange={setEditorState} />  
        </div>
        
    )
  }




