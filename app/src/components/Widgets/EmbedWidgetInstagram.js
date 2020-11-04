import React from "react";

export default function InstagramToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  return (
    <iframe
      src={src + "embed"}
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allowtransparency="true"
      title={src}
    ></iframe>
  );
}
