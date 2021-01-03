import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../assets/logo.svg')} alt='logo' />
        </NavLink>
        <Bars />
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
