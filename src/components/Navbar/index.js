import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  HomeIcon
} from './NavbarElements';
import './Navbar.css';
  
const Navbar = ({handleLogout}) => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
        <HomeIcon to='/Home' >
            ClAud-io
          </HomeIcon>
          <NavLink to='/compositions' >
            Compositions
          </NavLink>
          <NavLink to='/discover' >
          Discover
          </NavLink>
          <NavLink to='/sequence' >
          Sequence
          </NavLink>
        </NavMenu>
        <NavBtn>
        <button id = "logoutButton" onClick = {handleLogout}>Logout</button>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;