"use client"

import "./LandingSection.css";
import gsap from "gsap";
import ScrollTrigger from "@utils/ScrollTrigger";
import SplitText from "@utils/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);


const LandingSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const triggerElement = sectionRef.current.querySelector('.landing-content-wrapper');
    const targetElements = sectionRef.current.querySelectorAll('.animation-header');
  
    targetElements.forEach(header => {
      // Split the text of each header
      const split = new SplitText(header, { type: "lines" });
  
      // Animate all lines at once with a stagger
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          end: "bottom top",
          toggleActions: "restart none none reset"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1  // Stagger applied to the collection of lines
      });
    });
  }, []);
  
  return (
    <div className="landing-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div ref={sectionRef} className="landing-content-wrapper">
              <div className="picture-wrapper">
                <img src="/camoimage.png" alt="Landing picture" />
                <div className="landing-grey-image"></div>
              </div>
              <div className="text-wrapper">
                <h1 className="animation-header">CYBERSÄKERHET FÖR SAMHÄLLSVIKTIG VERKSAMHET</h1>
                <p>Försvarsteknologi. Säkert. Enkelt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LandingSection;
