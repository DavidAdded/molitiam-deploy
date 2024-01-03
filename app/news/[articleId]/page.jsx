"use client";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `http://localhost:1337/api/articles/${params.articleId}`;
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

  return (
    <div className="news-article-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="news-article-content-wrapper">
            <img src="/nyheter-flagga.png" alt="News" />
            


          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
