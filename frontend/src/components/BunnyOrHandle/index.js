import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";
import "../DrawingSection/drawingSection.css"

const BunnyOrHandle = (props) => {
    const {caption, size, formObject, upsize} = props;
    let object = <div></div>
    let height = 0
    const lim = 50

    function cmToPcs(cm, height=false){
      const height_factor = upsize? 0.7: 0.55 // 0.5 cm height per row
      const width_factor = upsize? 1.2 : 0.8 // 0.8 cm width per pc
      if (height){
          return Math.round(cm/height_factor)
      }
      return Math.round(cm/width_factor)
    }

    if (caption == "bunny ear"){
        // height has to be odd number to have the base bigger
        object = <UntrackedDrawingSection bunny={true} open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[size,(2*size)+1]} />
    }
    else {
        height = cmToPcs(1.2 * size * Math.PI/2, true) // length of the handle = a bit more than hemisphere
        const input_height = Math.min(height, lim)
        const width = cmToPcs((38/360) * size * Math.PI)
        object = <UntrackedDrawingSection open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[width,input_height]} />
    }

    return (    
      <div>
        <p id="text">{caption}</p>
        {object}
        {height > lim && <p id="text">+ {height-lim} more rows ...</p>}
      </div>
    )
  }

export default BunnyOrHandle;