import React, {useState} from 'react';
import { TwitterPicker } from "react-color";
import OrigamiObject from "../components/OrigamiObject";
import "./colouringPage.css";
import Sticky from 'react-stickynode';
import ColoringForm from '../models/ColoringForm';
import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { observer } from "mobx-react";
import logo from "../assets/circle-simple-logo.png"
import {
  PlainLink
} from '../components/Navbar/NavbarElements';

const form = ColoringForm.create();

onPatch(form, patch => {
  // console.log(patch);
});
makeInspectable(form);


/* stretch goals 
- spray painting 
- using lines and shapes to color 
- larger brush size 
- rotation option -- need to use smth other than index for keys, and map for default / starting position */

const Colouring = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerDefault, setShowPickerDefault] = useState(false);
  const [colorPaletteIdx, setColorIdx] = useState(0);
  const [dColorPaletteIdx, setDColorIdx] = useState(0);
  const [colorPalette, setColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 
  const [dColorPalette, setDColorPalette] = useState(['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']) 

  function changeColor(color) {
    form.setColor(color.hex);
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
    form.setDefaultColor(search);
    if (!dColorPalette.includes(search)){
      let new_palette = dColorPalette
      new_palette[dColorPaletteIdx] = search
      setDColorPalette(new_palette)
      const new_idx = (dColorPaletteIdx + 1) % 10
      setDColorIdx(new_idx)
    }
  }

  const myDimensions = form.getDimensions();
  const absolute = form.maxWidth > 52 ? true : false 

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
      <p className = "label">pixel color</p>
      <div className = "color-picker-cover"
        onClick={()=> setShowPicker(!showPicker)} 
        style={{background: form.selectedColor}}
      >
        <br />
      </div>
      <div className = "color-picker-palette">
        {showPicker &&  <TwitterPicker colors={colorPalette} triangle="top-left" color={form.selectedColor} onChangeComplete={changeColor} />}
      </div>
    </div>
  
  const defaultColorPicker = <div className = "color-picker-object">
      <p className = "label">primary color</p>
      <div className = "color-picker-cover"
        onClick={() => setShowPickerDefault(!showPickerDefault)} 
        style={{background: form.defaultColor}}
      >
        <br />
      </div>
      <div className = "color-picker-palette-d" >
        {showPickerDefault &&  <TwitterPicker colors={dColorPalette} triangle="top-left" color={form.defaultColor} onChangeComplete={changeDefaultColor} />}
      </div>
    </div>

  const paintByPixel = 
  <div className = "mode-object">
    <div className = "mode-button"
      onClick={() => form.setMode(false)}> 
      <p className = "label-inside">paint by pixel</p>
    </div>
  </div>

  const sprayPaint = 
  <div className = "mode-object">
    <div className = "mode-button"
      onClick={() => form.setMode(true)}> 
      <p className = "label-inside">spray paint</p>
    </div>
  </div>

  const clearObject = <div className = "logo-object">
    <p className = "label">clear</p>
    <img className = "logo"
      src={logo}
      onClick={() => form.clearAll()} 
    />
  </div>  

  const backButton = 
  <div className = "back">
    <div className = "nav"
      onClick={() => console.log("hi")}> 
      <p className = "nav-label">	&lt; </p>
    </div>
  </div>

  const nextButton = 
  <div className = "next">
    <PlainLink to="/result">
      <div className = "nav"
        onClick={() => console.log("hi")}> 
        <p className = "nav-label">	&gt;</p>
      </div>
    </PlainLink>
  </div>


  return (
    <div style={{background: "#FFE7E5"}}>
      <Sticky innerZ={3}>
        <div className = "toolbar">
          {backButton}
          {paintByPixel}
          {colorPicker}
          {clearObject}
          {defaultColorPicker}
          {sprayPaint}
          {nextButton}
        </div>
      </Sticky>
      <div style={{position: 'relative', overflowX:'scroll', overflowY:'hidden', height:myHeight, background:"#FFE7E5"}}>
        {absolute && (<div className = "canvas">
          <OrigamiObject 
            dimensions={myDimensions}  
            formObject={form}
          />
        </div>)}
        {!absolute && (<div className = "canvas-relative">
          <OrigamiObject 
            dimensions={myDimensions}  
            formObject={form}
          />
        </div>)}
      </div>
    </div>
  );
};

export default observer(Colouring);