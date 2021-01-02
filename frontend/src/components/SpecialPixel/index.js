import React, { useState } from "react";
import "./specialPixel.css";

export default function SpecialPixel(props) {
  const {on} = props;

  if (on){
    return (
        <div
          className="specialPixelOn"
          style={{ backgroundColor: "red" }}
        ></div>
      );
  } else {
    return (
        <div
          className="specialPixelOff"
          style={{ backgroundColor: "white" }}
        ></div>
      );
  }


}