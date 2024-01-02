import "./page.css";

var date = "2024•01•01";

const items = [
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    imageUrl: "nyheter-flagga.png",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
];

const Page = () => {
  const readMoreText = "Read More";
  const arrowIconUrl = "right-arrow.svg";

  return (
    <div className="news-page-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-content-wrapper">
              <h1>Nyheter</h1>
              <div className="news-grid">
                {items.map((item, index) => (
                  <div className="nyheter-content-card" key={index}>
                    <div
                      className="nyheter-content-card-top"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    >
                      {/* Background image set via props */}
                    </div>
                    <div className="nyheter-content-card-bottom">
                      <div className="nyheter-content-card-text-wrapper">
                        <div className="nyheter-date">{date}</div>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                      </div>
                      <div className="nyheter-las-mer">
                        <div className="nyheter-las-mer-content">
                          <p>{readMoreText}</p>
                          <img src={arrowIconUrl} alt="Read more" />
                        </div>
                      </div>
                      <div className="bottom-corner-cover-up"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button>Ladda fler nyheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
