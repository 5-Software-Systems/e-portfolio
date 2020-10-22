import React from 'react';


export function LinkedinToHTML({src, title="embed", width = '100%', height = '100%'}) {

    function getID(URL) {
        var split = URL.split('-');
        var id = split[split.length - 2]
        return id;
    }

    const link = "https://www.linkedin.com/embed/feed/update/urn:li:share:" + getID(src);


    //unique codes are differnt so idk what to do 

    //https://www.linkedin.com/posts/university-of-melbourne_chronic-disease-and-public-health-failures-activity-6722717706367438848-OFTh

    //https://www.linkedin.com/posts/university-of-melbourne_a-new-exhibition-of-visual-art-and-writing-activity-6721328620775862273-9fTW

    //<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6722717706036088832" height="607" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

    //<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6721328620440297472" height="812" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

    //https://au.linkedin.com/in/calvin-sagar-09b3ba192

    //https://www.linkedin.com/in/williamhgates/

    //<script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>

    //<div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="calvin-sagar-09b3ba192"><a class="LI-simple-link" href='https://au.linkedin.com/in/calvin-sagar-09b3ba192?trk=profile-badge'>Calvin Sagar</a></div>


    return (
        <div> 
            <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
            <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="calvin-sagar-09b3ba192">
                <a class="LI-simple-link" href='https://au.linkedin.com/in/calvin-sagar-09b3ba192?trk=profile-badge'>Calvin Sagar</a></div>
        </div>
        
    );
}

export default LinkedinToHTML;