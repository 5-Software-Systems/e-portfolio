import React from 'react';


export function PortfolioToHTML({name, desc, src}) {

    
    return (
        <div id='textWidget'>
            <a href={src}>
                <h1>{name}</h1>
                <p>{desc}</p>
            </a>
        </div>
    );
}

export default PortfolioToHTML;