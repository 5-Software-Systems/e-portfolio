import React from "react";

export function PortfolioToHTML({ name, desc, src }) {
  return (
    <a href={src} target="_blank">
      <h1>{name}</h1>
      <p>{desc}</p>
    </a>
  );
}
