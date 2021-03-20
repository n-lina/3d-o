  
import React, { useRef, useEffect } from "react";
import "../DrawingSection/drawingSection.css";
import UntrackedRow from "../UntrackedRow";
import { observer } from "mobx-react";
import "../DrawingSection/drawingSection.css"

// import { exportComponentAsPNG } from "react-component-export-image";

const TriangleSection = (props) => {
  const {wing, caption, width, formObject, elevation, firstRowDisplay, inverted} = props;

  const panelRef = useRef();

  let rows = [];
  
  // height = width 
  const px_width = 21 // 21 is the px width w border
  for (let i = 0; i < width; i++) {
    let var_offset = (0.5*(px_width)*(width-i-1))
    let displayNum = elevation+width-i
    if (!firstRowDisplay){
      if (i < width - 1) var_offset = (0.5*(px_width)*(width-i-3))
      else displayNum = false
    }
    rows.push(<UntrackedRow key={i} wing={wing} numPx={i+1} offset={var_offset} formObject={formObject} display={displayNum} inverted={inverted}/>);
  }

  return (
    <div id="triangleSection">
      <div id="pixels" ref={panelRef} style={{marginBottom: 0, marginLeft: 0, marginRight:0}}>
        {caption && <p id="text">{caption}</p>}
        {rows}
      </div>
    </div>
  );
}

export default observer(TriangleSection)