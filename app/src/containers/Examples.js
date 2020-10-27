import React from "react";
import DemoPreview from "../components/DemoPreview";
import "../styles/BasePage.css";

export default function Examples() {
  return (
    <div className="container">
      <div className="basepage">
        <DemoPreview
          name={"Echidna"}
          id={"echidna"}
          img={process.env.PUBLIC_URL + "/images/logo_b.svg"}
        />
        <DemoPreview
          name={"From humble beginnings..."}
          id={"demo"}
          img={"https://i.imgur.com/7qttfnm.gif"}
        />
        <DemoPreview
          name={"Calvin's Portfolio"}
          id={"calvin"}
          img={
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/35c9bf34559659.56d57de0eb467.gif"
          }
        />
        <DemoPreview
          name={"The Team"}
          id={"team"}
          img={"https://avatars2.githubusercontent.com/u/69838245?s=200&v=4"}
        />
        <DemoPreview
          name={"Tutorial"}
          id={"tutorial"}
          img={"https://img.icons8.com/bubbles/2x/help.png"}
        />
      </div>
    </div>
  );
}
