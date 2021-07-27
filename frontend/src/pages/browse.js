import React from 'react';
import straw from "../assets/strawberry-slider-big.png"
import "./create.css"
import {PlainLink} from '../components/Navbar/NavbarElements';
import { HashLink } from 'react-router-hash-link';

const Browse = () => {
  // function loadColoringPage(model){
  //   if (model === "swan"){
  //     coloringFormStore.setPreload()
  //     coloringFormStore.preloadDefaultColor("#000000")
  //     coloringFormStore.setModel("swan", swanStore.wings)
  //     // set swan dimensions so SwanStore can do the calcs to getDimensions
  //   }
  // }

  return (
    <div id="top">
      <div className="holderTop">
        <img src={straw} alt={""} className ="leftS" style={{left:"35%"}}/>
        <p className="create-text">browse pre-made designs</p>
        <img src={straw} alt={""} className ="rightS" style={{right:"35%"}}/>
      </div>
      <div 
        style={{
        flexDirection: 'row',
        height: '150px'
      }}>
        <div className = "holder">
          <HashLink style={{color: "#D14240"}} to="/browse#figurine">
            <img src={straw} alt={""} className ="tabS-left"/>
            <p className="browse-tab">• figurine •</p>
          </HashLink>
          <HashLink style={{color: "#D14240"}} to="/browse#vase">
            <img src={straw} alt={""} className ="tabS-right"/>
            <p className="browse-tab">• vase •</p>
          </HashLink>
          <HashLink style={{color: "#D14240"}} to="/browse#basket">
            <img src={straw} alt={""} className ="tabS-left"/>
            <p className="browse-tab">• basket •</p>
          </HashLink>
          <HashLink style={{color: "#D14240"}} to="/browse#swan">
            <img src={straw} alt={""} className ="tabS-right"/>
            <p className="browse-tab">• swan •</p>
          </HashLink>
        </div>
      </div>
      <div id="figurine" className="holderTop">
        <p className="create-text">— figurine —</p>
      </div>
      <div id="vase" className="holderTop">
        <p className="create-text">— vase —</p>
      </div>
      <div id="basket" className="holderTop">
        <p className="create-text">— basket —</p>
      </div>
      <div id="swan" className="holderTop">
        <p className="create-text">— swan —</p>
      </div>
      <HashLink style={{color: "#D14240"}} to="/browse#top">
        <img src={straw} alt={""} className ="tabS"/>
        <p className="browse-tab" style={{width: 150, marginLeft: "calc(50% - 90px)"}}>• scroll to top •</p>
      </HashLink>
    </div>
  );
};

export default Browse;