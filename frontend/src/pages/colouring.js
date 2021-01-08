import React, {useState, useRef} from 'react';
import { TwitterPicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";
import Sticky from 'react-stickynode';
import ColoringForm from '../models/ColoringForm';
// import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { observer } from "mobx-react";
import logo from "../assets/complex-logo.png"
import {PlainLink} from '../components/Navbar/NavbarElements';
import { AiOutlineInfo } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { exportComponentAsPNG } from "react-component-export-image";
import {useStores} from "../models/RootStoreContext"
import DelayLink from 'react-delay-link';


/* stretch goals 
- spray painting 
- using lines and shapes to color 
- larger brush size 
- rotation option -- need to use smth other than index for keys, and map for default / starting position */

const Colouring = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerDefault, setShowPickerDefault] = useState(false);
  const [colorPaletteIdx, setColorIdx] = useState(0);
  const [dColorPaletteIdx, setDColorIdx] = useState(0);
  const [colorPalette, setColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 
  const [dColorPalette, setDColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 

  const diagramRef = useRef();
  const {vaseStore, coloringFormStore} = useStores();

  function changeColor(color) {
    coloringFormStore.setColor(color.hex);
    const search = (color.hex).toString().toUpperCase()
    if (!colorPalette.includes(search)){
      let new_palette = colorPalette
      new_palette[colorPaletteIdx] = search
      setColorPalette(new_palette)
      const new_idx = (colorPaletteIdx + 1) % 10
      setColorIdx(new_idx)
    }
  }

  function changeDefaultColor(color) {
    const search = (color.hex).toString().toUpperCase()
    coloringFormStore.setDefaultColor(search);
    if (!dColorPalette.includes(search)){
      let new_palette = dColorPalette
      new_palette[dColorPaletteIdx] = search
      setDColorPalette(new_palette)
      const new_idx = (dColorPaletteIdx + 1) % 10
      setDColorIdx(new_idx)
    }
  }

  const myDimensions = coloringFormStore.getDimensions();
  const absolute = coloringFormStore.maxWidth > 52 ? true : false 

  let myHeight = 0 
  const myYMargin = 20
  const px_y = 13
  const px_border = 1
  const marker_y = 20

  for (let i = 0; i < myDimensions.length; i++){
    const y = myDimensions[i][1]
    myHeight += (y * (px_y + px_border)) + (1.5*myYMargin) + (2*marker_y)
  }

  const colorPicker = <div className = "color-picker-object">
      <p className = "label-big">pixel color</p>
      <div className = "color-picker-cover"
        onClick={()=> setShowPicker(!showPicker)} 
        style={{background: coloringFormStore.selectedColor}}
      >
        <br />
      </div>
      <div className = "color-picker-palette">
        {showPicker &&  <TwitterPicker colors={colorPalette} triangle="top-left" color={coloringFormStore.selectedColor} onChangeComplete={changeColor} />}
      </div>
    </div>
  
  const defaultColorPicker = <div className = "color-picker-object">
      <p className = "label-big">primary color</p>
      <div className = "color-picker-cover"
        onClick={() => setShowPickerDefault(!showPickerDefault)} 
        style={{background: coloringFormStore.defaultColor}}
      >
        <br />
      </div>
      <div className = "color-picker-palette-d" >
        {showPickerDefault &&  <TwitterPicker colors={dColorPalette} triangle="top-left" color={coloringFormStore.defaultColor} onChangeComplete={changeDefaultColor} />}
      </div>
    </div>

  const paintByPixel = 
  <div className = "mode-object">
    <div className = "mode-button"
      onClick={() => coloringFormStore.setMode(false)}> 
      <p className = "label-inside">paint by pixel</p>
    </div>
  </div>

  const sprayPaint = 
  <div className = "mode-object">
    <div className = "mode-button"
      onClick={() => coloringFormStore.setMode(true)}> 
      <p className = "label-inside">spray paint</p>
    </div>
  </div>

  const logoObject = <div className = "logo-object">
    <p className = "label" >3d-o</p>
    <img className = "logo" src={logo} onClick={() => exportComponentAsPNG(diagramRef)} alt=""/>
    {/* <img className = "logo" src={logo} onClick={() => coloringFormStore.setMakeTexture(true)} alt=""/> */}
    {showInfo && <div className="info-popup">info here</div>}
  </div>  

  const backButton = 
  <div className = "back">
    <div className = "nav"
      onClick={() => console.log("hi")}> 
      <IoChevronBack size={25} style={{color: 'white'}}/>
    </div>
  </div>

  const nextButton = 
  <div className = "next">
    {/* <PlainLink to="/result">
      <div className = "nav"
        onClick={nextPage}> 
        <IoChevronForward size={25} style={{color: 'white'}}/>
      </div>
    </PlainLink> */}
    <DelayLink delay={0} to="/result" clickAction={nextPage} replace={false}>
      <div className = "nav">
          <IoChevronForward size={25} style={{color: 'white'}}/>
      </div>
    </DelayLink>
  </div>

  function nextPage(){
    coloringFormStore.setMakeTexture(true)
    coloringFormStore.exportComponent(diagramRef, 100)
  }

  const clear = <div className = "logo-object">
    <p className = "label">clear</p>
    <div className = "icon"
      onClick={()=> coloringFormStore.clearAll()} >
      <FiTrash  size={20} style={{color: 'white'}}/>
      <br />
    </div>
  </div>

  const info = <div className = "logo-object">
  <p className = "label">info</p>
  <div className = "icon"
    onClick={()=> setShowInfo(!showInfo)} 
    >
    <AiOutlineInfo size={23} style={{color: 'white'}}/>
  </div>
  </div>

  const canvas = absolute? 
  <div ref = {diagramRef} className = "canvas">
    <OrigamiObject 
      dimensions={myDimensions}  
      formObject={coloringFormStore}
    />
  </div> : 
  <div ref = {diagramRef} className = "canvas-relative">
    <OrigamiObject 
      dimensions={myDimensions}  
      formObject={coloringFormStore}
    />
  </div>

  return (
    <div style={{background: "#FFE7E5"}}>
      <Sticky innerZ={3}>
        <div className = "toolbar">
          {backButton}
          {paintByPixel}
          {clear}
          {colorPicker}
          {logoObject}
          {defaultColorPicker}
          {info}
          {sprayPaint}
          {nextButton}
        </div>
      </Sticky>
      <div style={{background: "#FFE7E5", height: myHeight}}>
        <div style={{position: 'relative', overflowX:'scroll', overflowY:'hidden', height: coloringFormStore.makeTexture ? 0 : myHeight, background:"#FFE7E5"}}>
          {canvas}
        </div>
      </div>
    </div>
  );
};

export default observer(Colouring);