import React from 'react';
import { observer } from "mobx-react";
import Rim from "../Rim";
import Bottom from "../Bottom";
import Arm from "../Arm"
import BunnyOrHandle from "../BunnyOrHandle"
import TriangleSection from "../TriangleSection"
import Sphere from "../Sphere"

const Appendages = (props) => {
    const {modelStore, formObject} = props;
  
    let bottoms = []
    let sections = []
    let rims = []
    let key = 0

    if (modelStore.flat_bottom){
      bottoms.push(<Bottom key={key} caption={"flat bottom"} flat={true} diameter={modelStore.dbottom} lid={false} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
    }
    else if (formObject.model === "basket"){
      bottoms.push(<Bottom key={key} caption={"curved bottom"} flat={false} diameter={modelStore.dbottom} lid={false} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
    }
    if (modelStore.lid){
      const handle_size = modelStore.dtop <= 15? "small": modelStore.dtop >= 35? "big":"med"
      bottoms.push(<Bottom key={key} caption={"lid"} flat={false} diameter={modelStore.dtop} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
      sections.push(<Sphere key={key} caption={"lid handle"} size={handle_size} formObject={formObject}/>)
      key += 1
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
      const ear_scale = 2
      const ear_d = Math.ceil(modelStore.diameter/ear_scale)
      if (modelStore.ears === "bear"){
        sections.push(<Rim key={key} full={false} caption={"bear ear"} circ={ear_d}/>)
        key += 1
        sections.push(<Rim key={key} full={false} caption={"bear ear"} circ={ear_d}/>)
        key += 1 
      }
      else if (modelStore.ears === "bunny"){
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={ear_d} formObject={formObject}/>)
        key += 1
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={ear_d} formObject={formObject}/>)
      }
      else if (modelStore.ears === "sphere"){
        sections.push(<Sphere key={key} caption={"round ear"} size={modelStore.diameter <= 15? "small": modelStore.diameter >= 35? "big":"med"} formObject={formObject}/>)
        key += 1
        sections.push(<Sphere key={key} caption={"round ear"} size={modelStore.diameter <= 15? "small": modelStore.diameter  >= 35? "big":"med"} formObject={formObject}/>)
      }
      else if (modelStore.ears === "cat"){
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={ear_d} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
        key += 1
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={ear_d} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
      }
      key += 1
    }
    if (modelStore.side_handles){
      const circ = modelStore.getDimensions()[0][0]
      rims.push(<Rim key={key} full={false} caption={"side handle"} circ={circ}/>) // static picture
      key += 1
      rims.push(<Rim key={key} full={false} caption={"side handle"} circ={circ}/>) 
      key += 1
    }
    if (modelStore.top_rim){
      rims.push(<Rim key={key} full={true} caption={"top rim"} circ={modelStore.getDimensions()[0][0]}/>) // static picture
      key += 1
    }
    if (modelStore.bottom_rim){
      const circ = modelStore.getDimensions()[modelStore.getDimensions().length-1][0]
      rims.push(<Rim key={key} full={true} caption={"bottom rim"} circ={circ}/>) // static picture
      key += 1
    }
    if (formObject.model === "swan"){
      const circ = modelStore.getDimensions()[0][0]
      rims.push(<Rim key={key} swan={true} caption={"neck"} circ={circ}/>) // static picture
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