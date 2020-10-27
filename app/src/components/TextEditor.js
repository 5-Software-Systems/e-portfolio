//not in use atm
import React from "react";
import "draft-js/dist/Draft.css";
import { Editor, EditorState, RichUtils } from "draft-js";

function MyEditor(PID) {
  async function updateWidget() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          about: editorState.getCurrentContent().getPlainText(),
        },
      }),
    };
    await fetch("/api/widget/" + PID, requestOptions);
  }

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      return "handled";
    }

    return "not-handled";
  };

  const onBoldClick = () => {
    RichUtils.toggleInlineStyle(editorState, "BOLD");
  };

  const onSendClick = () => {
    updateWidget();
    window.location.reload(false);
  };
  return (
    <div>
      <button
        className="popUpFormatButton"
        onClick={onBoldClick.bind(setEditorState)}
      >
        <h6>Bold</h6>
      </button>
      <button
        className="popUpFormatButton"
        onClick={onSendClick.bind(editorState)}
      >
        <h6>Send</h6>
      </button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
