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
          <NavLink to='/about' activeStyle = {{background: "#fff"}}>
            About
          </NavLink>
          <NavLink to='/learn' activeStyle = {{background: "#fff"}}>
            Learn
          </NavLink>
          <NavLink to='/create' activeStyle = {{background: "#fff"}}>
            Create
          </NavLink>
          <NavLink to='/browse' activeStyle = {{background: "#fff"}}>
            Browse
          </NavLink>
          <NavLink to='/gallery' activeStyle = {{background: "#fff"}}>
            Gallery
          </NavLink>
          <NavLink to='/contact' activeStyle = {{background: "#fff"}}>
            Contact
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
