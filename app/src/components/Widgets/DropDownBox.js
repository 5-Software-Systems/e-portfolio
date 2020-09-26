import React, {useEffect, useState} from "react";

export default function DropDownBox(props) {

    const [widgetTypes, setWidgetTypes] = useState([]);

    async function fetchWidgetTypes() {
        const response = await fetch('/api/widget/types');
        const data = await response.json();
        setWidgetTypes(data);
    }



    useEffect( () => {
        fetchWidgetTypes();
    }, []);

    return (
        <div> 
            <select name="types" id="pavle" onChange={props.onChange} value={props.value}>
                {widgetTypes.map(widgetType =>(
                    <option value={widgetType.type}>{widgetType.type}</option>
                ))}
            </select>
        </div>
        
        
    )
}