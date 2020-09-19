import React, {useRef, useState, useEffect} from 'react';
import '../styles/BasePage.css';


function EPortfolioPreview(props){
    
    const link = "/portfolio/" + props.id;
    
    //options fucnctionality 
    //from https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked
    const options = ["Edit", "Delete"]
    const [isOpen, setOpen] = useState(false);
    const handleButtonClick = () => {
        setOpen(!isOpen)
    };

    //so much shit just to close the options ffs
    //https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82 
    const container = useRef();
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    const handleClickOutside = event => {
        if (container.current && !container.current.contains(event.target)) {
            setOpen(false)
        };
    };

    return(
        <div className="eportfoliopreview"> 
            <div class="button_containter" ref={container}> 
                <button type="button" class="button" onClick={handleButtonClick}>
                    ···
                </button>
                {isOpen && (
                    <div class="options"> 
                    <ul>
                        {options.map(option => (
                            <li> {option} </li>
                        ))}
                    </ul>
                </div>
                )}
                
            </div>
           
            <div class="eportfolioinfo"> 
                <a href={ link }>
                    <div>
                        <h3>{props.name}</h3>
                        <p> {props.id} </p>
                        <img src={props.img} alt='' height='150'/>
                    </div>
                </a>
            </div>
            
        </div>
        
    )
}

export default EPortfolioPreview;