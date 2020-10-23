import React from 'react';


export function TwitterToHTML({src, title="embed", width = '100%', height = '100%'}) {

    const link = "https://twitframe.com/show?url=" + encodeURIComponent(src);

//https://twitframe.com/

//https://twitter.com/realDonaldTrump/status/1311892190680014849

//https://twitter.com/jack/status/20

//<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fjack%2Fstatus%2F20"></iframe>

    return (
        <iframe width={width} height={height} src={link} frameBorder="0" title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    );
}

export default TwitterToHTML;