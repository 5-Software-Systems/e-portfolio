import React, {useEffect, useState} from "react";

export default function DropDownBox() {

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
        <select name="types" id="pavle">
            {console.log(widgetTypes)}
            {widgetTypes.map(widgetType =>(
                <option value={widgetType.type}>{widgetType.type}</option>
            ))}
        </select>
    )
}