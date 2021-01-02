  
import React, { useRef } from "react";
import "./drawingSection.css";
import Row from "../Row";
import SpecialRow from "../SpecialRow";

// import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingSection(props) {
  const { width, height, selectedColor, startOffset, defaultColor, specialTop, specialBottom } = props;

  const panelRef = useRef();

  let rows = []; 

  if (startOffset) rows.push(<SpecialRow key={-1} offset={6.5} width={width}  specialTop={specialTop} />)
  else rows.push(<SpecialRow key={-1} offset={0} width={width} specialTop={specialTop} />)

  
  for (let i = 0; i < height; i++) {
    if (startOffset){
      if (i%2 == 0){
        rows.push(<Row key={i} offset={6.5} width={width} selectedColor={selectedColor} defaultColor={defaultColor} />);
      }
      else{ 
        rows.push(<Row key={i} offset={0} width={width} selectedColor={selectedColor} defaultColor={defaultColor}  />);
      }
    }
    else {
      if (i%2 == 1){
        rows.push(<Row key={i} offset={6.5} width={width} selectedColor={selectedColor} defaultColor={defaultColor}  />);
      }
      else{ 
        rows.push(<Row key={i} offset={0} width={width} selectedColor={selectedColor} defaultColor={defaultColor}  />);
      }
    }
  }

  if (startOffset){
    if (height%2 == 1){
      rows.push(<SpecialRow key={height} offset={6.5} width={width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={height} offset={0} width={width} specialBottom={specialBottom} />)
    }
  } else {
    if (height%2 == 1){
      rows.push(<SpecialRow key={height} offset={0} width={width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={height} offset={6.5} width={width} specialBottom={specialBottom} />)
    }
  }


  return (
    <div id="drawingSection" style={{bacgkround: "#aba"}}>
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      {/* <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button> */}
    </div>
  );
}