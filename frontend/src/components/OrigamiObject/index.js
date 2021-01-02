import React, {useRef} from 'react';
import DrawingSection from "../DrawingSection";
import "./OrigamiObject.css";


export default function OrigamiObject(props) {
    const { dimensions, selectedColor, defaultColor} = props;
    const special = []
    // const specialTop = new Set([12,13,14])
    // const specialBottom = new Set([12,13,14])
  
    const objectRef = useRef();

    let specialTop = []
    let specialBottom = []

    for (let i = dimensions.length-2; i >= 0; i--){
      let sTopCurr = []
      let sBottomCurr = [0,1,2,3]

      const curr = dimensions[i+1][0]
      const next = dimensions[i][0]
      const diff = next-curr // number of pieces need to add or subtract 

      let distribute = 0 
      let remainder = 0
      let spacing = 0
      if (diff > 0){ // increasing - 2 pcs per increase
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
          sTopCurr.push(idx)
          sTopCurr.push(idx+1)
          idx += spacing_arr[i] + 1 + 1
          i += 1 
        }
        i = 0
        for (let i = 0; i < spacing_arr.length-1; i ++){
          const last_idx = sBottomCurr[sBottomCurr.length-1]
          for (let count = 0; count < 4; count ++){
            sBottomCurr.push(last_idx + spacing_arr[i] + count) 
          }
        }       
      }
      specialTop.unshift(new Set(sTopCurr))
      specialBottom.unshift(new Set(sBottomCurr))
    }
  
    specialTop.unshift(new Set())
    specialBottom.push(new Set())

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