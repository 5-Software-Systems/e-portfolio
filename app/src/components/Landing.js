import React, {Fragment} from 'react';
import Test from './Test';
import Signup from '../containers/Signup_Popup';
import Login from '../containers/Login_Popup';
import { Link } from "react-router-dom";


export default function Landing() {
    function renderBody() {
        return (
            <Fragment>
                <div className="banner">
                    <div className="container">
                          <h1 className="font-weight-semibold">E-portfolio Landing page.</h1>
                          <h6 className="font-weight-normal text-muted pb-3">An electronic portfolio is a collection of electronic evidence assembled and managed by a user, usually on the Web.</h6>
                          <img src={process.env.PUBLIC_URL + "/images/Hero_Image.svg"} alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <section className="features-overview">
                            <div className="content-header">
                                <h2>How does it works</h2>
                                <h6 className="section-subtitle text-muted">One theme that serves as an easy-to-use operational toolkit<br/>that meets customer's needs.</h6>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="grid-margin d-flex justify-content-end">
                                    <div className="features-width">
                                        <img src={process.env.PUBLIC_URL + "/images/About_Left.svg"} alt="" className="img-icons" />
                                        <Test />
                                        <a href="/login"><p className="readmore-link">Read more...</p></a>
                                    </div>
                                </div>
                                <div className="grid-margin d-flex justify-content-center">
                                    <div className="features-width">
                                        <img src={process.env.PUBLIC_URL + "/images/About_Center.svg"} alt="" className="img-icons" />
                                        <h5 className="py-3">Example1</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                        <a href="/"><p className="readmore-link">Read more...</p></a>
                                    </div>
                                </div>
                                <div className="grid-margin d-flex justify-content-start">
                                    <div className="features-width">
                                        <img src={process.env.PUBLIC_URL + "/images/About_Right.svg"} alt="" className="img-icons" />
                                        <h5 className="py-3">Example1</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                        <a href="/"><p className="readmore-link">Read more...</p></a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex w-50">
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" class="pr-4" /></a>
                            <h1 className="pt-1">E-portfolio</h1>
                        </div>
                        <div className="navbar-menu-wrapper navbar-nav">
                            <Signup />
                            <Login />
                        </div>
                    </div>
                </nav>
          </header>
          {renderBody()}
          <footer className="border-top ">
              <p className="text-center text-muted pt-4"><a href="/" className="px-1">FiveCent Software Systems.</a></p>
          </footer>
        </Fragment>
    );
};
