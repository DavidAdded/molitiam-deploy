"use client";
import "./OmOss.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const OmOss = ({params}) => {
  const lang = params.locales;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}om-oss-contents?locale=${lang}`;
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
    runSectionTextAnimation(
      ".omoss-section-column h2",
      ".omoss-section-column p"
    );
  }, [content]);

  if (!content) return <div></div>;

  return (
    <div className="omoss-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="omoss-section-wrapper">
              <div className="omoss-section-column">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="" />
                  <h6>{content.data[0].attributes.miniHeadline}</h6>
                </div>
                <h2>{content.data[0].attributes.H1}</h2>
                <p>{content.data[0].attributes.Text}</p>
              </div>
              <div className="omoss-section-column">
                <div className="omoss-section-column-content">
                  <div className="omoss-section-column-content-top">
                    <img src="/logowhite.svg" alt="Logo" />{" "}
                  </div>
                  <div className="omoss-section-column-content-middle">
                    <div className="vertical-black-line"></div>
                    <div className="vertical-black-line"></div>
                  </div>
                  <div className="omoss-section-column-content-bottom">
                    <div className="omoss-section-column-content-bottom-left">
                      <p>{content.data[0].attributes.LeftFigureText}</p>
                    </div>
                    <div className="omoss-section-column-content-bottom-right">
                      <p>{content.data[0].attributes.RightFigureText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmOss;
