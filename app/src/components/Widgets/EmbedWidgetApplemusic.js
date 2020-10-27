import React from "react";

export default function ApplemusicToHTML({
  src,
  title = "embed",
  width = "100%",
  height = "100%",
}) {
  const link = "https://embed.music.apple.com/" + getID(src);

  function getID(URL) {
    var split = URL.split("/");
    var id = split.slice(split.length - 4, split.length).join("/");
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
