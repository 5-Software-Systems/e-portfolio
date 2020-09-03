import React from "react";
import ReactGridLayout from 'react-grid-layout';
import '../styles/widget-styles.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'

import {TextToHTML} from "../components/Widgets/TextWidget";

class MyGrid extends React.Component {

    width = 280;
    height = 315;
    columns = 6;
    state = {
        data: 'loading...'
    }

    componentDidMount() {
        this.fetchData();
    };

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
    }
    
    //test = getWidgets()
   render() {
       //console.log('before');
      // layout is an array of objects, see the demo for more complete usage
      const out = (
        <div className='wholePage'>
            <div>
                <h1 class="impact">
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


  // later
async function getPortfolioID() {

    const user = 'c0e6aa7b-db70-4675-88d9-699bee38f154'

    const requestOptions = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }

    const res = await (await fetch('api/user/' + user + '/portfolio', requestOptions)).json();

    return (res.portfolios[0].public_id);
}



export default function EPortfolio() {
    return (
        <div>
            <MyGrid/>
        </div>
    );
};
