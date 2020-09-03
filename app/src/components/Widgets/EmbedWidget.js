import React from 'react';


export function TextToHTML({src = 'https://i.kym-cdn.com/entries/icons/facebook/000/016/540/hgh08Pez.jpg', width = '100%', height = '100%'}) {
    return (
        <div id='textWidget'>
            <iframe width={width} height={height} src={src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    );
}

export default TextToHTML;