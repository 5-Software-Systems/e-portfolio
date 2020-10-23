import React from 'react';


export function YoutubeToHTML({src, title="embed", width = '100%', height = '100%'}) {

    function getID(URL) {
        var split = URL.split('/');
        var end = split[split.length - 1].split('=');
        var id = end[end.length-1];
        return id;
    }

    const link = "https://www.youtube.com/embed/" + getID(src);

//https://www.youtube.com/watch?v=8EQ17_B7kug

//https://youtu.be/8EQ17_B7kug

//<iframe width="560" height="315" src="https://www.youtube.com/embed/8EQ17_B7kug" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    return (
        <iframe width={width} height={height} src={link} frameBorder="0" title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    );
}

export default YoutubeToHTML;