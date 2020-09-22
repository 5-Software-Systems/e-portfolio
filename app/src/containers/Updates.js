import React, {Fragment} from 'react';
import { useHistory } from "react-router-dom";
import { isAuthorized } from "../util/cookies";


export default function Landing() {
    const history = useHistory();
    const Auth = isAuthorized();
    if (Auth) {
        history.push("/profile");
    }

    return (
        <Fragment>
            <div className="banner">
                <div className="container pb-5">
                      <h1 className="font-weight-semibold">Updates.</h1>
                      <h6 className="font-weight-normal text-muted pt-3">A place to see updates on the electronic portfolio project, as managed by the FiveCent Software Systems team.</h6>
                      <img src={process.env.PUBLIC_URL + "/images/update.png"} alt="" className="img-fluid w-50" />
                </div>
                <div className="container">
                    <div className="text-left font-weight-normal w-75">
                        <h3>Updates Feature</h3>
                        <h5>22/9/2020</h5>
                        <p className="pb-4">
                        Welcome to the start of the updates section of the presently named "e-portfolio system".
                        In the updates section we will record some of the updates and major milestones we achieve
                        through the course of the development process of this product.
                        This product is apart of a semester long project hosted within the subject "IT Project" at
                        Unimelb.
                        </p>
                    </div>
                    <div className="text-left">
                        <h3></h3>
                        <h5></h5>
                        <p className="py-4"></p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
