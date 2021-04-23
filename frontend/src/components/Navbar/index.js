import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink, 
  PlainLink
} from './NavbarElements';
import logo from "../../assets/complex-logo.png"

const Navbar = () => {
  return (
    <>
      <Nav>
        <PlainLink to='/'><img style={{height: 60, margin: 20, float: 'left'}}src={logo} alt='logo' /></PlainLink>
        <PlainLink to='/'>
          <p style ={{letterSpacing: 3, marginRight: 100, color:"white", float: 'left'}}>3d-o</p>
        </PlainLink>
        {/* <Bars /> */}
        <NavMenu>
          <NavLink to='/about'>
            <p style ={{letterSpacing: 2}}>about</p>
          </NavLink>
          <NavLink to='/learn' >
            <p style ={{letterSpacing: 2}}>learn</p>
          </NavLink>
          <NavLink to='/create'>
            <p style ={{letterSpacing: 2}}>create</p>
          </NavLink>
          <NavLink to='/browse'>
            <p style ={{letterSpacing: 2}}>browse</p>
          </NavLink>
          <NavLink to='/gallery'>
            <p style ={{letterSpacing: 2}}>gallery</p>
          </NavLink>
          <NavLink to='/contact'>
            <p style ={{letterSpacing: 2}}>contact</p>
          </NavLink>
          <NavLink to='/login'>
            <p style ={{letterSpacing: 2}}>login</p>
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/* <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
};

export default Navbar;
