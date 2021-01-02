import React from "react";
import "./specialRow.css";
import SpecialPixel from "../SpecialPixel";

export default function SpecialRow(props) {
  const { width, offset, specialTop, specialBottom } = props;

  let pixels = [];

  const my_set = specialBottom ? specialBottom : specialTop

  for (let i = 0; i < width; i++) {
    if (my_set.has(i)){
        pixels.push(<SpecialPixel key={i} on={true}/>);
    }
    else{
        pixels.push(<SpecialPixel key={i} on={false}/>);
    }
  }

  return <div style={{marginLeft: offset}} className="specialRow">{pixels}</div>;
}