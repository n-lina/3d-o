  
import React from 'react';
import "./static.css"
import logo from "../../assets/transparent.png"
import straw from "../../assets/strawberry-slider-big.png"

const Heading = (props) => {
  const {text, left, right_align} = props;
  const width = Math.min(Math.max(300, Math.round(text.length) * 40), 600)
  let logo_left = 0
  let logo_right = "auto"
  let underline_left = 8
  let underline_right = "auto"
  let text_left = 100
  let text_right = "auto"
  let text_align = "left"
  if (right_align){
    logo_right = 0
    logo_left = "auto"
    underline_right = 8
    underline_left = "auto"
    text_left = "auto"
    text_right = 100
    text_align = "right"
  }
  return <div className="heading" style={{textAlign: text_align}}>
    <img className= {left? "heading-left":"heading-right"} src={logo} alt={""} style={{left: logo_left, right: logo_right}}/>
    <div className="heading-underline" style={{width: width, left: underline_left, right: underline_right}}></div>
    <div className="heading-text-holder"><p style={{marginLeft: text_left, marginRight: text_right}}>{text}</p></div>
  </div>
}

const Paragraph = (props) => {
    const {bottom, left, text} = props;
    let margin_left = 70
    let margin_right = 30
    let bottom_margin = 40
    if (!left){
        margin_right = 70
        margin_left = 30
    }
    if (bottom){
        bottom_margin = 0
    }
    return <div className="paragraph" style={{textAlign: left? "left": "right", marginLeft: margin_left, marginRight: margin_right, marginBottom: bottom_margin}}>
        <p>{text}</p>
    </div>
      
}

const Bullet = (props) => {
    const {bottom, left, boldtext, text} = props;
    let margin_left = 70
    let margin_right = 30
    let bottom_margin = 10
    if (!left){
        margin_right = 70
        margin_left = 30
    }
    if (bottom){
        bottom_margin = 40
    }
    return <div className="bullet">
        {boldtext && <p className="paragraph" style={{display: "inline-block", width: "80%", marginTop: 15, marginLeft: margin_left, marginRight: margin_right, marginBottom: bottom_margin}}>🍓 <span style={{fontWeight: 'bold'}}>{boldtext}:</span> {text}</p>}
    </div>
}

export {
    Heading,
    Paragraph, 
    Bullet
}