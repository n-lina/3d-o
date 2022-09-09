import React from "react";
import unit_pic from "../assets/unit.png";
import sizing_pic from "../assets/sizing.png";
import inverted_pic from "../assets/inverted.png";
import inverted_real_pic from "../assets/inverted_real.jpg";
import inverted_real_front_pic from "../assets/inverted_real_front.PNG";
import increasing_pic from "../assets/increasing.png";
import filling_pic from "../assets/filling.png";
import decreasing_pic from "../assets/decreasing.png";
import pc_pic from "../assets/pc_real.jpg";
import stacking_pic from "../assets/stacking.png"
import base_pic from "../assets/base.png"
import base_real_pic from "../assets/base_real.jpg"
import diag_pic from "../assets/3do-diagram.png"
import appendages_pic from "../assets/appendages.png"
import overview_pic from "../assets/top.png"
import rows_pic from "../assets/body.PNG"
import increasing_diag_pic from "../assets/increasing_diag.png"
import decreasing_diag_pic from "../assets/decreasing_diag.png"
import ring_pic from "../assets/ring_pic.jpg"

import {
  Heading,
  Paragraph,
  NumberBullet,
  SideBySide,
  CaptionPicture,
} from "../components/Static";

const Learn = () => {
  return (
    <div className="landing-container">
      <Heading text={"learn 3d-origami"} left={true} right_align={false} />
      <NumberBullet num={false} left={false} text={"the unit piece"} />
      <Paragraph
        bottom={true}
        left={false}
        text={"3d-origami begins with the unit piece. The 3d-origami unit piece is triangular with two pockets. Pieces stack on top of each other using these pockets."}
      />
      <CaptionPicture pic={unit_pic} caption={"How to fold the 3d-origami unit piece."} fig_num={1} />
      <CaptionPicture pic={pc_pic} img_height={300} img_width={400} caption={"This is what your pieces should look like. Each piece has two pockets, formed by the two legs."} fig_num={2} />
      <NumberBullet left={true} num={false} text="sizing" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-origami pieces usually come in two different sizes: 1/32 and 1/16. 32 1/32-sized pieces can be cut from one 8.5 x 11 inch piece of paper while 16 1/16-sized pieces can be cut. Accordingly, 1/16-sized pieces are twice the size of 1/32-sized pieces. When using larger papers, cut the larger paper into 8.5 x 11 inch pieces before starting. 1/32-sized pieces are the default size; They are used in small, medium, and detailed works. 1/16-sized pieces are used for large or undetailed works."
        }
      />
      <CaptionPicture pic={sizing_pic} caption={"1/32 pieces are smaller than 1/16 pieces and are used for small-to-medium-sized and detailed 3d-origami works."} fig_num={3} />
      <NumberBullet left={false} num={false} text="paper" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Usually, regular copy paper (75gsm) is used. Cardstock, poster, and other thicker papers can also be used when copy paper is not available. When using such papers, cut the pieces to be half the length as usual. In other words, skip the first step of folding your piece in half when folding and start directly at Step 3 in Figure 1! "
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
      <CaptionPicture pic={inverted_pic} caption={"Inverted pieces have the inside facing outwards instead of inwards."} fig_num={4} />
      <SideBySide
        left={
          <img
            style={{
              height: 350,
              width: 350,
              borderRadius: 20,
            }}
            src={inverted_real_front_pic}
            alt={""}
          />
        }
        right={
          <img
            style={{
              height: 350,
              width: 350,
              marginLeft: 100,
              borderRadius: 20,
            }}
            src={inverted_real_pic}
            alt={""}
          />
        }
      />
      <CaptionPicture pic={false} caption={"On the left, the swan's chest and bottom are made with non-inverted pieces. On the right, the swan's wing is built with inverted pieces. Notice the difference in outward appearance!"} fig_num={5} />
      <NumberBullet left={false} num={false} text="putting pieces together" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Pieces stack atop of each other in a brick-wall-like pattern. The legs of the units in one row fit neatly into the pockets of the pieces in the next."}
      />
      <CaptionPicture pic={stacking_pic} caption={"3d-origami pieces fit together like bricks in a brick wall. "} fig_num={6} />
      <NumberBullet left={true} num={false} text="building the base" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-origami projects begin with a circular base of two rows upon which rows are added."}
      />
      <CaptionPicture pic={base_pic} caption={"How to build the base. The structure will become stronger as more rows are added."} fig_num={7} />
      <CaptionPicture pic={base_real_pic} img_height={300} img_width={500} caption={"This is what your base should look like. The base on the left has six pieces while the one on the right has twenty-one. In the bases shown above, the pieces are non-inverted."} fig_num={8} />
      <NumberBullet left={false} num={false} text="increasing" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Increasing is the technique of adding more pieces to a row to increase the circumference. In increasing, two pieces in one row become three pieces in the next row. This is achieved by putting two unit pieces where you would normally put one. Pretend there is an invisible piece between the two pieces involved in the increasing. Optionally, you can also add a small piece between the two pieces in place of the invisible piece! "
        }
      />
      <CaptionPicture pic={increasing_pic} caption={"Increasing is stacking three pieces in place of two. Increasing is used to increase the piece count and thus the circumference of later rows."} fig_num={9} />
      <NumberBullet left={true} num={false} text="decreasing" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "Decreasing is the technique of removing pieces from a row to decrease the circumference. Decreasing slowly and properly makes structures stronger as curved surfaces are stronger than straight ones. In decreasing, three pieces become two pieces in the next row. This is achieved by putting two pieces where there would normally be three. In decreasing, two legs go into one pocket."
        }
      />
      <CaptionPicture pic={decreasing_pic} caption={"Decreasing is stacking two pieces in place of three. Decreasing is used to decrease the piece count and thus the circumference of later rows."} fig_num={10} />
      <NumberBullet left={false} num={false} text="filling" />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Filling is the technique of using scrap paper to ''fill'' your unit piece. Filling can be used when your paper is ripped or when you want to save paper by cutting pieces smaller than usual. When a particular colour of paper is hard to find, filling is a solution. Filling strengthens your pieces and conserves paper. Filling can be cut from any scrap paper, such as old newspaper or magazines. Also, make the filling a bit smaller so it stays neatly hidden!"
        }
      />
      <CaptionPicture pic={filling_pic} caption={"''Filling'' strenghtens pieces and conserves paper."} fig_num={11} />
      <NumberBullet left={true} num={false} text="shaping" />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "While 3d-o diagrams will give you your desired shape, you can mold your structure to perfection and guide its progress with your hands and fingers as you build as well. "
        }
      />
      <Heading text={"reading 3d-o diagrams"} left={false} right_align={true} />
      <NumberBullet num={false} left={true} text={"overview"} />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-o diagrams contain all the information you need to build your 3d-origami project. At the top of the diagram, there is a count of how many pieces you will need, and in which colors. The recommended piece size is also specified here."}
      />
      <CaptionPicture pic={overview_pic} img_width={900} caption={"In this diagram, for example, 80 red, 1/32-sized pieces are needed, requiring 3 pieces of 8.5 x 11'' red paper."} fig_num={12} />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-o diagrams also display row and piece numbers. The row number is shown immediately before and after the row, while piece numbers are shown at the top and bottoms of the sections. It is unimportant which piece in the row is designated number '1.' However, from the beginning, designate and mark one piece and stick with it."} />
      <CaptionPicture pic={rows_pic} img_width={900} caption={"Row and piece numbers."} fig_num={13} />
      <NumberBullet num={false} left={false} text={"inverted pieces"} />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Inverted pieces are marked with a '⁠—'. In Figure 2., the wing of the swan consists of inverted pieces while the body consists of non-inverted pieces."}
      />
      <CaptionPicture pic={diag_pic} img_width={900} caption={"One-wing swans require both non-inverted and inverted pieces. The inverted pieces are marked."} fig_num={14} />
      <NumberBullet num={false} left={true} text={"increasing + decreasing"} />
      <Paragraph
        bottom={true}
        left={true}
        text={
          "3d-origami diagrams are read from bottom to top. Moving from a narrower section up to a wider section requires increasing. Moving from wide to narrow requires decreasing."} />
      <CaptionPicture pic={increasing_diag_pic} img_width={1000} caption={"Increasing: "} fig_num={15} />
      <CaptionPicture pic={decreasing_diag_pic} img_width={1000} caption={"Decreasing: "} fig_num={16} />
      <NumberBullet num={false} left={false} text={"appendages"} />
      <Paragraph
        bottom={true}
        left={false}
        text={
          "Depending on what parameters you select while designing your project, there may be additional diagrams for appendages. These appendage pieces are to be built seperate from the main body and glued on afterwards. Appendages include animal ears, lids, bottoms, wings, handles, and more.  "} />
      <CaptionPicture pic={appendages_pic} img_width={1000} caption={"Appendages for a basket project, to be built sepearetly and attached afterwards."} fig_num={17} />
      <CaptionPicture pic={ring_pic} img_width={500} caption={"The top and bottom rims shown in Figure 17 should look like this when completed."} fig_num={18} />
      <div className="bottom-padding" />
    </div>
  );
};

export default Learn;
