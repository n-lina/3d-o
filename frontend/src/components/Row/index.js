import React, {useEffect} from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";

export default function Row(props) {
  const { width, displayRowNum, rowNum, sectionNum, formObject} = props;
  let {offset} = props;
  let pixels = [];

  if(!formObject.makeTexture) pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={displayRowNum} />)

  for (let i = 0; i < width; i++) {
    if (i == width-1){
      pixels.push(<Pixel key={i} formObject={formObject} sectionNum={sectionNum} rowNum={rowNum}/>);
    }
    else{
      pixels.push(<Pixel key={i} formObject={formObject}/>);
    }
  }

  if(!formObject.makeTexture) pixels.push(<SpecialPixel key={width} on={false} displayRowNum={displayRowNum} />)

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}