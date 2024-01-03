"use client";
import "./page.css";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [article, setArticle] = useState(null);

  const articles = [
    {
      id: 1,
      date: "2024•01•01",
      title: "Lorem ipsum dolor sit amet",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      imageClass: "nyheter-content-card-top-left",
    },
    {
      id: 2,
      date: "2024•01•01",
      title: "Lorem ipsum dolor sit amet",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      imageClass: "nyheter-content-card-top-left",
    },
    {
      id: 3,
      date: "2024•01•01",
      title: "Lorem ipsum dolor sit amet",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      imageClass: "nyheter-content-card-top-left",
    },
  ];

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `http://localhost:1337/api/articles/${params.articleId}?populate=*`;
        const response = await fetch(URL, {
          headers: {
            Authorization:
              "Bearer 7b122065c2667abc5095b9eeae75c55d42e26da5b1c56ba37307cad4b9bbad11ae541d504f14bea219c181f8f38a118eeeb7b1a29197f9ce02a5f504e5d8eaffa25fd8132303aefcf619f400bf9ee99a367ed6e1e59346508f3e30685b1538cd4514e0b8559ea6fd5edcf9d13f1a56b1d8cbe1cdbd48e894522b332067b083e2", // Replace 'Hello' with the actual token
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          console.log(data);
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

  return (
    <div className="news-article-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="news-article-content-wrapper">
            <img
              src={`http://localhost:1337${article.data.attributes.Image.data.attributes.formats.thumbnail.url}`}
            />
            <h6>{formattedDate}</h6>
            <div className="news-article-text-wrapper">
              <h1>{article.data.attributes.Titel}</h1>
              <p>{article.data.attributes.ParagraphOne}</p>
              <h2>{article.data.attributes.TitelTwo}</h2>
              <p>{article.data.attributes.ParagraphTwo}</p>
              <h3>{article.data.attributes.Underrubrik}</h3>
              <p>{article.data.attributes.ParagraphThree}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="more-articles-content-wrapper">
        <h2>Fler artiklar</h2>
        <div className="padding-global">
          <div className="container-large">
            <div className="more-articles-wrapper">
              {articles.map((article) => (
                <div key={article.id} className="nyheter-content-card">
                  <div className={article.imageClass}></div>
                  <div className="nyheter-content-card-bottom">
                    <div className="nyheter-content-card-text-wrapper">
                      <div className="nyheter-date">{article.date}</div>
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                    </div>
                    <div className="nyheter-las-mer">
                      <div
                        className="nyheter-las-mer-content"
                        onClick={() => handleReadMoreClick(article.id)}
                      >
                        <p>LÄS MER</p>
                        <img src="/right-arrow.svg" alt="Read More" />
                      </div>
                    </div>
                    <div className="bottom-corner-cover-up"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
