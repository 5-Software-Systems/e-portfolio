import React from 'react';


export function TextToHTML({header = '<NO HEADER SET>', props}) {
    return (
        <div id='textWidget'>
            <h1>{header}</h1>
            <p>{props}</p>
        </div>
    );
}

export default TextToHTML;