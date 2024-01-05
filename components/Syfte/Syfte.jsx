"use client";

import "./Syfte.css";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@utils/SplitText";

gsap.registerPlugin(ScrollTrigger);

const Syfte = () => {
  const lang = "sv";
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}syfte-contents?locale=${lang}`;
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
    if (!content) return; // Ensure content is loaded before running the animation

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
  }, [content]);

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
  if (!content) return <div></div>;
  return (
    <div className="syfte-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="syfte-content-wrapper">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="" />
                <h6> {content.data[0].attributes.miniHeadline} </h6>
              </div>
              <h2> {content.data[0].attributes.H1}</h2>
              <div>
                <p>{content.data[0].attributes.Text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syfte;
