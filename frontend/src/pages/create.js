import React, {useEffect} from 'react';
import vase from "../assets/vase.png"
import basket from "../assets/basket.png"
import swan from "../assets/swan.png"
import fig from "../assets/fig.PNG"
import straw from "../assets/strawberry-slider-big.png"
import {PlainLink} from '../components/Navbar/NavbarElements';
import "./create.css"
import {useStores} from "../models/RootStoreContext"


const Create = () => {

  useEffect(() => {
    coloringFormStore.setMsg(true, "error")
    coloringFormStore.clearColoringForm()
  }, [])

  const {coloringFormStore} = useStores()
  
  return (
    <div>
      <div className="holderTop">
        <img src={straw} alt={""} className ="leftS"/>
        <p className="create-text">select a model</p>
        <img src={straw} alt={""} className ="rightS"/>
      </div>
      <div 
        style={{
          flexDirection: 'row',
          height: 'auto'
        }}
      >
        <div className = "holder">
          <PlainLink to="/create-figurine">
            <img alt={""} src={fig} className="create-link"/>
            <p className="create-text">• figurine •</p>
          </PlainLink>
          <PlainLink to="/create-vase">
            <img alt={""} src={vase} className="create-link"/>
            <p className="create-text">• vase •</p>
          </PlainLink>
          <PlainLink to="/create-basket">
            <img alt={""} src={basket} className="create-link"/>
            <p className="create-text">• basket •</p>
          </PlainLink>
          <PlainLink to="/create-swan">
            <img alt={""} src={swan} className="create-link"/>
            <p className="create-text">• swan •</p>
          </PlainLink>
        </div>
      </div>
    </div>
  );
};

export default Create;