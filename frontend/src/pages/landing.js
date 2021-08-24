import React from 'react';
import "./static.css"
import logo from "../assets/transparent.png"
import straw from "../assets/strawberry-slider-big.png"

function heading(text, left, right_align){
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

function paragraph(bottom, left, text){
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

function bulletpt(bottom, left, boldtext, text){
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

const Landing = () => {
  return (
    <div className="landing-container">
      <img className = "bg-straw" src={straw} alt={""}/>
      <img className = "bg-straw-bottom" src={straw} alt={""}/>
      {heading("3d-origami", true, false)}
      {paragraph(false, true, "3d origami is the art of assembling hundreds to thousands of triangular paper units into intricate structures. Computational as it is artistic, 3d-origami design can involve much calculation and planning. Both an intellectual challenge and an artistic challenge; an exercise for the mind as well as the hands: 3d-origami is an engaging and accessible art form enjoyable for all age groups.")}
      {heading("3d-o", false, false)}
      {paragraph(false, true, "3d-o is a web application that generates comprehensive and easy-to-follow 3d-origami diagrams. Initially developed to combat rising COVID19 case counts amidst the 2020 global pandemic, 3d-o automates 3d-origami design and promotes social distancing by engaging users in a fun, indoor activity. 3d-o is also the first of its kind — a pioneer in the space of 3d-origami, and art, automation.")}
      {heading("the founder", true, false)}
      {paragraph(false, true, "About me: My name is Lina Nguyen and I am a senior engineering student at the University of British Columbia in Vancouver, Canada. Passionate about using software to solve real-world problems, I started developing 3d-o in December 2020 in response to my province's rising COVID19 case counts. 3d-o is really special to me: It is both based on my lifelong hobby and my most technical and challenging personal project to date. Now August 2021, I am proud to finally launch 3d-o.")}
      {heading("why 3d-origami", false, true)}
      {paragraph(true, false, "3d-origami projects can take months to complete. From cutting the paper, to folding the triangular units, to assembling them into the final structure, 3d-origami projects are a time investment. However, they are also highly rewarding:")}
      {bulletpt(false, false, "3d-origami projects make the perfect gifts", "With the amount of time invested into 3d-origami projects, 3d-origmai works make highly thoughtful, impressive, and personalized gifts — perfect for teachers, coaches, and the like.")}
      {bulletpt(false, false, "3d-origami can improve your analytical skills", "The careful and computational nature of 3d-origami work can translate to increased ability in other analytical areas, like math and science. 3d-origami work builds focus, self-discipline, and patience.")}
      {bulletpt(false, false, "3d-origami can improve brain function", "The intricate and meticulous handwork that 3d-origami requires builds fine motor skills, improves memory, and challenges the brain.")}
      {bulletpt(true, false, "3d-origami can decrease stress and anxiety", "Art, especially detail-oriented art involving high levels of concentration, can increase the brain's release of dopamine which can in turn decrease stress and anxiety. Doing art can also improve self-esteem.")}
      {heading("why 3d-o", true, true)}
      {paragraph(true, false, "3d-o saves time: Without automated 3d-origrami diagrams, users have to manually create 3d-origami diagrams, a process that requires much and menial trial and error. A mistake or mistep in 3d-origami, analogous to a bug in a computer program, can cost tens of hours and resources to rectify. A 3d-o diagram provides not only a clear map of how each piece should fit together, but also a count of all the pieces needed and in which color. With this information, users can know beforehand exactly how much paper to use and approximately how much time the project will take. As such, 3d-o entirely abstracts away the computational details of the 3d-origami design process, allowing users to focus solely on the art.", true)}
      <div style={{height: 20}}/>
    </div>
  );
};

export default Landing;