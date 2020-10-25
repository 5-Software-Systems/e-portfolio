import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';

export default function Landing() {
    return (
        <Fragment>
            <div className="banner first">
                <div className="container">
                    <h1>Show off your Imagination</h1>
                    <h4>Discover Echidna and begin your journey today. Echidna is a tool that allows you to make anything
                     a portfolio and then share it with the world in all it's glory.</h4>
                    <br/><Button color='secondary' variant='contained' href='/help'>Learn How</Button><br/>
                    <img src={process.env.PUBLIC_URL + "/images/accomplish.svg"} alt="" className="img-fluid" />
                </div>
            </div>
            <div className="banner second">
                <img src={process.env.PUBLIC_URL + "/images/window.svg"} alt="" className="tile" />
                <div className="tile">
                    <h2>Create something you're proud of!</h2>
                    <h5>You can make your own portfolio exactly the way you want. Just drag & drop one of the many widgets
                    available, everything including video, music playlists, text and images. With free form size and an
                    intuitive grid design you'll be impressing people in no time.</h5>
                </div>
            </div>
            <div className="banner first">
                <div className="tile flip">
                    <h2>Share with anyone</h2>
                    <h5>No one likes being an unknown artist, help others find you with Echidna. Our sharing
                    capabilities allow anyone to view your portfolio once you give them an authorised link.
                    No matter the topic of your portfolio, anyone will be able to connect.</h5>
                </div>
                <img src={process.env.PUBLIC_URL + "/images/share.svg"} alt="" className="tile" />
            </div>
        </Fragment>
    );
};
