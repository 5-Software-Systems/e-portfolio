import React, { Fragment } from 'react';
import '../styles/Pop-up.css';

export default function BaseTemplate(props) {
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex w-50">
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" className="pr-4" /></a>
                            <h1 className="pt-1">ePortfolio</h1>
                        </div>
                        <div className="navbar-menu-wrapper navbar-nav">
                            {props.nav_right}
                        </div>
                    </div>
                </nav>
            </header>
            {props.body}
            <footer className="border-top ">
                <p className="text-center text-muted pt-4"><a href="/" className="px-1">FiveCent Software Systems.</a></p>
            </footer>
        </Fragment>
    );
}