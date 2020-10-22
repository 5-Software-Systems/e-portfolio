//https://www.educative.io/edpresso/file-upload-in-react

import React, {useEffect, useState} from "react";
import { isAuthorized } from "../util/cookies";

const Auth = isAuthorized();

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export function FileUpload(props) {

    const [file, setFile] = React.useState("");

    function handleUpload(event) {
        uploadImage(event.target.files[0]);
    }

    async function uploadImage(file) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': file.type, 'Authorization': 'bearer ' + Auth},
            body: file
        };

        //upload image to server 
        console.log('api/user/'+ props.userID + '/file/' + file.name);
        await fetch('api/user/'+ props.userID + '/file/' + file.name, requestOptions);

        getImage(file.name);
    }

    async function getImage(filename) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
        };
        var image = await fetch('api/user/'+ props.userID + '/file/' + filename, requestOptions);

        console.log(image.url);
        setFile(image.url)
    }

    return (
        <div id="upload-box">
        <input type="file" onChange={handleUpload} />
        <br/>
        <ImageThumb image={file} />
        
        </div>
    );
}

export function ShowFiles(props) {
    const [files, setFiles] = React.useState([]);
    const [fileLinks, setFileLinks] = useState([]);


    async function getFiles() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth},
        };
        const file_data = await fetch('api/user/'+ props.userID + '/file', requestOptions);
        const files = await file_data.json();
        setFiles(files.files);
        {console.log(files.files)}
        addToList();
    }

    async function addToList() {
        var file_urls = [];
        var i;
        for (i = 0; i <files.length; i++) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth}
            };
            var image = await fetch('api/user/'+ props.userID + '/file/' + files[i].file_name, requestOptions);
            
            file_urls.push(image.url);
            console.log(file_urls);
        }
        setFileLinks(file_urls)
    }

    //always asking for requests 
    useEffect( () =>{
        getFiles();
    }, [Auth, fileLinks])

    return (
        <div> 
            <h1> bars </h1>
            {console.log(fileLinks)}
            {fileLinks.map(file =>(
                <ImageThumb image={file} />
            ))}
        </div>
        
    );
}

const ImageThumb = ({ image }) => {
    return <img src={image} alt={'fog'} height='100px' />;
};