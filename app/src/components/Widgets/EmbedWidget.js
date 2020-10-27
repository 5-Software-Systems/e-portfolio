import React from "react";

export default function EmbedToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      frameBorder="0"
      title={src}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
