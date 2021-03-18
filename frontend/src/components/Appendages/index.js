import React, {useRef} from 'react';
import { observer } from "mobx-react";
import Rim from "../Rim";

const Appendages = (props) => {
    const {modelStore, modelType} = props;
  
    let sections = []

    // top_rim, bottom_rim, flat_bottom, arms, ears, lid, top_handle, side_handles

    if (modelStore.top_rim){
      sections.push(<Rim half={false} caption={"top rim"} circ={modelStore.getDimensions()[0][0]}/>) // static picture
    }
    if (modelStore.bottom_rim){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      sections.push(<Rim half={false} caption={"bottom rim"} circ={circ}/>) // static picture
    }
    // if (modelStore.flat_bottom){
    //   const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
    //   sections.push(<Bottom flat={true} circ={circ} lid={false}/>) // circ = circumfrence
    // }
    // else if (modelType == "basket"){
    //   const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
    //   sections.push(<Bottom flat={false} circ={circ} lid={false}/>)
    // }
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
    // if (modelStore.lid){
    //   const circ = modelStore.getDimensions()[0][0]
    //   sections.push(<Bottom flat={false} circ={circ} lid={true}/>)
    // }
    if (modelStore.side_handles){
      const circ = modelStore.getDimensions()[0][0]
      sections.push(<Rim half={true} caption={"side handles"} circ={circ}/>) // static picture
    }
    // if (modelStore.top_handle){
    //   const circ = modelStore.getDimensions()[0][0]
    //   sections.push(<Handle length={circ} width={5}/>)
    // }

    return (
      <div id="Appendages">
        <div style={{display:"flex", alignItems:"flex-start", marginLeft: 10.5, marginBottom: 3, justifyContent:"flex-start"}}>
          {sections}
        </div>
      </div>
    );
  }

export default observer(Appendages)