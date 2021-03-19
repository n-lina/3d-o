import React, {useRef} from 'react';
import { observer } from "mobx-react";
import Rim from "../Rim";
import Bottom from "../Bottom";

const Appendages = (props) => {
    const {modelStore, formObject} = props;
  
    let sections = []
    let rims = []
    let key = 0

    // top_rim, bottom_rim, flat_bottom, arms, ears, lid, top_handle, side_handles

    if (modelStore.flat_bottom){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      sections.push(<Bottom key={key} flat={true} circ={circ} lid={false} formObject={formObject}/>) // circ = circumfrence
      key += 1
    }
    else if (formObject.model == "basket"){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      sections.push(<Bottom key={key} flat={false} circ={circ} lid={false} formObject={formObject}/>)
      key += 1
    }
    // if (modelStore.arms){
    //   const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
    //   sections.push(<Arm circ={circ}/>)
    // }
    // if (modelStore.ears != ""){
    //   const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0] // make ears prop. to body circ
    //   switch (modelStore.ears){
    //     case "bear":
    //       sections.push(<Rim half={true} caption={"bear ears x 2"} circ={circ}/>) // static picture
    //     case "bunny":
    //       sections.push(<Ear type={"bunny"} size={circ}/>)
    //     case "sphere":
    //       sections.push(<Sphere caption={"round ears x 2"} size={circ}/>)
    //     case "cat":
    //       sections.push(<Ear type={"cat"} size={circ}/>)
    //     default: 
    //       break
    //   }
    // }
    if (modelStore.lid){
      const circ = modelStore.getDimensions()[0][0]
      sections.push(<Bottom key={key} flat={false} circ={circ} lid={true} formObject={formObject}/>)
      key += 1
    }
    // if (modelStore.top_handle){
    //   const circ = modelStore.getDimensions()[0][0]
    //   sections.push(<Handle length={circ} width={5}/>)
    // }
    if (modelStore.side_handles){
      const circ = modelStore.getDimensions()[0][0]
      rims.push(<Rim key={key} half={true} caption={"side handles"} circ={circ}/>) // static picture
      key += 1
    }
    if (modelStore.top_rim){
      rims.push(<Rim key={key} half={false} caption={"top rim"} circ={modelStore.getDimensions()[0][0]}/>) // static picture
      key += 1
    }
    if (modelStore.bottom_rim){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      rims.push(<Rim key={key} half={false} caption={"bottom rim"} circ={circ}/>) // static picture
      key += 1
    }

    return (
      <div id="Appendages">
        <div style={{display:"inline-block", marginLeft: 10.5, marginBottom: 3}}>
          {sections}
          <div style={{display:"flex", alignItems:"flex-start", marginLeft: 10.5, marginBottom: 3, justifyContent:"flex-start"}}>
            {rims}
          </div>
        </div>
      </div>
    );
  }

export default observer(Appendages)