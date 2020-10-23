import React from 'react';


export function ApplemusicToHTML({src, title="embed", width = '100%', height = '100%'}) {

    function getID(URL) {
        var split = URL.split('/');
        var id = split.slice(split.length - 4, split.length).join('/');
        return id;
    }

    const link = "https://embed.music.apple.com/" + getID(src);

    
    //artist dont work idk why

    //https://music.apple.com/us/artist/soulja-boy-tell-em/251832454

    //<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/artist/soulja-boy-tell-em/251832454"></iframe>

    //https://music.apple.com/us/album/crank-that-soulja-boy/1443190317?i=1443190324

    //<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/crank-that-soulja-boy/1443190317?i=1443190324"></iframe>
    
    //https://music.apple.com/us/album/souljaboytellem-com/1443190317

    //<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/souljaboytellem-com/1443190317"></iframe>

    return (
        <iframe width={width} height={height} src={link} frameBorder="0" title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    );
}

export default ApplemusicToHTML;