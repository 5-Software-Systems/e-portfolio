import React from "react";
import GridLayout from 'react-grid-layout';
import '../styles/react-grid-layout/css/styles.css';
import '../styles/react-resizable/css/styles.css';

class MyFirstGrid extends React.Component {

   render() {

    const columnWidth = 30;
    const columns = 120;

    getWidgets();
    
      // layout is an array of objects, see the demo for more complete usage
      return (
        <div>
            <div>
                <h1>
                    EPORTFOLIO PAGE
                </h1>
            </div>
            <GridLayout className="layout" cols={columns} rowHeight={30} width={columns * columnWidth}>
            <div key="a" data-grid={{i: 'a', x: 0, y: 0, w: 5, h: 4}}>
                <img src={process.env.PUBLIC_URL + '/images/bruh.jpg'} alt={'bruhmoment'} width={columnWidth * 4 + 'px'} />
            </div>
            <div key="b" data-grid={{i: 'b', x: 1, y: 0, w: 6, h: 5}}>
            <h1><img src={process.env.PUBLIC_URL + '/images/what.gif'} alt={'bruhmoment'} width={columnWidth * 5 + 'px'} /></h1>
            </div>
              <div key="c" data-grid={{i: 'c', x: 1, y: 0, w: 6, h: 3}}>
            <h1><img src={'https://media1.tenor.com/images/8daeb547b121eef5f34e7d4e0b88ea35/tenor.gif?itemid=5156041'} alt={'bruhmoment'} width={columnWidth * 5 + 'px'} /></h1>
            </div>
              <div key="d" data-grid={{i: 'd', x: 1, y: 0, w: 26, h: 11}}>
                <h1><img src={'https://media1.tenor.com/images/48d0355da1b5b8ebd414323806ac2a7f/tenor.gif?itemid=13271320'} alt={'bruhmoment'} width={columnWidth * 25 + 'px'} /></h1>
            </div>
            <div key="e" data-grid={{i: 'e', x: 1, y: 0, w: 26, h: 12}}>
            <h1><img src={'https://steamuserimages-a.akamaihd.net/ugc/956341298143370332/53ABE6EC0306FB921C6BE61D2F054A6B964EE15A/'} alt={'bruhmoment'} width={columnWidth * 25 + 'px'} /></h1>
            <p>hey whats up guys its scarce here</p>
            </div>
            <div key="f" data-grid={{i: 'f', x: 27, y: 0, w: 26, h: 9}}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/G7RgN9ijwE4?controls=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
