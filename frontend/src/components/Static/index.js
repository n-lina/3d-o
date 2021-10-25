import React from "react";
import "./static.css";
import logo from "../../assets/transparent.png";

const Heading = (props) => {
  const { text, left, right_align } = props;
  let width = Math.max(300, Math.round(text.length) * 40);
  if (width >= 1000) {
    width = "100%";
  }
  let logo_left = 0;
  let logo_right = "auto";
  let underline_left = 8;
  let underline_right = "auto";
  let text_left = 100;
  let text_right = "auto";
  let text_align = "left";
  if (right_align) {
    logo_right = 0;
    logo_left = "auto";
    underline_right = 8;
    underline_left = "auto";
    text_left = "auto";
    text_right = 100;
    text_align = "right";
  }
  return (
    <div className="heading" style={{ textAlign: text_align }}>
      <img
        className={left ? "heading-left" : "heading-right"}
        src={logo}
        alt={""}
        style={{ left: logo_left, right: logo_right }}
      />
      <div
        className="heading-underline"
        style={{ width: width, left: underline_left, right: underline_right }}
      ></div>
      <div className="heading-text-holder">
        <p style={{ marginLeft: text_left, marginRight: text_right }}>{text}</p>
      </div>
    </div>
  );
};

const Paragraph = (props) => {
  const { bottom, left, text } = props;
  let margin_left = 70;
  let margin_right = 30;
  let bottom_margin = 40;
  if (!left) {
    margin_right = 30;
    margin_left = 30;
  }
  if (bottom) {
    bottom_margin = 0;
  }
  return (
    <div
      className="paragraph"
      style={{
        textAlign: left ? "left" : "right",
        marginLeft: margin_left,
        marginRight: margin_right,
        marginBottom: bottom_margin,
      }}
    >
      <p>{text}</p>
    </div>
  );
};

const Bullet = (props) => {
  const { bottom, left, boldtext, text } = props;
  let margin_left = 70;
  let margin_right = 30;
  let bottom_margin = 10;
  let text_align = "left";
  if (!left) {
    margin_right = 30;
    margin_left = 30;
    text_align = "right";
  }
  if (bottom) {
    bottom_margin = 20;
  }
  return (
    <div className="bullet" style={{ textAlign: text_align }}>
      {boldtext && (
        <p
          className="paragraph"
          style={{
            display: "inline-block",
            width: left ? "auto" : "80%",
            marginTop: 15,
            marginLeft: margin_left,
            marginRight: margin_right,
            marginBottom: bottom_margin,
          }}
        >
          🍓 <span style={{ fontWeight: "bold" }}>{boldtext}:</span> {text}
        </p>
      )}
    </div>
  );
};

const NumberBullet = (props) => {
  const { num, left, text } = props;
  let width = Math.max(200, Math.round(text.length) * 30);
  console.log(width);
  let text_align = "left";
  if (!left) {
    text_align = "right";
  }
  let margin_left = 70;
  let margin_right = 30;
  let underline_left = 30;
  let underline_right = "auto";
  if (!left) {
    margin_right = 70;
    margin_left = 30;
    underline_right = 30;
    underline_left = "auto";
  }
  return (
    <div className="num-bullet" style={{ textAlign: text_align }}>
      <p
        className="num-heading-text"
        style={{
          display: "inline-block",
          marginTop: 30,
          marginBottom: 0,
          marginLeft: margin_left,
          marginRight: margin_right,
        }}
      >
        {num}. {text}
      </p>
      <div
        className="num-bullet-bg"
        style={{
          width: width,
          left: underline_left,
          right: underline_right,
        }}
      ></div>
    </div>
  );
};

const SideBySide = (props) => {
  const { left, right } = props;

  return (
    <div className="sidebyside">
      {left}
      {right}
    </div>
  );
};

export { Heading, Paragraph, Bullet, NumberBullet, SideBySide };
