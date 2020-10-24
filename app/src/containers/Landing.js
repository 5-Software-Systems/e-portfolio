import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';

export default function Landing() {
    // TODO replace fake text with real text
    return (
        <Fragment>
            <div className="banner first">
                <div className="container">
                    <h1>Show off your Imagination</h1>
                    <h4 className="pt-3">Discover Echidna and begin your journey today. Echidna is a tool that allows you to materialise
                                         your expression and creativity then send it off into the world, proud of what you've made.</h4>
                    <br/><Button color='secondary' variant='contained' href='/tutorial'>Learn How</Button><br/>
                    <img src={process.env.PUBLIC_URL + "/images/accomplish.svg"} alt="" className="img-fluid" />
                </div>
            </div>
            <div className="banner second">
                <img src={process.env.PUBLIC_URL + "/images/window.svg"} alt="" className="tile" />
                <div className="tile">
                    <h2>Create something you're proud of!</h2>
                    <h6>In a free hour, when our power of choice is untrammeled and when nothing prevents our being able
                        to do what we like best, every pleasure is to be welcomed and every pain avoided.</h6>
                </div>
            </div>
            <div className="banner first">
                <div className="tile flip">
                    <h2>Share with anyone</h2>
                    <h6>But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain
                        was born and I will give you a complete account of the system, and expound the actual teachings
                        of the great explorer of the truth, the master-builder of human happiness.</h6>
                </div>
                <img src={process.env.PUBLIC_URL + "/images/share.svg"} alt="" className="tile" />
            </div>
        </Fragment>
    );
};
