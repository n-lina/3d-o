import React from "react";
import models from "../assets/models.jpg";
import sliders from "../assets/sliders.PNG";
import coloring from "../assets/coloring.PNG";
import downloadbutton from "../assets/downloadbutton.PNG";
import {
  Heading,
  Paragraph,
  Bullet,
  NumberBullet,
  SideBySide,
} from "../components/Static";

const Learn = () => {
  return (
    <div className="landing-container">
      <Heading text={"learn 3d-origami"} left={false} right_align={false} />
      <NumberBullet num={false} left={false} text={"the unit piece"} />
      <Paragraph
        bottom={true}
        left={false}
        text={"3d-origami begins with the unit piece."}
      />
      <NumberBullet left={true} num={false} text="sizing" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-origami pieces usually come in two different sizes: 1/32 and 1/16. These fractions indicate how many pieces can be cut from an 8.5 x 11 inch piece of US letter paper (A4 paper works too!). If you are using a different size of paper, cut the larger paper into 8.5 x 11 inch pieces before starting. "
        }
      />
      <NumberBullet left={false} num={false} text="paper" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Because not all colors come in standard letter paper or A4 sizes, sometimes other types of paper need to be used. Cardstock, poster board, or other thicker papers can be used as well, but I recommend making pieces the length when using these papers. In other words, skip the first step of folding your piece in half when folding and start directly at Step 3 in the diagram above! "
        }
      />
      <NumberBullet left={true} num={false} text="inversion" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "Inversion is when the inside of the 3d-origami piece is facing outwards instead of inwards. Inversion is commonly used when building vases, baskets, and one-winged swans. Inverted pieces can be used to add interest and detailing to a project or to make the project more structurally sound. As a rule of thumb, 3d-o recommends using inverted pieces when your vase or basket is decreasing in circumference starting from the bottom. This is reflected in 3d-o's diagrams!"
        }
      />
      <NumberBullet left={false} num={false} text="increasing" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Increasing is the technique of adding more pieces to a row to increase the circumference. In increasing, 2 pieces in one row become 3 pieces in the next row. This is achieved by putting two unit pieces where you would normally put one. Pretend there is an invisible piece between the two pieces involved in the increasing. Optionally, you can also add a small piece between the two pieces in place of the invisible piece! "
        }
      />
      <NumberBullet left={true} num={false} text="decreasing" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "Decreasing is the technique of removing pieces from a row to decrease the circumference. Decreasing slowly and properly makes structures stronger as curved surfaces are stronger than straight ones. In decreasing, 3 pieces become 2 pieces in the next row. This is achieved by putting two pieces where you would normally put three. In decreasing, two ''spikes'' go into one pocket."
        }
      />
      <NumberBullet left={false} num={false} text="filling " />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "When a particular colour of paper is hard to find, filling can be really useful. Filling is the technique of using scrap paper to ''fill'' your unit piece. Filling can be used when your paper is ripped or when you want to save paper by cutting pieces much smaller than usual.Filling gives your piece the same strength as a normal, perfect piece, and uses less of your precious coloured paper. Filling can be cut from any scrap paper, such as old newspaper or magazines. Also, make the filling length a bit smaller than half of your piece length so it stays hidden!"
        }
      />
      <NumberBullet left={true} num={false} text="shaping" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "While 3d-o diagrams will give you your desired shape, you can mold your structure to perfection and guide its progress with your hands and fingers as you build as well. "
        }
      />
      <div className="bottom-padding" />
    </div>
  );
};

export default Learn;
