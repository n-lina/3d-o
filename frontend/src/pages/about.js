import React from 'react';
import bg_diag from "../assets/bg-diag.png"
import bg_diag2 from "../assets/bg-diag2.png"
import {Heading, Paragraph, Bullet, NumberBullet} from "../components/Static"

const About = () => {
  return (
    <div className="landing-container">
      {/* <img className = "diag" src={bg_diag} alt={""}/>
      <img className = "diag-bottom" src={bg_diag2} alt={""}/> */}
      <Heading text={"how to use 3d-o"} left={false} right_align={false}/>
      <NumberBullet num={1} left={true} text={"select a model"}/>
      <Paragraph bottom={true} left={true} text={"Head to the 'create' tab to select a model. 3d-o supports four different 3d-origami models: "}/>
      <Bullet bottom={false} left={true} boldtext={"Vase"} text={"Vases are typically more intermediate or advanced 3d-origrami projects. Vases requires the most pieces, the most time, and the most skill of the four models. The curvier your vase model is, the more difficult it will be to create."}/>
      <Bullet bottom={false} left={true} boldtext={"Basket"} text={"Baskets are similar to vases, but easier. They are easy to intermediate in difficulty and skill level. This model can be used to create beautiful jewelry boxes and fruit baskets."}/>
      <Bullet bottom={false} left={true} boldtext={"Figurine"} text={"This model is composed of two parts glued together: the head and the body. Figurines are easy to make. This model can be used to create your favourite charactors, like Hello Kitty or Winnie the Pooh!"}/>
      <Bullet bottom={false} left={true} boldtext={"Swan"} text={"Swans are very easy to make and their elegance makes them perfect, quick, and beautiful gifts. Swans require the least skill of the four models."}/>
      <NumberBullet left={false} num={2} text="customize your model" />
      <Paragraph bottom={true} left={false} text={"Use the sliders to customize your model. For vases and baskets, curved models are stronger than straight models. For best results, make your model reasonably sized and not too curvy! Press 'done' to generate your 3d-origami diagram."}/>
      <NumberBullet left={true} num={3} text="color your diagram" />
      <div style={{height: 15}}/>
      <Bullet bottom={false} left={true} boldtext={"Primary Color"} text={"Select your primary color using the color selector on the right."}/>
      <Bullet bottom={false} left={true} boldtext={"Color Selection"} text={"Populate the left color selector with the colors you intend to use for your project so you can access them easily."}/>
      <Bullet bottom={false} left={true} boldtext={"Coloring"} text={"After choosing your colors, you are ready to color your diagram. Use 'spray paint' mode to color in large sections and 'paint by pixel' mode to color in fine details."}/>
      <Bullet bottom={false} left={true} boldtext={"Save Draft"} text={"At any time, press the 3d-o logo in the center of the toolbar to save your current diagram. This button allows you to save different drafts of your diagram and to try out different colors and patterns."}/>
      <Bullet bottom={false} left={true} boldtext={"Results"} text={"Once you are happy with your diagram, press the 'next' arrow to see the final result."}/>
      <NumberBullet left={false} num={4} text="save your 3d-o diagram" />
      <Paragraph bottom={true} left={false} text="Download your diagram using the button on the right."/>
      <NumberBullet left={true} num={5} text="start folding!"/>
      <div style={{height: 30}}/>
    </div>
  );
};

export default About;
