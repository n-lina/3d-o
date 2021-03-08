  
import React, { useRef, useEffect } from "react";
import "./drawingSection.css";
import Row from "../Row";
import SpecialRow from "../SpecialRow";
import { observer } from "mobx-react";

// import { exportComponentAsPNG } from "react-component-export-image";

const DrawingSection = (props) => {
  const {specialTop, specialBottom, formObject, DrawingSectionModel} = props;

  const panelRef = useRef();

  let rows = []; 

  if (formObject.model != "swan") rows.push(<SpecialRow key={-1} offset={0} width={DrawingSectionModel.width} specialTop={specialTop} />)
  
  if(DrawingSectionModel.drawingSectionData.length == 0){
    for (let i = 0; i < DrawingSectionModel.height; i++){
      DrawingSectionModel.addRow()
    }
  }
  for (let i = 0; i < DrawingSectionModel.height; i++) {
    DrawingSectionModel.drawingSectionData[i].setWidth(DrawingSectionModel.width)
    DrawingSectionModel.drawingSectionData[i].setDisplayRowNum(DrawingSectionModel.height-i)
    if (i%2 == 1){
      DrawingSectionModel.drawingSectionData[i].setOffset()
      rows.push(<Row key={i} formObject={formObject} RowModel={DrawingSectionModel.drawingSectionData[i]}/>);
    }
    else{ 
      rows.push(<Row key={i} formObject={formObject} RowModel={DrawingSectionModel.drawingSectionData[i]}/>);
    }
  }
  
  if(DrawingSectionModel.increasing){
    if (DrawingSectionModel.height%2 == 1){
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5*2} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    }
  }
  else{
    if (DrawingSectionModel.height%2 == 1){
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={0} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    }
  } 

  return (
    <div id="drawingSection">
      <div id="pixels" ref={panelRef} style={{marginBottom: 10, marginLeft: 40, marginRight: 40}}>
        {rows}
      </div>
    </div>
  );
}

export default observer(DrawingSection)