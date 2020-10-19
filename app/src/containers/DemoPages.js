import React from "react";
import { useHistory } from "react-router-dom";
import ReactGridLayout from 'react-grid-layout';
import '../styles/ePortfolio-widgets.css';
import '../styles/resizable-styles.css';
import '../fonts/roboto/Roboto-Black.ttf'

import MotherWidget from '../components/Widgets/MotherWidget.js';

export default function EPortfolioDemo() {
    const URL = window.location.href.split('/');
    const PID = URL[URL.length - 1]
    const history = useHistory();

    function switchPage(PID) {
        switch(PID) {
            case 'echidna': 
                return <Echidna/>
            case 'demo':
                return <Demo/>
            case 'calvin':
                return <Calvin/>
            case 'tutorial':
                return <Tutorial/>
            default:
                history.push("/404");
                return;
        }
    }

    return (
        <div className='eportfolioBody'>
            <header className='header'>
                
                <button className='addWidgetButton' onClick={ () => {window.location.href='/help'}}>
                    <a href = '/help'> ← </a>         
                </button>
                 
                <h1 className='impact'>
                    {PID}
                </h1>

            </header>
            {switchPage(PID)}
        </div>
    );
};

//example pages are below --------------------------------------------------------------------------------------------------------------------------------

function Echidna() {
    const width = 300;
    const height = 300;
    const columns = 5;

    const widgets = [
        {
          "public_id": "5ee15077-b8ab-4f54-b6e0-8029b120729f",
          "type": "embed",
          "location": [
            5,
            3,
            0,
            2
          ],
          "data": {
            "external_url": "https://www.youtube.com/embed/yHjdIXN9v2g"
          }
        },
        {
          "public_id": "21f0c5a2-5d0d-4b55-970b-acd6bcb8cabd",
          "type": "about",
          "location": [
            1,
            1,
            0,
            0
          ],
          "data": {
            "about": "{\"blocks\":[{\"key\":\"9ouf5\",\"text\":\"This is an Echidna\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1d33n\",\"text\":\"They are found in Australia \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e4s31\",\"text\":\"They are mammals, but lay eggs.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c3n7e\",\"text\":\"Source\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":6,\"key\":0}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://en.wikipedia.org/wiki/Echidna\",\"className\":\"MUIRichTextEditor-anchorLink-34\"}}}}"
          }
        },
        {
          "public_id": "78d20930-82be-40e6-bdea-90898cd5ceef",
          "type": "about",
          "location": [
            1,
            1,
            0,
            1
          ],
          "data": {
            "about": "{\"blocks\":[{\"key\":\"b9h59\",\"text\":\"The Echidna is on the Australian five cent coin. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"81qlk\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1iv2l\",\"text\":\"Our team is called FiveCent Software Systems.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f0ir2\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"65m6r\",\"text\":\"Thus, we named this service Echidna.  \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":28,\"length\":7,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
          }
        },
        {
          "public_id": "da500317-cd3d-47f3-bd19-704221460ee6",
          "type": "image",
          "location": [
            4,
            2,
            1,
            0
          ],
          "data": {
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Short-beaked_echidna_in_ANBG.jpg/1920px-Short-beaked_echidna_in_ANBG.jpg"
          }
        }
      ]
    
    return (
        <div className='eportfolioBody'>
            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType={null} isDraggable={false} isResizable={false}>
                {widgets.map(widget =>(
                    < div key={widget.public_id} data-grid={{i: widget.public_id, w: widget.location[0], h: widget.location[1], x: widget.location[2], y: widget.location[3]}}>
                        <MotherWidget widget={widget}/> 
                    </ div>
                ))}
            </ReactGridLayout>
        </div>
    );  
}

function Demo() {

    const width = 300;
    const height = 300;
    const columns = 5;
    
    return (
        <div className='eportfolioBody'>

            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType='horizontal' >
            <div key="a" data-grid={{i: 'a', x: 3, y: 1, w: 1, h: 2}}>
                <img src={process.env.PUBLIC_URL + '/images/galaxy.gif'} alt="galaxy" draggable='false' height='100%' />
            </div>
            <div key="b" data-grid={{i: 'b', x: 4, y: 1, w: 1, h: 3}}>
                <iframe width="100%" height="100%" title="embed1" src="https://www.youtube.com/embed/aoKwNx3yr-w?autoplay=0&loop=1&color=white" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <iframe width='100%' height='100%' title="embed2" src="https://www.youtube.com/embed/G7RgN9ijwE4?color=white" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <p>hey this is pretty cool</p>
            </div>
            <div key="g" data-grid={{i: 'g', x: 0, y: 0, w: 1, h: 3}}>
                <iframe width='100%' height='100%' title="embed3" src="https://open.spotify.com/embed/playlist/1nvxlaARYE1MMzeEfKgm1R" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <p>hey this is pretty cool</p>
            </div>
            <div key="h" data-grid={{i: 'h', x: 1, y: 0, w: 1, h: 1}}>
                <img src={process.env.PUBLIC_URL + '/images/what.gif'} alt={'bruhmoment'} width={width} draggable='false' />
            </div>
            <div key="i" data-grid={{i: 'i', x: 2, y: 0, w: 3, h: 1}}>
                <h1> Welcome to My Page! </h1> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>
            <div key="gj" data-grid={{i: 'j', x: 0, y: 0, w: 1, h: 3}}>
                <iframe width='100%' height='100%' title="embed4" src="https://embed.music.apple.com/au/album/future-nostalgia/1495799403" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <p>hey this is pretty cool</p>
            </div>
            </ReactGridLayout>
        </div>
    );         
}

function Calvin() {
    const width = 300;
    const height = 300;
    const columns = 5;
    
    return (
        <div className='eportfolioBody'>
            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType='horizontal' >
                <div key="a" data-grid={{i: 'a', x: 0, y: 0, w: 2, h: 2}}>
                    <img src={'https://scontent.fmel7-1.fna.fbcdn.net/v/t1.15752-9/71270574_399807817397880_7635407870292393984_n.jpg?_nc_cat=108&_nc_sid=ae9488&_nc_ohc=gTHW244ASwgAX93pSFp&_nc_ht=scontent.fmel7-1.fna&oh=decdf6992befcdf3cca55e617776ae64&oe=5FB2BD1D'} alt="galaxy" draggable='false' height='100%' />
                </div>
            </ReactGridLayout>
        </div>
    );  
}
  
function Tutorial() {
    const width = 300;
    const height = 300;
    const columns = 5;
    
    return (
        <div className='eportfolioBody'>

            <ReactGridLayout className="layout" cols={columns} rowHeight={height} width={columns * width} margin={[10,10]} compactType='horizontal' >
            <div key="a" data-grid={{i: 'a', x: 0, y: 0, w: 1, h: 1}}>
                <h1> tutorial page </h1> <p>sooper mahreo in riel loife </p>
                <iframe width="100%" height="100%" title="embed1" src="https://www.youtube.com/embed/8EQ17_B7kug" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div key="b" data-grid={{i: 'b', x: 1, y: 0, w: 1, h: 1}}>
                <h1> tutorial video goes here </h1> 
            </div>
            </ReactGridLayout>
        </div>
    );   
}
