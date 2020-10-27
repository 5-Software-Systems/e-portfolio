import React from "react";
import "../styles/BasePage.css";
import "../styles/ePortfolio-popup.css";

function DemoPreview(props) {
  return (
    <div className="eportfoliopreview">
      <a href={"/help/" + props.id} className="eportfolioinfo">
        <h3>{props.name}</h3>
        <img
          src={props.img ? props.img : "/images/placeholder.jpg"}
          alt=""
          height="150"
        />
      </a>
    </div>
  );
}

export default DemoPreview;
