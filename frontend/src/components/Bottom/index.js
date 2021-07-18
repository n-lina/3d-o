import React from "react";
import UntrackedOrigamiObject from "../UntrackedOrigamiObject";
import "../DrawingSection/drawingSection.css"

function getDimensions(widths, heights) {
    let curr_section = []
    // getting from diameter to diameter in 'height' pieces
    for (let i = 0; i < widths.length-1; i++){
        const min_height = 3
        let min_height_needed = min_height
        let diff = widths[i+1]-widths[i]
        let height_diff = heights[i+1] - heights[i]

        let temp_dbottom = widths[i]
        
        // increasing
        if (diff > 0){
            curr_section.push([temp_dbottom,min_height])
            while (diff > 0){
                const add_to_this_row = Math.floor(temp_dbottom/min_height)
                const actual_add = Math.min(diff, add_to_this_row)
                diff -= actual_add 
                temp_dbottom += actual_add
                if (diff == 0 && i < widths.length-2) break
                min_height_needed += min_height
                curr_section.unshift([temp_dbottom, min_height])
            }
        }
        // decreasing
        else if (diff < 0){
            diff = diff * -1
            curr_section.push([temp_dbottom,min_height])
            while (diff > 0) {
                const sub_from_this_row = Math.floor(temp_dbottom/4)
                const actual_sub = Math.min(diff, sub_from_this_row)
                diff -= actual_sub
                temp_dbottom -= actual_sub
                if (diff == 0 && i < widths.length-2) break
                min_height_needed += min_height
                curr_section.unshift([temp_dbottom,min_height])
            }            
        }
        let excess_height = height_diff-min_height_needed
        while (excess_height>0){
            curr_section[excess_height%curr_section.length][1] += 1
            excess_height -= 1
        }
    }
    return curr_section
}

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
        const widths = [4,cmToPcs(diameter * Math.PI)]
        const heights = [0,Math.ceil(diameter/4)]
        dimensions = getDimensions(widths, heights) // top to bottom 
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