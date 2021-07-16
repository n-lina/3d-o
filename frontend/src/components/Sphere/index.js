import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";
import "../DrawingSection/drawingSection.css"

const Sphere = (props) => {
    const {size, caption, formObject} = props 
    let object = <div></div>
    const spheres = {
        small: [[4,2],[6,2],[8,5],[4,2]],
        med: [[8,2],[10,2],[12,2],[16,4],[8,2],[4,2]],
        big: [[16,2],[19,3],[23,2],[24,4],[16,3],[8,1],[4,2]]
    }
    let dimensions = spheres.med
    if (size == "small") dimensions = spheres.small
    else if (size == "big") dimensions = spheres.big
    else {console.log("med")}

    object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />

    return (
        <div>
            <p id="text">{caption}</p>
            {object}
        </div>
    )
  }

export default Sphere;