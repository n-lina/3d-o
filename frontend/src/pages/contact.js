import React from 'react';
import bg from "../assets/logo-bg.png"
import bgOff from "../assets/logo-bg-off.png"
import straw from "../assets/strawberry-slider-big.png"
import "./create-vase.css"

const Contact = () => {
  return (
    <div
      style={{
        height: '486px',
        backgroundImage: `url(${bg})`, 
        backgroundPosition: "50%"
      }}
    >
      <div className="info-box" >
        <img src={straw} className ="straw-l"/>
        <img src={straw} className ="straw-m"/>
        <img src={straw} className ="straw-r"/>
        {/* <img src={straw} className ="straw-l2"/>
        <img src={straw} className ="straw-r2"/> */}
      </div>
    </div>
  );
};

export default Contact;
