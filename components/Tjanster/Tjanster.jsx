"use client";
import "./Tjanster.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Tjanster = (props) => {
const lang = props.lang;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}tjanster-contents?locale=${lang}`;
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

gsap.registerPlugin(ScrollTrigger);

  // Count-up animation function
  const animateCountUp = (element) => {
    const endValue = parseInt(element.getAttribute('data-target-value'));
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
    if (!content) return;
    document.querySelectorAll(".count-up").forEach(animateCountUp);
    // Ensure content is loaded before running the animation
    runSectionTextAnimation(".tjanster-content-wrapper h2")
  }, [content]);

  if (!content) return <div></div>;
  return (
    <div>
      <div className="tjanster-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="tjanster-padding-section-large">
              <div className="tjanster-content-wrapper">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6> {content.data[0].attributes.miniHeadline}</h6>
                </div>
                <h2>{content.data[0].attributes.H1}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="tjanster-section-wrapper-img">

        </div>
      </div>
      <div className="tjanster-section-wrapper-bottom">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-small">
              <div className="tjanster-section-wrapper-bottom-content-wrapper">
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-left.svg" alt="Left" />{" "}
                  <h5><span className="count-up" data-target-value={content.data[0].attributes.PercentLeft} >{content.data[0].attributes.PercentLeft}</span>%</h5>
                  <p>{content.data[0].attributes.TextLeft}</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-middle.svg" alt="Middle" />{" "}
                  <h5><span className="count-up" data-target-value={content.data[0].attributes.PercentMiddle}>{content.data[0].attributes.PercentMiddle}</span>%</h5>
                  <p>{content.data[0].attributes.TextMiddle}</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-right.svg" alt="Right" />{" "}
                  <h5><span className="count-up" data-target-value={content.data[0].attributes.PercentRight}>{content.data[0].attributes.PercentRight}</span>%</h5>
                  <p>{content.data[0].attributes.TextRight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tjanster;
