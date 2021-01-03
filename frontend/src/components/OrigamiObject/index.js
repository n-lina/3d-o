import React, {useRef} from 'react';
import DrawingSection from "../DrawingSection";
import "./OrigamiObject.css";


export default function OrigamiObject(props) {
    const { dimensions, selectedColor, defaultColor} = props;
  
    const objectRef = useRef();

    let specialTop = []
    let specialBottom = []

    for (let i = dimensions.length-2; i >= 0; i--){
      let sTopCurr = {}
      let sBottomCurr = {}

      const curr = dimensions[i+1][0]
      const next = dimensions[i][0]
      const diff = next-curr // number of pieces need to add or subtract 

      let distribute = 0 
      let remainder = 0
      let spacing = 0

      if (diff > 0){ // increasing - 2 pcs per increase
        sBottomCurr  = {0: true, 1: false, 2: false, 3: false}
        distribute = curr - (2 * diff)// pieces left to distribute for spacing 
        remainder = distribute % diff
        spacing = Math.floor(distribute/diff)
        let spacing_arr = Array(diff).fill(spacing)
        for (let i = 0; i < 2; i++){
          let j = i
          while (j < diff && remainder > 0){
            spacing_arr[j] += 1 
            remainder -= 1 
            j += 2 
          }
        }
        let i = 0 
        let idx = 0 
        while(i < diff){
          sTopCurr[idx] = true
          sTopCurr[idx+1] = false
          idx += spacing_arr[i] + 1 + 1
          i += 1 
        }
        i = 0
        let last_idx = 3
        for (let i = 0; i < spacing_arr.length-1; i ++){
          sBottomCurr[last_idx + spacing_arr[i]] = true
          for (let count = 1; count < 4; count ++){
            sBottomCurr[last_idx + spacing_arr[i] + count] = false 
          }
          last_idx = last_idx + spacing_arr[i] + 3
        }  
        specialTop.unshift(sTopCurr)
        specialBottom.unshift(sBottomCurr)     
      } 
      else { // decreasing 
        specialTop = [{},{},{}]
        specialBottom = [{},{},{}]
      }
      console.log("----")
    }
    
    specialTop.unshift({})
    specialBottom.push({})

    let sections = [];
  
    for (let i = 0; i < dimensions.length; i++) {
      sections.push(<DrawingSection key={i} width={dimensions[i][0]} height={dimensions[i][1]} startOffset={dimensions[i][2]} selectedColor={selectedColor} defaultColor={defaultColor} specialTop={specialTop[i]} specialBottom={specialBottom[i]} />);
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