import React from "react";
import "./specialRow.css";
import SpecialPixel from "../SpecialPixel";

export default function SpecialRow(props) {
  const { width, offset, specialTop, specialBottom } = props;

  let pixels = [];

  const my_dict = specialBottom ? specialBottom : specialTop
  let count = 0 

  pixels.push(<SpecialPixel key={-1} on={false} num={""}/>)

  for (let i = 0; i < width; i++) {
    if (i in my_dict){
      if (my_dict[i]){
        count += 1
        pixels.push(<SpecialPixel key={i} on={true} markerNum={count}/>);
      }
      else{
        pixels.push(<SpecialPixel key={i} on={true}/>);
      }
    }
    else{
        pixels.push(<SpecialPixel key={i} on={false} num = {i+1}/>);
    }
  }

  return <div style={{marginLeft: offset}} className="specialRow">{pixels}</div>;
}