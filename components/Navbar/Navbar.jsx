import React from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-nav">
            <div className="navbar-wrapper">
              <div className="navbar-logo">
                <Link href="/">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              </div>
              <div className="navbar-links">
                <div className="hamburger-wrapper">
                  <Link href="#syfte">Syfte</Link>
                  <Link href="#omoss">Om oss</Link>
                  <Link href="#tjanster">Tjänster</Link>
                  <Link href="#nyheter">Nyheter</Link>
                  <Link href="#verksamheter">Verksamheter</Link>
                  <Link href="#jobb">Jobb</Link>
                </div>
                <div className="navbar-buttons">
                  <Link href="#kontakt">
                    <div className="navbar-kontakt">Kontakt</div>
                  </Link>
                  <Link href="#eng">
                    <div className="navbar-eng">
                      Eng<img src="/arrow-down.svg"></img>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
