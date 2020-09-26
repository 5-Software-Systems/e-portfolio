//your mum and dad
import React, {useEffect, useState} from "react";
//-----------dependencies------------------------
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/ePortfolioIndex.css';
//------------------------------------------------
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf';

import DropDownBox from './Widgets/DropDownBox.js';
import GetFields from './Widgets/WidgetFields.js';


export default function EditBox(props) {
  const [dropDownType, setDropDownType] = useState('about');
  const [data, setData] = useState({});

  async function deleteWidget() {
      {
          const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json'},
          };
          await fetch('/api/widget/' + props.PID, requestOptions);
      }
  }

  async function updateWidget() {
      console.log('patching: ')
      console.log(data);
      deleteWidget();
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({  
                                  type: dropDownType,
                                  location: props.widgetLocation,
                                  data          
                              })
      };
      await fetch('/api/portfolio/' + props.portfolioID + '/widget', requestOptions);
  }

  const onDeleteClick = () => {
      (deleteWidget());
      (callUpdate());

  }

  const onApplyClick = () => {
      (updateWidget());
      (callUpdate());
  }

  function callUpdate() {
      console.log("yeetingasdsada");
      console.log(props);
      if (props.onChange) {
          console.log("yeeting");
          props.onChange();
      }
  }

  function openWidgetSettings() {
      console.log("widget settings opened");
      if (props.onOpenSettings) {
          props.onOpenSettings();
      }

  }

  return (
      <Popup
          trigger={<button className="settingsButton">⚙</button>}
          modal
          nested
          closeOnDocumentClick={false}
          onOpen={openWidgetSettings}
      >
      {close => (
      <div className="modal">
          <DropDownBox value={dropDownType} onChange={(e) => setDropDownType(e.target.value)}/>
          <button className="close" onClick={() => {callUpdate(); close();}}>
          <b>×</b>
          </button>
          <div className="header2"> 
              <h1 className="impact">Edit Widget</h1>
          </div>
          <div className="content2">
              {' '}    
              <GetFields type={dropDownType} onChange={(e) => setData(e)}/>
              {console.log(data)}
          </div>
          <div className='PopupBottom'>
              <div className='options'>
                  <div className="actions">
                      <button className="button" onClick={() => {onDeleteClick(); close();}}><b className='deleteText'>DELETE</b></button>
                  </div>
              </div>
              <div className='options'>
                  <div className="actions">
                      <button className="button" onClick={() => {onApplyClick(); close();}}><b>APPLY</b></button>
                  </div>
              </div>
          </div>
      </div>
      )}
      </Popup>
  )
}