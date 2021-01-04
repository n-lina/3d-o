import React, { useEffect, useState, useRef} from "react";
import "./pixel.css";

export default function Pixel(props) {
  const { formObject } = props;

  const [pixelColor, setPixelColor] = useState("#FFFFFF");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  useEffect(()=>{
    if (pixelColor == formObject.oldDefault) setPixelColor(formObject.defaultColor)
  }, [formObject.defaultColor])

  function applyColor() {
    setPixelColor(formObject.selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover() {
    setOldColor(pixelColor);
    setPixelColor(formObject.selectedColor);
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ background: pixelColor }}
    ></div>
  );

}