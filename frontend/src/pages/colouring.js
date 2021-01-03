import React, {useState} from 'react';
import { CirclePicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";

/* stretch goals 
- spray painting 
- using lines and shapes to color 
- larger brush size 
- rotation option -- need to use smth other than index for keys, and map for default / starting position */


const Colouring = () => {
  const [selectedColor, setColor] = useState("#f44336");
  const [defaultColor, setDefaultColor] = useState("#fff"); 

  function changeColor(color) {
    setColor(color.hex);
  }

  // right now max increase allowed is 1.5x - implement negative remainders for up to 2x increase
  // max decrease allowed is 0.66x 

  const myDimensions = [[50, 19],[34,10],[28,9], [16,10]];

  let myHeight = 0 
  const myYMargin = 20
  const px_y = 13
  const px_border = 1
  const marker_y = 20

  for (let i = 0; i < myDimensions.length; i++){
    const y = myDimensions[i][1]
    myHeight += (y * (px_y + px_border)) + (1.5*myYMargin) + (2*marker_y)
  }

  return (
    <div style={{background: "#FFE7E5"}}>
      <div className = "toolbar">
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      </div>
      <div style={{position: 'relative', overflowX:'scroll', overflowY:'hidden', height:myHeight, background:"#FFE7E5"}}>
        <div className = "canvas"
          style={{
            //  display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: 'auto', 
            // background: '#fff',
            position: 'absolute',         
          }}
        >
          <OrigamiObject 
            dimensions={myDimensions}  
            selectedColor={selectedColor}
            defaultColor={defaultColor}
          />
        </div>
      </div>
    </div>
  );
};

export default Colouring;