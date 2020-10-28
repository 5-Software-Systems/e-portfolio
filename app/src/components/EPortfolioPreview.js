import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "../styles/BasePage.css";
import "../styles/ePortfolio-popup.css";
import { isAuthorized } from "../util/cookies";
import { FilePopUp } from "./FileUpload";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import DeletePopup from "./DeletePopup";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function EPortfolioPreview(props) {
  const Auth = isAuthorized();
  const api_link = "user/" + props.user + "/portfolio/" + props.id;

  //delete function
  async function handleDelete() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
    };
    await fetch("api/" + api_link, requestOptions);
  }

  //edit funciton
  const [newName, setNewName] = useState(props.name);
  const [newImage, setNewImage] = useState(props.img);

  const [loadingImage, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(props.img);

  useEffect(() => {
    async function getFile() {
      if (props.img) {
          const URL = props.img.split("/");
          const image_domain = URL[2];
          if (window.location.host === image_domain) {
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "image/png",
                Authorization: "bearer " + Auth,
              },
            };
            var image = await fetch(
              props.img,
              requestOptions
            );
            setPreviewImage(image.url);
          } else {
            setPreviewImage(props.img);
          }
      } else {
        setPreviewImage("/images/placeholder.svg");
      }
      setLoading(false);
    }
    getFile();
  }, [Auth, props.img]);

  const [open, setOpen] = useState(false);

  async function handleEdit() {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
      body: JSON.stringify({
        title: newName,
        background_url: newImage,
      }),
    };
    await fetch("api/" + api_link, requestOptions);
  }

  function editButton(outer_close) {
    return (
      <Popup
        trigger={<button className="menu-item"> Edit </button>}
        modal
        nested
        className="ePortfolio-popup"
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header2">
              {" "}
              <h1>Edit Portfolio</h1>{" "}
            </div>
            <div className="content2">
              <Form
                className="cunny"
                onSubmit={() => {
                  close();
                  handleEdit();
                  update();
                  outer_close();
                }}
              >
                <FormGroup controlId="basePageTextBox">
                  <FormLabel>
                    <h5>Portfolio Name:</h5>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <br />
                  <br />
                  <FormLabel>
                    <h5>Preview Image:</h5>{" "}
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                </FormGroup>
                <br />
                <FilePopUp
                  userID={props.user}
                  setImage={(e) => {
                    setNewImage(e);
                  }}
                />
                <div className="actions">
                  <button className="button" type="submit">
                    <b>APPLY</b>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Popup>
    );
  }

  /**
   * @deprecated use DeletePopup from DeletePopup.js instead.
   */
//  function deletePopup() {
//    return (
//      <Popup
//        trigger={<button className="menu-item"> Delete </button>}
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
//              <h1>Are you sure you want to delete this portfolio?</h1>{" "}
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
//                  handleDelete();
//                  close();
//                  update();
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

  //settings button
  function settingsButton() {
    return (
      <Popup
        trigger={
          <button className="settingsButton">
            <span role="img">⚙</span>
          </button>
        }
        position="right bottom"
        on={["click"]}
        contentStyle={{ padding: "0px", border: "none", width: "80px" }}
        arrow={false}
        nested
        className="basepage"
      >
        {(close) => (
          <div className="menu">
            <button
              className="menu-item"
              onClick={() => {
                get_link(props.user, props.id, Auth).then((value) => {
                  copyToClipboard(value.link);
                  setOpen(true);
                });
                close();
              }}
            >
              Share
            </button>
            {editButton(() => {close()})}
            <DeletePopup
              onDelete={() => {
                handleDelete();
                close();
                update();
              }}
              toDelete=" this portfolio"
              buttonClassName="menu-item"
              buttonText="Delete"
              isBold={false}
              hasTag={false}
            />
          </div>
        )}
      </Popup>
    );
  }

  function update() {
    if (props.onUpdate) {
      props.onUpdate();
      console.log(process.env.PUBLIC_URL);
    }
  }

  return (
    <div className="eportfoliopreview">
      <a href={"/portfolio/" + props.id} className="eportfolioinfo">
        <h3>{props.name}</h3>
        <br />
        { loadingImage ?
            <p> Loading... </p>
        :
            <img
              src={ previewImage }
              alt="not a valid url"
              height="150"
            />
        }
      </a>
      <div className="button_container">{settingsButton()}</div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={() => setOpen(false)}
        key={'topcenter'}
        autoHideDuration={2000}
      >
        <Alert severity="info">Link copied to Clipboard!</Alert>
      </Snackbar>
    </div>
  );
}

//https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
export function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export async function get_link(user, portflio_id, auth) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + auth,
    },
    body: JSON.stringify({
      duration: 525960, // 1 year
    }),
  };
  const url = "/api/user/" + user + "/portfolio/" + portflio_id + "/share";
  const share_link_data = await fetch(url, requestOptions);
  const share_link = await share_link_data.json();
  return Promise.resolve(share_link);
}
