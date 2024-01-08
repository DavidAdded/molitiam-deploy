"use client";
import "./Tjanster.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";


const Tjanster = () => {
  const lang = "sv";
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

   useEffect(() => {
    if (!content) return; // Ensure content is loaded before running the animation
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
                  <h5>{content.data[0].attributes.PercentLeft}%</h5>
                  <p>{content.data[0].attributes.TextLeft}</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-middle.svg" alt="Middle" />{" "}
                  <h5>{content.data[0].attributes.PercentRight}%</h5>
                  <p>{content.data[0].attributes.TextMiddle}</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-right.svg" alt="Right" />{" "}
                  <h5>{content.data[0].attributes.PercentRight}%</h5>
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
