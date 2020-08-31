import React from "react";
import GridLayout from 'react-grid-layout';
import '../styles/react-grid-layout/css/styles.css';
import '../styles/react-resizable/css/styles.css';

class MyFirstGrid extends React.Component {

   render() {

    const width = 280;
    const height = 315;
    const columns = 10;

    getWidgets();
    
      // layout is an array of objects, see the demo for more complete usage
      return (
        <div>
            <div>
                <h1>
                    EPORTFOLIO PAGE
                </h1>
            </div>
            <GridLayout className="layout" cols={columns} rowHeight={height} width={columns * width}>
            <div key="a" data-grid={{i: 'a', x: 0, y: 0, w: 1, h: 1}}>
                <img src={process.env.PUBLIC_URL + '/images/bruh.jpg'} alt={'bruhmoment'} width={width + 'px'} draggable='false' />
            </div>
            <div key="b" data-grid={{i: 'b', x: 1, y: 0, w: 1, h: 1}}>
                <img src={process.env.PUBLIC_URL + '/images/what.gif'} alt={'bruhmoment'} width={width + 'px'} draggable='false' />
            </div>
              <div key="c" data-grid={{i: 'c', x: 1, y: 0, w: 1, h: 1}}>
                <img src={'https://media1.tenor.com/images/8daeb547b121eef5f34e7d4e0b88ea35/tenor.gif?itemid=5156041'} alt={'bruhmoment'} width='260' draggable='false' />
            </div>
              <div key="d" data-grid={{i: 'd', x: 1, y: 0, w: 1, h: 1}}>
                <img src={'https://media1.tenor.com/images/48d0355da1b5b8ebd414323806ac2a7f/tenor.gif?itemid=13271320'} alt={'bruhmoment'} width={width + 'px'} draggable='false' />
            </div>
            <div key="e" data-grid={{i: 'e', x: 1, y: 0, w: 1, h: 1}}>
                <img src={'https://steamuserimages-a.akamaihd.net/ugc/956341298143370332/53ABE6EC0306FB921C6BE61D2F054A6B964EE15A/'} alt={'bruhmoment'} width={width + 'px'} draggable='false' />
                <p>hey whats up guys its scarce here</p>
            </div>
            <div key="f" data-grid={{i: 'f', x: 27, y: 0, w: 2, h: 1}}>
                <iframe width={width * 2 + 'px'} height={height} src="https://www.youtube.com/embed/G7RgN9ijwE4?controls=0&autoplay=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>hey this is pretty cool</p>
            </div>
            <div key="g" data-grid={{i: 'g', x: 27, y: 0, w: 1, h: 1}}>
                <iframe src="https://open.spotify.com/embed/album/4aN2EaQB4G7z6BqcEClnMd" width={width + 'px'} height={height} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <p>hey this is pretty cool</p>
            </div>
            </GridLayout>
        </div>
      )
    }
  }


  //do this shit later
async function getWidgets() {
    const requestOptions = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('api/widget/dd404c7c-6769-4049-9611-907ca2e3c252', requestOptions);
    const data = await response.json();
    const type = data.type;
    var info;
    if (type === 'about') {
        info = data.data.about;
    } else if (type === 'image') {
        info = data.data.image;
    }

    console.log(info);
    return {type, info};
}



export default function EPortfolio() {
    return (
        <div>
            <MyFirstGrid/>
        </div>
    );
};
