import React from "react";

export default function SpotifyToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  const link = "https://open.spotify.com/embed/" + getID(src);

  function getID(URL) {
    var split = URL.split("/");
    var end = split[split.length - 1].split("?");
    var id = split[split.length - 2] + "/" + end[0];
    return id;
  }

  return (
    <iframe
      width={width}
      height={height}
      src={link}
      frameBorder="0"
      title={getID(src)}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
