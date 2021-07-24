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
    const conv = 2.54

    if (modelStore.flat_bottom){
      const dbottom = modelStore.cm? modelStore.dbottom: modelStore.dbottom * conv
      bottoms.push(<Bottom key={key} caption={"flat bottom"} flat={true} diameter={dbottom} lid={false} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
    }
    else if (formObject.model === "basket"){
      const dbottom = modelStore.cm? modelStore.dbottom: modelStore.dbottom * conv
      bottoms.push(<Bottom key={key} caption={"curved bottom"} flat={false} diameter={dbottom} lid={false} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
    }
    if (modelStore.lid){
      const dtop = modelStore.cm? modelStore.dtop: modelStore.dtop * conv
      const handle_size = modelStore.dtop <= 15? "small": modelStore.dtop >= 35? "big":"med"
      bottoms.push(<Bottom key={key} caption={"lid"} flat={false} diameter={dtop} formObject={formObject} upsize={modelStore.upsize}/>)
      key += 1
      sections.push(<Sphere key={key} caption={"lid handle"} size={handle_size} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.top_handle){
      const dtop = modelStore.cm? modelStore.dtop: modelStore.dtop * conv
      sections.push(<BunnyOrHandle key={key} caption={"top handle"} size={dtop} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.arms){
      const diameter = modelStore.cm? modelStore.diameter : modelStore.diameter * conv
      const size = diameter <= 15? "small": diameter >= 35? "big":"med"
      sections.push(<Arm key={key} caption={"arm"} size={size} formObject={formObject}/>)
      key += 1
      sections.push(<Arm key={key} caption={"arm"} size={size} formObject={formObject}/>)
      key += 1
    }
    if (modelStore.ears !== ""){
      const ear_scale = 2
      const diameter = modelStore.cm? modelStore.diameter : modelStore.diameter * conv
      const ear_d = Math.ceil(diameter/ear_scale)
      if (modelStore.ears === "bear"){
        sections.push(<Rim key={key} full={false} caption={"bear ear"} length={ear_d*1.3} upsize={modelStore.upsize}/>)
        key += 1
        sections.push(<Rim key={key} full={false} caption={"bear ear"} length={ear_d*1.3} upsize={modelStore.upsize}/>)
        key += 1 
      }
      else if (modelStore.ears === "bunny"){
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={ear_d} formObject={formObject}/>)
        key += 1
        sections.push(<BunnyOrHandle key={key} caption={"bunny ear"} size={ear_d} formObject={formObject}/>)
      }
      else if (modelStore.ears === "sphere"){
        sections.push(<Sphere key={key} caption={"round ear"} size={diameter <= 15? "small": diameter >= 35? "big":"med"} formObject={formObject}/>)
        key += 1
        sections.push(<Sphere key={key} caption={"round ear"} size={diameter <= 15? "small": diameter  >= 35? "big":"med"} formObject={formObject}/>)
      }
      else if (modelStore.ears === "cat"){
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={ear_d} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
        key += 1
        sections.push(<TriangleSection key={key} caption={"cat ear"} width={ear_d} formObject={formObject} elevation={0} firstRowDisplay={true} inverted={false} />)
      }
      key += 1
    }
    if (modelStore.side_handles){
      const dtop = modelStore.cm? modelStore.dtop : modelStore.dtop * conv
      const half_circ = Math.round(dtop/4) // half the circumference of the handle, ie. length of handle
      rims.push(<Rim key={key} full={false} caption={"side handle"} length={half_circ} upsize={modelStore.upsize}/>) // static picture
      key += 1
      rims.push(<Rim key={key} full={false} caption={"side handle"} length={half_circ} upsize={modelStore.upsize}/>) 
      key += 1
    }
    if (modelStore.top_rim){
      const dtop = modelStore.cm? modelStore.dtop : modelStore.dtop * conv
      rims.push(<Rim key={key} full={true} caption={"top rim"} length={dtop} upsize={modelStore.upsize}/>) // static picture
      key += 1
    }
    if (formObject.model === "swan"){
      if (modelStore.bottom_rim){
        const dbottom = modelStore.cm? modelStore.diameter * modelStore.bottom_scale : modelStore.diameter * modelStore.bottom_scale * conv
        rims.push(<Rim key={key} full={true} caption={"bottom rim"} length={dbottom} upsize={modelStore.upsize}/>) // static picture
        key += 1
      }
      const diameter = modelStore.cm? modelStore.diameter : modelStore.diameter * conv
      rims.push(<Rim key={key} swan={true} caption={"neck"} length={diameter} upsize={modelStore.upsize}/>) // static picture
      key += 1
    }
    if (formObject.model !== "swan" && modelStore.bottom_rim){
      const dbottom = modelStore.cm? modelStore.dbottom : modelStore.dbottom * conv
      rims.push(<Rim key={key} full={true} caption={"bottom rim"} length={dbottom} upsize={modelStore.upsize}/>) // static picture
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