import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";
import "../DrawingSection/drawingSection.css"

const Bottom = (props) => {
    const {flat, upsize, diameter, caption, formObject} = props 
    let object = <div></div>
    let dimensions = []

    function cmToPcs(cm, height=false){
        const height_factor = upsize? 0.7: 0.55 // 0.5 cm height per row
        const width_factor = upsize? 1.2 : 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(cm/height_factor)
        }
        return Math.round(cm/width_factor)
    }

    if (flat){
        const rows = [[192,10],[160,8],[128,5],[96,5],[64,4],[48,4],[32,3],[16,3],[8,2],[4,2]] // backwards
        let tot_height = Math.ceil(cmToPcs(diameter/2, true))
        while (tot_height > 0){
            const curr_row = rows.pop()
            dimensions.unshift([curr_row[0], Math.min(tot_height,curr_row[1])])
            tot_height -= curr_row[1]
        } 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
    }
    else{
        // curved bottom/lid for basket
        dimensions = [[50,12],[30,11],[20,5]] // top to bottom 
        object = <UntrackedOrigamiObject dimensions={dimensions} formObject={formObject} />
    }

    return (
        <div>
            <p id="text">{caption}</p>
            {object}
        </div>
    )
  }

export default Bottom;