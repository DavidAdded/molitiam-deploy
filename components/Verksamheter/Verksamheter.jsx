"use client";
import "./Verksamheter.css";
import { useEffect, useState } from "react";
import runSectionTextAnimation from "@animations/animations";

const Verksamheter = (props) => {
  const lang = props.lang;

  const [contentCard, setContentCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsURL = `${process.env.NEXT_PUBLIC_API_URL}verksamheter-content-cards?locale=${lang}&populate=*`;
        const cardsResponse = await fetch(cardsURL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (cardsResponse.ok) {
          const cards = await cardsResponse.json();

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
    runSectionTextAnimation(
      ".verksamheter-content-wrapper-top h2",
      ".verksamheter-content-wrapper-top p"
    );
  }, [contentCard]);

  return (
    <div className="verksamheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="verksamheter-content-wrapper">
              {lang === "sv" ? (
                <div className="verksamheter-content-wrapper-top">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="Left" />
                    <h6>VERKSAMHETER</h6>
                  </div>
                  <h2>CR GROUP</h2>
                  <div>
                    <p>
                      CR Group är ett svenskägt cybersäkerhetsföretag med
                      inriktning mot Sverige och Europa. Vi erbjuder lösningar
                      till samhällsviktig verksamhet som är både enkla att
                      använda och enkla att köpa.
                    </p>
                    <p>
                      Gruppen består av helägda dotterbolag inom utvalda
                      expertområden med produkter och tjänster för
                      säkerhetskritisk verksamhet.
                    </p>
                    <p>
                      Vi bygger långsiktiga relationer med både nationer och
                      organisationer.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="verksamheter-content-wrapper-top">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="Left" />
                    <h6>OPERATIONS</h6>
                  </div>
                  <h2>CR GROUP</h2>
                  <div>
                    <p>
                      CR Group is a Swedish-owned, cyber-security company
                      oriented towards the European market. We offer solutions
                      for vital societal functions that are both easy-to-buy and
                      easy-to-use.
                    </p>
                    <p>
                      The Group consists of wholly owned subsidiaries within
                      selected areas of expertise, that offer products and
                      services for security-critical operations.
                    </p>
                    <p>
                      We build long-term relationships with both nations and
                      organizations.
                    </p>
                  </div>
                </div>
              )}
              {contentCard ? (
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
              ) : (
                <div className="verksamheter-content-wrapper-bottom">
                  <div className="verksamheter-content-box-1">
                    <div className="verksamhet-corner-box-1"></div>
                    <div className="verksamhet-corner-box-2"></div>
                    <div className="verksamhet-corner-box-3"></div>
                  </div>
                  <div className="verksamheter-content-box-1">
                    <div className="verksamhet-corner-box-1"></div>
                    <div className="verksamhet-corner-box-2"></div>
                    <div className="verksamhet-corner-box-3"></div>
                  </div>
                  <div className="verksamheter-content-box-1">
                    <div className="verksamhet-corner-box-1"></div>
                    <div className="verksamhet-corner-box-2"></div>
                    <div className="verksamhet-corner-box-3"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verksamheter;
