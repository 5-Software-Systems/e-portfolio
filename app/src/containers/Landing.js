import React, {Fragment} from 'react';

export default function Landing() {
    return (
        <Fragment>
            <div className="banner">
                <div className="container pb-5">
                      <h1 className="font-weight-semibold">E-portfolio Landing page.</h1>
                      <h6 className="font-weight-normal text-muted pt-3">An electronic portfolio is a collection of electronic evidence assembled and managed by a user, usually on the Web.</h6>
                      <img src={process.env.PUBLIC_URL + "/images/Hero_Image.svg"} alt="" className="img-fluid pt-5" />
                </div>
            </div>
        </Fragment>
    );
};
