import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function BasePage(){
    return(
        <Router>
            <div>
                <h1>Base Page</h1>
            </div>
        </Router>

    );
}

export default BasePage;