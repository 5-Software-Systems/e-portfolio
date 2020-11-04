import React from "react";
import MUIRichTextEditor from "mui-rte";

export default function TextToHTML({ text }) {
  return (
    <div className="richtext">
      <MUIRichTextEditor defaultValue={text} toolbar={false} readOnly={true} />
    </div>
  );
}
