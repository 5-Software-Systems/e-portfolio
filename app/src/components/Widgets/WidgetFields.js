//ligma
import React, {useEffect, useState} from 'react';


export default function GetFields(props) {
    const [fields, setFields] = useState([]);

    async function fetchWidgetTypes() {
        const response = await fetch('/api/widget/types');
        const data = await response.json();
        getFieldRequirementsForEachWidget(data);
    }

    function getFieldRequirementsForEachWidget(data) {
        var i=0;
        for (i = 0; i<data.length; i++) {
            if (props.type === data[i].type) {
                setFields(data[i].data);
            }
        }
    }

    useEffect( () => {
        fetchWidgetTypes();
    }, [props]);

    return (
        <div>
            {console.log(Object.keys(fields))}
            <form>
                {Object.keys(fields).map(field =>(
                    <label>
                        {field}:
                        <br />
                        <input className='basePageTextBox' value={"you bloody bastard"} />
                        <br />
                        <br />
                    </label>
                ))}
            </form>
        </div>
    )
}