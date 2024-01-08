import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@utils/SplitText";

gsap.registerPlugin(ScrollTrigger);

function animateElement(element, type, isHeader = false) {
  const split = new SplitText(element, { type: type });

    if (isHeader) {
        gsap.fromTo(
  split.lines,
  {
    x: -10,
    opacity: 0
  },
  {
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      end: "bottom 60%",
    },
    x: 0, // ending x position
    opacity: 1, // ending opacity
    stagger: 0.15,
    duration: 0.5,
  }
);
    }
    else {
gsap.fromTo(
    split.lines,
    {
      y: type === "lines" ? 5 : 0, // Y-offset for lines; for chars or words, it can be 0 or another value
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: type === "lines" ? 0.4 : 1, // Adjust duration based on the type
      delay: 0.5,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 60%",
      },
    }
  );
    }
  
}

const runSectionTextAnimation = (hElements, pElements) => {
  const headers = document.querySelectorAll(hElements);
  headers.forEach((header) => {
    animateElement(header, "lines", true); // Animating lines in headers
  });

  const paragraphs = document.querySelectorAll(pElements);
  paragraphs.forEach((paragraph) => {
    animateElement(paragraph, "lines"); // Animating lines in paragraphs
  });

  const subHeaders = document.querySelectorAll(".sub-header-wrapper");
  subHeaders.forEach((subHeader) => {
    animateElement(subHeader, "lines"); // Animating lines in sub-headers
  });
};

export default runSectionTextAnimation;
