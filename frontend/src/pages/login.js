import React from 'react';
import "./create.css"
import logo from "../assets/transparent.png"

const Login = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <div>
        <img className="transparent-logo" src={logo} alt=""/>
        <p className="coming-soon-text">coming soon</p>
      </div>
    </div>
  );
};

export default Login;