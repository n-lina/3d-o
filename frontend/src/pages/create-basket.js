import React from 'react';
import {
  NavBtn,
  NavBtnLink
} from '../components/Navbar/NavbarElements';

const CreateBasket = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15vh',
          background: '#caa'
        }}
      >
        <h1>Basket</h1>
      </div>
      <div style={{display: 'flex', flexDirection:'row', width: 'auto', height: '90vh'}}>
        <div style={{background: '#baa', width: '57%', height: 'auto'}}>
          <h1>Canvas</h1>
        </div>
        <div style={{background: '#daa', width: '43%', height: 'auto'}}>
          <h1>Input</h1>
          <NavBtn>
            <NavBtnLink to='/colouring'>Done</NavBtnLink>
          </NavBtn>
        </div>
      </div>
  </>  
  );
};

export default CreateBasket;