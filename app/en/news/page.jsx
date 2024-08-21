import "../../nyheter/page.css";
import path from "path";
import fs from "fs";
import axios from "axios";
import Footer from "@components/Footer/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_API_SLIM;

const downloadImage = async (url, filepath) => {
  // Check if the file already exists
  if (fs.existsSync(filepath)) {
    return;
  }
  // Ensure the directory exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let writer;
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: "GET",
      responseType: "stream",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        "Cache-Control": "no-store",
      },
    });
    if (response.status !== 200) {
      throw new Error(
        `Failed to download image, status code: ${response.status}`
      );
    }

    writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", (err) => {
        console.error(`Error writing the file: ${err.message}`);
        reject(err);
      });
    });
  } catch (error) {
    if (writer) writer.close();

    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch (unlinkError) {
        console.error(`Error deleting incomplete file: ${unlinkError.message}`);
      }
    }

    throw new Error(`Error downloading the image: ${error.message}`);
  }
};

export const metadata = {
  metadataBase: "https://cr.se/news",
  title: "Cyber security for vital societal functions",
  description:
    "CR Group, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
  openGraph: {
    title: "Cyber security for vital societal functions",
    description:
      "CR Group, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
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
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articles = await response.json();
  console.log(articles);
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
    const imageSource = imageURL.startsWith("http")
      ? imageURL
      : process.env.NEXT_PUBLIC_API_SLIM + imageURL;

    const imagePath = path.resolve("./public", path.basename(imageURL));
    try {
      await downloadImage(imageSource, imagePath);
    } catch (error) {
      console.error(`Failed to download image from ${imageSource}:`, error);
    }
  }

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = "/en/news";

  if (!articles) return <div></div>;

  return (
    <>
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
      <Footer lang={"en"}></Footer>
    </>
  );
}
