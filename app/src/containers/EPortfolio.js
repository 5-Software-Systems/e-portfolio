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

   render() {

    

    getWidgets();
    
      // layout is an array of objects, see the demo for more complete usage
      return (
        <div className='wholePage'>
            <div>
                <h1 class="impact">
                    E-PORTFOLIO PAGE
                </h1>
            </div>
            <ReactGridLayout className="layout" cols={this.columns} rowHeight={this.height} width={this.columns * this.width} margin={[10,10]} compactType='horizontal' >
            <div key="a" data-grid={{i: 'a', x: 1, y: 0, w: 1, h: 1}}>
                <img className="image" src={process.env.PUBLIC_URL + '/images/bruh.jpg'} alt={'bruhmoment'} draggable='false' />
            </div>
            <div key="b" data-grid={{i: 'b', x: 4, y: 0, w: 1, h: 2}}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/aoKwNx3yr-w?autoplay=1&loop=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
              <div key="c" data-grid={{i: 'c', x: 3, y: 2, w: 2, h: 1}}>
                <img src={'https://media1.tenor.com/images/8daeb547b121eef5f34e7d4e0b88ea35/tenor.gif?itemid=5156041'} alt={'bruhmoment'} width={this.width} draggable='false' />
            </div>
              <div key="d" data-grid={{i: 'd', x: 1, y: 0, w: 2, h: 1}}>
                <img src={'https://media1.tenor.com/images/48d0355da1b5b8ebd414323806ac2a7f/tenor.gif?itemid=13271320'} alt={'damn'} width={this.width} draggable='false' />
            </div>
            <div key="e" data-grid={{i: 'e', x: 1, y: 2, w: 2, h: 1}}>
                <img src={'https://steamuserimages-a.akamaihd.net/ugc/956341298143370332/53ABE6EC0306FB921C6BE61D2F054A6B964EE15A/'} alt={'scarce'} width={this.width} draggable='false' />
                <p>hey whats up guys its scarce here</p>
            </div>
            <div key="f" data-grid={{i: 'f', x: 2, y: 1, w: 2, h: 1}}>
                <iframe width='100%' height='100%' src="https://www.youtube.com/embed/G7RgN9ijwE4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>hey this is pretty cool</p>
            </div>
            <div key="g" data-grid={{i: 'g', x: 0, y: 0, w: 1, h: 3}}>
                <iframe src="https://open.spotify.com/embed/playlist/1nvxlaARYE1MMzeEfKgm1R" width='100%' height='100%' frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <p>hey this is pretty cool</p>
            </div>
            <div key="h" data-grid={{i: 'h', x: 3, y: 1, w: 1, h: 1}}>
                <img src={process.env.PUBLIC_URL + '/images/what.gif'} alt={'bruhmoment'} width={this.width} draggable='false' />
            </div>
            <div key="i" data-grid={{i: 'i', x: 0, y: 3, w: 5, h: 1}}>
                <TextToHTML header="Welcome to My Page!" text={getWidgets}/>
            </div>
            </ReactGridLayout>
        </div>
      )
    }
  }


  // later
async function getWidgets() {
    const requestOptions = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }

    const res = await (await fetch('api/user/c0e6aa7b-db70-4675-88d9-699bee38f154/portfolio', requestOptions)).json();
    console.log('api/portfolio/' + res.portfolios[0].public_id);
    
    const portfolio = await (await fetch ('api/portfolio/' + res.portfolios[0].public_id, requestOptions)).json();
    console.log(portfolio);
    console.log(portfolio.portfolio.widget[0].data.about)

    return portfolio.portfolio.widget[0].data.about;

}



export default function EPortfolio() {
    return (
        <div>
            <MyGrid/>
        </div>
    );
};
