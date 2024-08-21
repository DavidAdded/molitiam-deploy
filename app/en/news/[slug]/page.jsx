import "../../../nyheter/[slug]/page.css";
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
  // Get the slug from params instead of an id
  const slug = params.slug;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[slug][$eq]=${slug}&populate=*&locale=en`;

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
  const article = articleData.data[0]; // Assuming the API returns an array

  const previousImages = (await parent).openGraph?.images || [];

  const description =
    article.attributes.ArticleText.replace(/<[^>]*>/g, "").substring(0, 150) +
    "...";

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
  const baseURL = "https://mollitiam.se";
  const OGPath = `${baseURL}/${path.basename(imageURL)}`;

  // Download the image if it doesn't exist
  await downloadImage(imageURL, imagePath);

  return {
    metadataBase: `${baseURL}/news/${slug}`,
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
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=-1&fields[0]=slug&locale=en`;

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
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[slug][$eq]=${slug}&populate=*`;

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
  ); // Assuming the API returns an array

  if (!article) {
    return <div>Article not found</div>;
  }

  // Format date
  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const formattedDate = convertDateFormat(article.attributes.Date);
  const urlBasedOnLang = "/en/news";

  // Get image
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

  // Fetch other articles
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${article.id}&sort=Date:desc&pagination[limit]=3&fields[0]=slug&fields[1]=Titel&fields[2]=Date&populate=Image&locale=en`;

  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Cache-Control": "no-store",
    },
  });

  if (!articlesResponse.ok) {
    return <div>Failed to fetch other articles</div>;
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
                <p
                  dangerouslySetInnerHTML={{
                    __html: article.attributes.ArticleText,
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
                <h2>More articles</h2>
                <div className="more-articles-wrapper">
                  {articles.length !== 0 &&
                    articles.map((relatedArticle) => {
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
