//https://www.educative.io/edpresso/file-upload-in-react

import React from "react";
import { isAuthorized } from "../util/cookies";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
function FileUpload(props) {

    const [file, setFile] = React.useState("");
    const [bruh, setBruh] = React.useState("");

    function handleUpload(event) {
        setFile(event.target.files[0]);
        uploadImage(event.target.files[0]);
    }

    const Auth = isAuthorized();

    async function uploadImage(file) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': file.type, 'Authorization': 'bearer ' + Auth},
            body: file
        };
        console.log('api/user/'+ props.userID + '/file/' + file.name);
        await fetch('api/user/'+ props.userID + '/file/' + file.name, requestOptions);

        getImage(file);
    }

    async function getImage(file) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
        };
        var image = await fetch('api/user/'+ props.userID + '/file/' + file.name, requestOptions);

        console.log(image.url);
        setBruh(image.url)
    }

    return (
        <div id="upload-box">
        <input type="file" onChange={handleUpload} />

        <img src={bruh} alt={'fog'} width='100%' height='100%' />
        
        </div>
    );
}


export default FileUpload;
