import "./Kontakt.css";
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

const Kontakt = async (props) => {
  const lang = props.lang;
  const contactText = lang === "sv" ? "Kontakt" : "Contact";

  const URL = `${process.env.NEXT_PUBLIC_API_URL}employees?pagination[limit]=6&populate=*&locale=${lang}`;
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
    <div className="kontakt-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="kontakt-content-wrapper">
              <div className="kontakt-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {contactText} </h6>
              </div>
              <div className="kontakt-grid-wrapper">
                {contacts.data.map((contact, index) => {
                  const contactImage =
                    contact.attributes.Image.data.attributes.formats.large.url;
                  const imagePath = `/${path.basename(contactImage)}`;

                  return (
                    <div key={index} className="kontakt-item">
                      <div className="kontakt-item-top">
                        <img className="contact-image" src={`${imagePath}`} />
                      </div>
                      <div className="kontakt-item-bottom">
                        <div>
                          <h3>{contact.attributes.Name}</h3>
                          <h4>{contact.attributes.Title}</h4>
                        </div>
                        <p>
                          <a href={`mailto:${contact.attributes.Email}`}>
                            {contact.attributes.Email}
                          </a>
                        </p>
                        <p>
                          <a href={`tel:${contact.attributes.Phone}`}>
                            {contact.attributes.Phone}
                          </a>
                        </p>
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

export default Kontakt;
