import React from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";

export default function Row(props) {
  const { width, selectedColor, offset, defaultColor, rowNum} = props;

  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} rowNum={rowNum} />)

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} defaultColor={defaultColor} />);
  }

  pixels.push(<SpecialPixel key={width} on={false} rowNum={rowNum} />)

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}