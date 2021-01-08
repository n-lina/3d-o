import React, {useEffect, useRef} from 'react';
import {useStores} from "../models/RootStoreContext"
import { observer } from "mobx-react";
import { IoReturnDownForward } from 'react-icons/io5';

const Result = () => {
  const { coloringFormStore, vaseStore } = useStores()

  const canvasRef = useRef()
  // const contextRef = useRef()
  const px_size = 16
  const half_px_width = Math.floor(px_size/2)

  coloringFormStore.setMakeTexture(false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    for (let i = 0 ; i < 4; i++){
      let topPic = new Image;
      topPic.src = coloringFormStore.vaseTextureStore[i]
      topPic.onload = function(){
        canvas.width = topPic.width-half_px_width;
        canvas.height = topPic.height;
        context.drawImage(topPic,0,0);
        const end_idx = topPic.width-px_size;
        for (let j = px_size; j < topPic.height; j+=2*(px_size)-1){
          var imgData = context.getImageData(end_idx,j,half_px_width,px_size);
          context.putImageData(imgData, 0,j);
        }
        var texture = canvas.toDataURL("image/png", 1.0)
        vaseStore.storePic(texture, i)
      };
    }
  }, [coloringFormStore.vaseTextureStore[3]])

  

  return (
    <div>
      <canvas ref={canvasRef}></canvas> <br/>
    </div>
  );
};

export default observer(Result);