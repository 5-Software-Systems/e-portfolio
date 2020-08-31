import React from 'react';


export function TextToHTML(props) {
    return (
        <div id='textWidget'>
            <h1>{props.header}</h1>
            <p>{props.text}</p>
        </div>
    );
}

export default TextToHTML;