import React from 'react';
import bg from "../assets/logo-bg-cropped.png"
import bgOff from "../assets/logo-bg-off.png"

const Contact = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundImage: `url(${bg})`, 
        width: "98%", 
        marginLeft: "1%"
      }}
    >
      <div style={{background: "white", height: 200, width: 400, borderRadius: 40, borderColor: "red", borderStyle: "solid"}}></div>
    </div>
  );
};

export default Contact;
