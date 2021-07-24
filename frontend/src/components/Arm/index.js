import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";
import "../DrawingSection/drawingSection.css"

const Arm = (props) => {
    const {caption, size, formObject} = props;
    const arms = {
        small: [10,4],
        med: [15,6], 
        big: [20,8]
    }
    let dimensions = arms.med
    if (size == "small") dimensions = arms.small
    else if (size == "big") dimensions = arms.large
    const object = <UntrackedDrawingSection arm={true} specialTop = {[]} specialBottom = {[]} formObject={formObject} dimensions={dimensions}/>

    return (
        <div>
            <p id="text">{caption}</p>
            {object}
        </div>
    )
  }

export default Arm;