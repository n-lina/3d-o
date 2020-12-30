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
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";


import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import VaseStore from "../models/VaseStore";

const vase = VaseStore.create();

onPatch(vase, patch => {
  // console.log(patch);
});
makeInspectable(vase);

const sliderStyle = {  // Give the slider some width
  position: 'relative',
  width: '100%',
  height: 15,
  // border: '1px solid steelblue',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 9,
  // marginTop: 35,
  borderRadius: 5,
  backgroundColor: 'pink',
}

export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div className = "straw"
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: -20,
        zIndex: 2,
        textAlign: 'right',
        cursor: 'pointer',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Arial', fontSize: 16, marginTop: 15, marginLeft: 5, position:'absolute', zIndex: 3, color: "#fff"}}>
        {value}
      </div>
    </div>
  )
}

export function MultiHandle({
  handle: { id, value, percent },
  getHandleProps
}) {
  if (id == "$$-0" || id == "$$-4"){
    return (
      <div className = "straw"
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: -20,
          zIndex: 2,
          textAlign: 'right',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontFamily: 'Arial', fontSize: 16, marginTop: 15, marginLeft: 5, position:'absolute', zIndex: 3, color: "#fff"}}>
          {value}
        </div>
      </div>
    )
  } else {
    return (
      <div className = "straw"
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: -20,
          zIndex: 3,
          textAlign: 'right',
          cursor: 'pointer',
        }}
        {...getHandleProps(id)}
      >
        <div style={{ fontFamily: 'Arial', fontSize: 16, marginTop: 15, marginLeft: 5, position:'absolute', zIndex: 4, color: "#fff"}}>
          {value}
        </div>
      </div>
    )
  }
}

const mySlider = <Slider
rootStyle={sliderStyle}
domain={[0, 100]}
step={1}
mode={2}
values={[30]}
>
<Rail>
  {({ getRailProps }) => (
    <div style={railStyle} {...getRailProps()} />
  )}
</Rail>
<Handles>
  {({ handles, getHandleProps }) => (
    <div className="slider-handles">
      {handles.map(handle => (
        <Handle
          key={handle.id}
          handle={handle}
          getHandleProps={getHandleProps}
        />
      ))}
    </div>
  )}
</Handles>
</Slider>

const sliderHeight = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.height]} onUpdate={(val) => vase.update_height(val[0])} >
  <Rail>
    {({ getRailProps }) => (
      <div style={railStyle} {...getRailProps()} />
    )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const slider_dtop = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.dtop]} onUpdate={(val) => vase.update_dtop(val[0])} >
  <Rail>
    {({ getRailProps }) => (
      <div style={railStyle} {...getRailProps()} />
    )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const slider_d3 = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.d3]} onUpdate={(val) => vase.update_d3(val[0])} >
  <Rail>
  {({ getRailProps }) => (
    <div style={railStyle} {...getRailProps()} />
  )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const slider_d2 = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.d2]} onUpdate={(val) => vase.update_d2(val[0])} >
  <Rail>
    {({ getRailProps }) => (
      <div style={railStyle} {...getRailProps()} />
    )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const slider_d1 = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.d1]} onUpdate={(val) => vase.update_d1(val[0])} >
  <Rail>
    {({ getRailProps }) => (
      <div style={railStyle} {...getRailProps()} />
    )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const slider_dbottom = <Slider rootStyle={sliderStyle} domain={[10, 100]} step={1} mode={2} values={[vase.dbottom]} onUpdate={(val) => vase.update_dbottom(val[0])} >
  <Rail>
    {({ getRailProps }) => (
      <div style={railStyle} {...getRailProps()} />
    )}
  </Rail>
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          <Handle
            key={handle.id}
            handle={handle}
            getHandleProps={getHandleProps}
          />
        ))}
      </div>
    )}
  </Handles>
</Slider>

const dSlider = <Slider
rootStyle={sliderStyle}
domain={[0, 100]}
mode={2}
values={[0, (vase.d1_h/vase.height)*100, (vase.d2_h/vase.height)*100, (vase.d3_h/vase.height)*100, 100] /* three values = three handles */}
onUpdate={(val)=>vase.update_d_heights(val)}
step={5}
>
{/* <Rail>
  {({ getRailProps }) => (
    <div style={railStyle} {...getRailProps()} />
  )}
</Rail> */}
<div style={railStyle} />
<Handles>
  {({ handles, getHandleProps }) => (
    <div className="slider-handles">
      {handles.map(handle => (
        <MultiHandle
          key={handle.id}
          handle={handle}
          getHandleProps={getHandleProps}
        />
      ))}
    </div>
  )}
</Handles>
</Slider>


const CreateVase = () => {
  return (
    <>
      <div style={{background: '#FFE7E5', display: 'flex', flexDirection:'row', width: 'auto', height: '100vh'}}>
        <div style={{background: '#FFDDE4', width: '57%', height: 'auto'}}>
          <Canvas camera={{position:[0, 0, 100], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "pink"}}>
            {/* <ambientLight intensity={0} /> */}
            <spotLight position={[-275, 150, 90]} intensity = {1.5}/>
            <spotLight position={[100, 25, 90]} intensity = {1.3}/>
            <spotLight position={[-150, -150, 110]} intensity = {0.6} />
            <spotLight position={[150, -150, 110]} intensity={0.6} />
            <spotLight position={[-10, 0, 25]} intensity={0.6} />
             {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
            {/* <pointLight position={[-10, -10, -10]} /> */}
            <Vase vase={vase} />
          </Canvas>
        </div>
        <div style={{background: '#FFE7E5', marginLeft:'3.2%', width: '36%', height: 'auto', overflow: 'visible'}}>
          <p>units</p>
          <Switch onChange={() => console.log("toggled")} checked={false} />
          <div>
            <div style={{background: '#FFE7E5', width: '45.5%', float: 'left'}}>
              <p>height</p>
              {sliderHeight}
              <p>diameter 5 (top)</p>
              {slider_dtop}
              <p>diameter 4</p>
              {slider_d3}
            </div>
            <div style={{background: '#FFE7E5', width: '46%', float: 'right'}}>
              <p>diameter 3</p>
              {slider_d2}
              <p>diameter 2</p>
              {slider_d1}
              <p>diameter 1 (bottom)</p>
              {slider_dbottom}
            </div>
          </div>
          <p>diameter heights</p>
          {dSlider}
          <p>top rim</p>
          <Switch onChange={() => vase.update_top_rim(!vase.top_rim)} checked={false} />
          <p>bottom rim</p>
          <Switch onChange={() => vase.update_bottom_rim(!vase.bottom_rim)} checked={false} />
          <p>bottom cover</p>
          <Switch onChange={() => vase.update_bottom_disk(!vase.bottom_disk)} checked={false} />
          <NavBtn>
            <NavBtnLink to='/colouring'>Done</NavBtnLink>
          </NavBtn>
        </div>
      </div>
  </>  
  );
};

export default CreateVase;