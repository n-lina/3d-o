import React, {useState} from 'react';
import { CirclePicker } from "react-color";
import DrawingSection from "../components/DrawingSection";
import "./colouringPage.css";

const Colouring = () => {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [selectedColor, setColor] = useState("#f44336");

  function changeColor(color) {
    setColor(color.hex);
  }

  return (
    <div>
      <div className = "toolbar" style={{background: '#fae', justifyContent:'center', alignItems: 'center', display:'flex', width:'auto'}}>
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      </div>
      <div className = "canvas"
        style={{
          //  display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          width: 'auto', 
          // background: '#baf'
          overflowX:'scroll'
        }}
      >
        <DrawingSection
          width={1000}
          height={panelHeight}
          selectedColor={selectedColor}
        />
        <canvas className="drawing" >
        </canvas>
        <DrawingSection
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
      </div>
  </div>
  );
};

export default Colouring;