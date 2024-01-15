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
   if(split.lines.length === 0) return;
    gsap.fromTo(
      split.lines,
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

const runSectionTextAnimation = (
  hElements,
  pElements,
  time = 0,
  delay = 0
) => {
 const headers = document.querySelectorAll(hElements);
 const paragraphs = document.querySelectorAll(pElements);
 const subHeaders = document.querySelectorAll(".sub-header-wrapper");

     headers.forEach((header) => {
       header.style.opacity = 0;
     });
      if (pElements !== undefined) {
        paragraphs.forEach((paragraph) => {
          paragraph.style.opacity = 0;
        });
      }
      subHeaders.forEach((subHeader) => {
        subHeader.style.opacity = 0;
      })

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
    subHeaders.forEach((subHeader) => {
      subHeader.style.opacity = 1;
      animateElement(subHeader, "lines", false);
    });
     subHeaders.forEach((subHeader) => {
      subHeader.style.opacity = 1;
      animateElement(subHeader, "lines", false);
    });
  }, time);

  return ()=>
  clearTimeout(timeoutId);
};

export default runSectionTextAnimation;
