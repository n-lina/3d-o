import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";
import "../DrawingSection/drawingSection.css"

const Sphere = (props) => {
    const {size, caption, formObject} = props 
    let object = <div></div>
    let dimensions = []

    function calc(){
        return [[6,5],[8,5],[5,5]]
    }

    // curved Sphere/lid for basket
    dimensions = calc() // top to Sphere 
    object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />

    return (
        <div>
            <p id="text">{caption}</p>
            {object}
        </div>
    )
  }

export default Sphere;