import React from "react";

export default function Contact() {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="font-weight-semibold">Contact Us</h1>
        <h6 className="font-weight-normal text-muted">
          A place to find contact information for FiveCent Software Systems
          regarding the Project
        </h6>
        <img
          src={process.env.PUBLIC_URL + "/images/contact.svg"}
          alt=""
          className="img-fluid w-50"
        />
      </div>
      <div className="container">
        <div className="text-left font-weight-normal">
          <h3>Email</h3>
          <p>Please contact us via our team email.</p>
          <a className="link" href="mailto:fivecentIT@gmail.com">
            fivecentIT@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
