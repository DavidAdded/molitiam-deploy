"use client";
import "./Nyheter.css";
import { useRouter } from "next/navigation";

const Nyheter = () => {
  const router = useRouter();

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

  const handleClick = () => {
    router.push("/news");
  };

  const handleReadMoreClick = (articleId) => {
    router.push(`/news/${articleId}`);
  };

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
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleReadMoreClick(article.id)}
                    className="nyheter-content-card"
                  >
                    <div className={article.imageClass}></div>
                    <div className="nyheter-content-card-bottom">
                      <div className="nyheter-content-card-text-wrapper">
                        <div className="nyheter-date">{article.date}</div>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                      </div>
                    </div>
                    <div className="nyheter-las-mer">
                      <div className="nyheter-las-mer-content">
                        <p>LÄS MER</p>
                        <img src="/right-arrow.svg" alt="Read More" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleClick}>LÄS ALLA NYHETER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nyheter;
