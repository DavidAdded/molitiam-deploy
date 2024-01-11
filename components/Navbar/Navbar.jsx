"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Navbar.css";

const Navbar = ({params}) => {
    
  let lang = params.locales;
  const router = useRouter();
 
  const toggleLanguage = () => {
    const newLang = lang === "sv" ? "en" : "sv";

    const pathSegments = window.location.pathname.split('/');
    pathSegments[2] = newLang;


    const newPath = pathSegments.join('/');


    router.push(newPath, undefined, { locale: newLang });
  };

  const linkLabels = {
    syfte: lang === "sv" ? "Syfte" : "Purpose",
    omoss: lang === "sv" ? "Om oss" : "About Us",
    tjanster: lang === "sv" ? "Tjänster" : "Services",
    nyheter: lang === "sv" ? "Nyheter" : "News",
    verksamheter: lang === "sv" ? "Verksamheter" : "Operations",
    jobb: lang === "sv" ? "Jobb" : "Jobs",
    kontakt: lang === "sv" ? "Kontakt" : "Contact",
    lang: lang === "sv" ? "Eng" : "Swe",
  };

  const anchorPoints = {
    syfte: lang === "sv" ? "syfte" : "purpose",
    omoss: lang === "sv" ? "omoss" : "aboutus",
    tjanster: lang === "sv" ? "tjanster" : "services",
    nyheter: lang === "sv" ? "nyheter" : "news",
    verksamheter: lang === "sv" ? "verksamheter" : "operations",
    jobb: lang === "sv" ? "jobb" : "jobs",
    kontakt: lang === "sv" ? "kontakt" : "contact",
  };


  const baseLink = `/pages/${lang}`;
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
                  <Link href={baseLink + "/#" + anchorPoints.syfte} >{linkLabels.syfte}</Link>
                  <Link href={baseLink + "/#" + anchorPoints.omoss} >{linkLabels.omoss}</Link>
                  <Link href={baseLink + "/#" + anchorPoints.tjanster} >{linkLabels.tjanster}</Link>
                  <Link href={baseLink + "/#" + anchorPoints.nyheter} >{linkLabels.nyheter}</Link>
                  <Link href={baseLink + "/#" + anchorPoints.verksamheter} >{linkLabels.verksamheter}</Link>
                  <Link href={baseLink + "/#" + anchorPoints.jobb} >{linkLabels.jobb}</Link>
                </div>
                <div className="navbar-buttons">
                  <Link href={baseLink + "/#" + anchorPoints.kontakt}>
                    <div className="navbar-kontakt">{linkLabels.kontakt}</div>
                  </Link>
                  <div className="navbar-eng" onClick={toggleLanguage}>
                    {linkLabels.lang}
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
