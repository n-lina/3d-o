import React, { useState } from "react";
import "./specialPixel.css";

export default function SpecialPixel(props) {
  const {on, num, markerNum} = props;

  if (on){
    if (markerNum){
      return (
        <div
          className="specialPixelOn"
          style={{ backgroundColor: "pink" }}
        ><p style={{marginTop: -4, fontSize: 10, marginLeft: 4, position:'absolute', background: 'pink', paddingLeft: 2.5, paddingRight:2.5, borderRadius:6, color:"red"}}> {markerNum}</p></div>
      );
    } else {
      return (
        <div
          className="specialPixelOn"
          style={{ backgroundColor: "pink" }}
        ></div>
      );
    }
  } 
  else {
    return (
        <div
          className="specialPixelOff"
        >
          <p style={{fontSize:10, marginLeft: 4, marginTop: -4, position:'absolute'}}>{num}</p>
          </div>
      );
  }


}