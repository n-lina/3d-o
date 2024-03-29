import React, { useEffect} from "react";
import "./pixel.css";
import { observer } from "mobx-react";

const Pixel = (props) => {
  const {formObject, PxModel} = props;

  function borderColor() {
    var color = PxModel.pixelColor.substring(1, 8);
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 90) ?
      "#000000" : "#FFFFFF";
  }

  useEffect(()=>{
    formObject.addPc()
    formObject.updateCounterDefault(true)
  }, [])

  useEffect(()=>{
    if (formObject.clear){
      formObject.updateCounterDefault(true)
      PxModel.setPixelColor(formObject.defaultColor)
    }
    else if(PxModel.pixelColor === formObject.oldDefault) {
      formObject.updateCounterDefault()
      PxModel.setPixelColor(formObject.defaultColor)
    }
  }, [formObject.defaultColor])

  function applyColor() {
    formObject.unsetClear();
    PxModel.setPixelColor(formObject.selectedColor);
    if (PxModel.pixelColor !== PxModel.oldColor){
      formObject.updateCounter(PxModel.oldColor, PxModel.pixelColor)
      PxModel.setOldColor(PxModel.pixelColor)
    } 
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
      style={{ background: PxModel.pixelColor, borderColor: borderColor(), borderStyle: "solid"}}
    >
      {PxModel.inverted && <div className="inverted" style={{color: borderColor()}}>-</div>}
    </div>
  );

}

export default observer(Pixel);