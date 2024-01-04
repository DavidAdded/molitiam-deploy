"use client";

import "./Syfte.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@utils/SplitText";

gsap.registerPlugin(ScrollTrigger);

const Syfte = () => {
  useEffect(() => {
    const headers = document.querySelectorAll(".syfte-section-wrapper h2");
    headers.forEach((header) => {
      const split = new SplitText(header, { type: "lines" });
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: header,
          start: "top 90%",
          end: "bottom 60%",
        },
        x: -10,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
      });
    });

    const paragraphs = document.querySelectorAll(".syfte-section-wrapper p");
    paragraphs.forEach((p) => {
      const split = new SplitText(p, { type: "lines" });
      gsap.set(split.lines, { overflow: "hidden" });

      ScrollTrigger.create({
        trigger: p,
        start: "top 90%",
        end: "bottom 60%",
        onEnter: () => animateSubHeaderAndParagraph(p),
      });
    });
  }, []);

  function animateSubHeaderAndParagraph(paragraph) {
    gsap.fromTo(
      ".sub-header-wrapper",
      { opacity: 0 }, // starting value
      {
        opacity: 1, // ending value
        duration: 1,
        delay: 0.5,
      }
    );

    const split = new SplitText(paragraph, { type: "lines" });
    gsap.from(split.lines, {
      y: 5,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      delay: 0.5,
    });
  }

  return (
    <div className="syfte-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="syfte-content-wrapper">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="" />
                <h6> Syfte </h6>
              </div>
              <h2> Cybersäkerhet - en säkerhetsfråga</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syfte;
