import React, {useEffect} from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";
import { observer } from "mobx-react";


const Row = (props) => {
  const { width, displayRowNum, formObject} = props;
  let {offset} = props;
  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={displayRowNum} />)

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} formObject={formObject}/>);
  }

  pixels.push(<SpecialPixel key={width} on={false} displayRowNum={displayRowNum} />)

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}

export default observer(Row)