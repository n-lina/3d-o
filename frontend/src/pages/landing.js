import React from 'react';
import "./create.css"
import logo from "../assets/transparent.png"

const Landing = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <div className = "landing">
        <img className="transparent-logo" src={logo} alt=""/>
        <p className="landing-text">A work in progress, 3d-o is a web application I developed to combat rising COVID19 case counts. 3d-o is based on my lifelong hobby, 3d-origami. Intersecting engineering and art and the first of its kind, 3d-o promotes social distancing by engaging users in a fun, indoor activity.</p>
        <p className="landing-text">Try 3d-o by going to the 'create' tab!</p>
      </div>
    </div>
  );
};

export default Landing;