import React from 'react';
import straw from "../assets/strawberry-slider-big.png"
import {Heading, Paragraph, Bullet} from "../components/Static"

const Landing = () => {
  return (
    <div className="landing-container">
      <img className = "bg-straw" src={straw} alt={""}/>
      <img className = "bg-straw-bottom" src={straw} alt={""}/>
      <Heading text={"3d-origami"} left={true} right_align={false}/>
      <Paragraph bottom={false} left={true} text={"3d origami is the art of assembling hundreds to thousands of triangular paper units into intricate structures. Computational as it is artistic, 3d-origami design can involve much calculation and planning. Both an intellectual challenge and an artistic challenge; an exercise for the mind as well as the hands: 3d-origami is an engaging and accessible art form enjoyable for all age groups."} />
      <Heading text={"3d-o"} left={false} right_align={false}/>
      <Paragraph bottom={false} left={true} text={"3d-o is a web application that generates comprehensive and easy-to-follow 3d-origami diagrams. Initially developed to combat rising COVID19 case counts amidst the 2020 global pandemic, 3d-o automates 3d-origami design and promotes social distancing by engaging users in a fun, indoor activity. 3d-o is also the first of its kind — a pioneer in the space of 3d-origami, and art, automation."}/>
      <Heading text={"the founder"} left={true} right_align={false}/>
      <Paragraph bottom={false} left={true} text={"About me: My name is Lina Nguyen and I am a senior engineering student at the University of British Columbia in Vancouver, Canada. Passionate about using software to solve real-world problems, I started developing 3d-o in December 2020 in response to my province's rising COVID19 case counts. 3d-o is really special to me: It is both based on my lifelong hobby and my most technical and challenging personal project to date. Now August 2021, I am proud to finally launch 3d-o."}/>
      <Heading text={"why 3d-origami"} left={false} right_align={true}/>
      <Paragraph bottom={true} left={false} text={"3d-origami projects can take months to complete. From cutting the paper, to folding the triangular units, to assembling them into the final structure, 3d-origami projects are a time investment. However, they are also highly rewarding:"}/>
      <Bullet bottom={false} left={false} boldtext={"3d-origami projects make the perfect gifts"} text={"With the amount of time invested into 3d-origami projects, 3d-origmai works make highly thoughtful, impressive, and personalized gifts — perfect for teachers, coaches, and the like."}/>
      <Bullet bottom={false} left={false} boldtext={"3d-origami can improve your analytical skills"} text={"The careful and computational nature of 3d-origami work can translate to increased ability in other analytical areas, like math and science. 3d-origami work builds focus, self-discipline, and patience."}/>
      <Bullet bottom={false} left={false} boldtext={"3d-origami can improve brain function"} text={"The intricate and meticulous handwork that 3d-origami requires builds fine motor skills, improves memory, and challenges the brain."}/>
      <Bullet bottom={true} left={false} boldtext={"3d-origami can decrease stress and anxiety"} text={"Art, especially detail-oriented art involving high levels of concentration, can increase the brain's release of dopamine which can in turn decrease stress and anxiety. Doing art can also improve self-esteem."}/>
      <Heading text={"why 3d-o"} left={true} right_align={true}/>
      <Paragraph bottom={true} left={false} text={"3d-o saves time: Without automated 3d-origrami diagrams, artists have to manually create 3d-origami diagrams, a process that requires much and menial trial and error. A mistake or mistep in 3d-origami, analogous to a bug in a computer program, can cost tens of hours and resources to rectify. A 3d-o diagram provides not only a clear map of how each piece should fit together, but also a count of all the pieces needed and in which colors. With this information, users can know beforehand exactly how much paper to use and approximately how much time the project will take. 3d-o entirely abstracts away the computational details of the 3d-origami design process, allowing users to focus solely on the art."}/>
      <div style={{height: 30}}/>
    </div>
  );
};

export default Landing;