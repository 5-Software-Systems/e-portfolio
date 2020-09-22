import React, { Fragment } from 'react';
import Test from '../components/Test';

export default function BaseTemplate(props) {
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex">
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" className="pr-4" /></a>
                            <h1 className="pt-1">ePortfolio</h1>
                        </div>
                        <ul className="navbar-nav links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/updates">Updates</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                        <div className="navbar-menu-wrapper navbar-nav">
                            {props.nav_right}
                        </div>
                    </div>
                </nav>
            </header>
            {props.body}
            <footer className="border-top text-center text-muted">
                <p className="pt-3"><a href="/demo">FiveCent Software Systems.</a></p>
                <Test />
            </footer>
        </Fragment>
    );
}