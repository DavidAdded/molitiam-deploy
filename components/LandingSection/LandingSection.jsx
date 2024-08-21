"use client";

import "./LandingSection.css";
import gsap from "gsap";
import ScrollTrigger from "@utils/ScrollTrigger";
import SplitText from "@utils/SplitText";
import { useEffect, useRef, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LandingSection = (props) => {
  const sectionRef = useRef(null);
  const lang = props.lang;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const triggerElement = sectionRef.current.querySelector(
      ".landing-content-wrapper"
    );
    const targetElements =
      sectionRef.current.querySelectorAll(".animation-header");

    targetElements.forEach((header) => {
      const split = new SplitText(header, { type: "lines" });

      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          end: "bottom top",
          toggleActions: "restart none none reset",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1, // Stagger applied to the collection of lines
      });
    });

    const image1 = document.querySelector(".picture-wrapper img");
    const wrapper = document.querySelector(".landing-section-wrapper");

    gsap.to([image1], {
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },

      y: -100,
      duration: 3,
      ease: "none",
    });

    runSectionTextAnimation(".text-wrapper p", undefined, 0, 1);
  }, [content]);

  return (
    <div className="landing-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div ref={sectionRef} className="landing-content-wrapper">
              {lang === "sv" ? (
                <div className="text-wrapper">
                  <h1 className="animation-header">DIGITAL SUVERÄNITET</h1>
                  <p>
                    Vi gör det enkelt att hantera och skydda
                    säkerhetskvalificerad information
                  </p>
                </div>
              ) : (
                <div className="text-wrapper">
                  <h1 className="animation-header">
                    CYBER SECURITY FOR VITAL SOCIETAL FUNCTIONS{" "}
                  </h1>
                  <p>Defense technology. Security. Simplicity.</p>
                </div>
              )}
              <div className="picture-wrapper">
                <img src="/logo-green.png" alt="Mollitiam logo in green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
