//https://www.educative.io/edpresso/file-upload-in-react

import React, {useEffect, useState} from "react";
import { isAuthorized } from "../util/cookies";
import '../styles/ePortfolio-popup.css';
import '../styles/ImageGallery.css';
import Popup from 'reactjs-popup';

import DeletePopup from './DeletePopup.js'

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export function FileUpload(props) {

    const Auth = isAuthorized();

    const [upload, setUpload] = useState(false);

    //file uploading 

    function handleUpload(event) {
        uploadImage(event.target.files[0]);
    }

    async function uploadImage(file) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': file.type, 'Authorization': 'bearer ' + Auth},
            body: file
        };
        await fetch('/api/user/'+ props.userID + '/file/' + file.name, requestOptions);

        //switches every upload to update view 
        setUpload(!upload)
    }

    //file displaying
    const [files, setFiles] = useState([]);

    async function getFiles() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
        };
        const file_data = await fetch('/api/user/'+ props.userID + '/file', requestOptions);
        const files = await file_data.json();
        setFiles(files.files);

        var file_list = [];
        var i;
        
        for (i = 0; i <files.files.length; i++) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
            };
            var image = await fetch('/api/user/'+ props.userID + '/file/' + files.files[i].file_name, requestOptions);
            file_list.push(image);
        }
        setFiles(file_list);
    }

    async function deleteFile() {
        if (current==='None') {
            alert('Nothing selected');
            return;
        }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
        };
        await fetch('/api/user/'+ props.userID + '/file/' + current, requestOptions);
        setUpload(!upload);
        setCurrent('None');
    }

    //selecting an image 
    const [current, setCurrent] = useState('None');

    function selectImage(url) {
        console.log(url);
        var list = url.split('/');
        var name = list[list.length-1];
        setCurrent(name);
    }

    function requestImage() {
        if (current==='None') {
            alert('Nothing selected');
            return;
        }

        var url = 'http://' + window.location.host + '/api/user/'+ props.userID + '/file/' + current;

        if (props.setImage) {
            props.setImage(url);
            console.log(url);
        }
        if (props.close) {
            props.close();
        }
        
        
    }

     //update displayed files when new image is uploaded 
     useEffect( () =>{
        getFiles();
    }, [upload])

    return (
        <div> 
            <div  className = "imageGallery"> 
                <br/>
                <p> Selected Image: {current}</p>
                <hr/>
                {files.map(file =>(
                    <span > 
                        <button onClick={(e) => selectImage(file.url)}> 
                            <ImageThumb image={file.url} />
                        </button>
                    </span>
                ))}
                <hr/>
            </div>
            <div id="upload-box">
                <input type="file" onChange={handleUpload} />
                <br/>
                <br/>
                {upload ? <p>Uploaded successfully!</p> : null}            
            </div>
            <div className="actions">
            <span>
                    <button className="button" onClick={requestImage}> <b>SELECT</b> </button>
                </span>
                <span>
                    {(current === "None") ? <button className="button" onClick={deleteFile}> <b>DELETE</b> </button> : <DeletePopup onDelete = {() => deleteFile()} toDelete={current}/>}
                </span>
            </div>
        </div>
        
    );
}


export function FilePopUp(props) {
    return (
        <Popup
            trigger={<button type="button" className="menu-item button" > <b>SELECT/UPLOAD IMAGE</b></button>}
            modal
            nested
            className="ePortfolio-popup"
            closeOnDocumentClick={false}>
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="header2"> <h1>Select/Upload Image</h1> </div>
                <div className="content2">
                {' '}
                    <div>
                        <FileUpload userID={props.userID} close={(e) => close()} setImage={(e) => props.setImage(e)}/>
                    </div>
                </div>
            </div>
            )}
        </Popup>
    );
}

const ImageThumb = ({ image }) => {
    return <img src={image} alt={''}/>;
};

//doesnt really work idk why
const FileName = ({url}) => {
    console.log(url)
    return (
        <div> 
    {url ? <p> {url.split('/')[-1]} </p> : null}  
        </div>
         
    );
}