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

        const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?filters[id][$ne]=${params.articleId}&sort=Date:desc&pagination[limit]=3&populate=*&locale=${lang}`;
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

  if (!article) return <div></div>;

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
              <p
                dangerouslySetInnerHTML={{
                  __html: article.data.attributes.ArticleText,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div className="more-articles-content-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <h2>Fler artiklar</h2>
            <div className="more-articles-wrapper">
              {articles.map((article) => {
                // Assuming article.attributes.Image.attributes.url contains the image path
                // This will log the image URL to the console

                return (
                  <div
                    onClick={() => handleReadMoreClick(article.id)}
                    key={article.id}
                    className="nyheter-wrapper"
                  >
                    <div className="nyheter-content-card">
                      <div
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.thumbnail.url})`,
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
