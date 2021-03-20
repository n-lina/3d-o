import React from "react";
import UntrackedDrawingSection from "../UntrackedDrawingSection";

const BunnyOrHandle = (props) => {
    const {caption, size, formObject} = props;
    let object = <div></div>

    if (caption == "bunny ear"){
        // height has to be odd number
        object = <UntrackedDrawingSection bunny={true} open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[size,11]} />
    }
    else {
        object = <UntrackedDrawingSection open={true} specialTop={[]} specialBottom={[]} formObject={formObject} dimensions={[size/2,31]} />
    }

    return (
      <div>
        {object}
      </div>    
    )
  }

export default BunnyOrHandle;