import React from "react";
import rim_image from "../../assets/rim.png";
import half_rim_image from "../../assets/halfRim.png";
import neck_image from "../../assets/neck.png"
import "./rim.css"
import "../DrawingSection/drawingSection.css"

// input 'length' doesn't have to be int

const Rim = (props) => {
    const {swan, full, caption, length, upsize} = props 

    function cmToPcs(cm, height=false){
        const height_factor = upsize? 0.7: 0.55 // 0.5 cm height per row
        const width_factor = upsize? 1.2 : 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(cm/height_factor)
        }
        return Math.round(cm/width_factor)
    }
    
    const num_pcs = cmToPcs(length,true)

    return (
        <div className="rimDiv">
            <p id="text">{caption}</p>
            {full && <img src={rim_image} className="rim" />}
            {!full && !swan  && <img src={half_rim_image} className="half_rim" />}
            {swan && <img src={neck_image} className="neck" />} 
            <p id="text">{num_pcs} pieces</p>
        </div>
    )
  }

export default Rim;