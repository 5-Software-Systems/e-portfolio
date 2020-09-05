import React from 'react';


export function EmbedToHTML({src, title="embed", width = '100%', height = '100%'}) {
    return (
        <iframe width={width} height={height} src={src} frameborder="0" title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    );
}

export default EmbedToHTML;