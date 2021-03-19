import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";

const Bottom = (props) => {
    const {flat, circ, lid, formObject} = props 
    let object = <div></div>
    let dimensions = []
    let caption = ""

    if (flat){
        dimensions = [[50,12],[40,11],[42,5]] // top to bottom 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
        caption = "flat bottom"
    }
    else{
        // curved lid for basket, include sphere
        if (lid){
            dimensions = [[50,12],[30,11],[20,5]] // top to bottom 
            object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
            caption = "basket lid"
            // add sphere
        }
        // curved bottom for basket
        dimensions = [[50,12],[30,11],[20,5]] // top to bottom 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
        caption = "basket lid" 
    }

    return (
        <div>
            {object}
        </div>
    )
  }

export default Bottom;