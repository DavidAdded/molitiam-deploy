import "./Verksamheter.css";
import path from "path";
import fs from "fs";
import axios from "axios";

const downloadImage = async (url, filepath) => {
  if (fs.existsSync(filepath)) {
    return;
  }

  const writer = fs.createWriteStream(filepath);

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Error downloading the image: ${error.message}`);
  }
};

const Verksamheter = async (props) => {
  const lang = props.lang;
  const cardsURL = `${process.env.NEXT_PUBLIC_API_URL}verksamheter-content-cards?locale=${lang}&populate=*`;
  const cardsResponse = await fetch(cardsURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  const contentCards = await cardsResponse.json();

  for (const contentCard of contentCards.data) {
    const imageURL = contentCard.attributes.PartnerIcon.data.attributes.url;

    const imageSource = process.env.NEXT_PUBLIC_API_SLIM + imageURL;
    const imagePath = path.resolve("./public", path.basename(imageURL));
    await downloadImage(imageSource, imagePath);
  }
  
  return (
    <div className="verksamheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="verksamheter-content-wrapper">
              {lang === "sv" ? (
                <div className="verksamheter-content-wrapper-top">
                  <div className="sub-header-wrapper">
                    <img src="/logo-white.png" width="25px" alt="Left" />
                    <h6 className="white-text">CR Group</h6>
                  </div>
                  <div>
                    <p>
                      Mollitiam är en del av CR Group, som är en totalleverantör
                      av cybersäkerhet till samhällsviktig verksamhet. Gruppen
                      består av helägda dotterbolag inom utvalda expertområden.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="verksamheter-content-wrapper-top">
                  <div className="sub-header-wrapper">
                    <img src="/prefix-icon.svg" alt="Left" />
                    <h6>OPERATIONS</h6>
                  </div>
                  <h2>CR Group</h2>
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

              {contentCards.data ? (
                <div className="verksamheter-content-wrapper-bottom">
                  {contentCards.data.map((card, index) => {
                    const cardImage =
                      card.attributes.PartnerIcon.data.attributes.url;
                    const imagePath = `/${path.basename(cardImage)}`;
                    const siteUrl = card.attributes.Linkurl;

                    return (
                      <div key={index} className="verksamheter-content-box-1">
                        <a target="_blank" href={siteUrl}>
                          <img src={`${imagePath}`}></img>
                        </a>
                        <p>{card.attributes.PartnerDescription}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="verksamheter-content-wrapper-bottom">
                  <div className="verksamheter-content-box-1"></div>
                  <div className="verksamheter-content-box-1"></div>
                  <div className="verksamheter-content-box-1"></div>
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
