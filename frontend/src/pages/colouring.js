import React, {useState} from 'react';
import { CirclePicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";

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
  const [selectedColor, setColor] = useState("#f44336");
  const [defaultColor, setDefaultColor] = useState("#fff"); 

  function changeColor(color) {
    setColor(color.hex);
  }
  
  const myDimensions = [[50, 19, false],[39,10, true],[31,8, true], [29,100, true]];

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