import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #D14240;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  border-radius: 30px 30px 30px 30px;

  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  // height: 70%;
  cursor: pointer;
  border-radius: 30px;
  margin: 5px;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: #FFD8DF;
    color: red;
    // height: 100%;
  }

  &.active {
    color: red;
    background: #FFD8DF;
    // height: 100%;
    border-radius: 40px;
  }
`;

export const PlainLink = styled(Link)`
  text-decoration:none;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  
  // margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 80vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 30px;
  background: #256ce1;
  // padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 80px;
  height: 50px;


  /* Second Nav */
  // margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #D14240;
  }
`;
