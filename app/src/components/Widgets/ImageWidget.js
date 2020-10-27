import React from "react";

export default function ImageToHTML({
  src = "/images/placeholder.svg",
  alt = "an image",
  width = "100%",
  height = "100%",
}) {
  return (
    <img
      src={src ? src : "/images/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      draggable={"false"}
    />
  );
}
