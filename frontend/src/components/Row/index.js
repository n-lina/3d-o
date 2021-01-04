import React from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";

export default function Row(props) {
  const { width, offset, rowNum, formObject} = props;

  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} rowNum={rowNum} />)

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} formObject={formObject} />);
  }

  pixels.push(<SpecialPixel key={width} on={false} rowNum={rowNum} />)

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}