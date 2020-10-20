import React from "react";
import DemoPreview from "../components/DemoPreview";
import "../styles/BasePage.css";


export default function Examples() {
    

    return (
        <div className="container">
            <div className="basepage">
                < DemoPreview name={'Echidna'} id={'echidna'} img={process.env.PUBLIC_URL + '/images/Logo.png'} />
                < DemoPreview name={'From humble beginnings...'} id={'demo'} img={"https://i.imgur.com/7qttfnm.gif"} />
                < DemoPreview name={"Calvin's Portfolio"} id={'calvin'} img={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/35c9bf34559659.56d57de0eb467.gif"}/>
                < DemoPreview name={'Tutorial'} id={'tutorial'} img={"https://lh3.googleusercontent.com/proxy/ocXtIG62nkpG8sKN6mxPFVsxaUnbFp4jRwAo5KB19KHS9hqs_r16qR8AcD1LRvQpR_LrOKzEduTszMMFpBuG1CnUW7VzR3PBuF894UmxMXYjU0K_DJHsa5pWH7ISqQ"}/>
            </div>
        </div>
    );
};