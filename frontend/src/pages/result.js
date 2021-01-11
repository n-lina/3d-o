import React, {useEffect, useRef} from 'react';
import {useStores} from "../models/RootStoreContext"
import { observer } from "mobx-react";
import  ResultVase  from "../components/ResultVase"
import { Canvas} from "react-three-fiber";
import grid from "../assets/paper.PNG"

const Result = () => {
  const { coloringFormStore, vaseStore } = useStores()

  const canvasRef = useRef()
  // const contextRef = useRef()

  // coloringFormStore.setMakeTexture(false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    coloringFormStore.setMakeTexture(false)

    for (let i = 0 ; i < 4; i++){
      let topPic = new Image;
      topPic.src = coloringFormStore.vaseTextureStore[i]
      topPic.onload = function(){
        const px_size = topPic.height/coloringFormStore.vaseDimensions[i][1]
        const half_px_width = px_size/2
        canvas.width = topPic.width-half_px_width;
        canvas.height = topPic.height;
        context.drawImage(topPic,0,0);
        const end_idx = topPic.width-px_size;
        for (let j = px_size+1; j < topPic.height; j+=2*(px_size)){
          var imgData = context.getImageData(end_idx,j,Math.ceil(half_px_width),px_size);
          context.putImageData(imgData, 0,j);
        }
        var texture = canvas.toDataURL("image/png", 1.0)
        vaseStore.storePic(texture, i)
      };
    }
  }, [coloringFormStore.vaseTextureStore[3]])

  

  return (
    <div style={{height: 500, width : 500}}>
      <canvas style={{display:"none"}} ref={canvasRef}></canvas> <br/>
      <Canvas camera={{position:[0, 0, 120], fov:30, aspect: 800/600, near: 0.1,far: 1000}} style={{background: "pink", height: '100%', borderRadius:30, marginTop:'1%', marginLeft:'1%',width:'99%'}}>
        <spotLight position={[-275, 150, 90]} intensity = {1.5}/>
        <spotLight position={[100, 25, 90]} intensity = {1.3}/>
        <spotLight position={[-150, -150, 110]} intensity = {0.6} />
        <spotLight position={[150, -150, 110]} intensity={0.6} />
        <spotLight position={[-10, 0, 25]} intensity={0.6} />
        <ResultVase vaseStore={vaseStore} />
      </Canvas>
    </div>
  );
};

export default observer(Result);