import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";
import "../DrawingSection/drawingSection.css"

const Arm = (props) => {
    const {caption, size, formObject} = props;
    const dimensions = [10,4] // top to bottom 
    const object = <UntrackedDrawingSection arm={true} specialTop = {[]} specialBottom = {[]} formObject={formObject} dimensions={dimensions}/>

    return (
        <div>
            <p id="text">{caption}</p>
            {object}
        </div>
    )
  }

export default Arm;