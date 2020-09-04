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

  
    
   render() {
       
      const out = (
        <div className='wholePage'>
            <div>
                <h1 class="impact">
                    E-PORTFOLIO PAGE
                </h1>
            </div>
            <ReactGridLayout className="layout" cols={this.columns} rowHeight={this.height} width={this.columns * this.width} margin={[10,10]} compactType='horizontal' >
            <div key="a" data-grid={{i: 'a', x: 3, y: 1, w: 1, h: 2}}>
                <img src={process.env.PUBLIC_URL + '/images/galaxy.gif'} alt="galaxy" draggable='false' height='100%' />
            </div>
            <div key="b" data-grid={{i: 'b', x: 4, y: 1, w: 1, h: 3}}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/aoKwNx3yr-w?autoplay=0&loop=1&color=white" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div key="c" data-grid={{i: 'c', x: 0, y: 4, w: 2, h: 1}}>
                <img src={'https://media1.tenor.com/images/8daeb547b121eef5f34e7d4e0b88ea35/tenor.gif?itemid=5156041'} alt={'bruhmoment'} height='100%' draggable='false' />
            </div>
              <div key="d" data-grid={{i: 'd', x: 1, y: 1, w: 2, h: 1}}>
                <img src={'https://media1.tenor.com/images/48d0355da1b5b8ebd414323806ac2a7f/tenor.gif?itemid=13271320'} alt={'damn'} height='100%' draggable='false' />
            </div>
            <div key="e" data-grid={{i: 'e', x: 1, y: 2, w: 2, h: 1}}>
                <img src={'https://data.whicdn.com/images/286894498/original.gif'} alt={'scarce'} height='100%' draggable='false' />
                <p>hey whats up guys its scarce here</p>
            </div>
            <div key="f" data-grid={{i: 'f', x: 2, y: 3, w: 2, h: 1}}>
                <iframe width='100%' height='100%' src="https://www.youtube.com/embed/G7RgN9ijwE4?color=white" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>hey this is pretty cool</p>
            </div>
            <div key="g" data-grid={{i: 'g', x: 0, y: 0, w: 1, h: 3}}>
                <iframe src="https://open.spotify.com/embed/playlist/1nvxlaARYE1MMzeEfKgm1R" width='100%' height='100%' frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <p>hey this is pretty cool</p>
            </div>
            <div key="h" data-grid={{i: 'h', x: 1, y: 0, w: 1, h: 1}}>
                <img src={process.env.PUBLIC_URL + '/images/what.gif'} alt={'bruhmoment'} width={this.width} draggable='false' />
            </div>
            <div key="i" data-grid={{i: 'i', x: 2, y: 0, w: 3, h: 1}}>

                <TextToHTML header="Welcome to My Page!" text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
            </div>
            </ReactGridLayout>
        </div>
      )
      //console.log('after');
      return out;
    }
  }





export default function EPortfolio() {
    return (
        <div>
            <MyGrid/>
        </div>
    );
};
