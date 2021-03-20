import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";

const Arm = (props) => {
    const {size, formObject} = props;
    const dimensions = [10,4] // top to bottom 
    const object = <UntrackedDrawingSection arm={true} specialTop = {[]} specialBottom = {[]} formObject={formObject} dimensions={dimensions}/>
    const caption = "arm x 2"

    return (
        <div>
            {object}
        </div>
    )
  }

export default Arm;