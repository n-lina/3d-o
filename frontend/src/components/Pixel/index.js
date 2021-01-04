import React, { useEffect, useState, useRef} from "react";
import "./pixel.css";

export default function Pixel(props) {
  const { selectedColor, defaultColor, oldDefault} = props;

  const [pixelColor, setPixelColor] = useState("#FFFFFF");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  useEffect(()=>{
    if (pixelColor == oldDefault) setPixelColor(defaultColor)
  }, [defaultColor])

  function applyColor() {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover() {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
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