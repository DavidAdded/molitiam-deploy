"use client";
import "./Tjanster.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Tjanster = (props) => {
  const lang = props.lang;

  gsap.registerPlugin(ScrollTrigger);

  // Count-up animation function
  const animateCountUp = (element) => {
    const endValue = parseInt(element.getAttribute("data-target-value"));
    // Set initial value to 0
    element.innerText = 0;

    gsap.to(element, {
      innerText: endValue,
      duration: 2,
      ease: "power1.inOut",
      snap: { innerText: 1 }, // Snap to integers
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        toggleActions: "play none none none",
      },
    });
  };

  useEffect(() => {
    document.querySelectorAll(".count-up").forEach(animateCountUp);

    runSectionTextAnimation(".tjanster-content-wrapper h2");
  }, []);

  return (
    <div>
      <div className="tjanster-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="tjanster-padding-section-large">
              {lang === "sv" ? (
                <div className="tjanster-content-wrapper">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="Left" />
                    <h6>TJÄNSTER</h6>
                  </div>
                  <h2>FÖR NATIONER OCH ORGANISATIONER</h2>
                </div>
              ) : (
                <div className="tjanster-content-wrapper">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="Left" />
                    <h6>SERVICES</h6>
                  </div>
                  <h2>FOR NATIONS & ORGANIZATIONS</h2>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tjanster-section-wrapper-img"></div>
      </div>
      <div className="tjanster-section-wrapper-bottom">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-small">
              {lang === "sv" ? (
                <div className="tjanster-section-wrapper-bottom-content-wrapper">
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-left.svg" alt="Left" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={85}>
                        85
                      </span>
                      %
                    </h5>
                    <p>Försvar</p>
                  </div>
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-middle.svg" alt="Middle" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={10}>
                        10
                      </span>
                      %
                    </h5>
                    <p>Civilt</p>
                  </div>
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-right.svg" alt="Right" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={5}>
                        5
                      </span>
                      %
                    </h5>
                    <p>Internationellt</p>
                  </div>
                </div>
              ) : (
                <div className="tjanster-section-wrapper-bottom-content-wrapper">
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-left.svg" alt="Left" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={85}>
                        85
                      </span>
                      %
                    </h5>
                    <p>Defense</p>
                  </div>
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-middle.svg" alt="Middle" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={10}>
                        10
                      </span>
                      %
                    </h5>
                    <p>Civil</p>
                  </div>
                  <div className="tjanster-section-wrapper-bottom-content">
                    <img src="/tjanster-icon-right.svg" alt="Right" />{" "}
                    <h5>
                      <span className="count-up" data-target-value={5}>
                        5
                      </span>
                      %
                    </h5>
                    <p>Internationally</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tjanster;
