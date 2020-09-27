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
  const [dropDownType, setDropDownType] = useState(props.widgetType);
  const [data, setData] = useState({});
  const [changeCount, setChangeCount] = useState(0);

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
    console.log(data);
    console.log(Object.keys(data).length === 0);
    //bug roundabout coldfix 
    if (Object.keys(data).length === 0) {
        window.alert('Nothing entered! 😱 Please try again 😅');
    }
    else {
      (updateWidget());
      (callUpdate());
    }
  }

  function callUpdate() {
      if (props.onChange) {
          props.onChange();
      }
  }

  function openWidgetSettings() {
      if (props.onOpenSettings) {
          props.onOpenSettings();
      }

  }

  function onDropdownChange(e) {
    var old=changeCount;
    setDropDownType(e.target.value);
    setChangeCount(old + 1);
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
          <DropDownBox value={dropDownType} onChange={(e) => onDropdownChange(e)}/>
          <button className="close" onClick={() => {callUpdate(); close();}}>
          <b>×</b>
          </button>
          <div className="header2"> 
              <h1 className="impact">Edit Widget</h1>
          </div>
          <div className="content2">
              {' '}    
              <GetFields type={dropDownType} changed={changeCount} data={data} defaultData={props.widgetData} onChange={(e) => setData(e)}/>
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