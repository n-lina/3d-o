import React, {useState} from 'react';
import { CirclePicker } from "react-color";
import DrawingSection from "../components/DrawingSection";
import "./colouringPage.css";
import LineTo from 'react-lineto';

const Colouring = () => {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [selectedColor, setColor] = useState("#f44336");

  function changeColor(color) {
    setColor(color.hex);
  }

  return (
    <div>
      <div className = "toolbar" style={{background: '#fae', justifyContent:'center', alignItems: 'center', display:'flex'}}>
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      </div>
      <div className = "canvas"
        style={{
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          width: 'auto', 
          // background: '#baf'
        }}
      >
        <DrawingSection
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
        <DrawingSection
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
        <h1 className="hello">hello</h1>
        <br/>
        <h1 className="bye">hello</h1>
        <LineTo borderWidth={100} from="hello" to="bye" borderStyle="solid" delay={500}/>
        <LineTo borderWidth={100} from="hello" to="toolbar" borderStyle="solid"/>
      </div>
  </div>
  );
};

export default Colouring;