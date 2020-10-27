import React from "react";

export default function Updates() {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="font-weight-semibold">Updates</h1>
        <h6 className="font-weight-normal text-muted">
          A place to see updates on the electronic portfolio project, as managed
          by the FiveCent Software Systems team.
        </h6>
        <img
          src={process.env.PUBLIC_URL + "/images/updates.svg"}
          alt=""
          className="img-fluid w-50"
        />
      </div>
      <div className="container">
        <div className="text-left font-weight-normal w-75">
          <h3>Updates Feature</h3>
          <h5>22/09/2020</h5>
          <p>
            Welcome to the start of the updates section of the presently named
            "e-portfolio system". In the updates section we will record some of
            the updates and major milestones we achieve through the course of
            the development process of this product. This product is apart of a
            semester long project hosted within the subject "IT Project" at
            Unimelb.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="text-left font-weight-normal w-75">
          <h3>Major Graphical Overhaul</h3>
          <h5>24/10/2020</h5>
          <p>
            Today our front-end team took on the task of overhauling the look
            and feel of Echidna. It now feels a lot more clean whilst retaining
            the laid back casual feel we strive for. These changes also made
            Echidna a lot more responsive and has enabled a better user experience.
          </p>
        </div>
      </div>
    </div>
  );
}
