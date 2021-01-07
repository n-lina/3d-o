import React, { useEffect, useState, useRef} from "react";
import "./pixel.css";

export default function Pixel(props) {
  const {formObject, sectionNum, rowNum} = props;

  const [pixelColor, setPixelColor] = useState("#FFFFFF");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  function borderColor(defaultColor) {
    if (formObject.makeTexture) return pixelColor
    var color = defaultColor.substring(2, 8);
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 90) ?
      "#000000" : "#FFFFFF";
  }

  useEffect(()=>{
    if(formObject.clear) {
      setPixelColor(formObject.defaultColor)
    }
    else if (pixelColor == formObject.oldDefault) setPixelColor(formObject.defaultColor)
  }, [formObject.defaultColor])


  function applyColor() {
    formObject.unsetClear();
    setPixelColor(formObject.selectedColor);
    setCanChangeColor(false);
  }

  function applyColorSpray() {
    if (formObject.mode){
      applyColor()
    }
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
      onMouseOver={applyColorSpray}
      style={{ background: pixelColor, height: formObject.makeTexture ? 20 : 13, borderColor: borderColor(formObject.defaultColor)}}
    ></div>
  );

}