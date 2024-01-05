"use client";
import "./page.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const readMoreText = "Read More";
  const arrowIconUrl = "right-arrow.svg";

  const lang = "sv";
  const router = useRouter();

  const [articles, setarticles] = useState(null);

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const handleReadMoreClick = (articleId) => {
    router.push(`/news/${articleId}`);
  };

  const handleClick = () => {
    router.push("/news");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=6&populate=*&locale=${lang}`;
        const articlesResponse = await fetch(articlesURL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        console.log(articlesResponse);

        if (articlesResponse.ok) {
          const articles = await articlesResponse.json();

          setarticles(articles.data);

          console.log(articles);
        } else {
          console.error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, []);

  if (!articles) return <div>Loading...</div>;

  return (
    <div className="news-page-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-page-content-wrapper">
              <h1>nyheter</h1>
              <div className="news-grid">
                {articles.map((article) => {
                  // Assuming article.attributes.Image.attributes.url contains the image path// This will log the image URL to the console

                  return (
                    <div key={article.id} className="nyheter-page-content-card">
                      <div className="nyheter-page-content-card-top">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.thumbnail.url}`}
                        ></img>
                      </div>

                      <div className="nyheter-page-content-card-bottom">
                        <div className="nyheter-page-content-card-text-wrapper">
                          <div className="nyheter-page-date">
                            {convertDateFormat(article.attributes.Date)}
                          </div>
                          <h3>{article.attributes.Titel}</h3>
                          <p className="nyheter-page-paragraph-one">
                            {article.attributes.ParagraphOne}
                          </p>
                        </div>
                        <div className="nyheter-page-las-mer">
                          <div
                            className="nyheter-page-las-mer-content"
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
            <button onClick={handleClick}>Ladda fler nyheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
