import React from 'react';

import {EditorState, convertFromRaw, Editor} from 'draft-js';
import MUIRichTextEditor from 'mui-rte';

function getFormat(text) {
    const bruh = EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
    return bruh;
}

export function TextToHTML({text}) {

    
    return (
        <div>
            <MUIRichTextEditor
                defaultValue={text}
                toolbar={false}
                readOnly={true}
            />
        </div>
    );
}



export default TextToHTML;