import React, {useState} from 'react';
import { CirclePicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";
import { ArcherContainer, ArcherElement } from 'react-archer';

/* stretch goals 
- spray painting 
- using lines and shapes to color 
- larger brush size 
- rotation option -- need to use smth other than index for keys, and map for default / starting position */


// const rootStyle = { width:'200px', marginLeft: 'auto', marginRight:'auto', marginBottom:0, background: "#eaa"};
// const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between', }
// const fromStyle = { width:'200px', marginLeft: '100px', marginRight:'100px', background: "#eaa"};
// const boxStyle = { padding: '10px', border: '1px solid black', };

const Colouring = () => {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [selectedColor, setColor] = useState("#f44336");
  const [defaultColor, setDefaultColor] = useState("#fff"); 

  function changeColor(color) {
    setColor(color.hex);
  }
  
  const myDimensions = [[30, 19, false],[39,10, true],[31,8, true], [29,100, true]];
  const specialTop = new Set([12,13,14])
  const specialBottom = new Set([12,13,14])

  let myHeight = 0 
  const myYMargin = 10
  const px_y = 8
  const px_border = 1
  const marker_y = 7

  for (let i = 0; i < myDimensions.length; i++){
    const y = myDimensions[i][1]
    myHeight += (y * (px_y + px_border)) + (1.5*myYMargin) + (2*marker_y)
  }

  return (
    <div >
      <div className = "toolbar" style={{background: '#fae', justifyContent:'center', alignItems: 'center', width:'auto', padding: 10, marginBottom: 10}}>
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      </div>
      <div style={{position: 'relative', overflowX:'scroll', overflowY:'hidden', height:myHeight}}>
        <div className = "canvas"
          style={{
            //  display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: 'auto', 
            // background: '#fff',
            position: 'absolute',    
            marginLeft:10, 
            marginRight:10      
          }}
        >
          <OrigamiObject 
            dimensions={myDimensions}  
            selectedColor={selectedColor}
            defaultColor={defaultColor}
            specialTop={specialTop}
            specialBottom={specialBottom}
          />
        </div>
      </div>
    </div>
  );
};

export default Colouring;