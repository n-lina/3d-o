import React, {useEffect} from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";
import { observer } from "mobx-react";


const Row = (props) => {
  const { width, displayRowNum, formObject, RowModel} = props;
  let {offset} = props;
  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={displayRowNum} />)

  if (RowModel.rowData.length == 0){
    for (let i = 0; i < width; i++) {
      RowModel.addPx()
    }
  }
  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} formObject={formObject} PxModel={RowModel.rowData[i]}/>);
  }

  pixels.push(<SpecialPixel key={width} on={false} displayRowNum={displayRowNum} />)

  return <div style={{marginLeft: offset}} className="row">{pixels}</div>;
}

export default observer(Row)