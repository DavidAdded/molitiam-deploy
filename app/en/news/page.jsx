import "../../nyheter/page.css";
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

export const metadata = {
  metadataBase: "https://cr.se/news",
  title: "Cyber security for vital societal functions",
  description:
    "C-Resiliens, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
  openGraph: {
    title: "Cyber security for vital societal functions",
    description:
      "C-Resiliens, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
    images: [
      {
        url: "https://cr.se/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page() {
  const readMoreText = "Read More";
  const arrowIconUrl = "right-arrow.svg";

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=6&populate=*&locale=en`;
  const response = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articles = await response.json();

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
    const imagePath = path.resolve("./public", path.basename(imageURL));
    await downloadImage(imageURL, imagePath);
  }

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = "/en/news";

  if (!articles) return <div></div>;

  return (
    <div className="news-page-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-page-content-wrapper">
              <h1>NEWS</h1>
              <div className="news-grid">
                {articles.data.map((article, index) => {
                  
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
                          <div
                            style={{
                              backgroundImage: `url(${imagePath})`,
                            }}
                            className="nyheter-content-card-top"
                          ></div>

                          <div className="nyheter-content-card-bottom">
                            <div className="nyheter-content-card-text-wrapper">
                              <div className="nyheter-date">
                                {convertDateFormat(article.attributes.Date)}
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
                            <p>READ MORE</p>
                            <img src="/right-arrow.svg" alt="Read More" />
                          </div>
                        </div>
                      </a>
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
}
