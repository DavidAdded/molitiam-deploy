import "./Nyheter.css";
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

const Nyheter = async (props) => {
  const lang = props.lang;

  const nyheterText = lang === "sv" ? "Nyheter" : "News";

  const readMoreText = lang === "sv" ? "LÄS MER" : "READ MORE";
  const readAllArticlesText =
    lang === "sv" ? "LÄS ALLA NYHETER" : "READ ALL NEWS";

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=3&populate=*&locale=${lang}`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  const articles = await articlesResponse.json();

  for (const article of articles.data) {
    const availableFormats = article.attributes.Image.data.attributes.formats;
    let imageURL;
    if (availableFormats.medium) {
      imageURL = availableFormats.medium.url;
    } else if (availableFormats.small) {
      imageURL = availableFormats.small.url;
    } else if (availableFormats.thumbnail) {
      imageURL = availableFormats.thumbnail.url;
    }
    const imageSource = process.env.NEXT_PUBLIC_API_SLIM + imageURL;
    const imagePath = path.resolve("./public", path.basename(imageURL));
    await downloadImage(imageSource, imagePath);
  }

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = lang === "sv" ? "/nyheter" : "/en/news";

  return (
    <div className="nyheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-content-wrapper">
              <div className="nyheter-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {nyheterText}</h6>
              </div>
              <div className="nyheter-content-boxes">
                {articles.data ? (
                  articles.data.map((article, index) => {
                    const articleDate = article.attributes.Date;
                    
                        const availableFormats =
                          article.attributes.Image.data.attributes.formats;
                        let articleImage;
                        if (availableFormats.medium) {
                          articleImage = availableFormats.medium.url;
                        } else if (availableFormats.small) {
                          articleImage = availableFormats.small.url;
                        } else if (availableFormats.thumbnail) {
                          articleImage = availableFormats.thumbnail.url;
                        }
                    const imagePath = `/${path.basename(articleImage)}`;

                    return (
                      <div key={index} className="nyheter-wrapper">
                        <a
                          href={`${urlBasedOnLang}/${article.id}`}
                          key={article.id}
                        >
                          <div className="nyheter-content-card">
                            {articleImage ? (
                              <div
                                style={{
                                  backgroundImage: `url(${imagePath})`,
                                }}
                                className="nyheter-content-card-top"
                              ></div>
                            ) : (
                              <div className="nyheter-content-card-top"></div>
                            )}

                            <div className="nyheter-content-card-bottom">
                              <div className="nyheter-content-card-text-wrapper">
                                <div className="nyheter-date">
                                  {articleDate
                                    ? convertDateFormat(articleDate)
                                    : ""}
                                </div>
                                <h3>{article.attributes.Titel}</h3>
                                <p className="nyheter-paragraph-one">
                                  {article.attributes.ArticleText}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="nyheter-las-mer">
                            <div className="nyheter-las-mer-content">
                              <p>{readMoreText}</p>
                              <img src="/right-arrow.svg" alt="Read More" />
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
              <a href={`${urlBasedOnLang}`}>
                <button className="regular-button">
                  {readAllArticlesText}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nyheter;
