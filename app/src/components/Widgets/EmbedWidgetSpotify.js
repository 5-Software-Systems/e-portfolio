import React from 'react';


export function SpotifyToHTML({src, title="embed", width = '100%', height = '100%'}) {

    function getID(URL) {
        var split = URL.split('/');
        var end = split[split.length - 1].split('?');
        var id = split[split.length - 2] + '/' + end[0];
        return id;
    }

    const link = "https://open.spotify.com/embed/" + getID(src);

//ALBUM 

//https://open.spotify.com/album/4UhaqAS8V23KozB3dzLMax?si=M3bjFNpoQ8CNC8hafoET4g

//<iframe src="https://open.spotify.com/embed/album/4UhaqAS8V23KozB3dzLMax" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

//PLAYLIST 

//https://open.spotify.com/playlist/1nvxlaARYE1MMzeEfKgm1R?si=4Vo1vKrZRKOpMKx1dyJkpA

//<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1E8UtdjK2mNfZV" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

//ARTIST AND TRACK THE SAME


    return (
        <iframe width={width} height={height} src={link} frameBorder="0" title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    );
}

export default SpotifyToHTML;