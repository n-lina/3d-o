import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";

const Bottom = (props) => {
    const {flat, circ, caption, formObject} = props 
    let object = <div></div>
    let dimensions = []

    if (flat){
        dimensions = [[50,12],[40,11],[42,5]] // top to bottom 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
    }
    else{
        // curved bottom/lid for basket
        dimensions = [[50,12],[30,11],[20,5]] // top to bottom 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
    }

    return (
        <div>
            {object}
        </div>
    )
  }

export default Bottom;