import React, {useEffect} from "react";
import {
  NavBtn,
  NavBtnLink
} from '../components/Navbar/NavbarElements';
import { Canvas} from "react-three-fiber";
import Vase from "../components/Vase"
import './create-vase.css'
import { Slider, Rail, Handles} from "react-compound-slider";
import SwitchSelector from "react-switch-selector";
import { observer } from "mobx-react";
import { useStores } from "../models/RootStoreContext"
import firebase from 'firebase/app'
import { firestore } from "../firebase"

const CreateVase = () => {

  const { vaseStore, coloringFormStore} = useStores();
  
  useEffect(() => {
    coloringFormStore.setMsg(true, "error")
    coloringFormStore.clearColoringForm()
    coloringFormStore.setModel("vase")
  }, [])

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
  
  function MultiHandle({
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

  // cm
  let min_d = 5
  let max_d = 50
  let min_h = 10 
  let max_h = 100

  // in
  if (!vaseStore.cm){
    const ratio = 2.54
    min_d = Math.round(min_d/ratio)
    max_d = Math.round(max_d/ratio)
    max_h = Math.round(max_h/ratio)
    min_h = Math.round(min_h/ratio)
  }
  
  const sliderHeight = <Slider rootStyle={sliderStyle} domain={[min_h, max_h]} step={1} mode={2} values={[vaseStore.height]} onUpdate={(val) => vaseStore.update_height(val[0])} >
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

  const slider_dtop = <Slider rootStyle={sliderStyle} domain={[min_d, max_d]} step={1} mode={2} values={[vaseStore.dtop]} onUpdate={(val) => vaseStore.update_dtop(val[0])} >
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
  
  const slider_d3 = <Slider rootStyle={sliderStyle} domain={[min_d, max_d]} step={1} mode={2} values={[vaseStore.d3]} onUpdate={(val) => vaseStore.update_d3(val[0])} >
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
  
  const slider_d2 = <Slider rootStyle={sliderStyle} domain={[min_d, max_d]} step={1} mode={2} values={[vaseStore.d2]} onUpdate={(val) => vaseStore.update_d2(val[0])} >
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
  
  const slider_d1 = <Slider rootStyle={sliderStyle} domain={[min_d, max_d]} step={1} mode={2} values={[vaseStore.d1]} onUpdate={(val) => vaseStore.update_d1(val[0])} >
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
  
  const slider_dbottom = <Slider rootStyle={sliderStyle} domain={[min_d, max_d]} step={1} mode={2} values={[vaseStore.dbottom]} onUpdate={(val) => vaseStore.update_dbottom(val[0])} >
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
  values={[0, vaseStore.d1_h, vaseStore.d2_h, vaseStore.d3_h, 100] /* three values = three handles */}
  onUpdate={(val)=>vaseStore.update_d_heights(val)}
  step={5}
  >
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
  
  const top_rim_switch = <div className="switch"  style={{width: 100, height: 50}}>
      <SwitchSelector
          onChange={(val) => vaseStore.update_top_rim(val)}
          options={options}
          initialSelectedIndex={vaseStore.top_rim ? 0 : 1}
          backgroundColor={"#FFE7E5"}
          fontColor={"#D75A58"}
          optionBorderRadius={30}
      />
  </div>
  
  const bottom_rim_switch = <div className="switch"  style={{width: 100, height: 50}}>
      <SwitchSelector
          onChange={(val) => vaseStore.update_bottom_rim(val)}
          options={options}
          initialSelectedIndex={vaseStore.bottom_rim ? 0 : 1}
          backgroundColor={"#FFE7E5"}
          fontColor={"#D75A58"}
          optionBorderRadius={30}
      />
  </div>
  
  const flat_bottom_switch = <div className="switch"  style={{width: 100, height: 50}}>
      <SwitchSelector
          onChange={(val) => vaseStore.update_flat_bottom(val)}
          options={options}
          initialSelectedIndex={vaseStore.flat_bottom ? 0 : 1}
          backgroundColor={"#FFE7E5"}
          fontColor={"#D75A58"}
          optionBorderRadius={30}
      />
  </div>
  
  const units_switch = <div className="switch" style={{width: 100, height: 50}}>
      <SwitchSelector
          onChange={(val) => vaseStore.update_units(val)}
          options={unitOptions}
          initialSelectedIndex={vaseStore.cm ? 0 : 1}
          backgroundColor={"#FFE7E5"}
          fontColor={"#D75A58"}
          optionBorderRadius={30}
      />
  </div>

  function nextPage(){
    coloringFormStore.setMsg()
    vaseStore.setSize()
    const incremented_val = firebase.firestore.FieldValue.increment(1)
    firestore.collection("diagrams_count").doc("count").update({count_value: incremented_val})
  }

  return (
    <>
      <div className="container" style={{background: '#FFE7E5', display: 'flex', flexDirection:'row', width: 'auto', height: 'auto'}}>
        <div className="containerLeft" style={{background: '#FFE7E5', width: '57%', height: 'auto',float:'left'}}>
          <Canvas camera={{position:[0, 0, 120], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "pink", height: '80%', borderRadius:30, marginTop:'1%', marginLeft:'1%',width:'99%'}}>
            {/* <ambientLight intensity={0} /> */}
            <spotLight position={[-275, 150, 90]} intensity = {1.3}/>
            <spotLight position={[100, 25, 90]} intensity = {1.3}/>
            <spotLight position={[-150, -150, 110]} intensity = {0.6} />
            <spotLight position={[150, -150, 110]} intensity={0.6} />
            <spotLight position={[-10, 0, 25]} intensity={0.6} />
             {/* <spotLight position={[1, 10, 10]} angle={0.15} penumbra={1} /> */}
            {/* <pointLight position={[-10, -10, -10]} /> */}
            <Vase vase={vaseStore} />
          </Canvas>
          <div className="containerCaption">
            <br/>
            <a>Press <span>x</span> , <span>y</span> , and <span>z</span> to rotate the object ,<br/><span>q</span> and <span>w</span> to zoom in and out , <br/>and <span>space</span> to reset view to default . </a>
          </div>
        </div>
        <div className="containerRight" style={{background: '#FFE7E5', width: '43%', height: '100%', overflow: 'visible', float:'right'}}>
          <br />
          <p className="textSwitch">units</p>
          {units_switch}
          <div style={{display:'inline-block', width: '100%'}}>
            <div style={{background: '#FFE7E5', width: '40.5%', float: 'left', marginBottom:30, marginLeft:25, marginTop:15}}>
              <p className="text">height</p>
              {sliderHeight}
              <p className="text">2nd diameter</p>
              {slider_d3}
              <p className="text">4th diameter</p>
              {slider_d1}
            </div>
            <div style={{background: '#FFE7E5', width: '40.5%', float: 'right', marginBottom:30, marginRight:30, marginTop:15}}>
              <p className="text">top diameter</p>
              {slider_dtop}
              <p className="text">3rd diameter</p>
              {slider_d2}
              <p className="text">bottom diameter</p>
              {slider_dbottom}
            </div>
          </div>
          <p className="text">diameter heights ( % )</p>
          <div style={{width:'88%', marginLeft:'5%'}}>
            {dSlider}
          </div>
          <div style={{float: 'left', width: '33.3%', overflow:'visible', marginTop:25, marginBottom:10}}>
            <p className="textSwitch">top rim</p>
            {top_rim_switch}
          </div>
          <div style={{float: 'left', width: '33.3%', overflow:'visible', marginTop:25, marginBottom:10}}>
            <p className="textSwitch">bottom rim</p>
            {bottom_rim_switch}
          </div>
          <div style={{float: 'right', width: '33.4%', overflow:'visible', marginTop:25, marginBottom:10}}>
            <p className="textSwitch">bottom cover</p>
            {flat_bottom_switch}
          </div>
          <div style={{width: 80, marginBottom:35, display:'inline-block', marginTop: 30}}>
            <NavBtn>
              <NavBtnLink style={{background: "#D14240"}} onClick={nextPage} to='/colouring'>
                <p className = "buttonText">done</p>
              </NavBtnLink>
            </NavBtn>
          </div>
        </div>
      </div>
  </>  
  );
};

export default observer(CreateVase);