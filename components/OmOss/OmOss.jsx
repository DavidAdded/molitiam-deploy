import "./OmOss.css";
import path from "path";
import fs from "fs";
import axios from "axios";

const downloadImage = async (url, filepath) => {
  // Check if the file already exists
  if (fs.existsSync(filepath)) {
    return;
  }

  // Proceed with download if the file doesn't exist
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
const OmOss = async (props) => {
  const lang = props.lang;

  const URL = `${process.env.NEXT_PUBLIC_API_URL}employees?pagination[limit]=6&populate=*&locale=${lang}&fields[0]=Order&fields[1]=Name&fields[2]=Title&fields[3]=Email&fields[4]=Phone&[sort]=Order:asc`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  const contacts = await response.json();

  for (const contact of contacts.data) {
    const imageURL = contact.attributes.Image.data.attributes.formats.large.url;
    const imageSource = process.env.NEXT_PUBLIC_API_SLIM + imageURL;
    const imagePath = path.resolve("./public", path.basename(imageURL));
    await downloadImage(imageSource, imagePath);
  }

  if (!contacts.data) return <div></div>;

  return (
    <div className="omoss-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="omoss-section-wrapper">
              {lang === "sv" ? (
                <div className="omoss-section-column">
                  <div className="sub-header-wrapper">
                    <img
                      src="/logo-black.png"
                      width="25px"
                      alt="mollitiam-logo"
                    />
                    <h6 className="black-text">OM OSS</h6>
                  </div>
                  <div>
                    <p>
                      Mollitiams är en säker leverantör av godkända
                      systemlösningar för hantering av säkerhetsklassificerad
                      information och levererar dessa som en tjänst. Företaget
                      erbjuder lösningar som både är enkla att använda men även
                      kostnadseffektiva.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="omoss-section-column">
                  <div className="sub-header-wrapper">
                    <img
                      src="/logo-black.png"
                      width="25px"
                      alt="mollitiam-logo"
                    />
                    <h6 className="black-text">ABOUT US</h6>
                  </div>
                  <h2>EASY TO BUY. EASY TO USE.</h2>
                  <div>
                    <p>
                      We are a full-service provider for vital societal
                      functions.
                    </p>
                    <p>
                      Our advanced defense technology protects the most
                      sensitive of societal functions and provides an entirely
                      new level of user-friendliness, making our solutions both
                      easy-to-buy and easy-to-use.
                    </p>
                    <p>Exactly as it should be.</p>
                  </div>
                </div>
              )}

              <div className="om-oss-people-grid-wrapper">
                {contacts.data.map((contact, index) => {
                  const contactImage =
                    contact.attributes.Image.data.attributes.formats.large.url;
                  const imagePath = `/${path.basename(contactImage)}`;

                  return (
                    <div key={index} className="om-oss-people-item">
                      <div className="om-oss-people-item-top">
                        <img
                          className="om-oss-people-image"
                          src={`${imagePath}`}
                        />
                      </div>
                      <div className="om-oss-people-item-bottom">
                        <div>
                          <h3>{contact.attributes.Name}</h3>
                          <h4>{contact.attributes.Title}</h4>
                        </div>

                        {contact.attributes.Email !== undefined && (
                          <p>
                            <a href={`mailto:${contact.attributes.Email}`}>
                              {contact.attributes.Email}
                            </a>
                          </p>
                        )}
                        {contact.attributes.Phone !== undefined && (
                          <p>
                            <a href={`tel:${contact.attributes.Phone}`}>
                              {contact.attributes.Phone}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmOss;
