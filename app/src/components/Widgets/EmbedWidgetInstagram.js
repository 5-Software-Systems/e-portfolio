import React from 'react';


export function InstagramToHTML({src, title="embed", width = '100%', height = '100%'}) {


    //https://www.instagram.com/p/CGhNDoKlFAz/

    //<iframe src="http://instagram.com/p/CGhNDoKlFAz/embed" width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true"></iframe>    


    return (
        <iframe src= {src+ "embed"} width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true"></iframe>    
    );
}

export default InstagramToHTML;