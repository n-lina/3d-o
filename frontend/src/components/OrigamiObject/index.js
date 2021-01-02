import React, {useState, useRef} from 'react';
import DrawingSection from "../DrawingSection";
import "./OrigamiObject.css";


export default function OrigamiObject(props) {
    const { dimensions, selectedColor, defaultColor, specialTop, specialBottom } = props;
  
    const objectRef = useRef();
  
    let sections = [];
  
    for (let i = 0; i < dimensions.length; i++) {
      sections.push(<DrawingSection key={i} width={dimensions[i][0]} height={dimensions[i][1]} startOffset={dimensions[i][2]} selectedColor={selectedColor} defaultColor={defaultColor} specialTop={specialTop} specialBottom={specialBottom} />);
    }
  
    return (
      <div id="origamiObject">
        <div id="sections" ref={objectRef}>
          {sections}
        </div>
        {/* <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
          Export as PNG
        </button> */}
      </div>
    );
  }