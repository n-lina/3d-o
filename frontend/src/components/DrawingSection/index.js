  
import React, { useRef, useEffect } from "react";
import "./drawingSection.css";
import Row from "../Row";
import SpecialRow from "../SpecialRow";
import { observer } from "mobx-react";

// import { exportComponentAsPNG } from "react-component-export-image";

const DrawingSection = (props) => {
  const { width, height, specialTop, specialBottom, sectionNum, increasing, formObject} = props;

  const panelRef = useRef();

  useEffect(()=>{
    if(formObject.makeTexture) {
      formObject.exportComponent(panelRef, sectionNum)
    }
  }, [formObject.makeTexture])

  let rows = []; 

  if(!formObject.makeTexture) rows.push(<SpecialRow key={-1} offset={0} width={width} specialTop={specialTop} />)

  for (let i = 0; i < height; i++) {
    if (i%2 == 1){
      rows.push(<Row key={i} offset={formObject.makeTexture ? 7 : 10.5} width={width} displayRowNum={height-i} formObject={formObject}/>);
    }
    else{ 
      rows.push(<Row key={i} offset={0} width={width} displayRowNum={height-i} formObject={formObject}/>);
    }
  }
  
  if (!formObject.makeTexture){
    if(increasing){
      if (height%2 == 1){
        rows.push(<SpecialRow key={height} offset={10.5} width={width} specialBottom={specialBottom} />)
      } else {
        rows.push(<SpecialRow key={height} offset={10.5*2} width={width} specialBottom={specialBottom} />)
      }
    }
    else{
      if (height%2 == 1){
        rows.push(<SpecialRow key={height} offset={0} width={width} specialBottom={specialBottom} />)
      } else {
        rows.push(<SpecialRow key={height} offset={10.5} width={width} specialBottom={specialBottom} />)
      }
    }
  } 

  return (
    <div id="drawingSection">
      <div id="pixels" ref={panelRef} style={{marginBottom: formObject.makeTexture ? 0 : 10, marginLeft: formObject.makeTexture ? 0 : 40, marginRight: formObject.makeTexture ? 0 : 40}}>
        {rows}
      </div>
    </div>
  );
}

export default observer(DrawingSection)