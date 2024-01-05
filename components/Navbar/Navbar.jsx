"use client";
import { useState } from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  const [lang, setLang] = useState("sv"); // Initial language set to 'sv'

  const toggleLanguage = () => {
    setLang(lang === "sv" ? "en" : "sv");
  };

  const linkLabels = {
    syfte: lang === "sv" ? "Syfte" : "Purpose",
    omoss: lang === "sv" ? "Om oss" : "About Us",
    tjanster: lang === "sv" ? "Tjänster" : "Services",
    nyheter: lang === "sv" ? "Nyheter" : "News",
    verksamheter: lang === "sv" ? "Verksamheter" : "Operations",
    jobb: lang === "sv" ? "Jobb" : "Jobs",
    kontakt: lang === "sv" ? "Kontakt" : "Contact",
    eng: lang === "sv" ? "Eng" : "Swe",
  };

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
                  <Link href="#syfte">{linkLabels.syfte}</Link>
                  <Link href="#omoss">{linkLabels.omoss}</Link>
                  <Link href="#tjanster">{linkLabels.tjanster}</Link>
                  <Link href="#nyheter">{linkLabels.nyheter}</Link>
                  <Link href="#verksamheter">{linkLabels.verksamheter}</Link>
                  <Link href="#jobb">{linkLabels.jobb}</Link>
                </div>
                <div className="navbar-buttons">
                  <Link href="#kontakt">
                    <div className="navbar-kontakt">{linkLabels.kontakt}</div>
                  </Link>
                  <div className="navbar-eng" onClick={toggleLanguage}>
                    {linkLabels.eng}
                    <img src="/arrow-down.svg" alt="Language Toggle" />
                  </div>
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
