import React, { Fragment, useState } from "react";
//-----------dependencies------------------------
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/ePortfolio-popup.css";
//------------------------------------------------
import "../styles/ePortfolio-widgets.css";
import "../styles/resizable-styles.css";
import "../fonts/roboto/Roboto-Black.ttf";

import DropDownBox from "./Widgets/DropDownBox.js";
import GetFields from "./Widgets/WidgetFields.js";
import DeletePopup from "./DeletePopup.js";
import { isAuthorized } from "../util/cookies";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function EditBox(props) {
  const Auth = isAuthorized();
  const startType = props.widgetType;
  const [dropDownType, setDropDownType] = useState(props.widgetType);
  const [data, setData] = useState({});
  const [changeCount, setChangeCount] = useState(0);
  const [nothing, setNothing] = useState(false);

  async function deleteWidget() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
    };
    await fetch(
      "/api/user/" + props.userID + "/widget/" + props.PID,
      requestOptions
    );
  }

  async function updateWidget() {
    var sameType = (dropDownType === startType);
    var method = "PATCH";
    var body = {
      location: props.widgetLocation,
      data,
    }

    if (!sameType) {
      deleteWidget();
      method = "POST"
      body = {
        type: dropDownType,
        location: props.widgetLocation,
        data,
      }
    }


    
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
      body: JSON.stringify(body),
    };
    await fetch("/api/user/" +
      props.userID + (sameType ? "" : "/portfolio/" + props.portfolioID) + "/widget" + (sameType ? "/" + props.PID : ""),
      requestOptions
    );
  }

  /**
   * @deprecated use DeletePopup from DeletePopup.js instead.
   */
//  function deletePopup() {
//    return (
//      <Popup
//        trigger={
//          <button className="button">
//            {" "}
//            <b className="deleteText"> DELETE </b>{" "}
//          </button>
//        }
//        modal
//        nested
//        className="ePortfolio-popup"
//        closeOnDocumentClick={false}
//      >
//        {(close) => (
//          <div className="modal">
//            <button className="close" onClick={close}>
//              &times;
//            </button>
//            <div className="header2">
//              {" "}
//              <h1>Are you sure you want to delete this widget?</h1>{" "}
//            </div>
//            <div className="actions">
//              {" "}
//              <div>
//                <p>This action cannot be undone.</p>
//              </div>
//            </div>
//            <div className="actions">
//              <button
//                className="button"
//                onClick={() => {
//                  deleteWidget();
//                  callUpdate();
//                  close();
//                }}
//              >
//                {" "}
//                <b className="deleteText"> Delete </b>{" "}
//              </button>
//            </div>
//          </div>
//        )}
//      </Popup>
//    );
//  }

  const onApplyClick = (external_close) => {
    //bug roundabout coldfix
    if (Object.keys(data).length === 0) {
      setNothing(true);
    } else {
      updateWidget();
      callUpdate();
      external_close();
    }
  };

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
    var old = changeCount;
    setDropDownType(e.target.value);
    setChangeCount(old + 1);
  }

  return (
  <Fragment>
    <Popup
      trigger={<button className="settingsButton">⚙</button>}
      modal
      nested
      closeOnDocumentClick={false}
      onOpen={openWidgetSettings}
      className="ePortfolio-popup"
    >
      {(close) => (
        <div className="modal">
          <DropDownBox
            value={dropDownType}
            onChange={(e) => onDropdownChange(e)}
          />
          <button
            className="close"
            onClick={() => {
              callUpdate();
              close();
            }}
          >
            <b>×</b>
          </button>
          <div className="header2">
            <h1 className="impact">Edit Widget</h1>
          </div>
          <div className="content2">
            {" "}
            <GetFields
              user={props.userID}
              type={dropDownType}
              changed={changeCount}
              data={data}
              defaultData={props.widgetData}
              onChange={(e) => setData(e)}
            />
          </div>
          <div className="PopupBottom">
            <div className="options">
              <div className="actions">
                <DeletePopup
                  onDelete={() => {
                    deleteWidget();
                    callUpdate();
                    close();
                  }}
                  toDelete=" this widget"
                />
              </div>
            </div>
            <div className="options">
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    onApplyClick(() => {close()});
                  }}
                >
                  <b>APPLY</b>
                </button>
              </div>
            </div>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={nothing}
              onClose={() => setNothing(false)}
              key={'bottom'}
              autoHideDuration={3000}
            >
              <Alert severity="error">Nothing entered!</Alert>
            </Snackbar>
          </div>
        </div>
      )}
    </Popup>
  </Fragment>
  );
}
