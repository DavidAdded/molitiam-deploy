"use client";
import "./Jobb.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const Jobb = () => {
  const lang = "sv";
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}jobb-contents?locale=${lang}`;
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
      ".jobb-content-wrapper h1",
      ".jobb-content-wrapper p"
    );
  }, [content]);

  if (!content) return <div></div>;

  return (
    <div className="jobb-section-wrapper">
      <div className="office-picture"></div>
      <div className="container-large">
        <div className="padding-section-xl">
          <div className="jobb-content-wrapper">
            <div className="sub-header-wrapper">
              <img src="/prefix-icon.svg" alt="Left" />
              <h6> {content.data[0].attributes.miniHeadline} </h6>
            </div>
            <h1>{content.data[0].attributes.H1}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: content.data[0].attributes.Text,
              }}
            ></p>
            <button>se lediga tjänster</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobb;
