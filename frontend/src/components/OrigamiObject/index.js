import React, {useRef} from 'react';
import DrawingSection from "../DrawingSection";
import "./OrigamiObject.css";


export default function OrigamiObject(props) {
    const { dimensions, formObject} = props;
  
    const objectRef = useRef();

    let increasing = []
    let specialTop = []
    let specialBottom = []

    for (let i = dimensions.length-2; i >= 0; i--){
      let sTopCurr = {}
      let sBottomCurr = {}

      const curr = dimensions[i+1][0]
      const next = dimensions[i][0]
      let diff = next-curr // number of pieces need to add or subtract 

      let distribute = 0 
      let remainder = 0
      let spacing = 0

      if (diff > 0){ // increasing - 2 pcs per increase
        sBottomCurr  = {0: 1, 1: 0, 2: -1}
        distribute = curr - (2 * diff)// pieces left to distribute for spacing 
        remainder = distribute >= 0 ? distribute % diff : curr-diff
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
          sTopCurr[idx] = 1
          sTopCurr[idx+1] = -1
          idx += spacing_arr[i] + 2
          i += 1 
        }
        let last_idx = 2
        for (let i = 0; i < spacing_arr.length-1; i ++){
          sBottomCurr[last_idx + spacing_arr[i] + 1] = 1
          sBottomCurr[last_idx + spacing_arr[i] + 2] = 0
          sBottomCurr[last_idx + spacing_arr[i] + 3] = -1
          last_idx = last_idx + spacing_arr[i] + 3
        }  
        specialTop.unshift(sTopCurr)
        specialBottom.unshift(sBottomCurr)    
        increasing.unshift(true) 
      } 
      else { // decreasing 
        sBottomCurr = {0: 1, 1: -1}
        diff = -1 * diff
        distribute = curr - (3 * diff)
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
          sTopCurr[idx] = 1
          sTopCurr[idx+1] = 0
          sTopCurr[idx+2] = -1
          idx += spacing_arr[i] + 3
          i += 1 
        }
        let last_idx = 1
        for (let i = 0; i < spacing_arr.length-1; i ++){
          sBottomCurr[last_idx + spacing_arr[i] + 1] = 1
          sBottomCurr[last_idx + spacing_arr[i] + 2 ] = -1
          last_idx = last_idx + spacing_arr[i] + 2
        }  
        specialTop.unshift(sTopCurr)
        specialBottom.unshift(sBottomCurr)  
        increasing.unshift(false)
      }
      console.log("----")
    }
    
    specialTop.unshift({})
    specialBottom.push({})
    increasing.push(false)

    let sections = [];
  
    for (let i = 0; i < dimensions.length; i++) {
      sections.push(<DrawingSection key={i} width={dimensions[i][0]} height={dimensions[i][1]} specialTop={specialTop[i]} specialBottom={specialBottom[i]} increasing={increasing[i]} formObject={formObject} />);
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