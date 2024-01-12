"use client";
import "./OmOss.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const OmOss = (props) => {
  const lang = props.lang;

  useEffect(() => {
    runSectionTextAnimation(
      ".omoss-section-column h2",
      ".omoss-section-column p"
    );
  }, []);

  return (
    <div className="omoss-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="omoss-section-wrapper">
              {lang === "sv" ? (
                <div className="omoss-section-column">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="" />
                    <h6>OM OSS</h6>
                  </div>
                  <h2>ENKELT ATT ANVÄNDA, ENKELT ATT KÖPA</h2>
                  <div>
                    <p>Vi är totalleverantör till samhällsviktig verksamhet.</p>
                    <p>
                      Avancerad försvarsteknologi som skyddar det mest
                      skyddsvärda för samhällsviktig verksamhet och en helt ny
                      nivå av användarvänlighet gör våra lösningar enkla att
                      använda och enkla att köpa. Precis som det ska vara.
                    </p>
                    <p>Precis som det ska vara.</p>
                  </div>
                </div>
              ) : (
                <div className="omoss-section-column">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="" />
                    <h6>ABOUT US</h6>
                  </div>
                  <h2>EASY TO BUY. EASY TO USE.</h2>
                  <div>
                    <p>
                      We are a full-service provider for vital societal
                      functions.
                    </p>
                    <p>
                      Our advanced defense technology protects the most
                      sensitive of societal functions and provides an entirely
                      new level of user-friendliness, making our solutions both
                      easy-to-buy and easy-to-use.
                    </p>
                    <p>Exactly as it should be.</p>
                  </div>
                </div>
              )}
              <div className="omoss-section-column">
                <div className="omoss-section-column-content">
                  <div className="omoss-section-column-content-top">
                    <img src="/logowhite.svg" alt="Logo" />{" "}
                  </div>
                  <div className="omoss-section-column-content-middle">
                    <div className="vertical-black-line"></div>
                    <div className="vertical-black-line"></div>
                  </div>
                  <div className="omoss-section-column-content-bottom">
                    <div className="omoss-section-column-content-bottom-left">
                      <p></p>
                    </div>
                    <div className="omoss-section-column-content-bottom-right">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmOss;
