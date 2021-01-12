import React from 'react';
import bg from "../assets/logo-bg-cropped.png"
import bgOff from "../assets/logo-bg-off.png"
import straw from "../assets/strawberry-slider-big.png"
import "./create-vase.css"

const Contact = () => {
  return (
    <div
      style={{
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '464px',
        backgroundImage: `url(${bg})`, 
        width: "98%", 
        marginLeft: "1%"
      }}
    >
      <div className="info-box" >
      <img src={straw} className ="straw-l"/>
        <img src={straw} className ="straw-r"/>
      </div>
    </div>
  );
};

export default Contact;
