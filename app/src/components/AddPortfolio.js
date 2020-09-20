import React, {Fragment} from 'react';
import Popup from './Popup';
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import '../styles/BasePage.css';

function AddPortfolio(){
    return(
        <Button 
        className="btn btn-info m-2"
        variant="primary" 
        onClick={openFormAddPortfolio}>
            <div className="eportfoliopreview">
                <h3>Add ePortfolio</h3>
                <h1> + </h1>
            </div>
        </Button>
    )
}

export default function AddPortfolioButton() {
    return (
        <div className="eportfoliopreview"> 
            <Popup name ='add_portfolio' button={AddPortfolio}>
                {AddPortfolioForm}
            </Popup>
        </div>
    )
}

function AddPortfolioForm() {
    return (
        <Fragment>
            <h1>Add a portfolio</h1>
            <FormGroup controlId="portfolio_name">
                <FormLabel>Name</FormLabel>
            </FormGroup>
            <SubmitButton />
        </Fragment>
    );
}

function SubmitButton() {
    
    return (
        <Button>
            "Submit"
        </Button>
    );
}

function openFormAddPortfolio() {
    document.getElementById("add_portfolio_form").style.display = "block"
    document.getElementById("cover").style.display = "block";
}