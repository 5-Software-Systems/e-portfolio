import React, {useEffect, useState} from "react";
import ReactGridLayout from 'react-grid-layout';
import { useHistory } from "react-router-dom";
import { isAuthorized } from "../util/cookies";
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'

import {TextToHTML} from "../components/Widgets/TextWidget";

class MyGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'loading...',
            eportfolio: 'duma'
        } 
    }

    
    width = 280;
    height = 315;
    columns = 6;


    
    
    componentDidMount() {
        this.fetchWidgets();
    };
   /*
    fetchData = async () => {
        const response = await fetch("api/portfolio/" + await getPortfolioID());
        const json = await response.json();
        //const result = json.portfolio.state.data.widget[0].data.about;
        //this.setState({data: json.portfolio});
        //console.log(this.state.data.widget[0].data.about);
        const that = json.portfolio.widget[0].data.about;
        this.setState({data: that})
        console.log("that:");
        console.log(that);
    }*/
    
    fetchWidgets = async() => {
        this.setState({eportfolio :this.props.eportfolioID});
        console.log(this.state.eportfolio);
    }
    //test = getWidgets()
    render() {
        console.log(this.props.eportfolio);
       //console.log('before');
      // layout is an array of objects, see the demo for more complete usage
      const out = (
        <div className='wholePage'>
            <div>
                <h1 className="impact">
                    E-PORTFOLIO PAGE
                </h1>
            </div>
            <ReactGridLayout className="layout" cols={this.columns} rowHeight={this.height} width={this.columns * this.width} margin={[10,10]} compactType='horizontal' >
                
            </ReactGridLayout>
        </div>
      )
      //console.log('after');
      return out;
    }
  }

/*
async function getPortfolioID() {


    const user = 'c0e6aa7b-db70-4675-88d9-699bee38f154'

    const requestOptions = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }

    const res = await (await fetch('api/user/' + user + '/portfolio', requestOptions)).json();

    return (res.portfolios[0].public_id);
}*/



export default function EPortfolio() {
    
    const history = useHistory();
    const Auth = isAuthorized();
    if (! Auth) {
        history.push("/login");
    }

    const [user, setUser] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [eportfolio, setEportfolio] = useState([]);
    
    const fetchEportfolio = async() => {
        const user_data = await fetch('/api/auth/user', {headers: { 'Content-Type': 'application/json', 'Authorization': "bearer " + Auth}});
        const user = await user_data.json();
        setUser(user);

        const prof_data = await fetch('/api/user/' + user.public_id + '/portfolio');
        const profile = await prof_data.json();
        setProfiles(profile.portfolios);

        const eport_data = await fetch('/api/portfolio/' + profile.portfolios[0].public_id);
        const eportfolio = await eport_data.json();
        setProfiles(eportfolio);
        console.log(eportfolio);
    }

    //store db
    useEffect( () =>{
        fetchEportfolio();
    }, [])

    return (
        <div>
            <MyGrid eportfolioID={eportfolio}/>
        </div>
    );
};
