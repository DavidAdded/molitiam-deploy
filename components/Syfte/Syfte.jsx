"use client";

import "./Syfte.css";
import { useEffect, useState } from "react";

import runSectionTextAnimation from "@animations/animations";

const Syfte = (props) => {
  const lang = props.lang;
 

  return (
    <div className="syfte-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {lang === "sv" ? (
              <div className="syfte-content-wrapper">
                <div className="sub-header-wrapper">
                  <img
                    src="/logo-white.png"
                    width="25px"
                    alt="mollitiam logo in white"
                  />
                  <h6 className="white-text"> SYFTE</h6>
                </div>

                <div>
                  <p>
                    Vi på Mollitiam utvecklar godkända privata molnlösningar för
                    hantering av säkerhetsklassificerad information. På
                    Mollitiam står vi i frontlinjen för att göra Sverige
                    säkrare.
                  </p>
                  <p>
                    Som landets första heltäckande leverantör av
                    högsäkerhetslösningar arbetar vi för att skydda den mest
                    kritiska informationen. Vårt uppdrag är att förenkla det
                    komplexa och säkerställa att känslig data aldrig hamnar i
                    orätta händer. Vi ger företag och myndigheter friheten att
                    fokusera på sina kärnverksamheter medan vi arbetar för att
                    förebygga IT-attacker eller dataintrång. Detta är inte bara
                    en teknisk bedrift, utan en central del av civilförsvaret
                    och Sveriges totalförsvar.
                  </p>
                  <p>Mollitiam erbjuder rött nät as a service.</p>
                </div>
              </div>
            ) : (
              <div className="syfte-content-wrapper">
                <div className="sub-header-wrapper">
                  <img
                    src="/logo-white.png"
                    width="25px"
                    alt="mollitiam logo in white"
                  />
                  <h6 className="white-text">PURPOSE</h6>
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
