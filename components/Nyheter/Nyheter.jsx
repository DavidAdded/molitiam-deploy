import "./Nyheter.css";

const Nyheter = async (props) => {
  const arrowIconUrl = "right-arrow.svg";
  const lang = props.lang;

  const nyheterText = lang === "sv" ? "Nyheter" : "News";

  const readMoreText = lang === "sv" ? "LÄS MER" : "READ MORE";
  const readAllArticlesText =
    lang === "sv" ? "LÄS ALLA NYHETER" : "READ ALL NEWS";

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=3&populate=*&locale=${lang}`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  const articles = await articlesResponse.json();

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = lang === "sv" ? "/nyheter" : "/en/news";

  return (
    <div className="nyheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-content-wrapper">
              <div className="nyheter-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {nyheterText}</h6>
              </div>
              <div className="nyheter-content-boxes">
                {articles ? (
                  articles.data.map((article) => {
                    // Assuming article.attributes.Image.attributes.url contains the image path// This will log the image URL to the console
                    const articleDate = article.attributes.Date;
                    const articleImage =
                      article.attributes.Image.data.attributes.formats.medium
                        .url;
                    return (
                      <div className="nyheter-wrapper">
                        <a
                          href={`${urlBasedOnLang}/${article.id}`}
                          key={article.id}
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
                              <p>{readMoreText}</p>
                              <img src="/right-arrow.svg" alt="Read More" />
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
              <a href={`${urlBasedOnLang}/`}>
                <button className="regular-button">
                  {readAllArticlesText}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nyheter;
