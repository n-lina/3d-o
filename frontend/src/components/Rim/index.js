import React from "react";
import rim_image from "../../assets/rim.png";
import half_rim_image from "../../assets/halfRim.png";
import "./rim.css"
import "../DrawingSection/drawingSection.css"


const Rim = (props) => {
    const {swan, half, caption, circ} = props 
    // todo : add swan neck image

    return (
        <div className="rimDiv">
            <p id="text">{caption}</p>
            {!half && <img src={rim_image} className="rim" />}
            {half && <img src={half_rim_image} className="half_rim" />}
            {swan && <div></div>} 
            <p id="text">{circ} pieces</p>
        </div>
    )
  }

export default Rim;