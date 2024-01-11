"use client";
import "./Verksamheter.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const Verksamheter = (props) => {
  const lang = props.lang;
  const [content, setContent] = useState(null);
  const [contentCard, setContentCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}verksamheter-contents?locale=${lang}`;
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
          },
        });

        const cardsURL = `${process.env.NEXT_PUBLIC_API_URL}verksamheter-content-cards?locale=${lang}&populate=*`;
        const cardsResponse = await fetch(cardsURL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const cards = await cardsResponse.json();
          setContent(data);
          setContentCard(cards);
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
      ".verksamheter-content-wrapper-top h2",
      ".verksamheter-content-wrapper-top p"
    );
  }, [content]);

  if (!content) return <div></div>;

  return (
    <div className="verksamheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="verksamheter-content-wrapper">
              <div className="verksamheter-content-wrapper-top">
                <div className="sub-header-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6> {content.data[0].attributes.miniHeadline} </h6>
                </div>
                <h2>{content.data[0].attributes.H1}</h2>
                <div>
                  <p>{content.data[0].attributes.Text}</p>
                </div>
              </div>
              <div className="verksamheter-content-wrapper-bottom">
                <div className="verksamheter-content-box-1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_SLIM}${contentCard.data[0].attributes.PartnerIcon.data.attributes.url}`}
                  ></img>
                  <p>{contentCard.data[0].attributes.PartnerDescription}</p>
                  <div className="verksamhet-corner-box-1"></div>
                  <div className="verksamhet-corner-box-2"></div>
                  <div className="verksamhet-corner-box-3"></div>
                </div>
                <div className="verksamheter-content-box-1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_SLIM}${contentCard.data[1].attributes.PartnerIcon.data.attributes.url}`}
                  ></img>
                  <p>{contentCard.data[1].attributes.PartnerDescription}</p>
                  <div className="verksamhet-corner-box-1"></div>
                  <div className="verksamhet-corner-box-2"></div>
                  <div className="verksamhet-corner-box-3"></div>
                </div>
                <div className="verksamheter-content-box-1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_SLIM}${contentCard.data[2].attributes.PartnerIcon.data.attributes.url}`}
                  ></img>
                  <p>{contentCard.data[2].attributes.PartnerDescription}</p>
                  <div className="verksamhet-corner-box-1"></div>
                  <div className="verksamhet-corner-box-2"></div>
                  <div className="verksamhet-corner-box-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verksamheter;
