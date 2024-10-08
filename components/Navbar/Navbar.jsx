"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Navbar.css";

const Navbar = (props) => {
  const [langState, setLangState] = useState("sv");
  const router = useRouter();

  useEffect(() => {
    const lang = window.location.pathname.split("/")[1];
    setLangState(lang === "en" ? "en" : "sv");
  }, []);

  const toggleMappings = {
    "/en/news": "/nyheter",
    "/nyheter": "/en/news",
    "/": "/en",
    "/en": "/",
  };

  const toggleLanguage = () => {
    const pathname = window.location.pathname;

    const newLang = langState === "sv" ? "en" : "sv";
    setLangState(newLang);

    // Check if the current path is an article page
    const englishNewsArticleRegex = /^\/en\/news\/[a-zA-Z0-9-]+$/;
    const swedishNewsArticleRegex = /^\/nyheter\/[a-zA-Z0-9-]+$/;

    if (
      englishNewsArticleRegex.test(pathname) ||
      swedishNewsArticleRegex.test(pathname)
    ) {
      // Redirect to the main news page in the other language
      const redirectPath = newLang === "en" ? "/en/news" : "/nyheter";
      router.push(redirectPath);
      return;
    }

    // Fallback to the existing toggle mappings for non-article pages
    const newPath = toggleMappings[pathname] || pathname;
    router.push(newPath);
  };

  const [linkLabels, setLinkLabels] = useState({});
  const [anchorPoints, setAnchorPoints] = useState({});

  useEffect(() => {
    setLinkLabels({
      syfte: langState === "sv" ? "Syfte" : "Purpose",
      omoss: langState === "sv" ? "Om oss" : "About Us",
      nyheter: langState === "sv" ? "Nyheter" : "News",
      crgroup: langState === "sv" ? "CR Group" : "Operations",
      lang: langState === "sv" ? "Eng" : "Swe",
    });

    setAnchorPoints({
      syfte: langState === "sv" ? "syfte" : "purpose",
      omoss: langState === "sv" ? "omoss" : "aboutus",
      nyheter: langState === "sv" ? "nyheter" : "news",
      crgroup: langState === "sv" ? "cr-group" : "operations",
    });
  }, [langState]);

  const baseLink = langState === "sv" ? "/" : "/en";

  return (
    <nav className="navbar">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-nav">
            <div className="navbar-wrapper">
              <div className="navbar-logo">
                <Link href={baseLink}>
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ cursor: "pointer", height: "60px" }}
                  />
                </Link>
              </div>
              <div className="navbar-links">
                <div className="hamburger-wrapper">
                  <Link href={baseLink + "/#" + anchorPoints.syfte}>
                    {linkLabels.syfte}
                  </Link>
                  <Link href={baseLink + "/#" + anchorPoints.omoss}>
                    {linkLabels.omoss}
                  </Link>
                  <Link href={baseLink + "/#" + anchorPoints.nyheter}>
                    {linkLabels.nyheter}
                  </Link>
                  <Link href={baseLink + "/#" + anchorPoints.crgroup}>
                    {linkLabels.crgroup}
                  </Link>
                </div>
                <div className="navbar-buttons">
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
