import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";
import "../DrawingSection/drawingSection.css"

const BunnyOrHandle = (props) => {
    const {caption, size, formObject} = props;
    let object = <div></div>
    let sz = 0
    let w_sz = 0
    let input_sz = 0
    const lim = 50

    if (caption == "bunny ear"){
        // height has to be odd number to have the base bigger
        object = <UntrackedDrawingSection bunny={true} open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[size,(2*size)+1]} />
    }
    else {
        sz = size*21
        input_sz = Math.min(sz, lim)
        w_sz = size/2 
        object = <UntrackedDrawingSection open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[w_sz,input_sz]} />
    }

    return (    
      <div>
        <p id="text">{caption}</p>
        {object}
        {sz > lim && <p id="text">+ {sz-lim} more rows ...</p>}
      </div>
    )
  }

export default BunnyOrHandle;