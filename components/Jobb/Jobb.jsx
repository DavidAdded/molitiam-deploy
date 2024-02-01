"use client";
import "./Jobb.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const Jobb = (props) => {
  const lang = props.lang;
  const moreJobsText =
    lang === "sv" ? "se lediga tjänster" : "See our openings";

  useEffect(() => {
    runSectionTextAnimation(
      ".jobb-content-wrapper h1",
      ".jobb-content-wrapper p"
    );
    runSectionTextAnimation(
      ".verksamheter-content-wrapper-top h2",
      ".verksamheter-content-wrapper-top p"
    );
  }, []);

  const handleClick = () => {
    window.open("https://cresiliens.teamtailor.com/", "_blank");
  };
  return (
    <div className="jobb-section-wrapper">
      <div className="office-picture"></div>
      <div className="container-large">
        <div className="padding-section-xl">
          {lang === "sv" ? (
            <div className="jobb-content-wrapper">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6>JOBB</h6>
              </div>
              <h1>VILL DU JOBBA HOS OSS?</h1>

              <p>
                Vi växer och anställer talanger som delar vår vision och som
                vill hjälpa våra kunder genom att göra det svåra enkelt.
                Tillsammans utvecklar vi cybersäkerhetslösningar som försvarar
                demokratin och vår livsstil. Bygg cybersäkerhet tillsammans med
                oss!
              </p>
              <button onClick={handleClick}>{moreJobsText}</button>
            </div>
          ) : (
            <div className="jobb-content-wrapper">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6>CAREERS</h6>
              </div>
              <h1>DO YOU WANT TO WORK WITH US?</h1>

              <p>
                We are in a phase of expansive growth and are always on the
                lookout for talent that share our vision and want to help our
                clients simplify the complicated. Together we're developing
                cyber-security solutions that defend democracy and our way of
                life. Build the future of cyber security with us!
              </p>
              <button onClick={handleClick}>{moreJobsText}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobb;
