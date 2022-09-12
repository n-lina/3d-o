import React, { useEffect } from "react";
import "./row.css";
import Pixel from "../Pixel";
import SpecialPixel from "../SpecialPixel";
import { observer } from "mobx-react";


const Row = (props) => {
  const { formObject, RowModel, rows_till_this_section } = props;
  let pixels = [];

  pixels.push(<SpecialPixel key={-1} on={false} displayRowNum={RowModel.displayRowNum} />)

  if (RowModel.rowData.length == 0) {
    for (let i = 0; i < RowModel.width; i++) {
      RowModel.addPx()
    }
  }
  for (let i = 0; i < RowModel.width; i++) {
    if (formObject.inverted) RowModel.rowData[i].setInverted()
    pixels.push(<Pixel key={i} formObject={formObject} PxModel={RowModel.rowData[i]} />);
  }

  const abs_row_num = rows_till_this_section + RowModel.displayRowNum

  pixels.push(<SpecialPixel key={RowModel.width} on={false} displayRowNum={abs_row_num} />)

  return <div style={{ marginLeft: RowModel.offset }} className="row">{pixels}</div>;
}

export default observer(Row)