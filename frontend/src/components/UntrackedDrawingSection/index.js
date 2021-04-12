  
import React, { useRef, useEffect } from "react";
import "../DrawingSection/drawingSection.css";
import UntrackedRow from "../UntrackedRow";
import SpecialRow from "../SpecialRow";
import { observer } from "mobx-react";

const UntrackedDrawingSection = (props) => {
  const {arm, open, bunny, specialTop, specialBottom, increasing, formObject, dimensions} = props;

  let rows = []; 
  let inverted = false

  if (!bunny) rows.push(<SpecialRow key={-1} offset={0} width={dimensions[0]} specialTop={specialTop} />)
  else{
    const end_width = Math.floor(dimensions[0]*(0.5))
    const num_rows = dimensions[0] - end_width
    for (let i = 0; i < num_rows; i++){
      rows.push(<UntrackedRow key={dimensions[1]+1+i} numPx={end_width+i} offset={10.5*(num_rows-i)} formObject={formObject} display={dimensions[1]+num_rows-i} inverted={inverted}/>)
    }

  }
  
  for (let i = 0; i < dimensions[1]; i++) {
    arm && i == dimensions[1]-1 ? inverted = true : inverted = false
    if (i%2 == 1){
      let numPx = dimensions[0]
      if (open) numPx -= 1
      rows.push(<UntrackedRow key={i} numPx={numPx} offset={10.5} formObject={formObject} display={dimensions[1]-i} inverted={inverted}/>);
    }
    else{ 
      rows.push(<UntrackedRow key={i} numPx={dimensions[0]} offset={0} formObject={formObject} display={dimensions[1]-i} inverted={inverted}/>);
    }
  }
  
  if(increasing){
    if (dimensions[1]%2 == 1){
      rows.push(<SpecialRow key={dimensions[1]} offset={10.5} width={dimensions[0]} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={dimensions[1]} offset={10.5*2} width={dimensions[0]} specialBottom={specialBottom} />)
    }
  }
  else{
    if (dimensions[1]%2 == 1){
      rows.push(<SpecialRow key={dimensions[1]} offset={0} width={dimensions[0]} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={dimensions[1]} offset={10.5} width={dimensions[0]} specialBottom={specialBottom} />)
    }
  } 

  return (
    <div id="drawingSection" >
      <div id="pixels" style={{marginBottom: 10, marginLeft: 40, marginRight: 40}}>
        {rows}
      </div>
    </div>
  );
}

export default observer(UntrackedDrawingSection)