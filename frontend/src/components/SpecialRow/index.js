import React from "react";
import "./specialRow.css";
import SpecialPixel from "../SpecialPixel";

export default function SpecialRow(props) {
  const { width, offset, specialTop, specialBottom } = props;

  let pixels = [];

  const my_set = specialBottom ? specialBottom : specialTop
  let count = 0 

  for (let i = 0; i < width; i++) {
    if (my_set.has(i)){
      
      if (!my_set.has(i-1)){
        pixels.push(<SpecialPixel key={i} on={true} markerNum={Math.floor(count/4)+1}/>);
      }
      else{
        pixels.push(<SpecialPixel key={i} on={true}/>);
      }
      count += 1
    }
    else{
        pixels.push(<SpecialPixel key={i} on={false} num = {i}/>);
    }
  }

  return <div style={{marginLeft: offset}} className="specialRow">{pixels}</div>;
}