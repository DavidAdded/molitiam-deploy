"use client";

import "./LandingSection.css";
import gsap from "gsap";
import ScrollTrigger from "@utils/ScrollTrigger";
import SplitText from "@utils/SplitText";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LandingSection = () => {
  const sectionRef = useRef(null);
  const lang = "sv";
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}landing-contents?locale=${lang}`;
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContent(data);
          // Set content state here
        } else {
          console.error("Failed to fetch content");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!content) return;

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
    const image2 = document.querySelector(".picture-wrapper div");
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

    gsap.to([image2], {
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },

      y: 100,
      duration: 3,
      ease: "none",
    });
  }, [content]);

  if (!content) return <div></div>;

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
                <h1 className="animation-header">
                  {content.data[0].attributes.H1}
                </h1>
                <p>{content.data[0].attributes.SecondText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
