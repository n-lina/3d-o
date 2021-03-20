import React from 'react';
import { observer } from "mobx-react";
import Rim from "../Rim";
import Bottom from "../Bottom";
import Arm from "../Arm"
import BunnyOrHandle from "../BunnyOrHandle"
import TriangleSection from "../TriangleSection"

const Appendages = (props) => {
    const {modelStore, formObject} = props;
  
    let bottoms = []
    let sections = []
    let rims = []
    let key = 0

    // top_rim, bottom_rim, flat_bottom, arms, ears, lid, top_handle, side_handles

    if (modelStore.flat_bottom){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      bottoms.push(<Bottom key={key} caption={"flat bottom"} flat={true} circ={circ} lid={false} formObject={formObject}/>) // circ = circumfrence
      key += 1
    }
    else if (formObject.model === "basket"){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      bottoms.push(<Bottom key={key} caption={"curved bottom"} flat={false} circ={circ} lid={false} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.lid){
      const circ = modelStore.getDimensions()[0][0]
      bottoms.push(<Bottom key={key} caption={"lid"} flat={false} circ={circ} formObject={formObject}/>)
      key += 1
      // bottoms.push(<Sphere key={key} caption={"lid handle"} size={circ} formObject={formObject}/>)
      // key += 1
    }
    if (modelStore.top_handle){
      const circ = modelStore.getDimensions()[0][0]
      sections.push(<BunnyOrHandle key={key} caption={"top handle"} size={10} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.arms){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      sections.push(<Arm key={key} caption={"arm"} size={circ} formObject={formObject}/>)
      key += 1
      sections.push(<Arm key={key} caption={"arm"} size={circ} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.ears !== ""){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0] // make ears prop. to body circ
      if (modelStore.ears === "bear"){
        sections.push(<Rim key={key} half={true} caption={"bear ear"} circ={circ}/>)
        key += 1
        sections.push(<Rim key={key} half={true} caption={"bear ear"} circ={circ}/>)
        key += 1 
      }
      else if (modelStore.ears === "bunny"){
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={10} formObject={formObject}/>)
        key += 1
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={10} formObject={formObject}/>)
      }
      // else if (modelStore.ears === "sphere"){
      //   bottoms.push(<Sphere key={key} caption={"round ear"} size={circ} formObject={formObject}/>)
      //   key += 1
      //   bottoms.push(<Sphere key={key} caption={"round ear"} size={circ} formObject={formObject}/>)
      // }
      else if (modelStore.ears === "cat"){
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={10} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
        key += 1
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={10} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
      }
      key += 1
    }
    if (modelStore.side_handles){
      const circ = modelStore.getDimensions()[0][0]
      rims.push(<Rim key={key} half={true} caption={"side handle"} circ={circ}/>) // static picture
      key += 1
      rims.push(<Rim key={key} half={true} caption={"side handle"} circ={circ}/>) 
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
    if (formObject.model == "swan"){
      const circ = modelStore.getDimensions()[0][0]
      rims.push(<Rim key={key} swan={true} half={false} caption={"neck"} circ={circ}/>) // static picture
      key += 1
    }

    return (
      <div id="Appendages">
        <div style={{display:"inline-block", marginLeft: 10.5, marginBottom: 3}}>
          {bottoms}
          <div style={{display:"flex", alignItems:"flex-start", marginLeft: 10.5, marginBottom: 3, justifyContent:"flex-start"}}>
            {sections}
            {rims}
          </div>
        </div>
      </div>
    );
  }

export default observer(Appendages)