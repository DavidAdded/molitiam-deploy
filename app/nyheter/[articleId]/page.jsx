import { resolve } from "styled-jsx/css";
import "./page.css";
import path from "path";

export async function generateMetadata({ params }, parent) {
  const id = params.id
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${params.articleId}?populate=*`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
 const article = await response.json();
 
  const previousImages = (await parent).openGraph?.images || []
   const description = article.data.attributes.ArticleText
  .replace(/<[^>]*>/g, '')
  .substring(0, 150)   
  + '...'; 
  return {
    title: article.data.attributes.Titel,
    description: article.data.attributes.ArticleText.split(0, 150)[0]+ "...",
    openGraph: {
      title: article.data.attributes.Titel,
      description: description,
      images: [article.data.attributes.Image.data.attributes.formats.medium.url, ...previousImages],
    },
  }
}

 

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

export default async function Page({ params }) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${params.articleId}?populate=*`;
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
    },
  });

  const article = await response.json();

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${params.articleId}&sort=Date:desc&pagination[limit]=3&populate=*&locale=sv`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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
  const singleImage = article.data.attributes.Image.data.attributes.formats.medium.url;
  const pathSingleArticle = `/${path.basename(singleImage)}`;

  return (
    <>
      <div className="news-article-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="news-article-content-wrapper">
              <img
                className="news-main-image"
                src={`${pathSingleArticle}`}
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
       
                    const articleImage =
                    article.attributes.Image.data.attributes.formats.medium
                      .url;
                  const imagePath = `/${path.basename(articleImage)}`;

                    return (
                      <div className="nyheter-wrapper">
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
    </>
  );
}
