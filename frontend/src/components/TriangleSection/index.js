  
import React, { useRef, useEffect } from "react";
import "../DrawingSection/drawingSection.css";
import Row from "../Row";
import { observer } from "mobx-react";

// import { exportComponentAsPNG } from "react-component-export-image";

const TriangleSection = (props) => {
  const {width} = props;

  const panelRef = useRef();

  let triangle = []; 
  
  // height = width 
  for (let i = 0; i < width; i++) {
  }

  return (
    <div id="drawingSection">
      <div id="pixels" ref={panelRef} style={{marginBottom: 0, marginLeft: 40, marginRight: 40}}>
        {triangle}
      </div>
    </div>
  );
}

export default observer(TriangleSection)