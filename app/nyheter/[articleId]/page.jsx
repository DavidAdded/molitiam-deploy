import { resolve } from "styled-jsx/css";
import "./page.css";
import { useRouter } from "next/navigation";

export async function generateStaticParams() {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&populate=*&locale=sv`;
  const response = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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

async function fetchArticleData(articleId) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${articleId}?populate=*`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
    },
  });

  const article = await response.json();
  return article;
}

async function fetchArticles(articleId) {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${articleId}&sort=Date:desc&pagination[limit]=3&populate=*&locale=sv`;
  const response = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articlesData = await response.json();
  const articles = Array.isArray(articlesData.data) ? articlesData.data : [];

  return articles;
}

export default async function Page({ params }) {
  const articleData = fetchArticleData(params.articleId);
  const articlesData = fetchArticles(params.articleId);

  const [article, articles] = await Promise.all([articleData, articlesData]);

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  //if (params) return <div></div>;

  const formattedDate = convertDateFormat(article.data.attributes.Date);

  const urlBasedOnLang = "/nyheter/";

  const handleReadMoreClick = (articleId) => {
    router.push(`${urlBasedOnLang}/${articleId}`);
  };

  return (
    <>
      <div className="news-article-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="news-article-content-wrapper">
              <img
                className="news-main-image"
                src={`${process.env.NEXT_PUBLIC_API_SLIM}${article.data.attributes.Image.data.attributes.formats.medium.url}`}
              />
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
                  {articles.map((article) => {
                    // Assuming article.attributes.Image.attributes.url contains the image path
                    // This will log the image URL to the console

                    return (
                      <div className="nyheter-wrapper">
                        <a
                          href={`${urlBasedOnLang}/${article.id}`}
                          key={article.id}
                        >
                          <div className="nyheter-content-card">
                            <div
                              style={{
                                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.medium.url})`,
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
    </>
  );
}
