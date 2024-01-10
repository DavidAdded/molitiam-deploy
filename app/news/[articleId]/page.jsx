"use client";
import "./page.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const lang = "sv";
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [articles, setarticles] = useState(null);

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}articles/${params.articleId}?populate=*`;
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
          },
        });

        const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=3&populate=*&locale=${lang}`;
        const articlesResponse = await fetch(articlesURL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const articles = await articlesResponse.json();
          setArticle(data);
          setarticles(articles.data);
        } else {
          console.error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, [params.articleId]);

  if (!article) return <div>Loading...</div>;

  const formattedDate = convertDateFormat(article.data.attributes.Date);

  const handleReadMoreClick = (articleId) => {
    router.push(`/news/${articleId}`);
  };

  return (
    <div className="news-article-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="news-article-content-wrapper">
            <img
              src={`${process.env.NEXT_PUBLIC_API_SLIM}${article.data.attributes.Image.data.attributes.formats.thumbnail.url}`}
            />
            <h6>{formattedDate}</h6>
            <div className="news-article-text-wrapper">
              <h1>{article.data.attributes.Titel}</h1>
              <div>{article.data.attributes.ArticleText}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="more-articles-content-wrapper">
        <h2>Fler artiklar</h2>
        <div className="padding-global">
          <div className="container-large">
            <div className="more-articles-wrapper">
              {articles.map((article) => {
                // Assuming article.attributes.Image.attributes.url contains the image path
                // This will log the image URL to the console

                return (
                  <div
                    key={article.id}
                    className="nyheter-article-content-card"
                  >
                    <div className="nyheter-article-content-card-top">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.thumbnail.url}`}
                      ></img>
                    </div>

                    <div className="nyheter-article-content-card-bottom">
                      <div className="nyheter-article-content-card-text-wrapper">
                        <div className="nyheter-article-date">
                          {convertDateFormat(article.attributes.Date)}
                        </div>
                        <h3>{article.attributes.Titel}</h3>
                        <p className="nyheter-article-paragraph-one">
                          {article.attributes.ArticleText}
                        </p>
                      </div>
                      <div className="nyheter-article-las-mer">
                        <div
                          className="nyheter-article-las-mer-content"
                          onClick={() => handleReadMoreClick(article.id)}
                        >
                          <p>LÄS MER</p>
                          <img src="/right-arrow.svg" alt="Read More" />
                        </div>
                      </div>
                      <div className="bottom-corner-cover-up"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
