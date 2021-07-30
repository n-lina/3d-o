import React from 'react';
import straw from "../assets/strawberry-slider-big.png"
import "./create.css"
import {HashLink} from 'react-router-hash-link';
import b_hnd_med_12 from "../assets/browse/basket_hndl_med_12h.jpg"
import b_lid_med_5 from "../assets/browse/basket_lid_med_5h.jpg"
import b_lid_med_10 from "../assets/browse/basket_lid_med_10h.jpg"
import f_bear_med_7 from "../assets/browse/fig_bear_med_7h.jpg"
import f_bear_med_8 from "../assets/browse/fig_bear_med_8h.jpg"
import f_bun_ez_8 from "../assets/browse/fig_bun_ez_8h.jpg"
import f_cat_ez_8 from "../assets/browse/fig_cat_ez_8h.jpg"
import s_ez_1w_2_2 from "../assets/browse/swan_ez_1w_2h_2.jpg"
import s_ez_1w_2 from "../assets/browse/swan_ez_1w_2h.jpg"
import s_ez_1w_3 from "../assets/browse/swan_ez_1w_3h.jpg"
import s_ez_1w_4 from "../assets/browse/swan_ez_1w_4h.jpg"
import s_ez_2w_2 from "../assets/browse/swan_ez_2w_2h.jpg"
import s_ez_2w_4 from "../assets/browse/swan_ez_2w_4h.jpg"
import s_med_1w_4 from "../assets/browse/swan_med_1w_8h.jpg"
import v_bot_cov_hard_20 from "../assets/browse/vase_bot_cov_hard_20h.jpg"
import v_bot_cov_med_10 from "../assets/browse/vase_bot_cov_med_10h.jpg"
import v_hard_25 from "../assets/browse/vase_hard_25h.jpg"
import v_top_bot_rim_hard_40 from "../assets/browse/vase_top_bot_rim_hard_40h.jpg"
import placeholder from "../assets/browse/placeholder.PNG"

const Browse = () => {
  // function loadColoringPage(model){
  //   if (model === "swan"){
  //     coloringFormStore.setPreload()
  //     coloringFormStore.preloadDefaultColor("#000000")
  //     coloringFormStore.setModel("swan", swanStore.wings)
  //     // set swan dimensions so SwanStore can do the calcs to getDimensions
  //   }
  // }

  const swans = [
  [s_ez_1w_2, "easy", 2], 
  [s_ez_1w_2_2, "easy", 2], 
  [s_ez_2w_2, "easy", 2], 
  [s_ez_1w_3, "easy", 3], 
  [s_ez_1w_4, "easy", 4], 
  [s_ez_2w_4, "easy", 4], 
  [s_med_1w_4, "medium", 4]]

  const figs = [
  [f_bun_ez_8, "easy", 8], 
  [f_cat_ez_8, "easy", 8], 
  [f_bear_med_7, "medium", 7], 
  [f_bear_med_8, "medium", 8]]

  const baskets = [
  [b_lid_med_5, "medium", 5], 
  [b_lid_med_10, "medium", 10], 
  [b_hnd_med_12, "medium", 12]]

  const vases = [
  [v_bot_cov_med_10, "medium", 10], 
  [v_bot_cov_hard_20, "hard", 20], 
  [v_hard_25, "hard", 25], 
  [v_top_bot_rim_hard_40, "hard", 40]]

  const TODO_SZ = "1/32"
  const TODO_NUM = "1432"

  function element(img, difficulty, hours){
    return <div className="browse-el-holder">
      <img className="browse_img" src={img} alt={""}/>
      <div className="browse_el_info">
        <p className="browse-el-text">difficulty: {difficulty}</p>
        <p className="browse-el-text">time needed: {hours}</p>
        <p className="browse-el-text">piece size: {TODO_SZ}</p>
        <p className="browse-el-text">number of pieces: {TODO_NUM}</p>
      </div>
      <img className="browse_diag" src={placeholder} alt={""}/>
    </div>
  }


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
      {baskets.map((entry, i) => (
        element(entry[0], entry[1], entry[2])
      ))}
      <div id="swan" className="holderTop">
        <p className="create-text">— swan —</p>
      </div>
      <div style={{height: 160}}>
      <HashLink style={{color: "#D14240"}} to="/browse#top">
        <img src={straw} alt={""} className ="tabS"/>
        <p className="browse-tab" style={{width: 150, marginLeft: "calc(50% - 90px)"}}>• scroll to top •</p>
      </HashLink>
      </div>
    </div>
  );
};

export default Browse;