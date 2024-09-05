import "./page.css";
import path from "path";
import fs from "fs";
import axios from "axios";
import Footer from "@components/Footer/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_API_SLIM;

const downloadImage = async (url, filepath) => {
  if (fs.existsSync(filepath)) {
    return;
  }
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

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

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", (err) => {
        console.error(`Error writing the file: ${err.message}`);
        reject(err);
      });
    });
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw new Error(`Error downloading the image: ${error.message}`);
  }
};

export async function generateMetadata({ params }, parent) {
  const slug = params.slug;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[slug][$eq]=${slug}&populate=*&locale=sv`;

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article metadata: ${response.statusText}`);
  }

  const articleData = await response.json();
  const article = articleData.data[0];

  const previousImages = (await parent).openGraph?.images || [];

  const description =
    article.attributes.ArticleText.replace(/<[^>]*>/g, "").substring(0, 150) +
    "...";

  const availableFormats = article.attributes.Image.data.attributes.formats;
  const imageURL = availableFormats.medium
    ? availableFormats.medium.url
    : availableFormats.small
    ? availableFormats.small.url
    : availableFormats.thumbnail
    ? availableFormats.thumbnail.url
    : null;

  const imagePath = path.resolve("./public", path.basename(imageURL));
  const baseURL = "https://mollitiam.se";
  const OGPath = `${baseURL}/${path.basename(imageURL)}`;

  await downloadImage(imageURL, imagePath);

  return {
    metadataBase: `${baseURL}/nyheter/${slug}`,
    title: article.attributes.Titel,
    description: description,
    openGraph: {
      title: article.attributes.Titel,
      description: description,
      images: [OGPath, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=-1&fields[0]=Slug&locale=sv`;

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
    slug: article.attributes.Slug,
  }));
}

export default async function Page({ params }) {
  const slug = params.slug;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[slug][$eq]=${slug}&populate=*&locale=sv`;

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    return <div>Failed to fetch article data</div>;
  }

  const articleData = await response.json();
  const article = articleData.data.find(
    (item) => item.attributes.Slug === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const formattedDate = convertDateFormat(article.attributes.Date);
  const urlBasedOnLang = "/nyheter";

  const availableFormats = article.attributes.Image.data.attributes.formats;
  const singleImage = availableFormats.medium
    ? availableFormats.medium.url
    : availableFormats.small
    ? availableFormats.small.url
    : availableFormats.thumbnail
    ? availableFormats.thumbnail.url
    : null;

  const pathSingleArticle = singleImage
    ? `/${path.basename(singleImage)}`
    : null;

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${article.id}&sort=Date:desc&pagination[limit]=3&fields[0]=Slug&fields[1]=Titel&fields[2]=Date&populate=Image&locale=sv`;

  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!articlesResponse.ok) {
    return <div>Failed to fetch related articles</div>;
  }

  const articlesData = await articlesResponse.json();
  const articles = articlesData.data || [];

  return (
    <>
      <div className="news-article-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="news-article-content-wrapper">
              {singleImage && (
                <img
                  className="news-main-image"
                  src={pathSingleArticle}
                  alt={article.attributes.Titel}
                />
              )}
              <h6>{formattedDate}</h6>
              <div className="news-article-text-wrapper">
                <h1>{article.attributes.Titel}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.attributes.ArticleText,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {articles.length > 0 && (
        <div className="more-articles-content-wrapper">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="more-articles-section">
                  <h2>Fler artiklar</h2>
                  <div className="more-articles-wrapper">
                    {articles.map((relatedArticle) => {
                      const relatedImageFormats =
                        relatedArticle.attributes.Image.data.attributes.formats;
                      const relatedArticleImage = relatedImageFormats.medium
                        ? relatedImageFormats.medium.url
                        : relatedImageFormats.small
                        ? relatedImageFormats.small.url
                        : relatedImageFormats.thumbnail
                        ? relatedImageFormats.thumbnail.url
                        : null;

                      const relatedImagePath = relatedArticleImage
                        ? `/${path.basename(relatedArticleImage)}`
                        : null;

                      return (
                        <div
                          key={relatedArticle.id}
                          className="nyheter-wrapper"
                        >
                          <a
                            href={`${urlBasedOnLang}/${relatedArticle.attributes.Slug}`}
                          >
                            <div className="nyheter-content-card">
                              {relatedImagePath && (
                                <div
                                  style={{
                                    backgroundImage: `url(${relatedImagePath})`,
                                  }}
                                  className="nyheter-content-card-top"
                                ></div>
                              )}
                              <div className="nyheter-content-card-bottom">
                                <div className="nyheter-content-card-text-wrapper">
                                  <div className="nyheter-date">
                                    {convertDateFormat(
                                      relatedArticle.attributes.Date
                                    )}
                                  </div>
                                  <h3>{relatedArticle.attributes.Titel}</h3>
                                  <p className="nyheter-paragraph-one">
                                    {relatedArticle.attributes.ArticleText}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="nyheter-las-mer">
                              <div className="nyheter-las-mer-content">
                                <p>LÄS MER</p>
                                <img src="/right-arrow.svg" alt="Läs Mer" />
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
      )}
      <Footer lang={"sv"}></Footer>
    </>
  );
}
