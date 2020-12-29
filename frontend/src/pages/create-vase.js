import React from 'react';
import {
  NavBtn,
  NavBtnLink
} from '../components/Navbar/NavbarElements';
import { Canvas} from "react-three-fiber";
// import Box from "../components/Box"
import Vase from "../components/Vase"
import './create-vase.css'
import Switch from "react-switch";

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
        <div style={{background: '#FFDDE4', width: '57%', height: 'auto'}}>
          {/* <h1>Canvas</h1> */}
          <Canvas camera={{position:[0, 0, 100], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "#fbb"}}>
            {/* <ambientLight intensity={0} /> */}
            <spotLight position={[-275, 150, 90]} intensity = {1.5}/>
            <spotLight position={[100, 25, 90]} intensity = {1.3}/>
            <spotLight position={[-150, -150, 110]} intensity = {0.6} />
            <spotLight position={[150, -150, 110]} intensity={0.6} />
            <spotLight position={[-10, 0, 25]} intensity={0.6} />
             {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
            {/* <pointLight position={[-10, -10, -10]} /> */}
            <Vase position={[-1.2, 0, 0]} />
            {/* <Box position={[2.5, 0, 0]} /> */}
          </Canvas>
        </div>
        <div style={{background: '#daa', width: '44%', height: 'auto', overflow: 'scroll'}}>
          <p>units</p>
          <Switch onChange={() => console.log("toggled")} checked={false} />
          <p>height</p>
          <p>diameter 5 (top)</p>
          <p>diameter 4</p>
          <p>diameter 3</p>
          <p>diameter 2</p>
          <p>diameter 1 (bottom)</p>
          <p>---------------------</p>
          <p>diameter 5 (top) height</p>
          <p>diameter 4 height</p>
          <p>diameter 3 height</p>
          <p>diameter 2 height</p>
          <p>diameter 1 (bottom) height</p>
          <p>top rim</p>
          <Switch onChange={() => console.log("toggled")} checked={false} />
          <p>bottom rim</p>
          <Switch onChange={() => console.log("toggled")} checked={false} />
          <p>bottom cover</p>
          <Switch onChange={() => console.log("toggled")} checked={false} />
          <NavBtn>
            <NavBtnLink to='/colouring'>Done</NavBtnLink>
          </NavBtn>
        </div>
      </div>
  </>  
  );
};

export default CreateVase;