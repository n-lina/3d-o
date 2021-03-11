import React, { useEffect, useState, useRef} from "react";
import "./pixel.css";
import { observer } from "mobx-react";

const Pixel = (props) => {
  const {formObject, PxModel} = props;

  // const [PxModel.pixelColor, PxModel.setPixelColor] = useState("#FFFFFF");
  // const [PxModel.oldColor, PxModel.setOldColor] = useState(PxModel.pixelColor);
  // const [PxModel.canChangeColor, PxModel.setCanChangeColor] = useState(true);

  function borderColor() {
    var color = PxModel.pixelColor.substring(2, 8);
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 90) ?
      "#000000" : "#FFFFFF";
  }

  useEffect(()=>{
    if(formObject.clear) {
      PxModel.setPixelColor(formObject.defaultColor)
    }
    else if (PxModel.pixelColor == formObject.oldDefault) PxModel.setPixelColor(formObject.defaultColor)
  }, [formObject.defaultColor])


  function applyColor() {
    formObject.unsetClear();
    PxModel.setPixelColor(formObject.selectedColor);
    PxModel.setCanChangeColor(false);
  }

  function applyColorSpray() {
    if (formObject.mode){
      applyColor()
    }
  }

  function changeColorOnHover() {
    PxModel.setOldColor(PxModel.pixelColor);
    PxModel.setPixelColor(formObject.selectedColor);
  }

  function resetColor() {
    if (PxModel.canChangeColor) {
      PxModel.setPixelColor(PxModel.oldColor);
    }

    PxModel.setCanChangeColor(true);
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      onMouseOver={applyColorSpray}
      style={{ background: PxModel.pixelColor, borderColor: borderColor(), borderStyle: PxModel.inverted ? "dashed" : "solid"}}
    ></div>
  );

}

export default observer(Pixel);