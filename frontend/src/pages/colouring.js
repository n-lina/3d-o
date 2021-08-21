import React, {useState, useRef, useEffect, useMemo} from 'react';
import { TwitterPicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";
// import premade from "./premade";
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
import {Link} from 'react-router-dom'
import Appendages from "../components/Appendages";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Colouring = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerDefault, setShowPickerDefault] = useState(false);
  const [colorPaletteIdx, setColorIdx] = useState(0);
  const [dColorPaletteIdx, setDColorIdx] = useState(0);
  const [colorPalette, setColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 
  const [dColorPalette, setDColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'])
  
  // useEffect(() => {
  //   // // coloringFormData = drawing sections
  //   // // drawingSectionData = rows
  //   // // rowData = pixels
  //   // if (coloringFormStore.preload){
  //   //   for (let i = 0; i < premade["swan1"][0].length; i++){
  //   //     const curr_px = premade["swan1"][0][i]
  //   //     coloringFormStore.coloringFormData[curr_px[0]].drawingSectionData[curr_px[1]].rowData[curr_px[2]].setPixelColor(curr_px[3])
  //   //   }
  //   // }
  //   coloringFormStore.setMsg("error")
  // }, [])

  const diagramRef = useRef();
  const appendagesRef = useRef();
  const {coloringFormStore, vaseStore, swanStore, figStore, basketStore} = useStores();
  let modelStore;
  if (coloringFormStore.model === "vase") modelStore = vaseStore
  if (coloringFormStore.model === "swan") modelStore = swanStore
  else if (coloringFormStore.model === "fig") modelStore = figStore
  else if (coloringFormStore.model === "basket") modelStore = basketStore

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

  const myDimensions = useMemo(() => modelStore.getDimensions(), []);
  const { width } = useWindowDimensions();
  const absolute = modelStore.maxWidth > (width-200)/21 ? true : false 

  let myHeight = 10000
  
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

  let prevPageRoute = ""
  switch(coloringFormStore.model){
    case "vase": 
      prevPageRoute = "/create-vase"
      break;
    case "swan": 
      prevPageRoute = "/create-swan"
      break;
    case "fig":
      prevPageRoute = "/create-figurine"
      break;
    case "basket":
      prevPageRoute = "/create-basket"
      break;
  }

  const backButton = 
  <div className = "back">
    <Link delay={0} to={prevPageRoute} replace={false}>
      <div className = "nav"> 
        <IoChevronBack size={25} style={{color: 'white'}}/>
      </div>
    </Link>
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
    coloringFormStore.setMsg(true)
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
  if (coloringFormStore.model === "fig"){
    caption = "figurine head"
  }
  else if (coloringFormStore.model === "swan"){
    caption = "swan wings + body"
  }

  function colorEntry(key, col, num){
    let sheets = Math.ceil(parseInt(num)/coloringFormStore.size)
    let sheetsString = ""
    sheets > 1 ? sheetsString = "sheets" : sheetsString = "sheet"
    let pieces = ""
    parseInt(num) > 1 ? pieces = "pieces" : pieces = "piece"
    return <div key={key} style={{display:'inline-block', width: '100%'}}>
      
      <p style={{marginTop:10, marginBottom:0, marginLeft:20, float:"right"}}>{num} {pieces}, {sheets} {sheetsString}</p>
      <div style={{marginTop:5, marginBottom:5, borderRadius: 25, height: 35, width: 35, background: col, float:"right"}}></div>
    </div>
  }

  const pc_size = modelStore.upsize ? "1 / 16" : "1 / 32"

  //"#FFE7E5"
  const stats = 
  <div>
    <p id="text">instructions + overview</p>
    <div style={{width: '100%', display:'inline-block'}}>
      <div id="text" style={{marginTop:0, marginBottom:0, marginRight: 0, width: '500px', background: "#FFE7E5", float:"left"}}>Piece Size: <span style={{fontWeight: "bold"}}>{pc_size}</span></div>
      <div id="text" style={{marginTop:0, marginBottom:0, marginLeft: 0, width: '500px', background: "#FFE7E5", float:"right"}}>
        <div>
          {coloringFormStore.counter.map((col, i) => (
          colorEntry(i, col[0], col[1])
          ))}
        </div>
      </div>
    </div>
  </div>

  const canvas = absolute? 
  <div className = "canvas">
    <div ref = {diagramRef}>
      {stats}
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
      {stats}
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
    <div className="bg">
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