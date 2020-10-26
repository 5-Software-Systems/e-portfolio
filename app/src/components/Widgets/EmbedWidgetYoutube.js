import React from "react";

export default function YoutubeToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  function getID(URL) {
    var split = URL.split("/");
    var end = split[split.length - 1].split("=");
    var id = end[end.length - 1];
    return id;
  }
  const link = "https://www.youtube.com/embed/" + getID(src);

  return (
    <iframe
      width={width}
      height={height}
      src={link}
      frameBorder="0"
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
