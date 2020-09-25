//ligma
import React, {useEffect, useState} from 'react';


export default function GetFields(props) {
    const [fields, setFields] = useState([]);

    const [text, setText] = useState({});


    function setTextList(field, txt) {
        var textOBJ = text;
        textOBJ[field] = txt;
        setText(textOBJ);
        console.log(textOBJ);
        console.log(text);
        if (props.onChange) {
            props.onChange(textOBJ);
        }
    }


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
            <form>
                {Object.keys(fields).map(field =>(
                    <label>
                        {field}:
                        <br />
                        <input className='basePageTextBox' type="text" value={text.field} onChange={(e) => setTextList(field, e.target.value)} />
                        <br />
                        <br />
                    </label>
                ))}
            </form>
        </div>
    )
}
