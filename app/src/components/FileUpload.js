//https://www.educative.io/edpresso/file-upload-in-react

import React, { useEffect, useState } from "react";
import { isAuthorized } from "../util/cookies";
import "../styles/ePortfolio-popup.css";
import "../styles/ImageGallery.css";
import Popup from "reactjs-popup";

import DeletePopup from "./DeletePopup.js";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export function FileUpload(props) {
  const Auth = isAuthorized();

  const [upload, setUpload] = useState(false);
  const [nothing, setNothing] = useState(false);
  const [cantDelete, setCantDelete] = useState(false);
  const [fileError, setFileError] = useState(false);

  //file uploading

  function handleUpload(event) {
    uploadImage(event.target.files[0]);
  }

  async function uploadImage(file) {
    if (!file || file.type.split('/')[0] != 'image') {
      setFileError(true);
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": file.type, Authorization: "bearer " + Auth },
      body: file,
    };
    await fetch(
      "/api/user/" + props.userID + "/file/" + file.name,
      requestOptions
    );

    //switches every upload to update view
    setUpload(!upload);
  }

  //file displaying
  const [files, setFiles] = useState([]);

  async function deleteFile() {
    if (current === "None") {
      setNothing(true);
      return;
    }

    if (current.split('/')[1] === "images" && current.split('/')[2] === "default") {
      setCantDelete(true);
      return;
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
    };
    await fetch(
      "/api/user/" + props.userID + "/file/" + current,
      requestOptions
    );
    setUpload(false);
    setCurrent("None");
  }

  //selecting an image
  const [current, setCurrent] = useState("None");

  function selectImage(url) {
    var list = url.split("/");
    var name = list[list.length - 1];
    setCurrent(name);
  }

  function requestImage() {
    if (current === "None") {
      setNothing(true);
      return;
    }
    var url;

    if (current.split('/')[1] === "images" && current.split('/')[2] === "default") {
      url = current;
    } else {
      url =
        "http://" +
        window.location.host +
        "/api/user/" +
        props.userID +
        "/file/" +
        current;
    }

    if (props.setImage) {
      props.setImage(url);
    }
    if (props.close) {
      props.close();
    }
  }

  //update displayed files when new image is uploaded
  useEffect(() => {
    async function getFiles() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
      };
      const file_data = await fetch(
        "/api/user/" + props.userID + "/file",
        requestOptions
      );
      const files = await file_data.json();
      setFiles(files.files);

      var file_list = [];
      var i;

      for (i = 0; i < files.files.length; i++) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + Auth,
          },
        };
        var image = await fetch(
          "/api/user/" + props.userID + "/file/" + files.files[i].file_name,
          requestOptions
        );
        file_list.push(image);
      }
      setFiles(file_list);
    }
    getFiles();
  }, [upload, Auth, props.userID]);

  return (
    <div>
      <div className="imageGallery">
        <br />
        <p> Selected Image: {current}</p>
        <hr />
        <div className="images">
            <span>
              <button onClick={(e) => setCurrent(process.env.PUBLIC_URL + "/images/default/blue_pattern.png")}>
                <ImageThumb image={process.env.PUBLIC_URL + "/images/default/blue_pattern.png"} />
              </button>
            </span>
            <span>
              <button onClick={(e) => setCurrent(process.env.PUBLIC_URL + "/images/default/consistent.png")}>
                <ImageThumb image={process.env.PUBLIC_URL + "/images/default/consistent.png"} />
              </button>
            </span>
            <span>
              <button onClick={(e) => setCurrent(process.env.PUBLIC_URL + "/images/default/contrast.png")}>
                <ImageThumb image={process.env.PUBLIC_URL + "/images/default/contrast.png"} />
              </button>
            </span>
            <span>
              <button onClick={(e) => setCurrent(process.env.PUBLIC_URL + "/images/default/galaxy.png")}>
                <ImageThumb image={process.env.PUBLIC_URL + "/images/default/galaxy.png"} />
              </button>
            </span>
            <span>
              <button onClick={(e) => setCurrent(process.env.PUBLIC_URL + "/images/default/pretty_tree.png")}>
                <ImageThumb image={process.env.PUBLIC_URL + "/images/default/pretty_tree.png"} />
              </button>
            </span>
            <span>
              <button onClick={(e) => setCurrent("/images/default/xp_hills.png")}>
                <ImageThumb image={"/images/default/xp_hills.png"} />
              </button>
            </span>
            {files.map((file) => (
              <span>
                <button onClick={(e) => selectImage(file.url)}>
                  <ImageThumb image={file.url} />
                </button>
              </span>
            ))}
        </div>
        <hr />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={nothing}
          onClose={() => setNothing(false)}
          key={'bottomcenter'}
          autoHideDuration={2500}
        >
          <Alert severity="error">Nothing selected!</Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={cantDelete}
          onClose={() => setCantDelete(false)}
          key={'bottomcenter'}
          autoHideDuration={2500}
        >
          <Alert severity="error">Cannot delete a default image!</Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={fileError}
          onClose={() => setFileError(false)}
          key={'nut'}
          autoHideDuration={2500}
        >
          <Alert severity="warning">File error! Please upload image type files only.</Alert>
      </Snackbar>
      </div>
      <div id="upload-box">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <br />
        <br />
        {upload ? <p>Uploaded successfully!</p> : null}
      </div>
      <div className="actions">
        <span>
          <button className="button" onClick={requestImage}>
            {" "}
            <b>SELECT</b>{" "}
          </button>
        </span>
        <span>
          {current === "None" || (current.split('/')[1] === "images" && current.split('/')[2] === "default") ? (
            <button className="button" onClick={deleteFile}>
              {" "}
              <b>DELETE</b>{" "}
            </button>
          ) : (
            <DeletePopup onDelete={() => deleteFile()} toDelete={current} />
          )}
        </span>
      </div>
    </div>
  );
}

export function FilePopUp(props) {
  return (
    <Popup
      trigger={
        <button type="button" className="menu-item button">
          {" "}
          <b>SELECT/UPLOAD IMAGE</b>
        </button>
      }
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
            <h1>Select/Upload Image</h1>{" "}
          </div>
          <div className="content2">
            {" "}
            <div>
              <FileUpload
                userID={props.userID}
                close={(e) => close()}
                setImage={(e) => props.setImage(e)}
              />
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

const ImageThumb = ({ image }) => {
  return <img
           draggable={"false"}
           src={image}
           alt={""}
         />;
};
