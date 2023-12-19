import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-nav">
            <div className="navbar-wrapper">
              <div className="navbar-logo">
                <img src="/logo.svg" alt="Logo" />{" "}
                {/* Update the src attribute */}
              </div>
              <div className="navbar-links">
                <div className="hamburger-wrapper">
                  <a href="#syfte">Syfte</a>
                  <a href="#omoss">Om oss</a>
                  <a href="#tjanster">Tjänster</a>
                  <a href="#nyheter">Nyheter</a>
                  <a href="#verksamheter">Verksamheter</a>
                  <a href="#jobb">Jobb</a>
                </div>
                <a className="navbar-kontakt" href="#kontakt">
                  Kontakt
                </a>
                <a className="navbar-eng" href="#eng">
                  Eng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
