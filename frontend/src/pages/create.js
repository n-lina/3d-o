import React from 'react';

const Create = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          height: '25vh',
          background: '#bab', 
          margin: '30px'
        }}
      >
        <h1>I want to make a ... </h1>
      </div>
      <div 
        style={{
          flexDirection: 'row',
          height: '25vh'
        }}
      >
        <a style={{background: '#bfb', fontSize: '30px', margin: '30px'}} href="/create-swan"> Swan </a>
        <a style={{background: '#bcb', fontSize: '30px', margin: '30px'}} href="/create-vase"> Vase </a>
        <a style={{background: '#bdb', fontSize: '30px', margin: '30px'}} href="/create-basket"> Basket </a>
        <a style={{background: '#beb', fontSize: '30px', margin: '30px'}} href="/create-figurine"> Figurine </a>
      </div>
    </div>
  );
};

export default Create;