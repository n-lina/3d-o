import React from 'react';
import bg from "../assets/logo-bg.png"
// import bgOff from "../assets/logo-bg-off.png"
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
        <img src={straw} alt={""} className ="straw-l"/>
        <img src={straw} alt={""} className ="straw-m"/>
        <img src={straw} alt={""} className ="straw-r"/>
        <p className = "app-name">3d-o<br/>engineering x art</p>
        <p className = "name">— lina nguyen —</p>
        <div className="left">
          <a href="https://www.linkedin.com/in/nlina/" target="_blank" className="link">linkedin</a>
          <br/>
          <a href="https://github.com/n-lina/n-lina/raw/main/Lina%20Nguyen%20Resume.pdf" target="_blank" className="link">resume</a>
        </div>
        <div className="right">
          <a href="https://github.com/n-lina" target="_blank" className="link">github</a>
          <br/>
          <a href="mailto:linanguyen@alumni.ubc.ca" target="_blank" className="link">email</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
