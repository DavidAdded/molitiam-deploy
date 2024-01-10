"use client";
import "./Nyheter.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nyheter = () => {
  const readMoreText = "Read More";
  const arrowIconUrl = "right-arrow.svg";

  const lang = "sv";
  const router = useRouter();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=3&populate=*&locale=${lang}`;
        const articlesResponse = await fetch(articlesURL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (articlesResponse.ok) {
          const articles = await articlesResponse.json();

          setArticles(articles.data);
        } else {
          console.error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, []);

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const handleClick = () => {
    router.push("/news");
  };

  const handleReadMoreClick = (articleId) => {
    router.push(`/news/${articleId}`);
  };

  if (!articles) return <div></div>;

  return (
    <div className="nyheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-content-wrapper">
              <div className="nyheter-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> Nyheter </h6>
              </div>
              <div className="nyheter-content-boxes">
                {articles.map((article) => {
                  // Assuming article.attributes.Image.attributes.url contains the image path// This will log the image URL to the console
                  const articleDate = article.attributes.Date;
                  const articleImage =
                    article.attributes.Image.data.attributes.formats.thumbnail
                      .url;
                  return (
                    <div
                      onClick={() => handleReadMoreClick(article.id)}
                      key={article.id}
                      className="nyheter-wrapper"
                    >
                      <div className="nyheter-content-card">
                        {articleImage ? (
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_SLIM}${articleImage})`,
                            }}
                            className="nyheter-content-card-top"
                          ></div>
                        ) : (
                          <div className="nyheter-content-card-top"></div>
                        )}

                        <div className="nyheter-content-card-bottom">
                          <div className="nyheter-content-card-text-wrapper">
                            <div className="nyheter-date">
                              {articleDate
                                ? convertDateFormat(articleDate)
                                : ""}
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
                        <div className="bottom-corner-cover-up"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="regular-button" onClick={handleClick}>
                LÄS ALLA NYHETER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nyheter;
