import React from "react";
import straw from "../assets/strawberry-slider-big.png";
import "./create.css";
import { HashLink } from "react-router-hash-link";
import { FiDownload } from "react-icons/fi";
import b_hnd_med_12 from "../assets/browse/basket_hndl_med_12h.jpg";
import f_bear_med_7 from "../assets/browse/fig_bear_med_7h.jpg";
import f_bun_ez_8 from "../assets/browse/fig_bun_ez_8h.jpg";
import f_cat_ez_8 from "../assets/browse/fig_cat_ez_8h.jpg";
import s_ez_1w_3 from "../assets/browse/swan_ez_1w_3h.jpg";
import s_ez_2w_2 from "../assets/browse/swan_ez_2w_2h.jpg";
import s_ez_2w_4 from "../assets/browse/swan_ez_2w_4h.jpg";
import s_med_1w_4 from "../assets/browse/swan_med_1w_8h.jpg";
import v_bot_cov_hard_20 from "../assets/browse/vase_bot_cov_hard_20h.jpg";
import v_bot_cov_med_10 from "../assets/browse/vase_bot_cov_med_10h.jpg";

import basket_diag from "../assets/browse/basket.png"
import basket_diag2 from "../assets/browse/basket2.png"
import bunny_diag from "../assets/browse/bunny.png"
import bunny_diag2 from "../assets/browse/bunny2.png"
import kitty_diag from "../assets/browse/kitty.png"
import kitty_diag2 from "../assets/browse/kitty2.png"
import pooh_diag from "../assets/browse/pooh.png"
import pooh_diag2 from "../assets/browse/pooh2.png"
import swan_diag from "../assets/browse/swan.png"
import swan_diag2 from "../assets/browse/swan2.png"
import vase_diag from "../assets/browse/vase.png"
import vase_diag2 from "../assets/browse/vase2.png"
import blkswan_diag from "../assets/browse/blk_swan.png"
import blkswan_diag2 from "../assets/browse/blk_swan2.png"
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
    [s_ez_2w_2, "easy", 2, placeholder],
    [s_ez_1w_3, "easy", 3, blkswan_diag],
    [s_ez_2w_4, "easy", 4, placeholder],
    [s_med_1w_4, "medium", 4, swan_diag],
  ];

  const figs = [
    [f_bun_ez_8, "easy", 8, bunny_diag],
    [f_cat_ez_8, "easy", 8, kitty_diag],
    [f_bear_med_7, "medium", 7, pooh_diag],
  ];

  const baskets = [
    [b_hnd_med_12, "medium", 12, basket_diag],
  ];

  const vases = [
    [v_bot_cov_med_10, "medium", 10, vase_diag],
    [v_bot_cov_hard_20, "hard", 20, placeholder],
  ];

  // const len_swans = swans.length;
  const len_figs = figs.length;
  const len_baskets = baskets.length;
  const len_vases = vases.length;

  const TODO_SZ = "1/32";
  const TODO_NUM = "1432";

  function element(key, img, difficulty, hours, diag_img) {
    return (
      <div key={key} className="browse-el-holder">
        <div className="browse-straw-num">
          <div
            className="browse-straw-text"
            style={{ marginLeft: key + 1 >= 10 ? 25 : 35 }}
          >
            {key + 1}
          </div>
        </div>
        <img className="browse-img" src={img} alt={""} />
        <div className="browse-el-info">
          <div className="browse-info">
            <p className="browse-el-text">
              {" "}
              difficulty: <span>{difficulty}</span>
            </p>
            <p className="browse-el-text">
              {" "}
              estimated time: <span>{hours} h</span>
            </p>
            <p className="browse-el-text">
              {" "}
              piece size: <span>{TODO_SZ}</span>
            </p>
            <p className="browse-el-text">
              {" "}
              # of pieces: <span>{TODO_NUM}</span>
            </p>
          </div>
        </div>
        <img className="browse-diag" src={diag_img} alt={""} />
        <div
          className="browse-done-button"
          onClick={() => {
            console.log(basket_diag)
          }}
        >
          <p className="browse-download-label">
            <span>
              <FiDownload size={17} />
            </span>{" "}
            download 3d-o diagram{" "}
            <span>
              <FiDownload size={17} />
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="top">
      <div className="holderTop">
        <p className="create-text">🍓 ' . ` browse pre-made designs ` . ' 🍓</p>
      </div>
      <div
        style={{
          flexDirection: "row",
          height: "150px",
        }}
      >
        <div className="holder">
          <HashLink style={{ color: "#D14240" }} to="/browse#figurine">
            <img src={straw} alt={""} className="tabS-left" />
            <p className="browse-tab">• figurine •</p>
          </HashLink>
          <HashLink style={{ color: "#D14240" }} to="/browse#vase">
            <img src={straw} alt={""} className="tabS-right" />
            <p className="browse-tab">• vase •</p>
          </HashLink>
          <HashLink style={{ color: "#D14240" }} to="/browse#basket">
            <img src={straw} alt={""} className="tabS-left" />
            <p className="browse-tab">• basket •</p>
          </HashLink>
          <HashLink style={{ color: "#D14240" }} to="/browse#swan">
            <img src={straw} alt={""} className="tabS-right" />
            <p className="browse-tab">• swan •</p>
          </HashLink>
        </div>
      </div>
      <div id="figurine" className="holderTop">
        <p className="create-text">🍓 ' . ` figurine ` . ' 🍓</p>
      </div>
      {figs.map((entry, i) => element(i, entry[0], entry[1], entry[2], entry[3]))}
      <div id="vase" className="holderTop">
        <p className="create-text">🍓 ' . ` vase ` . ' 🍓</p>
      </div>
      {vases.map((entry, i) =>
        element(len_figs + i, entry[0], entry[1], entry[2], entry[3])
      )}
      <div id="basket" className="holderTop">
        <p className="create-text">🍓 ' . ` basket ` . ' 🍓</p>
      </div>
      {baskets.map((entry, i) =>
        element(len_figs + len_vases + i, entry[0], entry[1], entry[2], entry[3])
      )}
      <div id="swan" className="holderTop">
        <p className="create-text">🍓 ' . ` swan ` . ' 🍓</p>
      </div>
      {swans.map((entry, i) =>
        element(
          len_figs + len_vases + len_baskets + i,
          entry[0],
          entry[1],
          entry[2],
          entry[3]
        )
      )}
      <div style={{ height: 160 }}>
        <HashLink style={{ color: "#D14240" }} to="/browse#top">
          <img src={straw} alt={""} className="tabS" />
          <p
            className="browse-tab"
            style={{ width: 150, marginLeft: "calc(50% - 90px)" }}
          >
            • scroll to top •
          </p>
        </HashLink>
      </div>
    </div>
  );
};

export default Browse;
