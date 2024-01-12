"use client";

import "./Syfte.css";
import { useEffect, useState } from "react";

import runSectionTextAnimation from "@animations/animations";

const Syfte = (props) => {
  const lang = props.lang;
  useEffect(() => {
    runSectionTextAnimation(
      ".syfte-section-wrapper h2",
      ".syfte-section-wrapper p"
    );
  }, []);

  return (
    <div className="syfte-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {lang === "sv" ? (
              <div className="syfte-content-wrapper">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="" />
                  <h6>SYFTE</h6>
                </div>
                <h2>CYBERSÄKERHET - EN FRIHETSFRÅGA </h2>
                <div>
                  <p>
                    Cyberhotet kostar mer för allt fler, hotar demokratin och
                    undergräver tilliten i samhället.
                  </p>
                  <p>
                    Vårt uppdrag är cybersäkerhet för stärkt tillit, främjad
                    demokrati och god ekonomisk tillväxt. Cybersäkerhet är en
                    frihetsfråga för oss.
                  </p>
                </div>
              </div>
            ) : (
              <div className="syfte-content-wrapper">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="" />
                  <h6>PURPOSE</h6>
                </div>
                <h2>CYBER SECURITY – A QUESTION OF FREEDOM</h2>
                <div>
                  <p>
                    Cyber threats cause rising costs, weaken democracy, and
                    undermine trust in society.
                  </p>
                  <p>
                    Our mission is cyber security that strengthens trust,
                    promotes democracy, and enhances economic growth. For us,
                    cyber security is all about freedom.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syfte;
