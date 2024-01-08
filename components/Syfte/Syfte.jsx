"use client";

import "./Syfte.css";
import { useEffect, useState } from "react";

import runSectionTextAnimation from "@animations/animations";



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

    runSectionTextAnimation(".syfte-section-wrapper h2", ".syfte-section-wrapper p")


  }, [content]);

  

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
