import React from "react";
import rim_image from "../../assets/rim.png";
import half_rim_image from "../../assets/halfRim.png";
import "./rim.css"

const Rim = (props) => {
    const {half, caption, circ} = props 

    return (
        <div className="rimDiv">
            {!half && <img src={rim_image} className="rim" />}
            {half && <img src={half_rim_image} className="half_rim" />}
        </div>
    )
  }

export default Rim;