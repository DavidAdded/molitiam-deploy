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
          console.log(response);
          const data = await response.json();
          console.log(data);
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
    if (!content) return; // Ensure content is loaded before running the animation

    const triggerElement = sectionRef.current.querySelector(
      ".landing-content-wrapper"
    );
    const targetElements =
      sectionRef.current.querySelectorAll(".animation-header");

    targetElements.forEach((header) => {
      // Split the text of each header
      const split = new SplitText(header, { type: "lines" });

      // Animate all lines at once with a stagger
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
  }, [content]); // Dependency array includes 'content'

  if (!content) return <div>Loading...</div>;

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
