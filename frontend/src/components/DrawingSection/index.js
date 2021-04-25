  
import React, { useRef} from "react";
import "./drawingSection.css";
import Row from "../Row";
import SpecialRow from "../SpecialRow";
import TriangleSection from "../TriangleSection";
import { observer } from "mobx-react";

// import { exportComponentAsPNG } from "react-component-export-image";

const DrawingSection = (props) => {
  const {caption, specialTop, specialBottom, formObject, DrawingSectionModel} = props;

  const panelRef = useRef();

  let rows = []; 
  let swanUpper = [];

  if (formObject.model === "swan"){
    if (formObject.swan_two_wings){
      const wing_width = Math.round(0.4 * DrawingSectionModel.width)
      const remainder = DrawingSectionModel.width - (2 * wing_width)
      const chest_width = Math.ceil(remainder/2)
      const back_width = Math.floor(remainder/2)
      const wing1 = <TriangleSection key={0} wing={true} width={wing_width} formObject={formObject} elevation={DrawingSectionModel.height} firstRowDisplay={true}/> 
      const wing2 = <TriangleSection key={1} wing={true} width={wing_width} formObject={formObject} elevation={DrawingSectionModel.height} /> 
      const chest = <TriangleSection key={2} wing={true} width={chest_width} formObject={formObject} elevation={DrawingSectionModel.height} />
      const back = <TriangleSection key={3} wing={true} width={back_width} formObject={formObject} elevation={DrawingSectionModel.height} inverted={true}/>
      swanUpper.push(wing1, chest, wing2, back)
    } 
    else {
      const wing_width = Math.round(0.75 * DrawingSectionModel.width)
      const remainder = DrawingSectionModel.width - wing_width
      const chest_width = remainder - 2
      const wing = <TriangleSection key={0} wing={true} width={wing_width} formObject={formObject} elevation={DrawingSectionModel.height} firstRowDisplay={true} inverted={true}/> 
      const chest = <TriangleSection key={1} wing={true} width={chest_width} formObject={formObject} elevation={DrawingSectionModel.height} firstRowDisplay={true} />
      swanUpper.push(wing, chest)
    }
  }

  if (formObject.model != "swan") rows.push(<SpecialRow key={-1} offset={0} width={DrawingSectionModel.width} specialTop={specialTop} />)
  
  if(DrawingSectionModel.drawingSectionData.length === 0){
    for (let i = 0; i < DrawingSectionModel.height; i++){
      DrawingSectionModel.addRow()
    }
  }
  for (let i = 0; i < DrawingSectionModel.height; i++) {
    DrawingSectionModel.drawingSectionData[i].setWidth(DrawingSectionModel.width)
    DrawingSectionModel.drawingSectionData[i].setDisplayRowNum(DrawingSectionModel.height-i)
    if (i%2 === 1){
      DrawingSectionModel.drawingSectionData[i].setOffset()
      rows.push(<Row key={i} formObject={formObject} RowModel={DrawingSectionModel.drawingSectionData[i]}/>);
    }
    else{ 
      rows.push(<Row key={i} formObject={formObject} RowModel={DrawingSectionModel.drawingSectionData[i]}/>);
    }
  }
  
  if(DrawingSectionModel.increasing){
    if (DrawingSectionModel.height%2 === 1){
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5*2} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    }
  }
  else{
    if (DrawingSectionModel.height%2 === 1){
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={0} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    } else {
      rows.push(<SpecialRow key={DrawingSectionModel.height} offset={10.5} width={DrawingSectionModel.width} specialBottom={specialBottom} />)
    }
  } 

  return (
    <div id="drawingSection" >
      <div id="pixels" ref={panelRef} style={{marginBottom: 10, marginLeft: 40, marginRight: 40}}>
        {formObject.model === "swan" && <div style={{display:"flex", alignItems:"flex-end", marginLeft: 10.5, marginBottom: 3, justifyContent:"flex-start"}}>
          {swanUpper}
        </div>}
        {caption && <p id="text">{caption}</p>}
        {rows}
      </div>
    </div>
  );
}

export default observer(DrawingSection)