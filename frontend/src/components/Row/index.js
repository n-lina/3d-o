import React, {useEffect} from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";
import { observer } from "mobx-react";


const Row = (props) => {
  const {formObject, RowModel} = props;
  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={RowModel.displayRowNum} />)

  if (RowModel.rowData.length == 0){
    for (let i = 0; i < RowModel.width; i++) {
      RowModel.addPx()
    }
  }
  for (let i = 0; i < RowModel.width; i++) {
    pixels.push(<Pixel key={i} formObject={formObject} PxModel={RowModel.rowData[i]}/>);
  }

  pixels.push(<SpecialPixel key={RowModel.width} on={false} displayRowNum={RowModel.displayRowNum} />)

  return <div style={{marginLeft: RowModel.offset}} className="row">{pixels}</div>;
}

export default observer(Row)