import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DeletePopup({
  onDelete,
  conditional = true,
  toDelete = "[NAME OF THING TO DELETE]",
  hasTag = true,
  isBold = true,
  buttonText = "DELETE",
  textClassName = "deleteText",
  buttonClassName = "button",
}) {
  function formatButton() {
    if (hasTag) {
      if (isBold) {
        return <b className={textClassName}> {buttonText} </b>;
      } else {
        return <p className={textClassName}> {buttonText} </p>;
      }
    }

    return buttonText;
  }

  return (
    <Popup
      trigger={<button className={buttonClassName}> {formatButton()} </button>}
      modal
      nested
      className="ePortfolio-popup"
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header2">
            {" "}
            <h1>Are you sure you want to delete {toDelete}?</h1>{" "}
          </div>
          <div className="actions">
            {" "}
            <div>
              <p>This action cannot be undone.</p>
            </div>
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                onDelete();
                close();
              }}
            >
              <b className="deleteText"> Delete </b>{" "}
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
