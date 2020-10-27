import React from "react";

export default function ImageToHTML({
  src = "https://i.kym-cdn.com/entries/icons/facebook/000/016/540/hgh08Pez.jpg",
  alt = "an image",
  width = "100%",
  height = "100%",
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={"false"}
    />
  );
}
