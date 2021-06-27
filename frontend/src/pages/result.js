import React, {useEffect, useRef} from 'react';
import {useStores} from "../models/RootStoreContext"
import { observer } from "mobx-react";
import  ResultVase  from "../components/ResultVase"
import  Swan  from "../components/Swan"
import  ResultFigurine  from "../components/ResultFigurine"
import  ResultBasket  from "../components/ResultBasket"
import { Canvas} from "react-three-fiber";
import './create-vase.css'
import upperbanner from "../assets/upper-banner.png"
import lowerbanner from "../assets/lower-banner.png"
import { FiDownload } from "react-icons/fi";
// import { exportComponentAsPNG } from "react-component-export-image";

const Result = () => {
  const {coloringFormStore, vaseStore, swanStore, basketStore, figStore} = useStores()
  
  const canvasRef = useRef()
  let modelStore; 
  if (coloringFormStore.model === "vase") modelStore = vaseStore
  if (coloringFormStore.model === "swan") modelStore = swanStore
  else if (coloringFormStore.model === "fig") modelStore = figStore
  else if (coloringFormStore.model === "basket") modelStore = basketStore
  modelStore.setDefaultColor(coloringFormStore.defaultColor)
  modelStore.clearTextures()
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    // console.log(coloringFormStore.coloringFormData)
    // console.log(coloringFormStore.coloringFormData[0].drawingSectionData[0].rowData[0].pixelColor)
    // console.log("Num sections", coloringFormStore.coloringFormData.length)
    // const px_size = 20
    const px_width = 16*2
    const px_height = 11*2
    const half_px_width = px_width/2
    const defaultCol = coloringFormStore.defaultColor;

    for (let i = 0; i < coloringFormStore.coloringFormData.length; i++){
      const sec_width = modelStore.modelDimensions[i][0]
      const sec_height = modelStore.modelDimensions[i][1] 
      canvas.width = sec_width * px_width
      canvas.height = sec_height * px_height
      context.fillStyle = defaultCol
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < sec_height; r++){
        let offset = 0 
        if (coloringFormStore.coloringFormData[i].drawingSectionData[r].offset){
          offset = half_px_width
          const last_idx = coloringFormStore.coloringFormData[i].drawingSectionData[r].rowData.length
          context.fillStyle = coloringFormStore.coloringFormData[i].drawingSectionData[r].rowData[last_idx-1].pixelColor
          context.fillRect(0, px_height * r, half_px_width, px_height)
        }
        for (let c = 0; c < sec_width; c++){
          if (coloringFormStore.coloringFormData[i].drawingSectionData[r].rowData[c].pixelColor === defaultCol) continue
          context.fillStyle = coloringFormStore.coloringFormData[i].drawingSectionData[r].rowData[c].pixelColor
          context.fillRect((px_width * c) + offset, px_height * r, px_width, px_height)
        }
      }
      var texture = canvas.toDataURL("image/png", 1.0)
      console.log(texture)
      modelStore.storePic(texture)
    }
    coloringFormStore.setMsg("error")
  }, [])

  // const modelRef = useRef()  

  return (
    // <canvas ref={canvasRef}/> // to test texture generation
    <div className="container" style={{background: '#FFE7E5', display: 'flex', flexDirection:'row', width: 'auto', height: '600px'}}>
      <div className="containerLeft" style={{background: '#FFE7E5', width: '52%', height: 'auto',float:'left'}}>
          <Canvas camera={{position:[0, 0, 120], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "pink", height: "80%", borderRadius:30, marginTop:'1%', marginLeft:'1%',width:'99%'}}>
            <spotLight position={[-275, 150, 90]} intensity = {0.8}/>
            <spotLight position={[100, 25, 90]} intensity = {0.8}/>
            <spotLight position={[-150, -150, 110]} intensity = {0.3} />
            <spotLight position={[150, -150, 110]} intensity={0.1} />
            <spotLight position={[-10, 0, 25]} intensity={0.1} />
            {coloringFormStore.model === "vase" && <ResultVase vaseStore={vaseStore} />}
            {coloringFormStore.model === "swan" && <Swan swanStore={swanStore} result={true}/>}
            {coloringFormStore.model === "fig" && <ResultFigurine figStore={figStore}/>}
            {coloringFormStore.model === "basket" && <ResultBasket basketStore={basketStore} />}
          </Canvas>
        <div className="containerCaption">
            <div style={{height: 10}}></div>
            <a>Press <span>x</span> , <span>y</span> , and <span>z</span> to rotate the object ,<br/><span>q</span> and <span>w</span> to zoom in and out , <br/>and <span>space</span> to reset view to default . </a>
            <div style={{height: 10}}></div>
        </div>
      </div>
      <div className="containerRight" style={{width: '48%', height: "100%", overflow: 'visible', float:'right', alignItems:"center", justifyContent:"center", position: "relative"}}>
        <canvas style={{display:"none"}} ref={canvasRef}/>
        <img alt={""} src={upperbanner} className="banner" style={{marginTop: 2}}/>
        <div className = "done-button"
          onClick={() => coloringFormStore.saveDiagram()}> 
          <p className = "download-label"><span><FiDownload size={20}/></span> download 3d-o diagram <span><FiDownload size={20}/></span></p>
        </div>
        {/* <div className = "done-button"
          onClick={() => coloringFormStore.saveDiagram()}> 
          <p className = "download-label"><span><FiDownload size={20}/></span> download 3d model <span><FiDownload size={20}/></span></p>
        </div> */}
        <img alt={""} src={lowerbanner} className="banner-b"  />
      </div>
    </div>
  );
};

export default observer(Result);