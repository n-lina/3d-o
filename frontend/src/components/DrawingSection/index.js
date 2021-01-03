  
import React, { useRef } from "react";
import "./drawingSection.css";
import Row from "../Row";
import SpecialRow from "../SpecialRow";

// import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingSection(props) {
  const { width, height, selectedColor, defaultColor, specialTop, specialBottom, increasing } = props;

  const panelRef = useRef();

  let rows = []; 

  rows.push(<SpecialRow key={-1} offset={0} width={width} specialTop={specialTop} />)

  for (let i = 0; i < height; i++) {
    if (i%2 == 1){
      rows.push(<Row key={i} offset={10.5} width={width} selectedColor={selectedColor} defaultColor={defaultColor} rowNum={height-i} />);
    }
    else{ 
      rows.push(<Row key={i} offset={0} width={width} selectedColor={selectedColor} defaultColor={defaultColor} rowNum={height-i} />);
    }
  }
  
  if(increasing){
    if (height%2 == 1){
      rows.push(<SpecialRow key={height} offset={10.5} width={width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={height} offset={10.5*2} width={width} specialBottom={specialBottom} />)
    }
  }
  else{
    if (height%2 == 1){
      rows.push(<SpecialRow key={height} offset={0} width={width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={height} offset={10.5} width={width} specialBottom={specialBottom} />)
    }
  }


  return (
    <div id="drawingSection">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      {/* <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button> */}
    </div>
  );
}