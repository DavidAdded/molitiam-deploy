"use client";
import "./Organisationer.css";
import runSectionTextAnimation from "@animations/animations";
import { useEffect, useState, useRef } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Organisationer = (props) => {
  const [isSafari, setIsSafari] = useState(true);
  const lang = props.lang;
  const lottieSource =
    lang === "sv"
      ? "/organisationer-5-sek.lottie"
      : "/organisations-5-sek.lottie";
  const lottieBackupImgSoruce =
    lang === "sv" ? "/lottie-backup-sv.png" : "/lottie-backup-eng.png";

  const lottieRef = useRef();

  // Setup ScrollTrigger
  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        ScrollTrigger.create({
          trigger: ".organisationer-content-wrapper-bottom",
          start: "top center",
          onEnter: lottieRef.current.playOnShow(),
        });
        return () => {
          scrollTriggerInstance.kill();
        };
      }, 1000);
    }

    function checkIfSafari() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (
        userAgent.includes("safari") &&
        !userAgent.includes("chrome") &&
        !userAgent.includes("chromium")
      ) {
        setIsSafari(true);
      }
    }
    checkIfSafari();
  }, [lottieRef]);

  useEffect(() => {
    runSectionTextAnimation(
      ".organisationer-content-wrapper-top h2",
      ".organisationer-content-wrapper-top p"
    );
  }, [isSafari]);

  return (
    <div className="organisationer-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {lang === "sv" ? (
              <div className="organisationer-content-wrapper-top">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6>OGRANISATIONER</h6>
                </div>
                <h2>
                  CYBERSÄKERHET FÖR <br></br> ORGANISATIONER
                </h2>
                <div>
                  <p>
                    Privata företag, myndigheter och offentlig sektor som
                    bedriver samhällsviktig verksamhet erbjuds paketerade
                    tjänster och produkter.
                  </p>
                  <p>
                    Vår plattform för ackrediterade lösningar till
                    samhällsviktig verksamhet, SIRRUS, är en unik användarvänlig
                    plattform som erbjuder stor flexibilitet, alltid med
                    gällande lagkrav som grund.
                  </p>
                </div>
              </div>
            ) : (
              <div className="organisationer-content-wrapper-top">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6>ORGANIZATIONS</h6>
                </div>
                <h2>CYBER SECURITY FOR ORGANIZATIONS</h2>
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

            <div className="organisationer-content-wrapper-bottom">
              {!isSafari ? (
                <DotLottiePlayer
                  lottieRef={lottieRef}
                  src={lottieSource}
                  height={550}
                  loop={false}
                  id="player"
                ></DotLottiePlayer>
              ) : (
                <img className="backupImage" src={lottieBackupImgSoruce}></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisationer;
