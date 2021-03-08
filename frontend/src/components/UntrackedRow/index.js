import React, {useEffect} from "react";
import "../Row/row.css";
import UntrackedPixel from "../UntrackedPixel";
import SpecialPixel from "../SpecialPixel";
import { observer } from "mobx-react";


const UntrackedRow = (props) => {
  const {formObject, numPx, offset, display} = props;
  let pixels = [];

  if(display) pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={display}/>)

  for (let i = 0; i < numPx; i++) {
    pixels.push(<UntrackedPixel key={i} formObject={formObject} />);
  }
  
  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
  
}

export default observer(UntrackedRow)