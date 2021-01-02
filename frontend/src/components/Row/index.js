import React from "react";
import "./row.css";
import Pixel from "../Pixel";

export default function Row(props) {
  const { width, selectedColor, offset, defaultColor, num } = props;

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} defaultColor={defaultColor} />);
  }

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}