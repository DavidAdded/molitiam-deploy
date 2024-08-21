import "./page.css";
import path from "path";
import fs from "fs";
import axios from "axios";
import Footer from "@components/Footer/Footer";

export const metadata = {
  metadataBase: "https://cr.se/nyheter",
  title: "Cybersäkerhet för samhällsviktig verksamhet",
  description:
    "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
  openGraph: {
    title: "Cybersäkerhet för samhällsviktig verksamhet",
    description:
      "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
    images: [
      {
        url: "https://cr.se/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

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

export default async function Page() {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=6&populate=*&locale=sv`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!articlesResponse.ok) {
    throw new Error(`Failed to fetch articles: ${articlesResponse.statusText}`);
  }

  const articles = await articlesResponse.json();

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

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

  const urlBasedOnLang = "/nyheter";

  if (!articles) return <div></div>;

  return (
    <>
      <div className="news-page-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="nyheter-page-content-wrapper">
                <h1>nyheter</h1>
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
                              <p>LÄS MER</p>
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
      <Footer lang={"sv"}></Footer>
    </>
  );
}
