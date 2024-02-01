import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@utils/SplitText";

gsap.registerPlugin(ScrollTrigger);
let splitTextElements = [];
function animateElement(element, type, isHeader = false) {
  
  if (element.split ) {
    element.split.revert();
  }
  if(element.anim) {
    element.anim.progress(1).kill();
  }
 
  // element.querySelectorAll("div").forEach((div) => {
  //   div.style.display = "inline-block";
  // });

  // element.style.display = "inline-block";
  splitTextElements.push(element);
  element.split = new SplitText(element, { type: type, lineClass: "line" });
  if (isHeader) {
    element.anim = gsap.fromTo(
      element.split.lines,
      {
        x: -10,
        opacity: 0,
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
  } else {
    gsap.fromTo(
      element.split.lines,
      {
        y: type === "lines" ? 5 : 0,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: type === "lines" ? 0.4 : 1,
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
let firstRun = 0;

const runSectionTextAnimation = (hElements, pElements, time = 0, delay = 0) => {
  const subHeaders = document.querySelectorAll(".sub-header-wrapper");

  function setupSubSplits() {
    if (firstRun === 0) {
      firstRun = 1;
      subHeaders.forEach((subHeader) => {
        subHeader.style.opacity = 0;
      });

      const timeoutId = setTimeout(() => {
        subHeaders.forEach((subHeader) => {
          subHeader.style.opacity = 1;
          animateElement(subHeader, "lines", false);
        });
      }, time);
      return () => clearTimeout(timeoutId);
    }
  }

  const headers = document.querySelectorAll(hElements);
  const paragraphs = document.querySelectorAll(pElements);

  function setupSplits() {
    headers.forEach((header) => {
      header.style.opacity = 0;
    });
    if (pElements !== undefined) {
      paragraphs.forEach((paragraph) => {
        paragraph.style.opacity = 0;
      });
    }

    const timeoutId = setTimeout(() => {
      headers.forEach((header) => {
        header.style.opacity = 1;
        animateElement(header, "lines", true);
      });
      if (pElements !== undefined) {
        paragraphs.forEach((paragraph) => {
          paragraph.style.opacity = 1;
          animateElement(paragraph, "lines", false);
        });
      }
    }, time);
    return () => clearTimeout(timeoutId);
  }

  function revertAllSplits() {
    splitTextElements.forEach((element) => {
      if (element.split) {
        element.split.revert();
      }
    });

    // Clear the array after reverting
    splitTextElements = [];
  }

  window.addEventListener("resize", revertAllSplits);
  ScrollTrigger.addEventListener("refresh", setupSplits);
  setupSplits();
  ScrollTrigger.addEventListener("refresh", setupSubSplits);
  setupSubSplits();
};

export default runSectionTextAnimation;
