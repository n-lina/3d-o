import React, {useState, useRef} from 'react';
import { TwitterPicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";
import Sticky from 'react-stickynode';
import { observer } from "mobx-react";
import logo from "../assets/complex-logo.png"
// import {PlainLink as Link} from '../components/Navbar/NavbarElements';
import { AiOutlineInfo } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { exportComponentAsPNG } from "react-component-export-image";
import {useStores} from "../models/RootStoreContext"
import DelayLink from 'react-delay-link';
import Appendages from "../components/Appendages";


const Colouring = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerDefault, setShowPickerDefault] = useState(false);
  const [colorPaletteIdx, setColorIdx] = useState(0);
  const [dColorPaletteIdx, setDColorIdx] = useState(0);
  const [colorPalette, setColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 
  const [dColorPalette, setDColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 

  const diagramRef = useRef();
  const appendagesRef = useRef();
  const {coloringFormStore, vaseStore, swanStore, figStore, basketStore} = useStores();
  let modelStore;
  if (coloringFormStore.model == "vase") modelStore = vaseStore
  if (coloringFormStore.model == "swan") modelStore = swanStore
  else if (coloringFormStore.model == "fig") modelStore = figStore
  else if (coloringFormStore.model == "basket") modelStore = basketStore

  function changeColor(color) {
    const search = (color.hex).toString().toUpperCase()
    coloringFormStore.setColor(search);
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

  const myDimensions = modelStore.getDimensions();
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

  if (coloringFormStore.model == "swan"){
    myHeight += (swanStore.modelDimensions[0][0] * 0.75 * (px_y + px_border) * 1.2)
  }

  else if (coloringFormStore.model == "fig"){
    myHeight *= 2
  }

  if (modelStore.flat_bottom || coloringFormStore.model == "basket"){
    myHeight *= 2
    if(modelStore.lid){
      myHeight *= 2
    }
  }

  if (modelStore.top_rim || modelStore.bottom_rim){
    myHeight += 400
  }

  myHeight = Math.max(window.innerHeight, myHeight)

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
    <img className = "logo" src={logo} onClick={() => savePics()} alt=""/>
    {showInfo && <div className="info-popup">info here</div>}
  </div>  

  function savePics(){
    exportComponentAsPNG(diagramRef, {fileName: "3do-diagram"})
    exportComponentAsPNG(appendagesRef, {fileName: "3do-diagram-appendages"})
  }

  const backButton = 
  <div className = "back">
    <div className = "nav" onClick={() => console.log("hi")}> 
      <IoChevronBack size={25} style={{color: 'white'}}/>
    </div>
  </div>


  const nextButton = 
  <div className = "next">
    <DelayLink delay={0} to="/result" clickAction={nextPage} replace={false}>
      <div className = "nav"> 
          <IoChevronForward size={25} style={{color: 'white'}}/>
      </div>
    </DelayLink>
  </div>

  function nextPage(){
    coloringFormStore.exportComponent(diagramRef)
    coloringFormStore.exportComponent(appendagesRef, true)
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

  let caption = `${coloringFormStore.model}`
  if (coloringFormStore.model == "fig"){
    caption = "figurine head"
  }
  else if (coloringFormStore.model == "swan"){
    caption = "swan wings + body"
  }

  const canvas = absolute? 
  <div className = "canvas">
    <div ref = {diagramRef}>
      <OrigamiObject 
        caption={`${caption}`}
        dimensions={myDimensions}  
        formObject={coloringFormStore}
      />
    </div>
    <div ref = {appendagesRef}>
      <Appendages 
        dimensions={myDimensions}
        modelStore={modelStore}
        formObject={coloringFormStore}
      />
    </div>
  </div> : 
  <div className = "canvas-relative">
    <div ref = {diagramRef}>
      <OrigamiObject 
        caption={`${caption}`}
        dimensions={myDimensions}  
        formObject={coloringFormStore}
      />
    </div>
    <div ref = {appendagesRef}>
      <Appendages 
        dimensions={myDimensions}
        modelStore={modelStore}
        formObject={coloringFormStore}
      />
    </div>
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
      <div style={{position: 'relative', overflowX:'scroll', overflowY:'hidden', height: myHeight, background:"#FFE7E5"}}>
        {canvas}
      </div>
    </div>
  );
};

export default observer(Colouring);