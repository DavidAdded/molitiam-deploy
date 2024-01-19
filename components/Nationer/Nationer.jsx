"use client";
import "./Nationer.css";
import runSectionTextAnimation from "@animations/animations";
import { useEffect, useState } from "react";

const Nationer = (props) => {
  const lang = props.lang;

  useEffect(() => {
    runSectionTextAnimation(
      ".nationer-content-wrapper-top h2",
      ".nationer-content-wrapper-top p"
    );
  }, []);

  return (
    <div className="padding-global">
      <div className="container-large">
        <div className="padding-section-large">
          <div className="nationer-section-wrapper">
            {lang === "sv" ? (
              <div className="nationer-content-wrapper-top">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6>Nationer</h6>
                </div>
                <h2>
                  CYBERSÄKERHET FÖR <br></br>NATIONER
                </h2>
                <div>
                  <p>
                    Nationella försvar och säkerhetskänslig verksamhet söker
                    ackrediterade cybersäkerhetslösningar som uppfyller
                    säkerhetsskyddslagstiftningens höga krav i kombination med
                    användarvänlighet.
                  </p>
                  <p>
                    C-Resiliens AB är den enda leverantören av
                    krypteringsprodukter för säkerhetsklassificerad information
                    på nivån begränsat hemligt i Sverige.
                  </p>
                </div>
              </div>
            ) : (
              <div className="nationer-content-wrapper-top">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6>NATIONS</h6>
                </div>
                <h2>CYBER SECURITY FOR NATIONS</h2>
                <div>
                  <p>
                    We offer packaged services and products to vital societal
                    functions such as government agencies, the military, and the
                    private sector.
                  </p>
                  <p>
                    SIRRUS is our accredited solutions platform for vital
                    societal functions. It is unique, user-friendly and offers
                    enhanced flexibility, while always adhering to current
                    legislative demands.
                  </p>
                </div>
              </div>
            )}
            {lang === "sv" ? (
              <div className="nationer-content-wrapper-bottom">
                <div className="nationer-content-bottom">
                  <img src="/nationer-phone.png" alt="Phone" />
                  <h5>
                    MÖJLIGGÖR <br></br> MOBILT ARBETE
                  </h5>
                </div>
                <div
                  className="nationer-content-bottom"
                  style={{ backgroundColor: "#262626" }}
                >
                  <img src="/nationer-device.png" alt="Device" />
                  <h5>
                    KRYPTERAR <br></br>KOMMUNIKATION
                  </h5>
                </div>
                <div
                  className="nationer-content-bottom"
                  style={{ backgroundColor: "#0D0D0D" }}
                >
                  <img src="/nationer-router.png" alt="Router" />
                  <h5>
                    SÄKRAR <br></br> NÄTVERK
                  </h5>
                </div>
              </div>
            ) : (
              <div className="nationer-content-wrapper-bottom">
                <div className="nationer-content-bottom">
                  <img src="/nationer-phone.png" alt="Phone" />
                  <h5>
                    ENABLES <br></br> MOBILE WORK
                  </h5>
                </div>
                <div
                  className="nationer-content-bottom"
                  style={{ backgroundColor: "#262626" }}
                >
                  <img src="/nationer-device.png" alt="Device" />
                  <h5>
                    ENCRYPT <br></br> COMMUNICATION
                  </h5>
                </div>
                <div
                  className="nationer-content-bottom"
                  style={{ backgroundColor: "#0D0D0D" }}
                >
                  <img src="/nationer-router.png" alt="Router" />
                  <h5>
                    SECURES <br></br> NETWORK
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationer;
