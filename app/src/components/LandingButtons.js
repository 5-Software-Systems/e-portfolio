import React, {Fragment} from 'react';
import Signup from './containers/Signup';
import Login from './containers/Login';

export default function LandingButtons() {
    return (
        <Fragment>
            <Signup />
            <Login />
        </Fragment>
    );
}