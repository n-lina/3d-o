import React, { useState } from "react";
import "./specialPixel.css";

export default function SpecialPixel(props) {
  const {on, num, markerNum, rowNum, rounded} = props;

  if (on){
    if (markerNum){
      return (
        <div
          className="specialPixelOn"
        ><p style={{marginTop: -4, fontSize: 10, marginLeft: -1.1, position:'absolute', background: "#FF778C", paddingLeft: 2.5, paddingRight:2.5, borderRadius:6, color:"white"}}> {markerNum}</p></div>
      );
    } else {
      if (rounded){
        return (
          <div className="roundedRight"
          ></div>
        );
      }
      else{
        return (
          <div className="specialPixelOn"
          ></div>
        );
      }
    }
  } 
  else {
    if (rowNum){
      return (
        <div
          className="rowMarkerPixel"
        >
          <p style={{fontSize:9, marginLeft: 5, marginTop:0, position:'absolute'}}>{rowNum}</p>
          </div>
      );
    }
    else{
      return (
        <div
          className="specialPixelOff"
        >
          <p style={{fontSize:10, marginLeft: 4, marginTop: -4, position:'absolute'}}>{num}</p>
          </div>
      );
    }
  }
}