import React, {useEffect} from "react";

import {
  NavBtn,
  NavBtnLink
} from '../components/Navbar/NavbarElements';
import { Canvas} from "react-three-fiber";
import Figurine from "../components/Figurine"
import './create-vase.css'
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import SwitchSelector from "react-switch-selector";
import { observer } from "mobx-react";
import { useStores } from "../models/RootStoreContext"


const CreateFigurine = () => {

  const { figStore } = useStores();

  const options = [
    {
        label: "y",
        value: true,
        selectedBackgroundColor: "#E28988",
    },  {
        label: "n",
        value: false,
        selectedBackgroundColor: "#E28988"
    }
  ];

  const ears_options = [
    {
        label: "◠ ◠",
        value: "bear",
        selectedBackgroundColor: "#E28988",
    },  {
        label: "〇 〇",
        value: "sphere",
        selectedBackgroundColor: "#E28988"
    },  {
        label: "∧ ∧",
        value: "cat",
        selectedBackgroundColor: "#E28988"
    },  {
        label: "∩ ∩",
        value: "bunny",
        selectedBackgroundColor: "#E28988"
    },
  ];

  const ears = ["bear", "sphere", "cat", "bunny"]
  
  const unitOptions = [
    {
        label: "cm",
        value: true,
        selectedBackgroundColor: "#E28988",
    },  {
        label: "in",
        value: false,
        selectedBackgroundColor: "#E28988"
    }
  ];

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
  
  function Handle({
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
    
  const slider_diameter = <Slider rootStyle={sliderStyle} domain={[1, 50]} step={1} mode={2} values={[figStore.diameter]} onUpdate={(val) => figStore.update_diameter(val[0])} >
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
  

  const arms_switch = <div className="switch"  style={{width: 100, height: 50}}>
  <SwitchSelector
      onChange={(val) => figStore.update_arms(val)}
      options={options}
      initialSelectedIndex={figStore.arms ? 0 : 1}
      backgroundColor={"#FFE7E5"}
      fontColor={"#D75A58"}
      optionBorderRadius={30}
  />
  </div>

  
const ears_switch = <div className="switch"  style={{width: 360, height: 50}}>
<SwitchSelector
    onChange={(val) => figStore.update_ears(val)}
    options={ears_options}
    initialSelectedIndex={ears.indexOf(`${figStore.ears}`)}
    backgroundColor={"#FFE7E5"}
    fontColor={"#D75A58"}
    optionBorderRadius={30}
    fontSize={20}
/>
</div>
  
  const units_switch = <div className="switch" style={{width: 100, height: 50}}>
      <SwitchSelector
          onChange={(val) => figStore.update_units(val)}
          options={unitOptions}
          initialSelectedIndex={figStore.units ? 0 : 1}
          backgroundColor={"#FFE7E5"}
          fontColor={"#D75A58"}
          optionBorderRadius={30}
      />
  </div>

  return (
    <>
      <div className="container" style={{background: '#FFE7E5', display: 'flex', flexDirection:'row', width: 'auto', height: 'auto'}}>
        <div className="containerLeft" style={{background: '#FFE7E5', width: '57%', height: 'auto',float:'left'}}>
          <Canvas camera={{position:[0, 0, 80], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "pink", height: '470px', borderRadius:30, marginTop:'1%', marginLeft:'1%',width:'99%'}}>
            <spotLight position={[-275, 150, 90]} intensity = {1.5}/>
            <spotLight position={[10, 25, 90]} intensity = {1.3}/>
            <spotLight position={[-150, -150, 110]} intensity = {0.6} />
            <spotLight position={[150, -150, 110]} intensity={0.6} />
            <spotLight position={[-10, 0, 25]} intensity={0.6} />
            <Figurine figStore={figStore} />
          </Canvas>
          <div className="containerCaption-fig">
            <div style={{height: 13}}/>
            <a>Press <span>x</span> , <span>y</span> , and <span>z</span> to rotate the object ,<br/><span>q</span> and <span>w</span> to zoom in and out , <br/>and <span>space</span> to reset view to default . </a>
            <div style={{height: 13}}/>
          </div>
        </div>
        <div className="containerRight" style={{width: '43%', height: '100%', overflow: 'visible', float:'right'}}>
          <br />
          <p className="textSwitch">units</p>
          {units_switch}
          <br/>
          <p className="text">body diameter</p>
          <div style={{width:'88%', marginLeft:'5%'}}>
            {slider_diameter}
          </div>
          <br/>
          <p className="text">arms</p>
          {arms_switch}
          <br/>
          <p className="text">ears</p>
          {ears_switch}
          <div className="done-basket" style={{width: 80, marginBottom:35}}>
            <NavBtn>
              <NavBtnLink style={{background: "#D14240"}} to='/colouring'>
                <p className = "buttonText">done</p>
              </NavBtnLink>
            </NavBtn>
          </div>
        </div>
      </div>
  </>  
  );
};

export default observer(CreateFigurine);