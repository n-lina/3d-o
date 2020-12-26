import React from 'react';
import {
  NavBtn,
  NavBtnLink
} from '../components/Navbar/NavbarElements';
import { Canvas} from "react-three-fiber";
import Box from "../components/Box"

const CreateVase = () => {
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
        <h1>Vase</h1>
      </div>
      <div style={{display: 'flex', flexDirection:'row', width: 'auto', height: '100vh'}}>
        <div style={{background: '#baa', width: '57%', height: 'auto'}}>
          {/* <h1>Canvas</h1> */}
          <Canvas style={{background:"#fee"}}>
            <ambientLight intensity={0} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[2.5, 0, 0]} />
          </Canvas>
        </div>
        <div style={{background: '#daa', width: '44%', height: 'auto'}}>
          <h1>Input</h1>
          <NavBtn>
            <NavBtnLink to='/colouring'>Done</NavBtnLink>
          </NavBtn>
        </div>
      </div>
  </>  
  );
};

export default CreateVase;