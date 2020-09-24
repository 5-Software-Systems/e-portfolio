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
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf';

import MotherWidget from '../components/Widgets/MotherWidget.js';
import DropDownBox from '../components/Widgets/DropDownBox.js';
import GetFields from '../components/Widgets/WidgetFields.js';


export default function EPortfolio() {


    // authorise and fetch eportfolio data -----------------------------------
    const history = useHistory();

    const [profile, setProfile] = useState([]);
    const [widgets, setWidget] = useState([]);

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
    }

    
    useEffect( () => {
        fetchWidgets();
    }, [PID, history]);

    //------------------------------------------------------------------------

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
    }

    return (
        <div className='eportfolioBody'>
            <div className='eportfolioPage'>
                <header className='header'>
                    <div className ='left'>
                        <h1 className="impact">
                            {profile.title}
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
        </div>
    );
};


function editBox(PID) {
    async function deleteWidget() {
        {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
            };
            await fetch('/api/widget/' + PID, requestOptions);
        }
    }

    const onDeleteClick = () => {
        (deleteWidget());
        (window.location.reload(false));
        //TODO: refresh component instead of page.
        //TODO: IMPLEMENT APPLY BUTTON FUNCTIONALITY
    }

    return (
        <Popup
            trigger={<button className="settingsButton">⚙</button>}
            modal
            nested
        >
        {close => (
        <div className="modal">
            <DropDownBox/>
            <button className="close" onClick={close}>
            <b>×</b>
            </button>
            <div className="header2"> 
                <h1 className="impact">Edit Widget</h1>
            </div>
            <div className="content2">
                {' '}
                {/** TODO: MAKE THIS INTERACT WITH DROPDOWNBOX LIB*/}
                <GetFields type='project'/>
                {MyEditor(PID)}
            </div>
            <div className='PopupBottom'>
                <div className='options'>
                    <div className="actions">
                        <button className="button" onClick={onDeleteClick}><b className='deleteText'>DELETE</b></button>
                    </div>
                </div>
                <div className='options'>
                    <div className="actions">
                        <button className="button" onClick={console.log("temp")}><b>APPLY</b></button>
                    </div>
                </div>
            </div>
        </div>
        )}
        </Popup>
    )
}


function MyEditor(PID) { 
    async function updateWidget() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({  
                                    'type': 'about',
                                    data:{
                                        about: editorState.getCurrentContent().getPlainText()
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
      
    const onSendClick = () => {
        (updateWidget());
        (window.location.reload(false));
    }

      console.log(editorState.getCurrentContent().getPlainText())
    return (
        <div> 
            <button className='popUpFormatButton' onClick={onBoldClick.bind(setEditorState)}><h6>Bold</h6></button>
            <button className='popUpFormatButton' onClick={onSendClick.bind(editorState)}><h6>Send</h6></button>
            <Editor editorState={editorState} onChange={setEditorState} />  
        </div>
        
    )
  }




