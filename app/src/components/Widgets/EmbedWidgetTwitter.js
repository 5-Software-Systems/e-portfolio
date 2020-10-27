import React from "react";

export default function TwitterToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  const link = "https://twitframe.com/show?url=" + encodeURIComponent(src);

  return (
    <iframe
      width={width}
      height={height}
      src={link}
      frameBorder="0"
      title={src}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
