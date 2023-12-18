import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">!CR</div>
      <div className="nav-links">
        <a href="#syfte">Syfte</a>
        <a href="#omoss">Om oss</a>
        <a href="#tjanster">Tjänster</a>
        <a href="#nyheter">Nyheter</a>
        <a href="#verksamheter">Verksamheter</a>
        <a href="#jobb">Jobb</a>
        <a className="nav-link-kontakt" href="#kontakt">Kontakt</a> 
        <a href="#eng">Eng</a>
      </div>
    </div>
  );
};

export default Navbar;


