import { resolve } from "styled-jsx/css";
import "./page.css";
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

export async function generateMetadata({ params }, parent) {
  const id = params.id;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${params.articleId}?populate=*`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });
  const article = await response.json();

  const previousImages = (await parent).openGraph?.images || [];
  const description =
    article.data.attributes.ArticleText.replace(/<[^>]*>/g, "").substring(
      0,
      150
    ) + "...";

  const availableFormats =
    article.data.attributes.Image.data.attributes.formats;
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
  const baseURL = "https://cr.se";
  const OGPath = `${baseURL}/${path.basename(imageURL)}`;

  return {
    metadataBase: `${baseURL}/news/${id}`,
    title: article.data.attributes.Titel,
    description: article.data.attributes.ArticleText.split(0, 150)[0] + "...",
    openGraph: {
      title: article.data.attributes.Titel,
      description: description,
      images: [OGPath, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&populate=*&locale=sv`;
  const response = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articlesData = await response.json();
  const articles = Array.isArray(articlesData.data) ? articlesData.data : [];

  return articles.map((article) => ({
    articleId: article.id.toString(),
  }));
}

export default async function Page({ params }) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${params.articleId}?populate=*`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  const article = await response.json();

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${params.articleId}&sort=Date:desc&pagination[limit]=3&populate=*&locale=sv`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${articlesResponse.statusText}`);
  }

  const articlesData = await articlesResponse.json();
  const articles = Array.isArray(articlesData.data) ? articlesData.data : [];

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  if (!article) return <div></div>;

  const formattedDate = convertDateFormat(article.data.attributes.Date);
  const urlBasedOnLang = "/nyheter/";

  const availableFormats =
    article.data.attributes.Image.data.attributes.formats;
  let singleImage;
  if (availableFormats.medium) {
    singleImage = availableFormats.medium.url;
  } else if (availableFormats.small) {
    singleImage = availableFormats.small.url;
  } else if (availableFormats.thumbnail) {
    singleImage = availableFormats.thumbnail.url;
  }
  const pathSingleArticle = `/${path.basename(singleImage)}`;

  return (
    <>
      <div className="news-article-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="news-article-content-wrapper">
              <img className="news-main-image" src={`${pathSingleArticle}`} />
              <h6>{formattedDate}</h6>
              <div className="news-article-text-wrapper">
                <h1>{article.data.attributes.Titel}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: article.data.attributes.ArticleText,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="more-articles-content-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="more-articles-section">
                <h2>Fler artiklar</h2>
                <div className="more-articles-wrapper">
                  {articles.map((article, index) => {
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
