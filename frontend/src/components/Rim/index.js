import React from "react";
import rim_image from "../../assets/rim.png";
import half_rim_image from "../../assets/halfRim.png";
import neck_image from "../../assets/neck.png"
import "./rim.css"
import "../DrawingSection/drawingSection.css"


const Rim = (props) => {
    const {swan, full, caption, circ} = props 
    return (
        <div className="rimDiv">
            <p id="text">{caption}</p>
            {full && <img src={rim_image} className="rim" />}
            {!full && !swan  && <img src={half_rim_image} className="half_rim" />}
            {swan && <img src={neck_image} className="neck" />} 
            <p id="text">{circ} pieces</p>
        </div>
    )
  }

export default Rim;