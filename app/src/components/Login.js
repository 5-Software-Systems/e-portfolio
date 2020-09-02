import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import LoginForm, { openFormLogin } from "../containers/Login_Form";


export default function Login() {
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex w-50">
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/Logo.png"} alt="" height="50" class="pr-4" /></a>
                            <h1 className="pt-1">E-portfolio</h1>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="form-container m-auto">
                {<LoginForm />}
            </div>
            <footer className="border-top ">
                <p className="text-center text-muted pt-4"><a href="/" className="px-1">FiveCent Software Systems.</a></p>
            </footer>
        </Fragment>
    );
};
