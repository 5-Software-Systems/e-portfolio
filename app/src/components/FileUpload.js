//https://www.educative.io/edpresso/file-upload-in-react

import React, {useEffect, useState} from "react";
import { isAuthorized } from "../util/cookies";
import '../styles/ePortfolio-popup.css';
import Popup from 'reactjs-popup';

const Auth = isAuthorized();

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export function FileUpload(props) {

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
        await fetch('api/user/'+ props.userID + '/file/' + file.name, requestOptions);

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
        const file_data = await fetch('api/user/'+ props.userID + '/file', requestOptions);
        const files = await file_data.json();
        setFiles(files.files);

        var file_list = [];
        var i;
        
        for (i = 0; i <files.files.length; i++) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
            };
            var image = await fetch('api/user/'+ props.userID + '/file/' + files.files[i].file_name, requestOptions);
            file_list.push(image);
        }
        setFiles(file_list);
        console.log(file_list);  
    }

    //update displayed files when new image is uploaded 
    useEffect( () =>{
        getFiles();
    }, [Auth, upload])


    return (
        <div> 
            <div> 
                <br/>
                <p> Uploaded images: </p>
                {files.map(file =>(
                    <span> 
                        <ImageThumb image={file.url} />
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
        </div>
        
    );
}


export function FilePopUp(props) {
    return (
        <Popup
            trigger={<button className="menu-item" > Select/Upload Image </button>}
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
                        <FileUpload userID={props.userID}/>
                    </div>
                </div>
            </div>
            )}
        </Popup>
    );
}

const ImageThumb = ({ image }) => {
    return <img src={image} alt={''} height='100px' />;
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