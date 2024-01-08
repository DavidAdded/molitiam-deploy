"use client";
import "./Nationer.css";
import runSectionTextAnimation from "@animations/animations";
import { useEffect, useState } from "react";

const Nationer = () => {
  const lang = "sv";
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}nationer-contents?locale=${lang}`;
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
    runSectionTextAnimation(".nationer-content-wrapper-top h2", ".nationer-content-wrapper-top p")
  }, [content]);

  
  if (!content) return <div></div>;
  return (
    <div className="padding-global">
      <div className="container-large">
        <div className="padding-section-large">
          <div className="nationer-section-wrapper">
            <div className="nationer-content-wrapper-top">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {content.data[0].attributes.miniHeadline} </h6>
              </div>
              <h2>{content.data[0].attributes.H1}</h2>
              <div>
                <p>{content.data[0].attributes.Text}</p>
              </div>
            </div>

            <div className="nationer-content-wrapper-bottom">
              <div className="nationer-content-bottom">
                <img src="/nationer-phone.png" alt="Phone" />
                <h5>{content.data[0].attributes.LeftText}</h5>
              </div>
              <div
                className="nationer-content-bottom"
                style={{ backgroundColor: "#262626" }}
              >
                <img src="/nationer-device.png" alt="Device" />
                <h5>{content.data[0].attributes.MiddleText}</h5>
              </div>
              <div
                className="nationer-content-bottom"
                style={{ backgroundColor: "#0D0D0D" }}
              >
                <img src="/nationer-router.png" alt="Router" />
                <h5>{content.data[0].attributes.RightText}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationer;
